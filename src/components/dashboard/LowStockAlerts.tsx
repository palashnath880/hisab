"use client";

import { Product } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import Link from "next/link";

interface LowStockAlertsProps {
  products: Product[];
  threshold?: number;
}

export const LowStockAlerts = ({
  products,
  threshold = 5,
}: LowStockAlertsProps) => {
  const [enableNotifications, setEnableNotifications] = useState(true);
  const lowStockProducts = products
    .filter((product) => product.quantity <= threshold)
    .sort((a, b) => a.quantity - b.quantity);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Low Stock Alerts</CardTitle>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted-foreground">Notifications</span>
          <Switch
            checked={enableNotifications}
            onCheckedChange={setEnableNotifications}
          />
          <Link href="/products">
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {lowStockProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Package size={40} className="text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              No low stock items found
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {lowStockProducts.map((product) => (
              <Alert
                key={product.id}
                variant={product.quantity === 0 ? "destructive" : "default"}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <AlertDescription>
                      <span className="font-medium">{product.name}</span>
                      <span className="text-muted-foreground ml-2">
                        SKU: {product.sku}
                      </span>
                    </AlertDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-semibold ${
                        product.quantity === 0 ? "text-destructive" : ""
                      }`}
                    >
                      {product.quantity}{" "}
                      {product.quantity === 1 ? "unit" : "units"}
                    </span>
                    <Link href="/purchase-orders">
                      <Button size="sm" variant="outline">
                        Restock
                      </Button>
                    </Link>
                  </div>
                </div>
              </Alert>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
