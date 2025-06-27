"use client"

import { AlertTriangle, TrendingUp, TrendingDown, DollarSign, RotateCcw } from "lucide-react"

// Dummy data for analytics
const inventoryAnalyticsData = {
  totalStockValue: 342500,
  turnoverRate: 1.3,
  lowStockProducts: [
    { name: "Wig Cap", stock: 3 },
    { name: "Hair Brush", stock: 2 },
    { name: "Edge Control", stock: 5 },
  ],
  fastMovers: [
    { name: "Edge Control", unitsSold: 32, badge: "🔥 Fast Seller" },
    { name: "Wig Cap", unitsSold: 28, badge: "🔥 Fast Seller" },
    { name: "Hair Oil", unitsSold: 24, badge: "🔥 Fast Seller" },
    { name: "Shampoo", unitsSold: 18, badge: "🔥 Fast Seller" },
  ],
  deadStock: [
    { name: "Hair Serum", stock: 15, daysSinceLastSale: 45 },
    { name: "Styling Gel", stock: 8, daysSinceLastSale: 32 },
  ],
}

export default function InventoryAnalytics() {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white">Inventory Analytics</h3>

      {/* Top Row - Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Total Stock Value */}
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-[#32cd32]/10">
              <DollarSign className="w-6 h-6 text-[#32cd32]" />
            </div>
          </div>
          <h4 className="text-zinc-400 text-sm font-medium mb-2">Total Stock Value</h4>
          <p className="text-2xl font-bold text-[#32cd32]">{formatCurrency(inventoryAnalyticsData.totalStockValue)}</p>
          <p className="text-zinc-500 text-xs mt-1">Current inventory worth</p>
        </div>

        {/* Inventory Turnover Rate */}
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-blue-400/10">
              <RotateCcw className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <h4 className="text-zinc-400 text-sm font-medium mb-2">Turnover Rate</h4>
          <p className="text-2xl font-bold text-blue-400">{inventoryAnalyticsData.turnoverRate}x</p>
          <p className="text-zinc-500 text-xs mt-1">Last 30 days</p>
        </div>

        {/* Low Stock Alert Count */}
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-yellow-400/10">
              <AlertTriangle className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
          <h4 className="text-zinc-400 text-sm font-medium mb-2">Low Stock Items</h4>
          <p className="text-2xl font-bold text-yellow-400">{inventoryAnalyticsData.lowStockProducts.length}</p>
          <p className="text-zinc-500 text-xs mt-1">Need restocking</p>
        </div>
      </div>

      {/* Bottom Row - Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Low Stock Products */}
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mr-2" />
            <h4 className="font-semibold text-white">Low Stock</h4>
          </div>
          <div className="space-y-3">
            {inventoryAnalyticsData.lowStockProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-white text-sm">{product.name}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-400 font-medium">{product.stock}</span>
                  <div className="w-16 bg-zinc-700 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: `${(product.stock / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 bg-yellow-400/10 hover:bg-yellow-400/20 text-yellow-400 py-2 rounded-lg text-sm font-medium transition-colors">
            Restock Items
          </button>
        </div>

        {/* Fast-Moving Products */}
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-5 h-5 text-[#32cd32] mr-2" />
            <h4 className="font-semibold text-white">Fast Movers</h4>
          </div>
          <div className="space-y-3">
            {inventoryAnalyticsData.fastMovers.map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-white text-sm">{product.name}</span>
                  <span className="text-xs">🔥</span>
                </div>
                <span className="text-[#32cd32] font-medium">{product.unitsSold} sold</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 bg-[#32cd32]/10 hover:bg-[#32cd32]/20 text-[#32cd32] py-2 rounded-lg text-sm font-medium transition-colors">
            View Sales Report
          </button>
        </div>

        {/* Dead Stock */}
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
          <div className="flex items-center mb-4">
            <TrendingDown className="w-5 h-5 text-red-400 mr-2" />
            <h4 className="font-semibold text-white">Dead Stock</h4>
          </div>
          <div className="space-y-3">
            {inventoryAnalyticsData.deadStock.length > 0 ? (
              inventoryAnalyticsData.deadStock.map((product, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm">{product.name}</span>
                    <span className="text-red-400 font-medium">{product.stock} units</span>
                  </div>
                  <p className="text-zinc-500 text-xs">No sales for {product.daysSinceLastSale} days</p>
                </div>
              ))
            ) : (
              <p className="text-zinc-400 text-sm">No dead stock found</p>
            )}
          </div>
          {inventoryAnalyticsData.deadStock.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-zinc-400 text-xs">Consider discounting or promoting these products</p>
              <button className="w-full bg-red-400/10 hover:bg-red-400/20 text-red-400 py-2 rounded-lg text-sm font-medium transition-colors">
                Create Discount Campaign
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
