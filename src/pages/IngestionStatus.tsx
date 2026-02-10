import { RefreshCw, CheckCircle2, Loader2, XCircle, HardDrive, Upload, Globe } from "lucide-react";
import { mockIngestionJobs } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

const statusConfig = {
  Success: { icon: CheckCircle2, className: "text-success", bg: "bg-success/10" },
  Processing: { icon: Loader2, className: "text-warning animate-spin", bg: "bg-warning/10" },
  Failed: { icon: XCircle, className: "text-destructive", bg: "bg-destructive/10" },
};

const sourceIcons: Record<string, React.ElementType> = {
  "Google Drive": HardDrive,
  Upload: Upload,
  URL: Globe,
};

const IngestionStatus = () => {
  const successCount = mockIngestionJobs.filter((j) => j.status === "Success").length;
  const failedCount = mockIngestionJobs.filter((j) => j.status === "Failed").length;
  const processingCount = mockIngestionJobs.filter((j) => j.status === "Processing").length;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Ingestion Status</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Monitor data source sync and processing</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2 text-xs">
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh All
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle2 className="w-4 h-4 text-success" />
            <span className="text-sm font-medium text-foreground">Successful</span>
          </div>
          <p className="text-2xl font-semibold text-foreground">{successCount}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 mb-1">
            <Loader2 className="w-4 h-4 text-warning" />
            <span className="text-sm font-medium text-foreground">Processing</span>
          </div>
          <p className="text-2xl font-semibold text-foreground">{processingCount}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 mb-1">
            <XCircle className="w-4 h-4 text-destructive" />
            <span className="text-sm font-medium text-foreground">Failed</span>
          </div>
          <p className="text-2xl font-semibold text-foreground">{failedCount}</p>
        </div>
      </div>

      {/* Jobs list */}
      <div className="border border-border rounded-xl bg-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Source</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Type</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Last Sync</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Docs Processed</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Errors</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Status</th>
              <th className="text-right text-xs font-medium text-muted-foreground px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {mockIngestionJobs.map((job) => {
              const config = statusConfig[job.status];
              const StatusIcon = config.icon;
              const SourceIcon = sourceIcons[job.sourceType] || Globe;

              return (
                <tr key={job.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-foreground">{job.source}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <SourceIcon className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{job.sourceType}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-muted-foreground">{job.lastSync}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-foreground">{job.documentsProcessed}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-sm ${job.errors > 0 ? "text-destructive font-medium" : "text-muted-foreground"}`}>
                      {job.errors}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <div className={`p-0.5 rounded ${config.bg}`}>
                        <StatusIcon className={`w-3.5 h-3.5 ${config.className}`} />
                      </div>
                      <span className="text-sm text-foreground">{job.status}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {job.status === "Failed" && (
                      <Button variant="outline" size="sm" className="text-xs h-7 gap-1.5">
                        <RefreshCw className="w-3 h-3" />
                        Retry
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IngestionStatus;
