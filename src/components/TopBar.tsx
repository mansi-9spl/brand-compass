import { Upload, User } from "lucide-react";
import { type Brand } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

interface TopBarProps {
  selectedBrand: Brand;
  pageTitle?: string;
}

const TopBar = ({ selectedBrand, pageTitle }: TopBarProps) => {
  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-3">
        <div
          className="w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: selectedBrand.color }}
        />
        <h1 className="text-sm font-semibold text-foreground">{selectedBrand.name}</h1>
        {pageTitle && (
          <>
            <span className="text-muted-foreground">/</span>
            <span className="text-sm text-muted-foreground">{pageTitle}</span>
          </>
        )}
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" className="gap-2 text-xs">
          <Upload className="w-3.5 h-3.5" />
          Upload Files
        </Button>
        <div className="h-6 w-px bg-border" />
        <div className="flex items-center gap-2.5">
          <div className="text-right">
            <p className="text-sm font-medium text-foreground leading-none">Sarah Chen</p>
            <p className="text-xs text-muted-foreground mt-0.5">Admin</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
