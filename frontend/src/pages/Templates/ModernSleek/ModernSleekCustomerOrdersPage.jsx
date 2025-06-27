import { useState, useEffect } from 'react';
import { FileText, Clock, CheckCircle, XCircle } from 'lucide-react';
import { axiosInstance } from '../../../../lib/axios';

const ModernSleekCustomerOrdersPage = ({ storeSettings, seller }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axiosInstance.get(`/orders/store/${seller._id}`);
                setOrders(response.data);
            } catch (err) {
                setError("Failed to retrieve order history.");
            } finally {
                setLoading(false);
            }
        };
        if (seller?._id) fetchOrders();
    }, [seller?._id]);

    const StatusDisplay = ({ status }) => {
        const styles = {
            pending: { icon: <Clock size={16}/>, text: 'Pending', color: 'text-yellow-400' },
            fulfilled: { icon: <CheckCircle size={16}/>, text: 'Fulfilled', color: 'text-green-400' },
            cancelled: { icon: <XCircle size={16}/>, text: 'Cancelled', color: 'text-red-400' },
        };
        const current = styles[status] || { icon: <FileText size={16}/>, text: 'Unknown', color: 'text-gray-400' };
        return <div className={`flex items-center gap-2 font-semibold ${current.color}`}>{current.icon} {current.text}</div>;
    };

    if (loading) {
        return <div className="text-center py-20 text-xl">Loading Orders...</div>;
    }

    if (error) {
        return <div className="text-center py-20 text-xl text-red-500">{error}</div>;
    }

    return (
        <div className="modern-sleek-orders-page py-20 px-4">
            <div className="container mx-auto max-w-5xl">
                <h1 className="text-5xl font-extrabold mb-12 text-center uppercase tracking-wider" style={{ color: storeSettings.primaryTextColor }}>
                    Order History
                </h1>
                
                {orders.length === 0 ? (
                     <div className="text-center py-20 border border-gray-700/50">
                        <p className="text-xl" style={{ color: storeSettings.secondaryTextColor }}>You have no past orders.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map(order => (
                            <div key={order._id} className="border border-gray-700/50 bg-gray-800/20">
                                <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-700/50">
                                    <div className="space-y-1">
                                        <p className="font-bold text-lg">ORDER #{order._id.slice(-8).toUpperCase()}</p>
                                        <p className="text-sm" style={{ color: storeSettings.secondaryTextColor }}>{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <StatusDisplay status={order.status} />
                                        <p className="font-bold text-xl">${order.totalAmount.toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="p-6">
                                    {order.products.map(item => (
                                        <div key={item.product._id} className="flex items-center gap-6 not-last:mb-4">
                                            <img src={item.product.images?.[0] || '/placeholder.svg'} alt={item.product.name} className="w-16 h-16 object-cover bg-gray-700" />
                                            <div className="flex-grow">
                                                <p className="font-semibold">{item.product.name}</p>
                                                <p className="text-sm" style={{ color: storeSettings.secondaryTextColor }}>Qty: {item.quantity}</p>
                                            </div>
                                            <p className="font-semibold">${item.price.toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModernSleekCustomerOrdersPage;