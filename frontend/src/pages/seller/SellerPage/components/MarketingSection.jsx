"use client"

import { useState } from "react"
import { Plus, Edit, Send, X, ImageIcon, Users } from "lucide-react"

// Sample data
const initialEmailLists = [
  { id: 1, name: "Newsletter Subscribers", customers: 145 },
  { id: 2, name: "Abandoned Cart", customers: 37 },
  { id: 3, name: "Repeat Customers", customers: 89 },
]

const initialSmsLists = [
  { id: 1, name: "Flash Sale Alerts", customers: 78 },
  { id: 2, name: "New Arrivals", customers: 56 },
]

export default function MarketingSection() {
  const [activeTab, setActiveTab] = useState("email")
  const [emailLists, setEmailLists] = useState(initialEmailLists)
  const [smsLists, setSmsLists] = useState(initialSmsLists)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showSendModal, setShowSendModal] = useState(false)
  const [selectedList, setSelectedList] = useState(null)
  const [newListName, setNewListName] = useState("")
  const [messageContent, setMessageContent] = useState("")

  const handleCreateList = () => {
    if (!newListName.trim()) return

    const newList = {
      id: Date.now(),
      name: newListName,
      customers: 0,
    }

    if (activeTab === "email") {
      setEmailLists([...emailLists, newList])
    } else {
      setSmsLists([...smsLists, newList])
    }

    setNewListName("")
    setShowCreateModal(false)
  }

  const handleSendMessage = () => {
    // In a real app, this would send the message to the selected list
    console.log(`Sending message to ${selectedList.name}:`, messageContent)
    setMessageContent("")
    setShowSendModal(false)
    setSelectedList(null)
  }

  const openSendModal = (list) => {
    setSelectedList(list)
    setShowSendModal(true)
  }

  return (
    <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Marketing</h2>

        {/* Tabs */}
        <div className="flex border-b border-zinc-800 mb-6">
          <button
            className={`px-4 py-2 font-medium text-sm transition-colors relative ${
              activeTab === "email" ? "text-[#32cd32]" : "text-zinc-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("email")}
          >
            Email Lists
            {activeTab === "email" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#32cd32]"></span>}
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm transition-colors relative ${
              activeTab === "sms" ? "text-[#32cd32]" : "text-zinc-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("sms")}
          >
            SMS Lists
            {activeTab === "sms" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#32cd32]"></span>}
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">
              {activeTab === "email" ? "Email Marketing Lists" : "SMS Marketing Lists"}
            </h3>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center space-x-1 bg-[#32cd32] hover:bg-opacity-90 text-black px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Create List</span>
            </button>
          </div>

          {/* Lists */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {(activeTab === "email" ? emailLists : smsLists).map((list) => (
              <div
                key={list.id}
                className="bg-zinc-800 rounded-lg p-4 border border-zinc-700 hover:border-[#32cd32] transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium text-white">{list.name}</h4>
                  <div className="flex space-x-1">
                    <button className="p-1 rounded hover:bg-zinc-700 transition-colors">
                      <Edit className="w-4 h-4 text-zinc-400" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center text-sm text-zinc-400 mb-4">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{list.customers} customers</span>
                </div>
                <button
                  onClick={() => openSendModal(list)}
                  className="w-full flex items-center justify-center space-x-1 bg-zinc-700 hover:bg-zinc-600 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Send {activeTab === "email" ? "Email" : "SMS"}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create List Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-xl max-w-md w-full p-6 border border-zinc-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Create New List</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">List Name</label>
                <input
                  type="text"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  placeholder="Enter list name"
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-[#32cd32]"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateList}
                  className="px-4 py-2 bg-[#32cd32] hover:bg-opacity-90 text-black rounded-lg font-medium transition-colors"
                >
                  Create List
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Send Message Modal */}
      {showSendModal && selectedList && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-xl max-w-2xl w-full p-6 border border-zinc-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                Send {activeTab === "email" ? "Email" : "SMS"} to {selectedList.name}
              </h3>
              <button onClick={() => setShowSendModal(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="Enter subject"
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-[#32cd32]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Message</label>
                <textarea
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  placeholder={`Write your ${activeTab === "email" ? "email" : "SMS"} content here...`}
                  rows={6}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-[#32cd32]"
                ></textarea>
              </div>
              {activeTab === "email" && (
                <div>
                  <button className="flex items-center space-x-2 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-sm transition-colors">
                    <ImageIcon className="w-4 h-4" />
                    <span>Attach Image</span>
                  </button>
                </div>
              )}
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowSendModal(false)}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-[#32cd32] hover:bg-opacity-90 text-black rounded-lg font-medium transition-colors flex items-center space-x-1"
                >
                  <Send className="w-4 h-4" />
                  <span>Send {activeTab === "email" ? "Email" : "SMS"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
