import { useState, useEffect } from 'react';
import { FileText, Clock, CheckCircle, XCircle } from 'lucide-react';
import { axiosInstance } from '../../../../lib/axios';

const PlayfulColorfulCustomerOrdersPage = ({ storeSettings, seller }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get(`/orders/store/${seller._id}`);
        setOrders(response.data);
      } catch (err) {
        setError("Aww, we couldn't find your orders. Maybe try again?");
      } finally {
        setLoading(false);
      }
    };

    if (seller?._id) fetchOrders();
  }, [seller?._id]);

  const getStatusInfo = (status) => {
    switch (status) {
      case 'pending':
        return {
          icon: <Clock className="w-6 h-6 text-yellow-500" />,
          text: "Getting Ready! 🕒",
          color: storeSettings.secondaryColor,
        };
      case 'fulfilled':
        return {
          icon: <CheckCircle className="w-6 h-6 text-green-500" />,
          text: "On Its Way! 🚚",
          color: storeSettings.themeColor,
        };
      case 'cancelled':
        return {
          icon: <XCircle className="w-6 h-6 text-red-500" />,
          text: "Cancelled 💔",
          color: '#888',
        };
      default:
        return {
          icon: <FileText className="w-6 h-6 text-gray-500" />,
          text: "Order Placed",
          color: '#ccc',
        };
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 font-bold text-2xl">
        Loading your super fun orders... ✨
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 font-bold text-2xl text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="playful-colorful-orders-page py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1
          className="text-5xl font-bold mb-12 text-center"
          style={{ color: storeSettings.primaryTextColor }}
        >
          My Order History 📜
        </h1>

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📪</div>
            <p
              className="text-xl"
              style={{ color: storeSettings.secondaryTextColor }}
            >
              No colorful packages ordered yet!
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => {
              const statusInfo = getStatusInfo(order.status);
              return (
                <div
                  key={order._id}
                  className="rounded-2xl shadow-xl overflow-hidden transform hover:scale-102 transition-transform duration-300"
                  style={{ border: `3px solid ${statusInfo.color}` }}
                >
                  <div
                    className="p-6 flex justify-between items-center"
                    style={{
                      background: `linear-gradient(135deg, ${statusInfo.color}20, #ffffff)`,
                    }}
                  >
                    <div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: storeSettings.secondaryTextColor }}
                      >
                        Order #{order._id.slice(-8).toUpperCase()}
                      </p>
                      <p
                        className="text-sm font-medium"
                        style={{ color: storeSettings.secondaryTextColor }}
                      >
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-2 mt-1 text-xl font-bold">
                        {statusInfo.icon}
                        <span style={{ color: statusInfo.color }}>
                          {statusInfo.text}
                        </span>
                      </div>
                      <p
                        className="font-bold text-2xl"
                        style={{ color: storeSettings.themeColor }}
                      >
                        ${order.totalAmount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="p-6 bg-white space-y-4">
                    <h3 className="font-bold text-lg">Items in this order:</h3>
                    {order.products.map((item) => (
                      <div
                        key={item.product._id}
                        className="flex items-center gap-4"
                      >
                        <img
                          src={item.product.images?.[0] || '/placeholder.svg'}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-xl"
                        />
                        <div>
                          <p className="font-bold text-lg">{item.product.name}</p>
                          <p
                            className="text-md"
                            style={{ color: storeSettings.secondaryTextColor }}
                          >
                            {item.quantity} x ${item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayfulColorfulCustomerOrdersPage;
