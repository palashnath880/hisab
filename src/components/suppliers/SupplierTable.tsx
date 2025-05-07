
import { useState } from 'react';
import { Supplier } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Edit, Trash, Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface SupplierTableProps {
  suppliers: Supplier[];
  onSupplierUpdate: (supplier: Supplier) => void;
  onSupplierDelete: (supplierId: string) => void;
  onSupplierCreate: (supplier: Supplier) => void;
}

export const SupplierTable = ({
  suppliers,
  onSupplierUpdate,
  onSupplierDelete,
  onSupplierCreate,
}: SupplierTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentSupplier, setCurrentSupplier] = useState<Supplier | null>(null);
  
  const [formState, setFormState] = useState<Partial<Supplier>>({
    name: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    paymentTerms: 'Net 30',
  });

  const filteredSuppliers = suppliers.filter(supplier => 
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (supplier: Supplier) => {
    setCurrentSupplier(supplier);
    setFormState(supplier);
    setIsEditDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditDialogOpen && currentSupplier) {
      const updatedSupplier: Supplier = {
        ...currentSupplier,
        ...formState,
        updatedAt: new Date(),
      } as Supplier;
      
      onSupplierUpdate(updatedSupplier);
      setIsEditDialogOpen(false);
      toast.success('Supplier updated successfully');
    } else {
      const newSupplier: Supplier = {
        id: `s${Date.now()}`,
        ...formState as Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'>,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Supplier;
      
      onSupplierCreate(newSupplier);
      setIsCreateDialogOpen(false);
      toast.success('Supplier created successfully');
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormState({
      name: '',
      contactName: '',
      email: '',
      phone: '',
      address: '',
      paymentTerms: 'Net 30',
    });
    setCurrentSupplier(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleDelete = (supplierId: string) => {
    onSupplierDelete(supplierId);
    toast.success('Supplier deleted successfully');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-[300px]">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search suppliers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Supplier
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact Person</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Payment Terms</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSuppliers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No suppliers found
                </TableCell>
              </TableRow>
            ) : (
              filteredSuppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell className="font-medium">{supplier.name}</TableCell>
                  <TableCell>{supplier.contactName}</TableCell>
                  <TableCell>{supplier.email}</TableCell>
                  <TableCell>{supplier.phone}</TableCell>
                  <TableCell>{supplier.paymentTerms}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(supplier)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(supplier.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Supplier Dialog Form (shared between Create and Edit) */}
      <Dialog open={isCreateDialogOpen || isEditDialogOpen} onOpenChange={(open) => {
        if (!open) {
          resetForm();
          setIsCreateDialogOpen(false);
          setIsEditDialogOpen(false);
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditDialogOpen ? 'Edit Supplier' : 'Add New Supplier'}</DialogTitle>
            <DialogDescription>
              {isEditDialogOpen 
                ? 'Update the supplier details below' 
                : 'Enter the details for the new supplier'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Supplier Name</Label>
              <Input
                id="name"
                name="name"
                value={formState.name || ''}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contactName">Contact Person</Label>
                <Input
                  id="contactName"
                  name="contactName"
                  value={formState.contactName || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="paymentTerms">Payment Terms</Label>
                <Input
                  id="paymentTerms"
                  name="paymentTerms"
                  value={formState.paymentTerms || ''}
                  onChange={handleChange}
                  placeholder="Net 30"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formState.phone || ''}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={formState.address || ''}
                onChange={handleChange}
                required
              />
            </div>
            
            <DialogFooter>
              <Button type="submit">
                {isEditDialogOpen ? 'Update Supplier' : 'Add Supplier'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
