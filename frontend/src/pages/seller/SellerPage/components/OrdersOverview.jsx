// --- START OF FILE OrdersOverview.jsx ---

"use client"

import { ArrowRight } from "lucide-react"
import useDashboardStore from "../../../../../store/useDashboardStore";

export default function OrdersOverview() {
  // ✅ FIXED: Provide a fallback empty array `[]` to prevent crash on initial render.
  const { recentOrders, fulfillOrder } = useDashboardStore();

  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
      fulfilled: "bg-green-400/10 text-green-400 border-green-400/20",
      cancelled: "bg-red-400/10 text-red-400 border-red-400/20",
    }
    return <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusStyles[status]}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
  }

  const formatCurrency = (amount) => new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 }).format(amount || 0)
  
  return (
    <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Recent Orders</h3>
        {/* You can add a link to the full orders page here if desired */}
      </div>
      <div className="space-y-4">
        {recentOrders.length > 0 ? (
          recentOrders.map((order) => (
            <div key={order._id} className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
                <div className="font-medium text-white">#{order._id.slice(-6).toUpperCase()}</div>
                <div className="text-white">{order.customer?.fullname || 'N/A'}</div>
                <div className="font-medium text-white">{formatCurrency(order.totalAmount)}</div>
                <div>{getStatusBadge(order.status)}</div>
                <div className="flex justify-end">
                  {order.status === "pending" ? (
                    <button
                      onClick={() => fulfillOrder(order._id)}
                      className="bg-[#32cd32] text-black px-3 py-1 rounded text-sm font-medium hover:bg-opacity-90 transition-colors"
                    >
                      Mark as Fulfilled
                    </button>
                  ) : (
                    <button className="text-[#32cd32] hover:underline text-sm flex items-center">
                      View Details <ArrowRight className="w-3 h-3 ml-1" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-zinc-400">No recent orders to display.</div>
        )}
      </div>
    </div>
  )
}