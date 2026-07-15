import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders } from '../../redux/slices/orderSlice';
import { fetchProducts } from '../../redux/slices/productSlice';
import Sidebar from '../../components/admin/Sidebar';
import { formatPrice } from '../../utils/formatPrice';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { allOrders } = useSelector((state) => state.orders);
  const { items: products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchAllOrders());
    dispatch(fetchProducts({}));
  }, [dispatch]);

  const totalRevenue = allOrders.reduce((sum, o) => sum + o.totalAmount, 0);

  const stats = [
    { label: 'Total Products', value: products.length },
    { label: 'Total Orders', value: allOrders.length },
    { label: 'Total Revenue', value: formatPrice(totalRevenue) },
    { label: 'Pending Orders', value: allOrders.filter((o) => o.status === 'pending').length },
  ];

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-8 flex gap-8">
      <Sidebar />
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-heading mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-surface rounded-lg shadow-sm p-5">
              <p className="text-sm text-body">{stat.label}</p>
              <p className="text-2xl font-bold text-heading mt-1">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
