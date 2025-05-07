
import { useState } from 'react';
import { Category } from '@/types';
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
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface CategoryTableProps {
  categories: Category[];
  onCategoryUpdate: (category: Category) => void;
  onCategoryDelete: (categoryId: string) => void;
  onCategoryCreate: (category: Category) => void;
}

export const CategoryTable = ({
  categories,
  onCategoryUpdate,
  onCategoryDelete,
  onCategoryCreate,
}: CategoryTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  
  const [formState, setFormState] = useState<Partial<Category>>({
    name: '',
    description: '',
  });

  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (category: Category) => {
    setCurrentCategory(category);
    setFormState(category);
    setIsEditDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditDialogOpen && currentCategory) {
      const updatedCategory: Category = {
        ...currentCategory,
        ...formState,
        updatedAt: new Date(),
      } as Category;
      
      onCategoryUpdate(updatedCategory);
      setIsEditDialogOpen(false);
      toast.success('Category updated successfully');
    } else {
      const newCategory: Category = {
        id: `c${Date.now()}`,
        ...formState as Omit<Category, 'id' | 'createdAt' | 'updatedAt'>,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Category;
      
      onCategoryCreate(newCategory);
      setIsCreateDialogOpen(false);
      toast.success('Category created successfully');
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormState({
      name: '',
      description: '',
    });
    setCurrentCategory(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleDelete = (categoryId: string) => {
    onCategoryDelete(categoryId);
    toast.success('Category deleted successfully');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-[300px]">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No categories found
                </TableCell>
              </TableRow>
            ) : (
              filteredCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>{format(new Date(category.createdAt), 'MMM d, yyyy')}</TableCell>
                  <TableCell>{format(new Date(category.updatedAt), 'MMM d, yyyy')}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(category)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(category.id)}
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
      
      {/* Category Dialog Form (shared between Create and Edit) */}
      <Dialog open={isCreateDialogOpen || isEditDialogOpen} onOpenChange={(open) => {
        if (!open) {
          resetForm();
          setIsCreateDialogOpen(false);
          setIsEditDialogOpen(false);
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditDialogOpen ? 'Edit Category' : 'Add New Category'}</DialogTitle>
            <DialogDescription>
              {isEditDialogOpen 
                ? 'Update the category details below' 
                : 'Enter the details for the new category'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                name="name"
                value={formState.name || ''}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formState.description || ''}
                onChange={handleChange}
                required
              />
            </div>
            
            <DialogFooter>
              <Button type="submit">
                {isEditDialogOpen ? 'Update Category' : 'Add Category'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
