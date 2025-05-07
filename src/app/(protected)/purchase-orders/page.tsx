"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import { PurchaseOrderTable } from "@/components/purchase-orders/PurchaseOrderTable";
import { PurchaseOrder, demoPurchaseOrders } from "@/types/purchase-order";
import { toast } from "sonner";

const PurchaseOrders = () => {
  const [purchaseOrders, setPurchaseOrders] = useState(demoPurchaseOrders);

  const handlePurchaseOrderUpdate = (updatedPO: PurchaseOrder) => {
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

  const handlePurchaseOrderCreate = (newPO: PurchaseOrder) => {
    setPurchaseOrders([...purchaseOrders, newPO]);
    toast.success(`Purchase Order #${newPO.id} created successfully`);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header title="Purchase Orders" />

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
