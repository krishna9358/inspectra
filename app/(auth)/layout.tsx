import React from "react";
import { requireUnAuth } from "@/module/auth/utils/auth-utils";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
    // Redirect to dashboard if user is already logged in
    await requireUnAuth();

    return <>{children}</>;
};

export default AuthLayout;
