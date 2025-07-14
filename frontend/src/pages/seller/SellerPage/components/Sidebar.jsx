

"use client"
import { useNavigate } from "react-router-dom"
import { BarChart3, Users, Package, ShoppingCart, Palette, Settings, X, TrendingUp, Bell } from "lucide-react"

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "analytics", label: "Analytics", icon: TrendingUp },
  { id: "crm", label: "CRM", icon: Users },
  { id: "inventory", label: "Inventory", icon: Package },
  { id: "orders", label: "Orders", icon: ShoppingCart },
  
  { id: "store-editor", label: "Store Editor", icon: Palette },
  { id: "settings", label: "Settings", icon: Settings },
]

export default function Sidebar({ activeSection, setActiveSection, isOpen }) {
  const navigate = useNavigate()

  return (
    <aside
      className={`fixed top-0 left-0 h-full z-50 w-72 bg-zinc-900 text-white shadow-xl transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Mobile Close Button */}
        <div className="lg:hidden flex justify-end p-4">
          <button className="p-1 rounded-full hover:bg-zinc-800 transition-colors">
            <X className="w-6 h-6 text-zinc-400" />
          </button>
        </div>

        {/* Logo */}
        <div className="px-6 py-8">
          <h1 className="text-2xl font-bold text-[#32cd32]">Seller Hub</h1>
          <p className="text-zinc-400 text-sm mt-1">Manage your store</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 pb-8">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === "store-editor") {
                      navigate("/editor")
                    } else {
                      setActiveSection(item.id)
                    }
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-[#32cd32] text-black font-medium"
                      : "text-white hover:bg-zinc-800 hover:text-[#32cd32]"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                      {item.badge}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 mt-auto">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#32cd32] flex items-center justify-center text-black font-bold">
              S
            </div>
            <div>
              <p className="text-sm font-medium text-white">Store Owner</p>
              <p className="text-xs text-zinc-400">Premium Plan</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}