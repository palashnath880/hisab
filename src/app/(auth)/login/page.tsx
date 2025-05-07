"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { toast } = useToast();

  // This is a mock authentication function
  // In a real application, this would connect to an auth service
  const handleEmailSignIn = (e: React.FormEvent) => {
    e.preventDefault();

    // Demo authentication - in a real app this would verify credentials
    if (email && password) {
      toast({ title: "Successfully signed in!" });
      localStorage.setItem("user", JSON.stringify({ email, role: "admin" }));
    } else {
      toast({ title: "Please fill in all fields" });
    }
  };

  const handleProviderSignIn = (provider: string) => {
    // Mock provider authentication
    toast({ title: `Signed in with ${provider}!` });
    localStorage.setItem(
      "user",
      JSON.stringify({
        email:
          provider === "GitHub" ? "github@example.com" : "google@example.com",
        role: "admin",
      })
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Sign in</CardTitle>
          <CardDescription className="text-center">
            Sign in to access your inventory dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleProviderSignIn("GitHub")}
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleProviderSignIn("Google")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a10 10 0 0 1 10 10" />
                <path d="M12 12L6 6" />
                <path d="M12 12l-3 3" />
              </svg>
              Google
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              <LogIn className="mr-2 h-4 w-4" />
              Sign In with Email
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="mt-2 text-xs text-center text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
