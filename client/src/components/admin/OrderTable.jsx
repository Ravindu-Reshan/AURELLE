import { useDispatch } from 'react-redux';
import { updateOrderStatus } from '../../redux/slices/orderSlice';
import { formatPrice } from '../../utils/formatPrice';

const STATUS_OPTIONS = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

export default function OrderTable({ orders }) {
  const dispatch = useDispatch();

  return (
    <div className="bg-surface rounded-lg shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-background text-left text-body uppercase text-xs">
          <tr>
            <th className="px-4 py-3">Order ID</th>
            <th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Total</th>
            <th className="px-4 py-3">Payment</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-t">
              <td className="px-4 py-3 font-mono text-xs">{order._id.slice(-8)}</td>
              <td className="px-4 py-3">{order.user?.name || 'N/A'}</td>
              <td className="px-4 py-3">{formatPrice(order.totalAmount)}</td>
              <td className="px-4 py-3">
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    order.paymentMethod === 'Online'
                      ? 'bg-primary-100 text-primary-700'
                      : 'bg-background text-body'
                  }`}
                >
                  {order.paymentMethod === 'Online' ? 'Online' : 'COD'}
                </span>
              </td>
              <td className="px-4 py-3">{new Date(order.createdAt).toLocaleDateString()}</td>
              <td className="px-4 py-3">
                <select
                  value={order.status}
                  onChange={(e) =>
                    dispatch(updateOrderStatus({ id: order._id, status: e.target.value }))
                  }
                  className="border border-cardBorder rounded-md px-2 py-1 text-xs"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {orders.length === 0 && (
        <p className="text-center text-body py-10">No orders yet.</p>
      )}
    </div>
  );
}
