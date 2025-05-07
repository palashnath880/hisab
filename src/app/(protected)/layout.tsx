import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="w-full h-full flex flex-col">
        <div className="flex-1 flex">
          <Sidebar />
          <main className="flex-1 overflow-auto">
            <div className="min-h-full flex flex-col">
              <div className="flex-1 px-2 py-3">{children}</div>
              <Footer />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
