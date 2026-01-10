"use client";
import { GalleryVerticalEnd } from "lucide-react";
import { LoginForm } from "./login-form";

const LoginUI = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="bg-muted relative hidden lg:block">
        <div className="absolute inset-0 flex items-center justify-center h-full w-full bg-gradient-to-br from-primary/10 via-muted to-background">
          <blockquote className="text-2xl md:text-3xl font-light italic text-center text-primary-foreground/90 max-w-xl mx-auto px-8 drop-shadow-lg">
            "Empower your potential—unlock tomorrow with AI today."
          </blockquote>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <div className="flex justify-center gap-2 md:justify-center p-4">
              <a href="#" className="flex items-center gap-2 font-medium">
                <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                Inspectra
              </a>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginUI;
