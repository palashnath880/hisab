
export type PurchaseOrderStatus = "draft" | "ordered" | "received" | "cancelled";

export interface PurchaseOrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface PurchaseOrder {
  id: string;
  supplierId: string;
  supplierName: string;
  status: PurchaseOrderStatus;
  orderDate: Date;
  expectedDeliveryDate?: Date;
  receivedDate?: Date;
  items: PurchaseOrderItem[];
  totalAmount: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Demo purchase orders
export const demoPurchaseOrders: PurchaseOrder[] = [
  {
    id: "po1",
    supplierId: "s1",
    supplierName: "Office Comfort Solutions",
    status: "draft",
    orderDate: new Date("2023-06-15"),
    expectedDeliveryDate: new Date("2023-06-25"),
    items: [
      {
        id: "poi1",
        productId: "p1",
        productName: "Ergonomic Office Chair",
        quantity: 10,
        unitPrice: 120.00,
        subtotal: 1200.00
      },
      {
        id: "poi2",
        productId: "p5",
        productName: "Monitor Stand",
        quantity: 15,
        unitPrice: 38.25,
        subtotal: 573.75
      }
    ],
    totalAmount: 1773.75,
    notes: "Regular office furniture restock",
    createdAt: new Date("2023-06-15"),
    updatedAt: new Date("2023-06-15")
  },
  {
    id: "po2",
    supplierId: "s3",
    supplierName: "Tech Peripherals Inc",
    status: "ordered",
    orderDate: new Date("2023-06-18"),
    expectedDeliveryDate: new Date("2023-06-28"),
    items: [
      {
        id: "poi3",
        productId: "p3",
        productName: "Wireless Keyboard",
        quantity: 25,
        unitPrice: 45.00,
        subtotal: 1125.00
      },
      {
        id: "poi4",
        productId: "p4",
        productName: "Wireless Mouse",
        quantity: 25,
        unitPrice: 22.50,
        subtotal: 562.50
      }
    ],
    totalAmount: 1687.50,
    notes: "Quarterly tech peripherals restock",
    createdAt: new Date("2023-06-18"),
    updatedAt: new Date("2023-06-18")
  },
  {
    id: "po3",
    supplierId: "s2",
    supplierName: "Modern Workspace",
    status: "received",
    orderDate: new Date("2023-06-01"),
    expectedDeliveryDate: new Date("2023-06-10"),
    receivedDate: new Date("2023-06-08"),
    items: [
      {
        id: "poi5",
        productId: "p2",
        productName: "Standing Desk",
        quantity: 5,
        unitPrice: 210.00,
        subtotal: 1050.00
      }
    ],
    totalAmount: 1050.00,
    notes: "Priority order for new office expansion",
    createdAt: new Date("2023-06-01"),
    updatedAt: new Date("2023-06-08")
  }
];
