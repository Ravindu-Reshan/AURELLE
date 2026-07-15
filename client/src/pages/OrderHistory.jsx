import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyOrders } from '../redux/slices/orderSlice';
import Loader from '../components/common/Loader';
import { formatPrice } from '../utils/formatPrice';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped: 'bg-indigo-100 text-indigo-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

export default function OrderHistory() {
  const dispatch = useDispatch();
  const { myOrders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-heading mb-6">My Orders</h1>

      {myOrders.length === 0 ? (
        <p className="text-body text-center py-16">You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-4">
          {myOrders.map((order) => (
            <div key={order._id} className="bg-surface rounded-lg shadow-sm p-5">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-xs text-body">Order #{order._id.slice(-8)}</p>
                  <p className="text-sm text-body">
                    {new Date(order.createdAt).toLocaleDateString()} · {order.paymentMethod === 'Online' ? 'Online Payment' : 'Cash on Delivery'}
                  </p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColors[order.status]}`}>
                  {order.status}
                </span>
              </div>

              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.product} className="flex justify-between text-sm">
                    <span>{item.name} × {item.quantity}</span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between font-semibold border-t mt-3 pt-3">
                <span>Total</span>
                <span>{formatPrice(order.totalAmount)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
