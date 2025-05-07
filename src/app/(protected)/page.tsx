"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { LowStockAlerts } from "@/components/dashboard/LowStockAlerts";
import { demoCategories, Product } from "@/types";
import { Package, DollarSign, TrendingUp, Store } from "lucide-react";

export default function Page() {
  const [products] = useState<Product[]>([]);
  const [activities] = useState([]);

  // Calculate stats
  const totalProducts = products.length;
  const totalInventoryValue = products.reduce(
    (sum, product) => sum + product.cost * product.quantity,
    0
  );
  const totalCategories = demoCategories.length;

  // Calculate low stock items
  const lowStockItems = products.filter(
    (product) => product.quantity <= 5
  ).length;

  return (
    <div className="flex flex-col h-screen">
      <Header title="Dashboard" />

      <div className="flex-1 p-6 overflow-auto">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatsCard
            title="Total Products"
            value={totalProducts}
            icon={<Package size={24} />}
          />
          <StatsCard
            title="Total Inventory Value"
            value={`$${totalInventoryValue.toFixed(2)}`}
            icon={<DollarSign size={24} />}
            trend={{ value: 12.5, isPositive: true }}
          />
          <StatsCard
            title="Low Stock Items"
            value={lowStockItems}
            icon={<TrendingUp size={24} />}
            className={
              lowStockItems > 0 ? "border-destructive/20 bg-destructive/10" : ""
            }
          />
          <StatsCard
            title="Categories"
            value={totalCategories}
            icon={<Store size={24} />}
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Recent Activity Feed */}
            <RecentActivity activities={activities} />
          </div>
          <div>
            {/* Low Stock Alerts */}
            <LowStockAlerts products={products} threshold={5} />
          </div>
        </div>
      </div>
    </div>
  );
}
