// --- START OF FILE OrdersPage.jsx ---

"use client"

import { useState, useEffect, useCallback } from "react";
import { Search, Eye, Filter, Loader2 } from "lucide-react";
import useDashboardStore from "../../../../../store/useDashboardStore";

export default function OrdersPage() {
  const { orders, fetchOrders, isLoading, fulfillOrder } = useDashboardStore();
  
  const stableFetch = useCallback(() => {
    if (!orders) {
      fetchOrders();
    }
  }, [orders, fetchOrders]);

  useEffect(() => {
    stableFetch();
  }, [stableFetch]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const formatCurrency = (amount) => new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(amount || 0);
  const getStatusBadge = (status) => {
    const styles = { pending: "bg-yellow-400/10 text-yellow-400", fulfilled: "bg-green-400/10 text-green-400", cancelled: "bg-red-400/10 text-red-400" };
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>{status}</span>;
  }

  // ✅ FIXED: Provide a fallback empty array `[]`
  const filteredOrders = (orders || []).filter(order => {
    const customerName = order.customer?.fullname || '';
    return customerName.toLowerCase().includes(searchTerm.toLowerCase()) && (statusFilter === 'all' || order.status === statusFilter);
  });

  if (isLoading && orders === null) {
      return <div className="flex justify-center items-center h-64"><Loader2 className="w-6 h-6 animate-spin text-[#32cd32]" /></div>;
  }

  return (
    <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
      <h2 className="text-2xl font-bold mb-6">All Orders</h2>
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
          <input type="text" placeholder="Search by customer..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-zinc-800 border border-zinc-700 p-2 rounded-lg">
          <option value="all">All Status</option><option value="pending">Pending</option><option value="fulfilled">Fulfilled</option><option value="cancelled">Cancelled</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-zinc-700 text-sm text-zinc-400"><tr><th className="p-4">Order ID</th><th className="p-4">Customer</th><th className="p-4">Date</th><th className="p-4">Total</th><th className="p-4">Status</th><th className="p-4">Actions</th></tr></thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id} className="border-b border-zinc-800">
                <td className="p-4 font-medium text-white">#{order._id.slice(-6).toUpperCase()}</td>
                <td className="p-4 text-white">{order.customer?.fullname}</td>
                <td className="p-4 text-zinc-300">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="p-4 text-white">{formatCurrency(order.totalAmount)}</td>
                <td className="p-4">{getStatusBadge(order.status)}</td>
                <td className="p-4">{order.status === 'pending' && <button onClick={() => fulfillOrder(order._id)} className="bg-[#32cd32] text-black px-3 py-1 rounded text-sm font-medium">Fulfill</button>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}