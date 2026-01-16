"use client";

import React from "react";
import { LoginForm } from "@/module/auth/components/login-form";
import Link from "next/link";
import { Rabbit, Github } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Inline CustomLoginForm 
function CustomLoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGithubLogin = async () => {
    setIsLoading(true);
    try {
      await signIn.social({
        provider: "github",
        callbackURL: "/dashboard"
      })
    } catch (error) {
      console.log("Login Error ==> ", error)
      toast.error("Failed to login with GitHub");
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-4">
      <Button
        variant="outline"
        className="h-14 px-6 justify-between border-border/40 hover:bg-muted/50 hover:text-primary transition-all group"
        onClick={handleGithubLogin}
        disabled={isLoading}
      >
        <div className="flex items-center gap-3">
          <Github className="size-5 group-hover:text-primary transition-colors" />
          <span className="font-mono text-base">GitHub</span>
        </div>
        <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground/50 border border-muted-foreground/20 px-1.5 py-0.5 rounded">
          Cloud
        </span>
      </Button>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground flex overflow-hidden">
      {/* Left Side - Hero Content */}
      <div className="hidden lg:flex flex-1 flex-col justify-between p-12 lg:p-16 relative">
        {/* Logo */}
        <Link href="/">
        <div className="flex items-center gap-2">
          <div className="size-8 bg-primary rounded-full flex items-center justify-center">
            {/* Placeholder for Inspectra Logo */}
            <span className="font-bold text-primary-foreground">I</span>
          </div>
          <span className="text-xl font-bold tracking-tight">Inspectra</span>
        </div>
        </Link>

        {/* Hero Text */}
        <div className="max-w-2xl z-10 mt-20">
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            Cut Code Review <br />
            Time & Bugs in <span className="text-primary">Half.</span> <br />
            Instantly.
          </h1>
          <p className="text-xl text-muted-foreground max-w-lg leading-relaxed font-mono">
            Supercharge your team to ship faster with the most advanced AI code reviews.
          </p>
        </div>

        {/* Background Texture */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-background via-background/0 to-transparent pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>

        <div />
      </div>

      {/* Right Side - Login */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-card/50 lg:bg-transparent border-l border-border/10 backdrop-blur-sm z-20">
        <div className="lg:hidden absolute top-8 left-8 flex items-center gap-2 mb-12">
          <Link href="/">

          <div className="size-8 bg-primary rounded-full flex items-center justify-center">
            <span className="font-bold text-primary-foreground">I</span>
          </div>
          <span className="text-xl font-bold tracking-tight">Inspectra</span>
          </Link  >
        </div>

        <div className="w-full max-w-md space-y-8 relative p-10">
          {/* Camera Focus Corners */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/50" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/50" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/50" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/50" />

          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-primary">Welcome Back</h2>
            <p className="text-muted-foreground">Login using one of the following providers:</p>
          </div>

          <div className="mt-8">
            <CustomLoginForm />
          </div>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">New to Inspectra? </span>
            <Link href="/signup" className="text-primary hover:underline font-medium">
              Sign Up
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 text-center px-4 w-full max-w-md mx-auto">
          <p className="text-xs text-muted-foreground">
            By continuing, you agree to the <Link href="/terms" className="text-primary hover:underline">Terms of Use</Link> and <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> applicable to Inspectra.
          </p>
        </div>
      </div>
    </div>
  );
}