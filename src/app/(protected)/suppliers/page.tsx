"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import { SupplierTable } from "@/components/suppliers/SupplierTable";
import { Supplier } from "@/types";

export default function Page() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  const handleSupplierUpdate = (updatedSupplier: Supplier) => {
    setSuppliers(
      suppliers.map((supplier) =>
        supplier.id === updatedSupplier.id ? updatedSupplier : supplier
      )
    );
  };

  const handleSupplierDelete = (supplierId: string) => {
    setSuppliers(suppliers.filter((supplier) => supplier.id !== supplierId));
  };

  const handleSupplierCreate = (newSupplier: Supplier) => {
    setSuppliers([...suppliers, newSupplier]);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header title="Suppliers" />

      <div className="flex-1 p-6 overflow-auto">
        <SupplierTable
          suppliers={suppliers}
          onSupplierUpdate={handleSupplierUpdate}
          onSupplierDelete={handleSupplierDelete}
          onSupplierCreate={handleSupplierCreate}
        />
      </div>
    </div>
  );
}
