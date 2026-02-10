import { useState } from "react";
import { ChevronDown, Search, Building2 } from "lucide-react";
import { brands, type Brand } from "@/lib/mock-data";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface BrandSelectorProps {
  selectedBrand: Brand;
  onBrandChange: (brand: Brand) => void;
}

const BrandSelector = ({ selectedBrand, onBrandChange }: BrandSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = brands.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-accent transition-colors text-left">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-primary-foreground text-sm font-semibold shrink-0"
            style={{ backgroundColor: selectedBrand.color }}
          >
            {selectedBrand.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{selectedBrand.name}</p>
            <p className="text-xs text-sidebar-muted">{selectedBrand.documentsCount} documents</p>
          </div>
          <ChevronDown className="w-4 h-4 text-sidebar-muted shrink-0" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0 bg-popover border border-border shadow-lg z-50" align="start" sideOffset={4}>
        <div className="p-2 border-b border-border">
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-secondary">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              className="flex-1 text-sm bg-transparent outline-none placeholder:text-muted-foreground"
              placeholder="Search brands..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="p-1 max-h-64 overflow-y-auto scrollbar-thin">
          {filtered.map((brand) => (
            <button
              key={brand.id}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors ${
                brand.id === selectedBrand.id
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-secondary text-foreground"
              }`}
              onClick={() => {
                onBrandChange(brand);
                setOpen(false);
                setSearch("");
              }}
            >
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center text-primary-foreground text-xs font-semibold"
                style={{ backgroundColor: brand.color }}
              >
                {brand.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{brand.name}</p>
                <p className="text-xs text-muted-foreground">{brand.documentsCount} docs</p>
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="px-3 py-6 text-center text-sm text-muted-foreground">
              <Building2 className="w-8 h-8 mx-auto mb-2 opacity-40" />
              No brands found
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default BrandSelector;
