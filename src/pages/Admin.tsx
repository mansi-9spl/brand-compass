import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Plus, Archive, FolderSync, Clock, AlertTriangle, ExternalLink,
  Link2, FileText, Server, RefreshCw, FolderOpen, Unlink, HardDrive,
  Cloud, Database, Globe,
} from "lucide-react";
import { brands, type Brand } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface StorageProvider {
  id: string;
  name: string;
  icon: React.ElementType;
  connected: boolean;
  account?: string;
  importFolder?: string;
  lastSynced?: string;
  filesCount?: number;
  newFiles?: number;
}

const allProviders: StorageProvider[] = [
  { id: "gdrive", name: "Google Drive", icon: HardDrive, connected: true, account: "team@acmecorp.com", importFolder: "Brand Assets", lastSynced: "2 hours ago", filesCount: 24, newFiles: 0 },
  { id: "sharepoint", name: "SharePoint", icon: Cloud, connected: false },
  { id: "onedrive", name: "OneDrive", icon: Database, connected: false },
  { id: "dropbox", name: "Dropbox", icon: HardDrive, connected: false },
  { id: "box", name: "Box", icon: FolderOpen, connected: false },
  { id: "s3", name: "AWS S3", icon: Server, connected: false },
];

const Admin = () => {
  const { selectedBrand } = useOutletContext<{ selectedBrand: Brand }>();
  const [activeTab, setActiveTab] = useState<"brands" | "sources" | "logs">("brands");

  const tabs = [
    { id: "brands" as const, label: "Brand KBs" },
    { id: "sources" as const, label: "Data Sources" },
    { id: "logs" as const, label: "Error Logs" },
  ];

  const connectedCount = allProviders.filter((p) => p.connected).length;
  const totalFiles = allProviders.reduce((sum, p) => sum + (p.filesCount || 0), 0);

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
          {/* Brand context banner */}
          <div className="flex items-center gap-2 mb-5 px-4 py-3 rounded-lg border border-border bg-muted/40">
            <div
              className="w-6 h-6 rounded flex items-center justify-center text-primary-foreground text-xs font-semibold"
              style={{ backgroundColor: selectedBrand.color }}
            >
              {selectedBrand.name.charAt(0)}
            </div>
            <span className="text-sm font-medium text-foreground">
              Data sources for <span className="text-primary">{selectedBrand.name}</span>
            </span>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className="px-5 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Link2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{connectedCount}</p>
                <p className="text-xs text-muted-foreground">Connected Providers</p>
              </div>
            </Card>
            <Card className="px-5 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalFiles}</p>
                <p className="text-xs text-muted-foreground">Files Available</p>
              </div>
            </Card>
            <Card className="px-5 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Server className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{allProviders.length}</p>
                <p className="text-xs text-muted-foreground">Supported Providers</p>
              </div>
            </Card>
          </div>

          {/* Providers heading */}
          <h3 className="text-sm font-semibold text-foreground mb-4">Cloud Storage Providers</h3>

          {/* Provider grid */}
          <div className="grid grid-cols-3 gap-4">
            {allProviders.map((provider) => {
              const Icon = provider.icon;
              return (
                <Card
                  key={provider.id}
                  className={`p-5 flex flex-col ${
                    provider.connected ? "border-success/50 bg-success/5" : ""
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                        <Icon className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <span className="text-sm font-semibold text-foreground">{provider.name}</span>
                    </div>
                    <span
                      className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                        provider.connected
                          ? "bg-success/10 text-success"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {provider.connected ? "Connected" : "Not Connected"}
                    </span>
                  </div>

                  {provider.connected ? (
                    <div className="flex-1 flex flex-col">
                      <p className="text-xs text-muted-foreground mb-1">{provider.account}</p>
                      <div className="text-xs text-muted-foreground space-y-1 mb-4">
                        <p>Import from: <span className="text-foreground font-medium">{provider.importFolder}</span></p>
                        <div className="flex justify-between">
                          <span>Last synced</span>
                          <span className="text-foreground font-medium">{provider.lastSynced}</span>
                        </div>
                        <p>{provider.newFiles === 0 ? "No new files detected" : `${provider.newFiles} new files detected`}</p>
                      </div>
                      <div className="space-y-2 mt-auto">
                        <Button variant="outline" size="sm" className="w-full text-xs h-8 gap-1.5 justify-center">
                          <FileText className="w-3.5 h-3.5" />
                          See files
                        </Button>
                        <Button variant="outline" size="sm" className="w-full text-xs h-8 gap-1.5 justify-center">
                          <RefreshCw className="w-3.5 h-3.5" />
                          Sync Now
                        </Button>
                        <Button variant="outline" size="sm" className="w-full text-xs h-8 gap-1.5 justify-center">
                          <FolderOpen className="w-3.5 h-3.5" />
                          Change folder
                        </Button>
                        <Button variant="outline" size="sm" className="w-full text-xs h-8 gap-1.5 justify-center text-destructive hover:text-destructive">
                          <Unlink className="w-3.5 h-3.5" />
                          Disconnect
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col justify-end mt-4">
                      <Button size="sm" className="w-full gap-1.5 justify-center">
                        <Link2 className="w-3.5 h-3.5" />
                        Connect
                      </Button>
                    </div>
                  )}
                </Card>
              );
            })}
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
