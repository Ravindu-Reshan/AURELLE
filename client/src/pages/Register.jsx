import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser, clearError } from '../redux/slices/authSlice';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) navigate('/');
    return () => dispatch(clearError());
  }, [userInfo, navigate, dispatch]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(form));
  };

  return (
    <div className="max-w-sm mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold text-heading mb-6 text-center">Create Account</h1>

      <form onSubmit={handleSubmit} className="bg-surface rounded-lg shadow-sm p-6 space-y-4">
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          name="name"
          placeholder="Full name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border border-cardBorder rounded-md px-3 py-2 text-sm"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border border-cardBorder rounded-md px-3 py-2 text-sm"
        />
        <input
          name="password"
          type="password"
          placeholder="Password (min 6 characters)"
          value={form.password}
          onChange={handleChange}
          required
          minLength={6}
          className="w-full border border-cardBorder rounded-md px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary-600 text-white py-2.5 rounded-full font-semibold hover:bg-primary-700 disabled:bg-cardBorder"
        >
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>

        <p className="text-sm text-center text-body">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
