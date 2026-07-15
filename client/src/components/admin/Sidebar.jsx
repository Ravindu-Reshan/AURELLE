import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-md text-sm font-medium ${
      isActive ? 'bg-primary-600 text-white' : 'text-body hover:bg-primary-50'
    }`;

  return (
    <aside className="w-52 shrink-0 space-y-1">
      <NavLink to="/admin" end className={linkClass}>Dashboard</NavLink>
      <NavLink to="/admin/products" className={linkClass}>Manage Products</NavLink>
      <NavLink to="/admin/orders" className={linkClass}>Manage Orders</NavLink>
    </aside>
  );
}
