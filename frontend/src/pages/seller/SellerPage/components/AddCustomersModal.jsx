// --- START OF FILE AddCustomersModal.jsx ---

import { useState, useMemo } from 'react';
import { X, UserPlus, Loader2 } from 'lucide-react';
import useDashboardStore from '../../../../../store/useDashboardStore';

export default function AddCustomersModal({ list, onClose, onAddCustomers }) {
    const { customers, isLoading } = useDashboardStore();
    const [selectedIds, setSelectedIds] = useState(new Set());
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Memoize the list of customers who are not already in the list
    const availableCustomers = useMemo(() => {
        if (!customers || !list) return [];
        const existingCustomerIds = new Set(list.customers.map(c => c._id));
        return customers.filter(customer => !existingCustomerIds.has(customer._id));
    }, [customers, list]);

    const handleToggleCustomer = (customerId) => {
        setSelectedIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(customerId)) {
                newSet.delete(customerId);
            } else {
                newSet.add(customerId);
            }
            return newSet;
        });
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        await onAddCustomers(Array.from(selectedIds));
        setIsSubmitting(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-zinc-900 rounded-xl max-w-lg w-full p-6 border border-zinc-800 flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-white">Add Customers to "{list.name}"</h3>
                    <button onClick={onClose} className="text-zinc-400 hover:text-white">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-grow overflow-y-auto pr-2 space-y-2">
                    {isLoading && !customers ? (
                        <div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin"/></div>
                    ) : availableCustomers.length === 0 ? (
                        <p className="text-zinc-400 text-center p-8">All your customers are already in this list, or you have no customers yet.</p>
                    ) : (
                        availableCustomers.map(customer => (
                            <div key={customer._id} className="flex items-center p-3 rounded-lg bg-zinc-800 hover:bg-zinc-700/50">
                                <input
                                    type="checkbox"
                                    id={`customer-${customer._id}`}
                                    checked={selectedIds.has(customer._id)}
                                    onChange={() => handleToggleCustomer(customer._id)}
                                    className="w-4 h-4 text-[#32cd32] bg-zinc-700 border-zinc-600 rounded focus:ring-[#32cd32]"
                                />
                                <label htmlFor={`customer-${customer._id}`} className="ml-3 text-sm font-medium text-white w-full cursor-pointer">
                                    {customer.fullname} <span className="text-zinc-400">({customer.email})</span>
                                </label>
                            </div>
                        ))
                    )}
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting || selectedIds.size === 0}
                        className="px-4 py-2 bg-[#32cd32] hover:bg-opacity-90 text-black rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin"/> : <UserPlus className="w-4 h-4" />}
                        Add {selectedIds.size} Customer(s)
                    </button>
                </div>
            </div>
        </div>
    );
}