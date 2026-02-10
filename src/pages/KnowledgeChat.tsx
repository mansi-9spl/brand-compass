import { useState } from "react";
import { Send, Sparkles, ChevronDown, ChevronRight, FileText, ExternalLink } from "lucide-react";
import { mockChatHistory, examplePrompts, type ChatMessage, type Source } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

const SourceItem = ({ source }: { source: Source }) => (
  <a
    href={source.url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 px-3 py-2 rounded-md bg-secondary hover:bg-accent transition-colors group"
  >
    <FileText className="w-3.5 h-3.5 text-muted-foreground" />
    <span className="text-xs font-medium text-foreground truncate">{source.name}</span>
    <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-medium">{source.type}</span>
    <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
  </a>
);

const SourcesPanel = ({ sources }: { sources: Source[] }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-3 border-t border-border pt-3">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        {open ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        {sources.length} source{sources.length !== 1 ? "s" : ""}
      </button>
      {open && (
        <div className="mt-2 space-y-1">
          {sources.map((s) => (
            <SourceItem key={s.id} source={s} />
          ))}
        </div>
      )}
    </div>
  );
};

const ChatMessageBubble = ({ message }: { message: ChatMessage }) => {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-2xl bg-primary text-primary-foreground rounded-2xl rounded-br-md px-4 py-3 text-sm">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="max-w-3xl bg-card border border-border rounded-2xl rounded-bl-md px-5 py-4">
        <div
          className="text-sm leading-relaxed text-foreground prose prose-sm max-w-none
            prose-headings:text-foreground prose-headings:font-semibold prose-headings:mt-4 prose-headings:mb-2
            prose-p:text-foreground prose-p:my-1.5
            prose-li:text-foreground prose-li:my-0.5
            prose-strong:text-foreground prose-strong:font-semibold
            prose-code:text-accent-foreground prose-code:bg-accent prose-code:px-1 prose-code:rounded"
          dangerouslySetInnerHTML={{ __html: formatMarkdown(message.content) }}
        />
        {message.sources && message.sources.length > 0 && (
          <SourcesPanel sources={message.sources} />
        )}
      </div>
    </div>
  );
};

function formatMarkdown(text: string): string {
  return text
    .replace(/^### (.+)$/gm, '<h3 class="text-sm font-semibold mt-4 mb-1">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-base font-semibold mt-4 mb-2">$1</h2>')
    .replace(/^\- \*\*(.+?)\*\* — (.+)$/gm, '<div class="flex gap-2 my-1"><span class="font-semibold">$1</span><span class="text-muted-foreground">— $2</span></div>')
    .replace(/^\d+\. \*\*(.+?)\*\*: (.+)$/gm, '<div class="flex gap-2 my-1"><span class="font-semibold">$1:</span><span>$2</span></div>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^\- (.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
    .replace(/\n\n/g, '<br/><br/>');
}

const KnowledgeChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatHistory);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    setMessages([...messages, newMsg]);
    setInput("");
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="flex flex-col h-full">
      {/* Chat area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-full px-6 py-12">
            <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-accent-foreground" />
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-1">Ask about this brand</h2>
            <p className="text-sm text-muted-foreground mb-8 max-w-md text-center">
              Query the knowledge base to find brand guidelines, product details, campaign constraints, and more.
            </p>
            <div className="grid grid-cols-2 gap-2 max-w-lg w-full">
              {examplePrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handlePromptClick(prompt)}
                  className="text-left px-4 py-3 rounded-lg border border-border bg-card hover:bg-accent hover:border-primary/20 transition-colors text-sm text-foreground"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto px-6 py-6 space-y-4">
            {messages.map((msg) => (
              <ChatMessageBubble key={msg.id} message={msg} />
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-border bg-card px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end gap-3 bg-secondary rounded-xl px-4 py-3">
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask a question about this brand…"
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none resize-none min-h-[20px] max-h-32"
            />
            <Button
              size="sm"
              onClick={handleSend}
              disabled={!input.trim()}
              className="shrink-0 rounded-lg h-8 w-8 p-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-[11px] text-muted-foreground mt-2 text-center">
            Answers are generated from indexed brand documents. Always verify critical information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeChat;
