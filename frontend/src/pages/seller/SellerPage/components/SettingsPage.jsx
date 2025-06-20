"use client"

import { useState } from "react"
import { Save, Trash2, AlertTriangle } from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    storeName: "My Awesome Store",
    storeSlug: "my-awesome-store",
    storeDescription: "Quality products at affordable prices",
    phoneNumber: "+234 801 234 5678",
    supportEmail: "support@mystore.com",
    businessAddress: "123 Business Street, Lagos, Nigeria",
    bankName: "First Bank of Nigeria",
    accountNumber: "1234567890",
    accountName: "My Store Business Account",
    notifications: true,
  })

  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleInputChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    // Save settings logic here
    alert("Settings saved successfully!")
  }

  const handleDeleteStore = () => {
    // Delete store logic here
    alert("Store deletion would be processed here")
    setShowDeleteModal(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Store Settings</h2>
        <button
          onClick={handleSave}
          className="bg-[#32cd32] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#28a428] transition-colors flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Store Information */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Store Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-zinc-300 text-sm font-medium mb-2">Store Name</label>
              <input
                type="text"
                value={settings.storeName}
                onChange={(e) => handleInputChange("storeName", e.target.value)}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-[#32cd32]"
              />
            </div>

            <div>
              <label className="block text-zinc-300 text-sm font-medium mb-2">Store URL Slug</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-zinc-700 bg-zinc-800 text-zinc-400 text-sm">
                  https://
                </span>
                <input
                  type="text"
                  value={settings.storeSlug}
                  onChange={(e) => handleInputChange("storeSlug", e.target.value)}
                  className="flex-1 px-3 py-2 bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-[#32cd32]"
                />
                <span className="inline-flex items-center px-3 rounded-r-lg border border-l-0 border-zinc-700 bg-zinc-800 text-zinc-400 text-sm">
                  .luigi.stora.com
                </span>
              </div>
            </div>

            <div>
              <label className="block text-zinc-300 text-sm font-medium mb-2">Store Description</label>
              <textarea
                value={settings.storeDescription}
                onChange={(e) => handleInputChange("storeDescription", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-[#32cd32]"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-zinc-300 text-sm font-medium mb-2">Phone Number</label>
              <input
                type="tel"
                value={settings.phoneNumber}
                onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-[#32cd32]"
              />
            </div>

            <div>
              <label className="block text-zinc-300 text-sm font-medium mb-2">Support Email</label>
              <input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => handleInputChange("supportEmail", e.target.value)}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-[#32cd32]"
              />
            </div>

            <div>
              <label className="block text-zinc-300 text-sm font-medium mb-2">Business Address</label>
              <textarea
                value={settings.businessAddress}
                onChange={(e) => handleInputChange("businessAddress", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-[#32cd32]"
              />
            </div>
          </div>
        </div>

        {/* Payout Information */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Payout Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-zinc-300 text-sm font-medium mb-2">Bank Name</label>
              <input
                type="text"
                value={settings.bankName}
                onChange={(e) => handleInputChange("bankName", e.target.value)}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-[#32cd32]"
              />
            </div>

            <div>
              <label className="block text-zinc-300 text-sm font-medium mb-2">Account Number</label>
              <input
                type="text"
                value={settings.accountNumber}
                onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-[#32cd32]"
              />
            </div>

            <div>
              <label className="block text-zinc-300 text-sm font-medium mb-2">Account Name</label>
              <input
                type="text"
                value={settings.accountName}
                onChange={(e) => handleInputChange("accountName", e.target.value)}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-[#32cd32]"
              />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-zinc-300 text-sm font-medium">Email Notifications</label>
                <p className="text-zinc-400 text-xs">Receive email notifications for new orders and updates</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) => handleInputChange("notifications", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#32cd32]"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-900/20 border border-red-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-red-400 mb-4 flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5" />
          <span>Danger Zone</span>
        </h3>
        <p className="text-zinc-300 mb-4">Once you delete your store, there is no going back. Please be certain.</p>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center space-x-2"
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete Store</span>
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-white mb-4">Confirm Store Deletion</h3>
            <p className="text-zinc-300 mb-6">
              Are you absolutely sure you want to delete your store? This action cannot be undone and will permanently
              delete all your products, orders, and customer data.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-zinc-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-zinc-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteStore}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Delete Store
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
