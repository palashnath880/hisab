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

// Demo data
export const demoProducts: Product[] = [
  {
    id: "p1",
    name: "Ergonomic Office Chair",
    sku: "CHAIR-001",
    barcode: "1234567890123",
    description: "Adjustable office chair with lumbar support",
    price: 199.99,
    cost: 120.0,
    categoryId: "c1",
    supplierId: "s1",
    quantity: 15,
    image:
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    createdAt: new Date("2023-05-10"),
    updatedAt: new Date("2023-05-10"),
  },
  {
    id: "p2",
    name: "Standing Desk",
    sku: "DESK-002",
    barcode: "2234567890123",
    description: "Adjustable height standing desk",
    price: 349.99,
    cost: 210.0,
    categoryId: "c1",
    supplierId: "s2",
    quantity: 8,
    image:
      "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    createdAt: new Date("2023-05-12"),
    updatedAt: new Date("2023-05-18"),
  },
  {
    id: "p3",
    name: "Wireless Keyboard",
    sku: "KB-003",
    barcode: "3234567890123",
    description: "Bluetooth mechanical keyboard",
    price: 89.99,
    cost: 45.0,
    categoryId: "c2",
    supplierId: "s3",
    quantity: 3,
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    createdAt: new Date("2023-05-15"),
    updatedAt: new Date("2023-05-15"),
  },
  {
    id: "p4",
    name: "Wireless Mouse",
    sku: "MOUSE-004",
    barcode: "4234567890123",
    description: "Ergonomic wireless mouse",
    price: 49.99,
    cost: 22.5,
    categoryId: "c2",
    supplierId: "s3",
    quantity: 5,
    image:
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    createdAt: new Date("2023-06-01"),
    updatedAt: new Date("2023-06-01"),
  },
  {
    id: "p5",
    name: "Monitor Stand",
    sku: "STAND-005",
    barcode: "5234567890123",
    description: "Adjustable dual monitor stand",
    price: 79.99,
    cost: 38.25,
    categoryId: "c1",
    supplierId: "s2",
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1547119957-637f8679db1e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    createdAt: new Date("2023-06-05"),
    updatedAt: new Date("2023-06-10"),
  },
];

export const demoSuppliers: Supplier[] = [
  {
    id: "s1",
    name: "Office Comfort Solutions",
    contactName: "Jane Smith",
    email: "jane@officecomfort.com",
    phone: "555-123-4567",
    address: "123 Business Ave, Suite 100, Metropolis, NY 10001",
    paymentTerms: "Net 30",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-01-15"),
  },
  {
    id: "s2",
    name: "Modern Workspace",
    contactName: "Mark Johnson",
    email: "mark@modernworkspace.com",
    phone: "555-987-6543",
    address: "456 Commerce Dr, Portland, OR 97201",
    paymentTerms: "Net 45",
    createdAt: new Date("2023-02-10"),
    updatedAt: new Date("2023-02-10"),
  },
  {
    id: "s3",
    name: "Tech Peripherals Inc",
    contactName: "Sarah Williams",
    email: "sarah@techperipherals.com",
    phone: "555-789-0123",
    address: "789 Innovation Pkwy, Austin, TX 78701",
    paymentTerms: "Net 15",
    createdAt: new Date("2023-03-05"),
    updatedAt: new Date("2023-03-05"),
  },
];

export const demoCategories: Category[] = [
  {
    id: "c1",
    name: "Furniture",
    description: "Office desks, chairs, and storage solutions",
    createdAt: new Date("2022-12-01"),
    updatedAt: new Date("2022-12-01"),
  },
  {
    id: "c2",
    name: "Electronics",
    description: "Computer peripherals and accessories",
    createdAt: new Date("2022-12-05"),
    updatedAt: new Date("2022-12-05"),
  },
  {
    id: "c3",
    name: "Office Supplies",
    description: "Paper, pens, and general office supplies",
    createdAt: new Date("2022-12-10"),
    updatedAt: new Date("2022-12-10"),
  },
];

export const demoActivities: Activity[] = [
  {
    id: "a1",
    type: "add",
    entityType: "product",
    entityId: "p1",
    entityName: "Ergonomic Office Chair",
    quantity: 5,
    userId: "u1",
    userName: "Admin User",
    timestamp: new Date("2023-05-10T10:30:00"),
  },
  {
    id: "a2",
    type: "remove",
    entityType: "product",
    entityId: "p2",
    entityName: "Standing Desk",
    quantity: 2,
    userId: "u1",
    userName: "Admin User",
    timestamp: new Date("2023-05-15T14:45:00"),
  },
  {
    id: "a3",
    type: "update",
    entityType: "product",
    entityId: "p3",
    entityName: "Wireless Keyboard",
    userId: "u1",
    userName: "Admin User",
    timestamp: new Date("2023-05-18T09:15:00"),
  },
  {
    id: "a4",
    type: "add",
    entityType: "supplier",
    entityId: "s3",
    entityName: "Tech Peripherals Inc",
    userId: "u1",
    userName: "Admin User",
    timestamp: new Date("2023-05-20T11:00:00"),
  },
  {
    id: "a5",
    type: "add",
    entityType: "product",
    entityId: "p4",
    entityName: "Wireless Mouse",
    quantity: 10,
    userId: "u1",
    userName: "Admin User",
    timestamp: new Date("2023-06-01T16:30:00"),
  },
];

// Import and re-export purchase order types
export * from "./purchase-order";
