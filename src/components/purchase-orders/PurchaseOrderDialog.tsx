
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PurchaseOrder, PurchaseOrderItem, PurchaseOrderStatus } from '@/types/purchase-order';
import { demoSuppliers } from '@/types';
import { format } from 'date-fns';

interface PurchaseOrderDialogProps {
  open: boolean;
  onClose: () => void;
  purchaseOrder: PurchaseOrder | null;
  onSave: (po: PurchaseOrder) => void;
  onDelete: (poId: string) => void;
}

export const PurchaseOrderDialog = ({
  open,
  onClose,
  purchaseOrder,
  onSave,
  onDelete
}: PurchaseOrderDialogProps) => {
  const isNew = !purchaseOrder;
  const [formData, setFormData] = useState<Partial<PurchaseOrder>>(
    purchaseOrder || {
      id: `po${Date.now()}`,
      supplierId: '',
      supplierName: '',
      status: 'draft' as PurchaseOrderStatus,
      orderDate: new Date(),
      items: [],
      totalAmount: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  );

  useEffect(() => {
    if (purchaseOrder) {
      setFormData(purchaseOrder);
    }
  }, [purchaseOrder]);

  const handleSupplierChange = (supplierId: string) => {
    const supplier = demoSuppliers.find(s => s.id === supplierId);
    if (supplier) {
      setFormData({
        ...formData,
        supplierId,
        supplierName: supplier.name
      });
    }
  };

  const handleStatusChange = (status: PurchaseOrderStatus) => {
    setFormData({
      ...formData,
      status,
      updatedAt: new Date()
    });
  };

  const handleSave = () => {
    if (formData.supplierId && formData.items && formData.items.length > 0) {
      onSave(formData as PurchaseOrder);
      onClose();
    }
  };

  const handleDelete = () => {
    if (purchaseOrder && purchaseOrder.id) {
      onDelete(purchaseOrder.id);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {isNew ? 'Create Purchase Order' : `Edit Purchase Order #${purchaseOrder?.id}`}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Supplier</label>
            <Select
              value={formData.supplierId}
              onValueChange={handleSupplierChange}
              disabled={!isNew}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select supplier" />
              </SelectTrigger>
              <SelectContent>
                {demoSuppliers.map(supplier => (
                  <SelectItem key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleStatusChange(value as PurchaseOrderStatus)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="ordered">Ordered</SelectItem>
                <SelectItem value="received">Received</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Order Date</label>
            <Input 
              type="date" 
              value={formData.orderDate ? format(new Date(formData.orderDate), 'yyyy-MM-dd') : ''} 
              onChange={(e) => setFormData({...formData, orderDate: new Date(e.target.value)})}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Expected Delivery Date</label>
            <Input 
              type="date" 
              value={formData.expectedDeliveryDate ? format(new Date(formData.expectedDeliveryDate), 'yyyy-MM-dd') : ''} 
              onChange={(e) => setFormData({...formData, expectedDeliveryDate: new Date(e.target.value)})}
            />
          </div>
          
          <div className="col-span-2 space-y-2">
            <label className="text-sm font-medium">Notes</label>
            <Textarea 
              value={formData.notes || ''} 
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Add any notes about this purchase order"
            />
          </div>
        </div>

        <p className="text-sm text-muted-foreground mt-2">
          {isNew 
            ? "Items can be added after creating the purchase order." 
            : `Total Amount: $${formData.totalAmount?.toFixed(2)}`
          }
        </p>
        
        <DialogFooter>
          {!isNew && (
            <Button variant="destructive" onClick={handleDelete} className="mr-auto">
              Delete
            </Button>
          )}
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {isNew ? 'Create' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
