// --- START OF FILE seller-dashboard.jsx ---

"use client"

import { useState, useEffect, useCallback } from "react"
import Sidebar from "./components/Sidebar"
import MetricsAtAGlance from "./components/MetricsAtAGlance"
import OrdersOverview from "./components/OrdersOverview"
import CRMSection from "./components/CRMSection"
import InventorySection from "./components/InventorySection"
import OrdersPage from "./components/OrdersPage"
import StoreEditor from "./components/StoreEditor"
import SettingsPage from "./components/SettingsPage"
import AnalyticsPage from "./components/AnalyticsPage"

import { Menu, Loader2 } from "lucide-react"
import useDashboardStore from "../../../../store/useDashboardStore"

export default function SellerDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const { fetchInitialDashboard, isLoadingMetrics, error } = useDashboardStore();

  const stableFetch = useCallback(() => {
    fetchInitialDashboard();
  }, [fetchInitialDashboard]);

  useEffect(() => {
    stableFetch();
    const checkScreenSize = () => { setIsMobile(window.innerWidth < 1024); if (window.innerWidth >= 1024) setSidebarOpen(false); };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [stableFetch]);

  const renderContent = () => {
    if (isLoadingMetrics) {
      return <div className="flex justify-center items-center h-96"><Loader2 className="w-8 h-8 animate-spin text-[#32cd32]" /><p className="ml-4 text-lg">Loading Dashboard...</p></div>;
    }
    if (error) {
        return <div className="text-center text-red-400 p-8 bg-red-900/20 rounded-lg"><h3 className="text-xl font-bold mb-2">Error Loading Dashboard</h3><p>{error}</p></div>;
    }

    switch (activeSection) {
      case "dashboard": return <div className="space-y-6"><MetricsAtAGlance /><OrdersOverview /></div>;
      case "analytics": return <AnalyticsPage />;
      case "crm": return <CRMSection />;
      case "inventory": return <InventorySection />;
      case "orders": return <OrdersPage />;
      
      case "store-editor": return <StoreEditor />;
      case "settings": return <SettingsPage />;
      default: return <div>Select a section</div>;
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-zinc-900 border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-zinc-800 transition-colors"><Menu className="w-6 h-6 text-white" /></button>
        <h1 className="text-xl font-bold text-[#32cd32]">Seller Hub</h1>
        <div className="w-10"></div>
      </header>
      {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>}
      <Sidebar activeSection={activeSection} setActiveSection={(section) => { setActiveSection(section); if (isMobile) setSidebarOpen(false); }} isOpen={sidebarOpen} />
      <main className="pt-16 lg:pt-0 lg:pl-72 transition-all duration-300">
        <div className="max-w-7xl mx-auto p-4 md:p-6">{renderContent()}</div>
      </main>
    </div>
  )
}