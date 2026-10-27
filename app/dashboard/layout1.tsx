"use client"
import { AppSidebar } from "@/components/dashboard/app-sidebar"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import { useRouter } from "next/navigation"; 
import { useSession } from "@/lib/betterauth/auth-client";
import { ReactNode, useEffect } from "react"; 


export default function DashboardLayout({ children }: {children: ReactNode}) {
    const router = useRouter(); 
      const { data: session, isPending } = useSession();
  
      useEffect(() => {
          if (!isPending && !session?.user) {
              router.push("/login"); 
          } 
      }, [isPending, session, router]); 
      
      if (isPending)
          return (<p className="text-center mt-8 text-black">Loading...</p>);
      if (!session?.user)
        return (<p className="text-center mt-8 text-black">Redirecting...</p>);
      
      const { user } = session;

  return (
    <>
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" user={user} />
      <SidebarInset>
        
        {children}

      </SidebarInset>
    </SidebarProvider>
    </>
  )
}
