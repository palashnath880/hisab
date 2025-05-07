"use client";

import { useState } from "react";
import { CategoryTable } from "@/components/categories/CategoryTable";
import { Category } from "@/types";

const Categories = () => {
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
};

export default Categories;
