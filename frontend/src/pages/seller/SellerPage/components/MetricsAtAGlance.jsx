// --- START OF FILE MetricsAtAGlance.jsx ---

"use client"

import { useEffect } from "react"
import { TrendingUp, ShoppingBag, Users, Clock, Loader2 } from "lucide-react"
import useDashboardStore from "../../../../../store/useDashboardStore";

export default function MetricsAtAGlance() {
  const {
    analytics,
    isLoading,
    setTimeframe,
    timeframe,
    fetchInitialDashboard,
  } = useDashboardStore();

  useEffect(() => {
    fetchInitialDashboard();
  }, [fetchInitialDashboard]);

  useEffect(() => {
    if (timeframe) {
      useDashboardStore.getState().fetchAnalytics();
    }
  }, [timeframe]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount || 0);
  };

  const totalCustomers =
    analytics?.customerData?.newVsReturning.reduce(
      (acc, curr) => acc + curr.value,
      0
    ) ?? "0";

  const metricCards = [
    {
      title: "Total Sales",
      value: formatCurrency(analytics?.totalSales),
      icon: TrendingUp,
      color: "text-[#32cd32]",
      bgColor: "bg-[#32cd32]/10",
    },
    {
      title: "Total Orders",
      value: analytics?.totalOrders ?? "0",
      icon: ShoppingBag,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
    {
      title: "Total Customers",
      value: totalCustomers,
      icon: Users,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
    },
    {
      title: "Avg. Fulfillment",
      value: `${analytics?.fulfillmentData?.averageTime ?? "N/A"} days`,
      icon: Clock,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
    },
  ];

  return (
    <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold">Metrics at a Glance</h2>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="bg-zinc-800 border border-zinc-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#32cd32]"
          disabled={isLoading}
        >
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="90">Last 90 Days</option>
        </select>
      </div>

      {isLoading && !analytics ? (
        <div className="flex justify-center items-center h-24">
          <Loader2 className="w-6 h-6 animate-spin text-[#32cd32]" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metricCards.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className="bg-zinc-800 rounded-xl p-4 border border-zinc-700"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                    <Icon className={`w-5 h-5 ${metric.color}`} />
                  </div>
                  <h3 className="text-zinc-300 text-sm font-medium">
                    {metric.title}
                  </h3>
                </div>
                <p
                  className="text-2xl font-bold text-white truncate"
                  title={String(metric.value)}
                >
                  {metric.value}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
