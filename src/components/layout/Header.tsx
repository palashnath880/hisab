"use client";

import { Bell, Moon, Search, Sun } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useTheme } from "@/hooks/use-theme";

/**
 * Header component
 * @returns
 */
export default function Header() {
  // use theme hook
  const { setTheme, theme } = useTheme();

  // toggle theme function
  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <header className="border-b border-border h-16 px-6 flex items-center justify-between">
      <h1 className="text-2xl font-semibold">{""}</h1>

      <div className="flex items-center space-x-4">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-8" />
        </div>

        <Button variant="outline" size="icon" onClick={toggleTheme}>
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </Button>

        <Button variant="outline" size="icon" className="relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs h-5 w-5 flex items-center justify-center rounded-full">
            3
          </span>
        </Button>
      </div>
    </header>
  );
}
