"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  Store,
  FolderTree,
  ClipboardList,
  ShoppingCart,
  UserRound,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  name: string;
  href: string;
  icon: React.ReactNode;
  isImplemented?: boolean;
};

const Sidebar = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems: NavItem[] = [
    {
      name: "Dashboard",
      href: "/",
      icon: <LayoutDashboard size={20} />,
      isImplemented: true,
    },
    {
      name: "Products",
      href: "/products",
      icon: <Package size={20} />,
      isImplemented: true,
    },
    {
      name: "Suppliers",
      href: "/suppliers",
      icon: <Store size={20} />,
      isImplemented: true,
    },
    {
      name: "Categories",
      href: "/categories",
      icon: <FolderTree size={20} />,
      isImplemented: true,
    },
    {
      name: "Purchase Orders",
      href: "/purchase-orders",
      icon: <ClipboardList size={20} />,
      isImplemented: true,
    },
    {
      name: "Sales Orders",
      href: "/sales-orders",
      icon: <ShoppingCart size={20} />,
    },
    { name: "Users", href: "/users", icon: <UserRound size={20} /> },
    { name: "Settings", href: "/settings", icon: <Settings size={20} /> },
  ];

  return (
    <aside
      className={cn(
        "bg-sidebar border-r border-border h-screen flex flex-col transition-all duration-300",
        isCollapsed ? "w-[70px]" : "w-[250px]"
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-border">
        <h2 className="text-lg font-semibold tracking-tight">
          {!isCollapsed && "Hisab"}
        </h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto"
        >
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </Button>
      </div>

      <div className="flex flex-col gap-2 p-2 flex-1 overflow-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.isImplemented ? item.href : "#"}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground font-medium"
                  : "hover:bg-accent hover:text-accent-foreground",
                !item.isImplemented && "opacity-50 pointer-events-none"
              )}
            >
              {item.icon}
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </div>

      <Separator />

      <div className="p-4">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              AU
            </div>
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@example.com</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
