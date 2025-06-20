"use client"

import { useEffect } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  Area,
  AreaChart,
} from "recharts"
import {
  TrendingUp,
  ShoppingCart,
  Eye,
  Users,
  ShoppingBag,
  BarChart2,
  DollarSign,
  Loader2,
  TrendingDown,
} from "lucide-react"
import useDashboardStore from "../../../../../store/useDashboardStore"

export default function AnalyticsPage() {
  const { analytics, setTimeframe, timeframe, isLoading, fetchAnalytics } = useDashboardStore()

  useEffect(() => {
    fetchAnalytics()
  }, [timeframe, fetchAnalytics])

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount || 0)

  const getSummaryText = () => {
    if (!analytics) return "Loading summary..."
    const { totalSales, totalOrders, topProducts } = analytics
    const topProduct = topProducts?.[0]
    return `In the last ${timeframe} days, you made ${formatCurrency(totalSales)} from ${totalOrders} orders. Your top product was '${topProduct?.name || "N/A"}'.`
  }

  // This data is a simplified trend. A real implementation would require daily snapshots from the backend.
  const salesTrendData = analytics
    ? [
        { date: `-${timeframe}d`, sales: Math.max(0, analytics.totalSales * 0.7) },
        { date: `-${Math.floor(timeframe * 0.8)}d`, sales: Math.max(0, analytics.totalSales * 0.8) },
        { date: `-${Math.floor(timeframe * 0.6)}d`, sales: Math.max(0, analytics.totalSales * 0.6) },
        { date: `-${Math.floor(timeframe * 0.4)}d`, sales: Math.max(0, analytics.totalSales * 0.9) },
        { date: `-${Math.floor(timeframe * 0.2)}d`, sales: Math.max(0, analytics.totalSales * 0.85) },
        { date: "Today", sales: analytics.totalSales },
      ]
    : []

  const trafficData = analytics?.trafficData
    ? [
        { name: "Visitors", value: analytics.trafficData.totalVisits },
        { name: "Orders", value: analytics.totalOrders },
      ]
    : []

  const chartConfig = {
    tooltip: {
      contentStyle: {
        backgroundColor: "#18181b",
        border: "1px solid #3f3f46",
        borderRadius: "8px",
        color: "#ffffff",
      },
    },
    grid: {
      stroke: "#3f3f46",
      strokeDasharray: "3 3",
    },
    axis: {
      stroke: "#71717a",
      fontSize: 12,
    },
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
          Analytics Dashboard
        </h2>
        <div className="flex gap-2">
          {["7", "30", "90"].map((days) => (
            <button
              key={days}
              onClick={() => setTimeframe(days)}
              disabled={isLoading}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                timeframe === days
                  ? "bg-gradient-to-r from-emerald-500 to-emerald-400 text-black shadow-lg shadow-emerald-500/25"
                  : "bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700"
              } disabled:opacity-50`}
            >
              {days} days
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
        </div>
      ) : !analytics ? (
        <div className="text-center py-12 text-zinc-400">No analytics data available for this period.</div>
      ) : (
        <>
          {/* Performance Summary */}
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-xl border border-zinc-700 p-6 shadow-xl">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-emerald-400" />
              Performance Summary
            </h3>
            <p className="text-zinc-300 leading-relaxed">{getSummaryText()}</p>
          </div>

          {/* Sales Trends */}
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-xl border border-zinc-700 p-6 shadow-xl">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-blue-400" />
              Sales Trends
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesTrendData}>
                  <defs>
                    <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid {...chartConfig.grid} />
                  <XAxis dataKey="date" {...chartConfig.axis} />
                  <YAxis {...chartConfig.axis} tickFormatter={formatCurrency} />
                  <Tooltip {...chartConfig.tooltip} formatter={(value) => [formatCurrency(value), "Sales"]} />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#10b981"
                    strokeWidth={3}
                    fill="url(#salesGradient)"
                    dot={{ fill: "#10b981", r: 4 }}
                    activeDot={{ r: 6, fill: "#10b981" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Products + Customers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Products */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-xl border border-zinc-700 p-6 shadow-xl">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <ShoppingBag className="w-5 h-5 mr-2 text-purple-400" />
                Top Products by Units Sold
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={analytics.topProducts || []}
                    layout="vertical"
                    margin={{ top: 5, right: 20, left: 60, bottom: 5 }}
                  >
                    <CartesianGrid {...chartConfig.grid} />
                    <XAxis type="number" {...chartConfig.axis} />
                    <YAxis
                      type="category"
                      dataKey="name"
                      {...chartConfig.axis}
                      tick={{ fontSize: 11, width: 100, textAnchor: "end" }}
                      width={80}
                    />
                    <Tooltip {...chartConfig.tooltip} formatter={(value) => [`${value} units`, "Sold"]} />
                    <Bar dataKey="sold" fill="url(#barGradient)" radius={[0, 6, 6, 0]} />
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* New vs Returning */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-xl border border-zinc-700 p-6 shadow-xl">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-green-400" />
                New vs. Returning Customers
              </h3>
              <div className="h-64 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analytics.customerData?.newVsReturning || []}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="value"
                      nameKey="name"
                      paddingAngle={2}
                    >
                      {(analytics.customerData?.newVsReturning || []).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip {...chartConfig.tooltip} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center bg-zinc-800/50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-emerald-400">{formatCurrency(analytics.aov)}</div>
                  <div className="text-zinc-400 text-sm">Avg. Order Value</div>
                </div>
                <div className="text-center bg-zinc-800/50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-emerald-400">
                    {formatCurrency(analytics.customerData?.avgCustomerSpend)}
                  </div>
                  <div className="text-zinc-400 text-sm">Avg. Customer Spend</div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Abandoned Cart Rate */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-xl border border-zinc-700 p-6 shadow-xl">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <ShoppingCart className="w-5 h-5 mr-2 text-orange-400" />
                Abandoned Cart Rate
              </h3>
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-orange-400">{analytics.abandonmentData?.rate || 0}%</div>
                <div className="text-zinc-400 text-sm">In the last {timeframe} days</div>
              </div>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analytics.abandonmentData?.trend || []}>
                    <Line
                      type="monotone"
                      dataKey="rate"
                      stroke="#fb923c"
                      strokeWidth={2}
                      dot={{ fill: "#fb923c", r: 3 }}
                    />
                    <XAxis dataKey="date" {...chartConfig.axis} />
                    <Tooltip {...chartConfig.tooltip} formatter={(value) => [`${value.toFixed(1)}%`, "Abandonment Rate"]} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Product Bounce Rate */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-xl border border-zinc-700 p-6 shadow-xl">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <TrendingDown className="w-5 h-5 mr-2 text-red-400" />
                Highest Product Bounce Rates
              </h3>
              {analytics.bounceRateData && analytics.bounceRateData.length > 0 ? (
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analytics.bounceRateData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid {...chartConfig.grid} />
                      <XAxis type="number" {...chartConfig.axis} domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                      <YAxis type="category" dataKey="name" {...chartConfig.axis} width={80} tick={{ fontSize: 10, textAnchor: 'end' }} />
                      <Tooltip {...chartConfig.tooltip} formatter={(value) => [`${value.toFixed(1)}%`, "Bounce Rate"]} />
                      <Bar dataKey="rate" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={20} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-48 flex items-center justify-center text-center text-zinc-500">
                  Not enough data from logged-in users to calculate bounce rates.
                </div>
              )}
              <p className="text-xs text-zinc-500 mt-2 text-center">Note: Calculated for logged-in users only. A bounce is a product view with no further interaction within 30 minutes.</p>
            </div>

            {/* Traffic & Conversion */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-xl border border-zinc-700 p-6 shadow-xl">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <BarChart2 className="w-5 h-5 mr-2 text-cyan-400" />
                Store Traffic & Conversion
              </h3>
              <div className="grid grid-cols-1 gap-3 mb-4">
                <div className="bg-zinc-800/50 rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-white">{analytics.trafficData?.totalVisits || 0}</div>
                  <div className="text-zinc-400 text-xs">Total Visits</div>
                </div>
                <div className="bg-zinc-800/50 rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-cyan-400">{analytics.trafficData?.conversionRate || 0}%</div>
                  <div className="text-zinc-400 text-xs">Conversion Rate</div>
                </div>
              </div>
              <div className="h-24">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trafficData}>
                    <Bar dataKey="value" fill="#22d3ee" radius={[2, 2, 0, 0]} />
                    <XAxis dataKey="name" {...chartConfig.axis} tick={{ fontSize: 10 }} />
                    <Tooltip {...chartConfig.tooltip} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Top 5 Viewed but Not Bought */}
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-xl border border-zinc-700 p-6 shadow-xl">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Eye className="w-5 h-5 mr-2 text-yellow-400" />
              Top 5 Viewed but Not Bought
            </h3>
            {analytics.viewedNotBought?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                      {analytics.viewedNotBought.map((product) => (
                      <div key={product._id} className="flex items-center justify-between bg-zinc-800/50 rounded-lg p-3">
                          <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: product.color }} />
                          <span className="text-sm font-medium text-white truncate">{product.name}</span>
                          </div>
                          <span className="text-sm text-zinc-400 font-mono">{product.views.toLocaleString()} views</span>
                      </div>
                      ))}
                  </div>
                  <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                          <Pie
                            data={analytics.viewedNotBought}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            dataKey="views"
                            nameKey="name"
                          >
                          {analytics.viewedNotBought.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                          </Pie>
                          <Tooltip
                            {...chartConfig.tooltip}
                            formatter={(value) => [`${value.toLocaleString()} views`, "Views"]}
                          />
                      </PieChart>
                      </ResponsiveContainer>
                  </div>
                </div>
            ) : (
                <div className="text-center py-10 text-zinc-400">
                    Not enough product view data to show this metric.
                </div>
            )}
            </div>
        </>
      )}
    </div>
  )
}