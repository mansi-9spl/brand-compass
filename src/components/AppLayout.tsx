import { useState } from "react";
import { Outlet } from "react-router-dom";
import AppSidebar from "@/components/AppSidebar";
import TopBar from "@/components/TopBar";
import { brands, type Brand } from "@/lib/mock-data";

const AppLayout = () => {
  const [selectedBrand, setSelectedBrand] = useState<Brand>(brands[0]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <AppSidebar
        selectedBrand={selectedBrand}
        onBrandChange={setSelectedBrand}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar selectedBrand={selectedBrand} />
        <main className="flex-1 overflow-y-auto">
          <Outlet context={{ selectedBrand }} />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
