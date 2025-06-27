// --- START OF FILE CRMSection.jsx ---

"use client"
import { useState, useEffect, useCallback } from "react"
import { Search, Eye, Loader2, ChevronDown, ChevronUp, User, ShoppingCart } from "lucide-react"
import useDashboardStore from "../../../../../store/useDashboardStore";
import MarketingSection from "./MarketingSection"; // Import the marketing component
import CustomerDetailView from "./CustomerDetailView"; // Import the detail view component

export default function CRMSection() {
  const { customers, fetchCustomers, isLoading } = useDashboardStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState('customers');
  const [expandedCustomerId, setExpandedCustomerId] = useState(null);

  const stableFetch = useCallback(() => {
    if (!customers) {
      fetchCustomers();
    }
  }, [customers, fetchCustomers]);
  
  useEffect(() => {
    stableFetch();
  }, [stableFetch]);

  const filteredCustomers = (customers || []).filter((customer) => 
    customer.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleCustomerDetails = (customerId) => {
    setExpandedCustomerId(expandedCustomerId === customerId ? null : customerId);
  };
  
  const formatCurrency = (amount) => new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(amount || 0);

  const renderCustomerTab = () => {
    if (isLoading && customers === null) {
      return <div className="flex justify-center items-center h-64"><Loader2 className="w-6 h-6 animate-spin text-[#32cd32]" /></div>;
    }
    return (
      <>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
          <input type="text" placeholder="Search customers by name or email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 p-2 bg-zinc-800 rounded-lg border border-zinc-700" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-zinc-700 text-sm text-zinc-400">
                <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Orders</th>
                    <th className="p-4">Total Spent</th>
                    <th className="p-4">Joined</th>
                    <th className="p-4">Actions</th>
                </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <>
                  <tr key={customer._id} className="border-b border-zinc-800 hover:bg-zinc-800/50 cursor-pointer" onClick={() => toggleCustomerDetails(customer._id)}>
                    <td className="p-4 font-medium text-white">{customer.fullname}</td>
                    <td className="p-4 text-zinc-300">{customer.email}</td>
                    <td className="p-4 text-zinc-300">{customer.orderCount}</td>
                    <td className="p-4 text-zinc-300">{formatCurrency(customer.totalSpent)}</td>
                    <td className="p-4 text-zinc-300">{new Date(customer.createdAt).toLocaleDateString()}</td>
                    <td className="p-4">
                        <button className="flex items-center space-x-1 text-blue-400 hover:underline text-sm">
                            {expandedCustomerId === customer._id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            <span>Details</span>
                        </button>
                    </td>
                  </tr>
                  {expandedCustomerId === customer._id && (
                    <tr className="bg-zinc-900">
                      <td colSpan="6" className="p-0">
                        <CustomerDetailView customerId={customer._id} />
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
        <h2 className="text-2xl font-bold mb-6">Customer Relationship Management</h2>
        
        {/* Tab Navigation */}
        <div className="flex border-b border-zinc-700 mb-6">
            <button 
                onClick={() => setActiveTab('customers')}
                className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors ${activeTab === 'customers' ? 'text-[#32cd32] border-b-2 border-[#32cd32]' : 'text-zinc-400 hover:text-white'}`}
            >
                <User className="w-4 h-4" /> Customers
            </button>
             <button 
                onClick={() => setActiveTab('marketing')}
                className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors ${activeTab === 'marketing' ? 'text-[#32cd32] border-b-2 border-[#32cd32]' : 'text-zinc-400 hover:text-white'}`}
            >
                <ShoppingCart className="w-4 h-4" /> Marketing
            </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'customers' ? renderCustomerTab() : <MarketingSection />}
      </div>
    </div>
  )
}