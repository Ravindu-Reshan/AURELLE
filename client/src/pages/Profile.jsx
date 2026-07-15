import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Pencil, Check, X } from 'lucide-react';
import { updateProfile } from '../redux/slices/authSlice';

export default function Profile() {
  const { userInfo, loading, error } = useSelector((state) => state.auth);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const isAdmin = userInfo?.role === 'admin';

  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(userInfo?.name || '');

  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [phoneInput, setPhoneInput] = useState(userInfo?.phone || '');

  // Keep inputs in sync if userInfo changes elsewhere (e.g. after save)
  useEffect(() => {
    setNameInput(userInfo?.name || '');
    setPhoneInput(userInfo?.phone || '');
  }, [userInfo?.name, userInfo?.phone]);

  const handleSaveName = async () => {
    if (!nameInput.trim()) return;
    const result = await dispatch(updateProfile({ name: nameInput.trim() }));
    if (updateProfile.fulfilled.match(result)) {
      setIsEditingName(false);
    }
  };

  const handleCancelName = () => {
    setNameInput(userInfo?.name || '');
    setIsEditingName(false);
  };

  const handleSavePhone = async () => {
    const result = await dispatch(updateProfile({ phone: phoneInput.trim() }));
    if (updateProfile.fulfilled.match(result)) {
      setIsEditingPhone(false);
    }
  };

  const handleCancelPhone = () => {
    setPhoneInput(userInfo?.phone || '');
    setIsEditingPhone(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-heading mb-6">My Profile</h1>

      <div className="bg-surface rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-2xl font-bold shrink-0">
            {userInfo?.name?.charAt(0).toUpperCase()}
          </div>

          <div className="flex-1">
            {isEditingName ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  autoFocus
                  className="border border-cardBorder rounded-full px-4 py-1.5 text-sm font-semibold text-heading focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  onClick={handleSaveName}
                  disabled={loading}
                  className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 disabled:opacity-50"
                  aria-label="Save name"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={handleCancelName}
                  className="w-8 h-8 rounded-full border border-cardBorder text-body flex items-center justify-center hover:bg-background"
                  aria-label="Cancel"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-lg text-heading">
                  {isAdmin ? `Admin ${userInfo?.name}` : userInfo?.name}
                </h2>
                <button
                  onClick={() => setIsEditingName(true)}
                  className="text-body hover:text-primary-600 transition-colors"
                  aria-label="Edit name"
                >
                  <Pencil size={14} />
                </button>
              </div>
            )}
            <p className="text-sm text-body mt-1">{userInfo?.email}</p>
            {error && isEditingName && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm border-t pt-4">
          <div>
            <p className="text-body">Account Type</p>
            <p className="font-medium text-heading capitalize">{userInfo?.role}</p>
          </div>

          {isAdmin ? (
            <div>
              <p className="text-body">Phone Number</p>
              {isEditingPhone ? (
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="tel"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    placeholder="e.g. 077 123 4567"
                    autoFocus
                    className="border border-cardBorder rounded-full px-3 py-1 text-sm text-heading focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <button
                    onClick={handleSavePhone}
                    disabled={loading}
                    className="w-6 h-6 rounded-full bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 disabled:opacity-50"
                    aria-label="Save phone"
                  >
                    <Check size={12} />
                  </button>
                  <button
                    onClick={handleCancelPhone}
                    className="w-6 h-6 rounded-full border border-cardBorder text-body flex items-center justify-center hover:bg-background"
                    aria-label="Cancel"
                  >
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <p className="font-medium text-heading">
                    {userInfo?.phone || 'Not set'}
                  </p>
                  <button
                    onClick={() => setIsEditingPhone(true)}
                    className="text-body hover:text-primary-600 transition-colors"
                    aria-label="Edit phone"
                  >
                    <Pencil size={12} />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <p className="text-body">Wishlist Items</p>
              <p className="font-medium text-heading">{wishlistItems.length}</p>
            </div>
          )}
        </div>

        {!isAdmin && (
          <div className="flex gap-3 mt-6 pt-4 border-t">
            <Link
              to="/orders"
              className="text-primary-600 font-medium text-sm hover:underline"
            >
              View Order History
            </Link>
            <span className="text-cardBorder">|</span>
            <Link
              to="/wishlist"
              className="text-primary-600 font-medium text-sm hover:underline"
            >
              View Wishlist
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
