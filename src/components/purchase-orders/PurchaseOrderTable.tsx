import { useState } from "react";
import { PurchaseOrder, PurchaseOrderStatus } from "@/types/purchase-order";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { format } from "date-fns";
import { PurchaseOrderDialog } from "./PurchaseOrderDialog";

interface PurchaseOrderTableProps {
  purchaseOrders: PurchaseOrder[];
  onPurchaseOrderUpdate: (po: PurchaseOrder) => void;
  onPurchaseOrderDelete: (poId: string) => void;
  onPurchaseOrderCreate: (po: PurchaseOrder) => void;
}

export const PurchaseOrderTable = ({
  purchaseOrders,
  onPurchaseOrderUpdate,
  onPurchaseOrderDelete,
  onPurchaseOrderCreate,
}: PurchaseOrderTableProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPO, setCurrentPO] = useState<PurchaseOrder | null>(null);

  const handleOpenDialog = (po?: PurchaseOrder) => {
    setCurrentPO(po || null);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setCurrentPO(null);
  };

  const getStatusBadgeColor = (status: PurchaseOrderStatus) => {
    switch (status) {
      case "draft":
        return "bg-gray-500";
      case "ordered":
        return "bg-blue-500";
      case "received":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Purchase Orders</h2>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          New Purchase Order
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>PO #</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Expected Delivery</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchaseOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  No purchase orders found
                </TableCell>
              </TableRow>
            ) : (
              purchaseOrders.map((po) => (
                <TableRow key={po.id}>
                  <TableCell>{po.id}</TableCell>
                  <TableCell>{po.supplierName}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(po.status)}>
                      {po.status.charAt(0).toUpperCase() + po.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {format(new Date(po.orderDate), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell>
                    {po.expectedDeliveryDate
                      ? format(
                          new Date(po.expectedDeliveryDate),
                          "MMM dd, yyyy"
                        )
                      : "Not set"}
                  </TableCell>
                  <TableCell>${po.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenDialog(po)}
                    >
                      View / Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {isDialogOpen && (
        <PurchaseOrderDialog
          open={isDialogOpen}
          onClose={handleCloseDialog}
          purchaseOrder={currentPO}
          onSave={currentPO ? onPurchaseOrderUpdate : onPurchaseOrderCreate}
          onDelete={onPurchaseOrderDelete}
        />
      )}
    </div>
  );
};
