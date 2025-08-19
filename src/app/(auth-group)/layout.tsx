import UserProvider from "@/components/contexts/user-context";
import Header from "@/components/header/header";
import getUserFromCookies from "@/lib/helper";
import { redirect } from "next/navigation";
import { ReactNode, Suspense } from "react";

// Add loading component for Suspense boundary
function AuthLoading() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                <p className="mt-4">Loading...</p>
            </div>
        </div>
    );
}

// Separate the auth logic into its own component
async function AuthenticatedLayout({ children }: { children: ReactNode }) {
    const user = await getUserFromCookies();
    
    if (!user) {
        redirect("/login");
    }
    
    return (
        <UserProvider user={user}>
            <Header />
            {children}
        </UserProvider>
    );
}

// Main layout with Suspense boundary
export default function Layout({ children }: { children: ReactNode }) {
    return (
        <Suspense fallback={<AuthLoading />}>
            <AuthenticatedLayout>
                {children}
            </AuthenticatedLayout>
        </Suspense>
    );
}