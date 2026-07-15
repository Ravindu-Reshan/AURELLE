import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders } from '../../redux/slices/orderSlice';
import Sidebar from '../../components/admin/Sidebar';
import OrderTable from '../../components/admin/OrderTable';
import Loader from '../../components/common/Loader';

export default function ManageOrders() {
  const dispatch = useDispatch();
  const { allOrders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-8 flex gap-8">
      <Sidebar />
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-heading mb-6">Manage Orders</h1>
        {loading ? <Loader /> : <OrderTable orders={allOrders} />}
      </div>
    </div>
  );
}
