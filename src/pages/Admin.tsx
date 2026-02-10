import { useState } from "react";
import { Plus, Archive, FolderSync, Clock, AlertTriangle, ExternalLink } from "lucide-react";
import { brands } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

const Admin = () => {
  const [activeTab, setActiveTab] = useState<"brands" | "sources" | "logs">("brands");

  const tabs = [
    { id: "brands" as const, label: "Brand KBs" },
    { id: "sources" as const, label: "Data Sources" },
    { id: "logs" as const, label: "Error Logs" },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Admin</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Manage brands, data sources, and system configuration</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "brands" && (
        <div>
          <div className="flex justify-end mb-4">
            <Button size="sm" className="gap-2 text-xs">
              <Plus className="w-3.5 h-3.5" />
              Create Brand KB
            </Button>
          </div>
          <div className="grid gap-3">
            {brands.map((brand) => (
              <div key={brand.id} className="flex items-center justify-between px-5 py-4 rounded-xl border border-border bg-card">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-primary-foreground text-sm font-semibold"
                    style={{ backgroundColor: brand.color }}
                  >
                    {brand.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{brand.name}</p>
                    <p className="text-xs text-muted-foreground">{brand.documentsCount} documents indexed</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="text-xs h-8 gap-1.5">
                    <FolderSync className="w-3.5 h-3.5" />
                    Manage Sources
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs h-8 gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    Schedule
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs h-8 gap-1.5 text-destructive hover:text-destructive">
                    <Archive className="w-3.5 h-3.5" />
                    Archive
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "sources" && (
        <div>
          <div className="flex justify-end mb-4">
            <Button size="sm" className="gap-2 text-xs">
              <Plus className="w-3.5 h-3.5" />
              Connect Source
            </Button>
          </div>
          <div className="grid gap-3">
            {[
              { name: "Google Drive — Brand Folder", type: "Google Drive", schedule: "Every 6 hours", status: "Active" },
              { name: "Confluence Wiki", type: "URL", schedule: "Daily", status: "Active" },
              { name: "SharePoint Assets", type: "URL", schedule: "Weekly", status: "Paused" },
            ].map((source, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-4 rounded-xl border border-border bg-card">
                <div>
                  <p className="text-sm font-medium text-foreground">{source.name}</p>
                  <p className="text-xs text-muted-foreground">{source.type} · {source.schedule}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    source.status === "Active" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
                  }`}>
                    {source.status}
                  </span>
                  <Button variant="outline" size="sm" className="text-xs h-8">Configure</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "logs" && (
        <div>
          <div className="space-y-2">
            {[
              { time: "2026-02-10 09:12", message: "Failed to parse Legal_Compliance_v2.pdf — unsupported format", severity: "error" },
              { time: "2026-02-09 14:30", message: "Google Drive token refresh failed — reconnection required", severity: "error" },
              { time: "2026-02-09 10:15", message: "Skipped duplicate file: Brand_Guidelines_v3.1.pdf", severity: "warning" },
              { time: "2026-02-08 16:50", message: "Image OCR extraction partial — low quality source", severity: "warning" },
            ].map((log, i) => (
              <div key={i} className="flex items-start gap-3 px-4 py-3 rounded-lg border border-border bg-card">
                <AlertTriangle className={`w-4 h-4 mt-0.5 shrink-0 ${
                  log.severity === "error" ? "text-destructive" : "text-warning"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{log.message}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{log.time}</p>
                </div>
                <Button variant="ghost" size="sm" className="text-xs h-7 gap-1 shrink-0">
                  <ExternalLink className="w-3 h-3" />
                  Details
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
