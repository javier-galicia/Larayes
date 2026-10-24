"use client"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { ChartAreaInteractive } from "@/components/dashboard/chart-area-interactive"
import { DataTable } from "@/components/dashboard/data-table"
import { SectionCards } from "@/components/dashboard/section-cards"
import { SiteHeader } from "@/components/dashboard/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import { useRouter } from "next/navigation"; 
import { useSession } from "@/lib/betterauth/auth-client";
import { useEffect } from "react"; 

import data from "./data.json";

export default function Page() {
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
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
