// --- START OF FILE MarketingSection.jsx ---

"use client"
import { useState, useEffect } from "react"
import { Plus, Edit, Send, X, Users, Trash2, UserPlus, Loader2 } from "lucide-react"
import useDashboardStore from "../../../../../store/useDashboardStore";
import AddCustomersModal from './AddCustomersModal';

export default function MarketingSection() {
  const { 
    emailLists, 
    fetchEmailLists, 
    createEmailList, 
    deleteEmailList, 
    addCustomersToList,
    sendEmailToList, 
    isLoading 
  } = useDashboardStore();

  const [activeTab, setActiveTab] = useState("email")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showSendModal, setShowSendModal] = useState(false)
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  
  const [selectedList, setSelectedList] = useState(null)
  const [newListName, setNewListName] = useState("")
  const [messageContent, setMessageContent] = useState({ subject: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (emailLists === null) {
      fetchEmailLists();
    }
  }, [emailLists, fetchEmailLists]);

  const handleCreateList = async () => {
    if (!newListName.trim()) return;
    setIsSubmitting(true);
    try {
        await createEmailList(newListName.trim());
        setNewListName("");
        setShowCreateModal(false);
    } catch (error) {
        alert('Failed to create list.');
    } finally {
        setIsSubmitting(false);
    }
  }

  const handleDeleteList = async (listId) => {
    if (window.confirm("Are you sure you want to delete this list? This cannot be undone.")) {
        try {
            await deleteEmailList(listId);
        } catch (error) {
            alert('Failed to delete list.');
        }
    }
  }
  
  const handleAddCustomers = async (customerIds) => {
    if (!selectedList) return;
    try {
        await addCustomersToList(selectedList._id, customerIds);
    } catch (error) {
        alert('Failed to add customers.');
    }
  };

  const handleSendMessage = async () => {
    setIsSubmitting(true);
    try {
        await sendEmailToList(selectedList._id, messageContent);
        alert('Email campaign sent successfully!');
        setMessageContent({ subject: '', message: '' });
        setShowSendModal(false);
    } catch (error) {
        alert(error.response?.data?.message || 'Failed to send email campaign.');
    } finally {
        setIsSubmitting(false);
    }
  }

  const openSendModal = (list) => {
    setSelectedList(list);
    setShowSendModal(true);
  }
  
  const openAddCustomerModal = (list) => {
    setSelectedList(list);
    setShowAddCustomerModal(true);
  };

  if (isLoading && emailLists === null) {
    return <div className="p-8 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-[#32cd32]" /></div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">
          {activeTab === "email" ? "Email Marketing Lists" : "SMS Marketing Lists (Coming Soon)"}
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
        {(emailLists || []).map((list) => (
          <div
            key={list._id}
            className="bg-zinc-800 rounded-lg p-4 border border-zinc-700 flex flex-col justify-between"
          >
            <div>
                <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium text-white">{list.name}</h4>
                    <button onClick={() => handleDeleteList(list._id)} className="p-1 rounded hover:bg-zinc-700 transition-colors text-red-400 hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
                <div className="flex items-center text-sm text-zinc-400 mb-4">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{list.customers.length} customer(s)</span>
                </div>
            </div>
            <div className="space-y-2">
                <button
                  onClick={() => openAddCustomerModal(list)}
                  className="w-full flex items-center justify-center space-x-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-3 py-2 rounded-lg text-sm transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Add Customers</span>
                </button>
                <button
                  onClick={() => openSendModal(list)}
                  className="w-full flex items-center justify-center space-x-1 bg-zinc-700 hover:bg-zinc-600 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Email</span>
                </button>
            </div>
          </div>
        ))}
      </div>
      
      {showAddCustomerModal && selectedList && (
        <AddCustomersModal 
            list={selectedList} 
            onClose={() => setShowAddCustomerModal(false)}
            onAddCustomers={handleAddCustomers}
        />
      )}

      {/* Create List Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-xl max-w-md w-full p-6 border border-zinc-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Create New Email List</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="listName" className="block text-sm font-medium text-zinc-400 mb-1">List Name</label>
                <input
                  id="listName"
                  type="text"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  placeholder="e.g., Newsletter Subscribers"
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
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-[#32cd32] hover:bg-opacity-90 text-black rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create List'}
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
                Send Email to "{selectedList.name}" ({selectedList.customers.length} recipients)
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
                  placeholder="Enter email subject"
                  value={messageContent.subject}
                  onChange={(e) => setMessageContent({...messageContent, subject: e.target.value})}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-[#32cd32]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Message</label>
                <textarea
                  value={messageContent.message}
                  onChange={(e) => setMessageContent({...messageContent, message: e.target.value})}
                  placeholder="Write your email content here..."
                  rows={8}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-[#32cd32]"
                ></textarea>
                <p className="text-xs text-zinc-500 mt-1">Note: A greeting like "Hi [Customer Name]," will be automatically added.</p>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowSendModal(false)}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={isSubmitting || !messageContent.subject || !messageContent.message}
                  className="px-4 py-2 bg-[#32cd32] hover:bg-opacity-90 text-black rounded-lg font-medium transition-colors flex items-center space-x-1 disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin"/> : <Send className="w-4 h-4" />}
                  <span>Send Email</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}