// components/CustomerDetailView.jsx
import { useState, useEffect } from 'react';
import { axiosInstance } from '../../../../../lib/axios';
import { Loader2, Package, Star, MessageSquare } from 'lucide-react';

export default function CustomerDetailView({ customerId }) {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await axiosInstance.get(`/dashboard/customers/${customerId}/details`);
                setDetails(response.data);
            } catch (err) {
                setError("Failed to load customer details.");
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [customerId]);

    const formatCurrency = (amount) => new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(amount || 0);

    if (loading) {
        return <div className="p-8 flex justify-center items-center"><Loader2 className="w-5 h-5 animate-spin text-[#32cd32]" /></div>;
    }
    if (error) {
        return <div className="p-8 text-center text-red-400">{error}</div>;
    }

    return (
        <div className="bg-zinc-800 p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="bg-zinc-700 p-4 rounded-lg">
                    <p className="text-sm text-zinc-400">Total Spent</p>
                    <p className="text-2xl font-bold text-white">{formatCurrency(details.totalSpent)}</p>
                </div>
                 <div className="bg-zinc-700 p-4 rounded-lg">
                    <p className="text-sm text-zinc-400">Total Orders</p>
                    <p className="text-2xl font-bold text-white">{details.orders.length}</p>
                </div>
                 <div className="bg-zinc-700 p-4 rounded-lg">
                    <p className="text-sm text-zinc-400">Total Reviews</p>
                    <p className="text-2xl font-bold text-white">{details.reviews.length}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-semibold text-lg mb-3 flex items-center gap-2"><Package className="w-5 h-5 text-[#32cd32]"/> Order History</h4>
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                        {details.orders.length > 0 ? details.orders.map(order => (
                            <div key={order._id} className="bg-zinc-700/50 p-3 rounded-md">
                                <div className="flex justify-between items-center">
                                    <p className="font-medium">#{order._id.slice(-6).toUpperCase()}</p>
                                    <p>{formatCurrency(order.totalAmount)}</p>
                                </div>
                                <p className="text-xs text-zinc-400">{new Date(order.createdAt).toLocaleString()}</p>
                            </div>
                        )) : <p className="text-zinc-400">No orders found.</p>}
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold text-lg mb-3 flex items-center gap-2"><Star className="w-5 h-5 text-yellow-400"/> Reviews</h4>
                     <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                         {details.reviews.length > 0 ? details.reviews.map(review => (
                            <div key={review._id} className="bg-zinc-700/50 p-3 rounded-md">
                                <div className="flex justify-between items-center mb-1">
                                    <p className="font-medium truncate" title={review.product.name}>{review.product.name}</p>
                                    <div className="flex items-center gap-1 text-yellow-400">
                                        {review.rating} <Star className="w-4 h-4" fill="currentColor"/>
                                    </div>
                                </div>
                                <p className="text-sm text-zinc-300 italic">"{review.comment}"</p>
                            </div>
                         )) : <p className="text-zinc-400">No reviews submitted.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}