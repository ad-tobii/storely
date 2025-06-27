"use client"

import { useState } from "react"
import { Bell, Check, Trash2, AlertCircle, Package, ShoppingCart, Users } from "lucide-react"

const notificationsData = [
  {
    id: 1,
    type: "order",
    title: "New Order Received",
    message: "Order #ORD-007 from John Doe for ₦25,000",
    time: "2 minutes ago",
    read: false,
    icon: ShoppingCart,
    color: "text-[#32cd32]",
  },
  {
    id: 2,
    type: "inventory",
    title: "Low Stock Alert",
    message: "Wig Cap is running low (3 units remaining)",
    time: "1 hour ago",
    read: false,
    icon: Package,
    color: "text-yellow-400",
  },
  {
    id: 3,
    type: "customer",
    title: "New Customer Registration",
    message: "Sarah Johnson just created an account",
    time: "3 hours ago",
    read: true,
    icon: Users,
    color: "text-blue-400",
  },
  {
    id: 4,
    type: "order",
    title: "Order Fulfilled",
    message: "Order #ORD-005 has been marked as fulfilled",
    time: "5 hours ago",
    read: true,
    icon: Check,
    color: "text-green-400",
  },
  {
    id: 5,
    type: "inventory",
    title: "Stock Alert",
    message: "Hair Oil is out of stock",
    time: "1 day ago",
    read: false,
    icon: AlertCircle,
    color: "text-red-400",
  },
  {
    id: 6,
    type: "order",
    title: "Order Cancelled",
    message: "Order #ORD-003 was cancelled by customer",
    time: "2 days ago",
    read: true,
    icon: ShoppingCart,
    color: "text-red-400",
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(notificationsData)
  const [filter, setFilter] = useState("all")

  const markAsRead = (id) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })))
  }

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id))
  }

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "all") return true
    if (filter === "unread") return !notif.read
    return notif.type === filter
  })

  const unreadCount = notifications.filter((notif) => !notif.read).length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <Bell className="w-6 h-6 mr-2 text-[#32cd32]" />
            Notifications
          </h2>
          <p className="text-zinc-400 text-sm mt-1">
            {unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up!"}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={markAllAsRead}
            className="bg-[#32cd32] text-black px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors text-sm"
          >
            Mark All Read
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4">
        <div className="flex flex-wrap gap-2">
          {[
            { key: "all", label: "All" },
            { key: "unread", label: "Unread" },
            { key: "order", label: "Orders" },
            { key: "inventory", label: "Inventory" },
            { key: "customer", label: "Customers" },
          ].map((filterOption) => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                filter === filterOption.key ? "bg-[#32cd32] text-black" : "bg-zinc-800 text-white hover:bg-zinc-700"
              }`}
            >
              {filterOption.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
        {filteredNotifications.length > 0 ? (
          <div className="divide-y divide-zinc-800">
            {filteredNotifications.map((notification) => {
              const Icon = notification.icon
              return (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-zinc-800 transition-colors ${
                    !notification.read ? "bg-zinc-850 border-l-4 border-[#32cd32]" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className={`p-2 rounded-lg bg-zinc-800 ${notification.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-white">{notification.title}</h3>
                          {!notification.read && <span className="w-2 h-2 bg-[#32cd32] rounded-full"></span>}
                        </div>
                        <p className="text-zinc-400 text-sm">{notification.message}</p>
                        <p className="text-zinc-500 text-xs mt-1">{notification.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-1 rounded-full hover:bg-zinc-700 transition-colors"
                          title="Mark as read"
                        >
                          <Check className="w-4 h-4 text-zinc-400" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-1 rounded-full hover:bg-zinc-700 transition-colors"
                        title="Delete notification"
                      >
                        <Trash2 className="w-4 h-4 text-zinc-400" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="p-8 text-center">
            <Bell className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No notifications</h3>
            <p className="text-zinc-400">You're all caught up! Check back later for updates.</p>
          </div>
        )}
      </div>
    </div>
  )
}
