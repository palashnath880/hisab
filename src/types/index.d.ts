export interface Product {
  id: string;
  name: string;
  sku: string;
  barcode?: string;
  description: string;
  price: number;
  cost: number;
  categoryId: string;
  supplierId: string;
  quantity: number;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Supplier {
  id: string;
  name: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  paymentTerms: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Activity {
  id: string;
  type: "add" | "remove" | "update" | "delete";
  entityType: "product" | "supplier" | "category" | "stock";
  entityId: string;
  entityName: string;
  quantity?: number;
  userId: string;
  userName: string;
  timestamp: Date;
}

export type UserRole = "admin" | "manager" | "staff";
