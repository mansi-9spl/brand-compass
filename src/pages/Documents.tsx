import { useState } from "react";
import { Search, Filter, FileText, Image, Sheet, Globe, HardDrive, Upload, AlertCircle, Loader2, CheckCircle2 } from "lucide-react";
import { mockDocuments, type Document } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

const typeIcons: Record<string, React.ElementType> = {
  PDF: FileText,
  Doc: FileText,
  Image: Image,
  Sheet: Sheet,
};

const sourceIcons: Record<string, React.ElementType> = {
  "Google Drive": HardDrive,
  Upload: Upload,
  URL: Globe,
};

const statusConfig: Record<string, { icon: React.ElementType; className: string }> = {
  Indexed: { icon: CheckCircle2, className: "text-success" },
  Processing: { icon: Loader2, className: "text-warning animate-spin" },
  Error: { icon: AlertCircle, className: "text-destructive" },
};

const Documents = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const filtered = mockDocuments.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "All" || doc.type === typeFilter;
    const matchesStatus = statusFilter === "All" || doc.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const types = ["All", "PDF", "Doc", "Image", "Sheet"];
  const statuses = ["All", "Indexed", "Processing", "Error"];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Documents</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            {mockDocuments.length} documents ingested for this brand
          </p>
        </div>
        <Button size="sm" className="gap-2 text-xs">
          <Upload className="w-3.5 h-3.5" />
          Upload
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-2 flex-1 max-w-sm bg-secondary rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground text-foreground"
            placeholder="Search documents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-1.5">
          <Filter className="w-4 h-4 text-muted-foreground" />
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                typeFilter === t
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="h-5 w-px bg-border" />
        <div className="flex items-center gap-1.5">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                statusFilter === s
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="border border-border rounded-xl bg-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Document</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Source</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Type</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Last Updated</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((doc) => {
              const TypeIcon = typeIcons[doc.type] || FileText;
              const SourceIcon = sourceIcons[doc.source] || Globe;
              const status = statusConfig[doc.status];
              const StatusIcon = status.icon;

              return (
                <tr key={doc.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <TypeIcon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">{doc.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <SourceIcon className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{doc.source}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground font-medium">{doc.type}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-muted-foreground">{doc.lastUpdated}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <StatusIcon className={`w-3.5 h-3.5 ${status.className}`} />
                      <span className="text-sm text-foreground">{doc.status}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="px-4 py-12 text-center text-sm text-muted-foreground">
            No documents match your filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;
