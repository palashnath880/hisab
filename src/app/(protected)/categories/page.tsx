"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import { CategoryTable } from "@/components/categories/CategoryTable";
import { Category } from "@/types";

export default function Page() {
  const [categories, setCategories] = useState<Category[]>([]);

  const handleCategoryUpdate = (updatedCategory: Category) => {
    setCategories(
      categories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      )
    );
  };

  const handleCategoryDelete = (categoryId: string) => {
    setCategories(categories.filter((category) => category.id !== categoryId));
  };

  const handleCategoryCreate = (newCategory: Category) => {
    setCategories([...categories, newCategory]);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header title="Categories" />

      <div className="flex-1 p-6 overflow-auto">
        <CategoryTable
          categories={categories}
          onCategoryUpdate={handleCategoryUpdate}
          onCategoryDelete={handleCategoryDelete}
          onCategoryCreate={handleCategoryCreate}
        />
      </div>
    </div>
  );
}
