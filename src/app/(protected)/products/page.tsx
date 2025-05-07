"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import { ProductTable } from "@/components/products/ProductTable";
import { Product, demoProducts, demoCategories, demoSuppliers } from "@/types";
import { toast } from "sonner";

export default function Page() {
  const [products, setProducts] = useState(demoProducts);

  const handleProductUpdate = (updatedProduct: Product) => {
    setProducts(
      products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    toast.success(`${updatedProduct.name} updated successfully`);
  };

  const handleProductDelete = (productId: string) => {
    const productToDelete = products.find((p) => p.id === productId);
    if (productToDelete) {
      setProducts(products.filter((product) => product.id !== productId));
      toast.success(`${productToDelete.name} deleted successfully`);
    }
  };

  const handleProductCreate = (newProduct: Product) => {
    setProducts([...products, newProduct]);
    toast.success(`${newProduct.name} added successfully`);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header title="Products" />

      <div className="flex-1 p-6 overflow-auto">
        <ProductTable
          products={products}
          categories={demoCategories}
          suppliers={demoSuppliers}
          onProductUpdate={handleProductUpdate}
          onProductDelete={handleProductDelete}
          onProductCreate={handleProductCreate}
        />
      </div>
    </div>
  );
}
