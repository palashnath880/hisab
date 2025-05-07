/* eslint-disable @typescript-eslint/no-explicit-any */

interface PurchaseOrderDialogProps {
  open: boolean;
  onClose: () => void;
  purchaseOrder: any | null;
  onSave: (po: any) => void;
  onDelete: (poId: string) => void;
}

export const PurchaseOrderDialog = ({}: PurchaseOrderDialogProps) => {
  return <></>;

  // return (
  //   <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
  //     <DialogContent className="max-w-3xl">
  //       <DialogHeader>
  //         <DialogTitle>
  //           {isNew
  //             ? "Create Purchase Order"
  //             : `Edit Purchase Order #${purchaseOrder?.id}`}
  //         </DialogTitle>
  //       </DialogHeader>

  //       <div className="grid grid-cols-2 gap-4 py-4">
  //         <div className="space-y-2">
  //           <label className="text-sm font-medium">Supplier</label>
  //           <Select
  //             value={formData.supplierId}
  //             onValueChange={handleSupplierChange}
  //             disabled={!isNew}
  //           >
  //             <SelectTrigger>
  //               <SelectValue placeholder="Select supplier" />
  //             </SelectTrigger>
  //             <SelectContent>
  //               {demoSuppliers.map((supplier) => (
  //                 <SelectItem key={supplier.id} value={supplier.id}>
  //                   {supplier.name}
  //                 </SelectItem>
  //               ))}
  //             </SelectContent>
  //           </Select>
  //         </div>

  //         <div className="space-y-2">
  //           <label className="text-sm font-medium">Status</label>
  //           <Select
  //             value={formData.status}
  //             onValueChange={(value) => handleStatusChange(value)}
  //           >
  //             <SelectTrigger>
  //               <SelectValue />
  //             </SelectTrigger>
  //             <SelectContent>
  //               <SelectItem value="draft">Draft</SelectItem>
  //               <SelectItem value="ordered">Ordered</SelectItem>
  //               <SelectItem value="received">Received</SelectItem>
  //               <SelectItem value="cancelled">Cancelled</SelectItem>
  //             </SelectContent>
  //           </Select>
  //         </div>

  //         <div className="space-y-2">
  //           <label className="text-sm font-medium">Order Date</label>
  //           <Input
  //             type="date"
  //             value={
  //               formData.orderDate
  //                 ? format(new Date(formData.orderDate), "yyyy-MM-dd")
  //                 : ""
  //             }
  //             onChange={(e) =>
  //               setFormData({
  //                 ...formData,
  //                 orderDate: new Date(e.target.value),
  //               })
  //             }
  //           />
  //         </div>

  //         <div className="space-y-2">
  //           <label className="text-sm font-medium">
  //             Expected Delivery Date
  //           </label>
  //           <Input
  //             type="date"
  //             value={
  //               formData.expectedDeliveryDate
  //                 ? format(
  //                     new Date(formData.expectedDeliveryDate),
  //                     "yyyy-MM-dd"
  //                   )
  //                 : ""
  //             }
  //             onChange={(e) =>
  //               setFormData({
  //                 ...formData,
  //                 expectedDeliveryDate: new Date(e.target.value),
  //               })
  //             }
  //           />
  //         </div>

  //         <div className="col-span-2 space-y-2">
  //           <label className="text-sm font-medium">Notes</label>
  //           <Textarea
  //             value={formData.notes || ""}
  //             onChange={(e) =>
  //               setFormData({ ...formData, notes: e.target.value })
  //             }
  //             placeholder="Add any notes about this purchase order"
  //           />
  //         </div>
  //       </div>

  //       <p className="text-sm text-muted-foreground mt-2">
  //         {isNew
  //           ? "Items can be added after creating the purchase order."
  //           : `Total Amount: $${formData.totalAmount?.toFixed(2)}`}
  //       </p>

  //       <DialogFooter>
  //         {!isNew && (
  //           <Button
  //             variant="destructive"
  //             onClick={handleDelete}
  //             className="mr-auto"
  //           >
  //             Delete
  //           </Button>
  //         )}
  //         <Button variant="outline" onClick={onClose}>
  //           Cancel
  //         </Button>
  //         <Button onClick={handleSave}>
  //           {isNew ? "Create" : "Save Changes"}
  //         </Button>
  //       </DialogFooter>
  //     </DialogContent>
  //   </Dialog>
  // );
};
