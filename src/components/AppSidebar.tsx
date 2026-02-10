import { MessageSquare, FileText, Activity, Settings } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import BrandSelector from "@/components/BrandSelector";
import { type Brand } from "@/lib/mock-data";

interface AppSidebarProps {
  selectedBrand: Brand;
  onBrandChange: (brand: Brand) => void;
  isAdmin?: boolean;
}

const navItems = [
  { title: "Knowledge Chat", path: "/", icon: MessageSquare },
  { title: "Documents", path: "/documents", icon: FileText },
  { title: "Ingestion Status", path: "/ingestion", icon: Activity },
];

const AppSidebar = ({ selectedBrand, onBrandChange, isAdmin = true }: AppSidebarProps) => {
  return (
    <aside className="w-64 h-screen bg-sidebar border-r border-sidebar-border flex flex-col shrink-0">
      {/* Brand Selector */}
      <div className="p-3 border-b border-sidebar-border">
        <BrandSelector selectedBrand={selectedBrand} onBrandChange={onBrandChange} />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-0.5">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-sidebar-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            activeClassName="bg-accent text-accent-foreground"
          >
            <item.icon className="w-[18px] h-[18px]" />
            <span>{item.title}</span>
          </NavLink>
        ))}
        {isAdmin && (
          <NavLink
            to="/admin"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-sidebar-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            activeClassName="bg-accent text-accent-foreground"
          >
            <Settings className="w-[18px] h-[18px]" />
            <span>Admin</span>
          </NavLink>
        )}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border">
        <div className="flex items-center gap-2 px-1">
          <div className="w-2 h-2 rounded-full bg-success" />
          <span className="text-xs text-sidebar-muted">System healthy</span>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
