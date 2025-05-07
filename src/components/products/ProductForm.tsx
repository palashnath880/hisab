import { useState } from "react";
import { Product, Category, Supplier } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

interface ProductFormProps {
  product?: Product;
  categories: Category[];
  suppliers: Supplier[];
  onSubmit: (product: Product) => void;
}

export const ProductForm = ({
  product,
  categories,
  suppliers,
  onSubmit,
}: ProductFormProps) => {
  const [formState, setFormState] = useState<
    Omit<Product, "id" | "createdAt" | "updatedAt">
  >({
    name: product?.name || "",
    sku: product?.sku || "",
    barcode: product?.barcode || "",
    description: product?.description || "",
    price: product?.price || 0,
    cost: product?.cost || 0,
    categoryId: product?.categoryId || "",
    supplierId: product?.supplierId || "",
    quantity: product?.quantity || 0,
    image: product?.image || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Handle numeric fields
    if (name === "price" || name === "cost" || name === "quantity") {
      setFormState({
        ...formState,
        [name]: parseFloat(value) || 0,
      });
    } else {
      setFormState({
        ...formState,
        [name]: value,
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submittedProduct: Product = {
      id: product?.id || `p${Date.now()}`,
      ...formState,
      createdAt: product?.createdAt || new Date(),
      updatedAt: new Date(),
    };

    onSubmit(submittedProduct);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {/* Basic Info */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sku">SKU</Label>
              <Input
                id="sku"
                name="sku"
                value={formState.sku}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="barcode">Barcode (Optional)</Label>
              <Input
                id="barcode"
                name="barcode"
                value={formState.barcode}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formState.description}
              onChange={handleChange}
              className="min-h-[100px]"
            />
          </div>
        </div>

        {/* Pricing and Categories */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Selling Price</Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                  $
                </span>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formState.price}
                  onChange={handleChange}
                  className="pl-7"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="cost">Cost Price</Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                  $
                </span>
                <Input
                  id="cost"
                  name="cost"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formState.cost}
                  onChange={handleChange}
                  className="pl-7"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={formState.categoryId}
                onValueChange={(value) =>
                  handleSelectChange("categoryId", value)
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="supplier">Supplier</Label>
              <Select
                value={formState.supplierId}
                onValueChange={(value) =>
                  handleSelectChange("supplierId", value)
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.map((supplier) => (
                    <SelectItem key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="quantity">Initial Stock Quantity</Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              min="0"
              value={formState.quantity}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="image">Product Image URL</Label>
            <Input
              id="image"
              name="image"
              value={formState.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
            {formState.image && (
              <div className="mt-2">
                <Image
                  width={100}
                  height={100}
                  src={formState.image}
                  alt="Product Preview"
                  className="h-16 w-16 object-cover rounded-md"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit">
          {product ? "Update Product" : "Add Product"}
        </Button>
      </div>
    </form>
  );
};
