import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, clearError } from '../redux/slices/authSlice';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) navigate('/');
    return () => dispatch(clearError());
  }, [userInfo, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="max-w-sm mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold text-heading mb-6 text-center">Login</h1>

      <form onSubmit={handleSubmit} className="bg-surface rounded-lg shadow-sm p-6 space-y-4">
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-cardBorder rounded-md px-3 py-2 text-sm"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border border-cardBorder rounded-md px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary-600 text-white py-2.5 rounded-full font-semibold hover:bg-primary-700 disabled:bg-cardBorder"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="text-sm text-center text-body">
          New here?{' '}
          <Link to="/register" className="text-primary-600 font-medium hover:underline">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}
