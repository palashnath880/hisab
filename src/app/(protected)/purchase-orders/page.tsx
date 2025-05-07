"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { PurchaseOrderTable } from "@/components/purchase-orders/PurchaseOrderTable";
import { toast } from "sonner";

const PurchaseOrders = () => {
  const [purchaseOrders, setPurchaseOrders] = useState<any[]>([]);

  const handlePurchaseOrderUpdate = (updatedPO: any) => {
    setPurchaseOrders(
      purchaseOrders.map((po) => (po.id === updatedPO.id ? updatedPO : po))
    );
    toast.success(`Purchase Order #${updatedPO.id} updated successfully`);
  };

  const handlePurchaseOrderDelete = (poId: string) => {
    const poToDelete = purchaseOrders.find((po) => po.id === poId);
    if (poToDelete) {
      setPurchaseOrders(purchaseOrders.filter((po) => po.id !== poId));
      toast.success(`Purchase Order #${poId} deleted successfully`);
    }
  };

  const handlePurchaseOrderCreate = (newPO: any) => {
    setPurchaseOrders([...purchaseOrders, newPO]);
    toast.success(`Purchase Order #${newPO.id} created successfully`);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 p-6 overflow-auto">
        <PurchaseOrderTable
          purchaseOrders={purchaseOrders}
          onPurchaseOrderUpdate={handlePurchaseOrderUpdate}
          onPurchaseOrderDelete={handlePurchaseOrderDelete}
          onPurchaseOrderCreate={handlePurchaseOrderCreate}
        />
      </div>
    </div>
  );
};

export default PurchaseOrders;
