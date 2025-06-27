import { useState, useEffect } from 'react';
import { FileText, Clock, Package, CheckCircle } from 'lucide-react';
import { axiosInstance } from '../../../../lib/axios';

const ArtisanElegantCustomerOrdersPage = ({ storeSettings, seller }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axiosInstance.get(`/orders/store/${seller._id}`);
                setOrders(response.data);
            } catch (err) {
                setError("Failed to fetch your orders. Please try again later.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (seller?._id) {
            fetchOrders();
        }
    }, [seller._id]);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending':
                return <Clock className="w-5 h-5 text-yellow-500" />;
            case 'fulfilled':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'cancelled':
                return <XCircle className="w-5 h-5 text-red-500" />;
            default:
                return <FileText className="w-5 h-5 text-gray-500" />;
        }
    };
    
    if (loading) {
        return <div className="text-center py-16">Loading your orders...</div>;
    }

    if (error) {
        return <div className="text-center py-16 text-red-500">{error}</div>;
    }

    return (
        <div className="artisan-elegant-orders-page py-12 px-4">
            <div className="container mx-auto max-w-4xl">
                <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center" style={{ color: storeSettings.primaryTextColor }}>
                    My Orders
                </h1>
                
                {orders.length === 0 ? (
                     <div className="text-center py-16">
                        <p className="text-lg" style={{ color: storeSettings.secondaryTextColor }}>You haven't placed any orders yet.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map(order => (
                            <div key={order._id} className="border rounded-lg shadow-sm overflow-hidden" style={{ borderColor: storeSettings.secondaryColor + '40' }}>
                                <div className="p-4 flex justify-between items-center" style={{ backgroundColor: storeSettings.secondaryColor + '10' }}>
                                    <div>
                                        <p className="text-sm" style={{ color: storeSettings.secondaryTextColor }}>Order ID: #{order._id.slice(-8).toUpperCase()}</p>
                                        <p className="text-sm" style={{ color: storeSettings.secondaryTextColor }}>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-lg">${order.totalAmount.toFixed(2)}</p>
                                        <div className="flex items-center justify-end gap-2 mt-1 capitalize">
                                            {getStatusIcon(order.status)}
                                            <span className="font-medium">{order.status}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 space-y-3">
                                    {order.products.map(item => (
                                        <div key={item.product._id} className="flex items-center gap-4">
                                            <img src={item.product.images?.[0] || '/placeholder.svg'} alt={item.product.name} className="w-16 h-16 object-cover rounded-md" />
                                            <div>
                                                <p className="font-medium">{item.product.name}</p>
                                                <p className="text-sm" style={{ color: storeSettings.secondaryTextColor }}>
                                                    {item.quantity} x ${item.price.toFixed(2)}
                                                </p>
                                            </div>
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

export default ArtisanElegantCustomerOrdersPage;