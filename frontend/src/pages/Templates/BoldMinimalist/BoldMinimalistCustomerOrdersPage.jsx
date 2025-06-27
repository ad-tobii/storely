import { useState, useEffect } from 'react';
import { axiosInstance } from '../../../../lib/axios';

const BoldMinimalistCustomerOrdersPage = ({ seller }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axiosInstance.get(`/orders/store/${seller._id}`);
                setOrders(response.data);
            } catch (err) {
                setError("FAILED TO FETCH ORDERS.");
            } finally {
                setLoading(false);
            }
        };
        if (seller?._id) fetchOrders();
    }, [seller?._id]);
    
    const getStatusStyle = (status) => {
        switch (status) {
            case 'pending': return 'text-yellow-400';
            case 'fulfilled': return 'text-green-400';
            case 'cancelled': return 'text-red-400';
            default: return 'text-gray-400';
        }
    };

    if (loading) {
        return <div className="text-center py-16 font-black text-2xl uppercase tracking-wider">LOADING ORDERS...</div>;
    }

    return (
        <div className="bold-minimalist-orders py-16 px-8">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-6xl font-black uppercase tracking-widest mb-8">YOUR ORDERS</h1>
                    <div className="w-24 h-2 mx-auto bg-black"></div>
                </div>

                {error && <div className="text-center py-16 border-4 border-red-500 text-red-500 font-black text-2xl">{error}</div>}

                {orders.length === 0 && !error && (
                     <div className="text-center py-16 border-4 border-black">
                        <p className="text-2xl font-bold uppercase tracking-wider">NO ORDERS PLACED.</p>
                    </div>
                )}

                {orders.length > 0 && (
                    <div className="space-y-8">
                        {orders.map(order => (
                            <div key={order._id} className="border-4 border-black">
                                <div className="p-6 bg-black text-white flex justify-between items-center">
                                    <div>
                                        <p className="font-bold uppercase tracking-widest">ORDER #{order._id.slice(-8).toUpperCase()}</p>
                                        <p className="text-sm text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className={`font-black text-2xl ${getStatusStyle(order.status)}`}>{order.status.toUpperCase()}</p>
                                        <p className="font-black text-3xl">${order.totalAmount.toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h4 className="font-bold uppercase tracking-wider mb-4">ITEMS</h4>
                                    <ul className="space-y-2">
                                        {order.products.map(item => (
                                            <li key={item.product._id} className="flex justify-between items-center">
                                                <span className="font-bold">{item.product.name}</span>
                                                <span className="text-gray-600">QTY: {item.quantity}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BoldMinimalistCustomerOrdersPage;