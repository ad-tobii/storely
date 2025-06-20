// --- START OF FILE CRMSection.jsx ---

"use client"
import { useState, useEffect, useCallback } from "react"
import { Search, MessageCircle, Eye, Loader2 } from "lucide-react"
import useDashboardStore from "../../../../../store/useDashboardStore";

export default function CRMSection() {
  const { customers, fetchCustomers, isLoading } = useDashboardStore();
  const [searchTerm, setSearchTerm] = useState("");

  const stableFetch = useCallback(() => {
    if (!customers) {
      fetchCustomers();
    }
  }, [customers, fetchCustomers]);
  
  useEffect(() => {
    stableFetch();
  }, [stableFetch]);

  // ✅ FIXED: Provide a fallback empty array `[]`
  const filteredCustomers = (customers || []).filter((customer) => 
    customer.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading && customers === null) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="w-6 h-6 animate-spin text-[#32cd32]" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
        <h2 className="text-2xl font-bold mb-6">Customer Management</h2>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
          <input type="text" placeholder="Search customers..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 p-2 bg-zinc-800 rounded-lg border border-zinc-700" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-zinc-700 text-sm text-zinc-400"><tr><th className="p-4">Name</th><th className="p-4">Email</th><th className="p-4">Actions</th></tr></thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer._id} className="border-b border-zinc-800">
                  <td className="p-4 font-medium text-white">{customer.fullname}</td>
                  <td className="p-4 text-zinc-300">{customer.email}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <button className="flex items-center space-x-1 text-blue-400 hover:underline text-sm"><Eye className="w-4 h-4" /><span>View History</span></button>
                      <button className="flex items-center space-x-1 text-green-400 hover:underline text-sm"><MessageCircle className="w-4 h-4" /><span>Message</span></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}