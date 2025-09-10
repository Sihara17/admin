"use client"

import { useState } from "react"
import { AdminDashboard } from "@/components/dashboard/admin-dashboard"
import { SalesDashboard } from "@/components/dashboard/sales-dashboard"
import { FinanceDashboard } from "@/components/dashboard/finance-dashboard"
import { Header } from "@/components/layout/header"

export default function Dashboard() {
  const [role, setRole] = useState("admin")

  const renderDashboard = () => {
    switch (role) {
      case "admin":
        return <AdminDashboard />
      case "sales":
        return <SalesDashboard />
      case "finance":
        return <FinanceDashboard />
      default:
        return <AdminDashboard />
    }
  }

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="flex flex-col gap-4">
        <Header role={role} setRole={setRole} />
        <div className="mt-4">
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome back, Jane!
          </h1>
          <p className="text-muted-foreground">
            Here&apos;s a summary of what&apos;s happening in your inventory system.
          </p>
        </div>
        <div className="mt-2">
          {renderDashboard()}
        </div>
      </div>
    </main>
  )
}
