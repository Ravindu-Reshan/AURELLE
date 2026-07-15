import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { placeOrder, clearLastOrder } from '../redux/slices/orderSlice';
import { clearCart } from '../redux/slices/cartSlice';
import { formatPrice } from '../utils/formatPrice';

export default function Checkout() {
  const { items } = useSelector((state) => state.cart);
  const { loading, error } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [shipping, setShipping] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [card, setCard] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handleCardChange = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      items: items.map((item) => ({ product: item.product, quantity: item.quantity })),
      shippingAddress: shipping,
      paymentMethod,
    };

    const result = await dispatch(placeOrder(orderData));
    if (placeOrder.fulfilled.match(result)) {
      dispatch(clearCart());
      navigate('/orders');
      dispatch(clearLastOrder());
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-heading mb-6">Checkout</h1>

      <form onSubmit={handleSubmit} className="bg-surface rounded-lg shadow-sm p-6 space-y-4">
        <h3 className="font-semibold">Shipping Address</h3>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          name="fullName"
          placeholder="Full name"
          value={shipping.fullName}
          onChange={handleChange}
          required
          className="w-full border border-cardBorder rounded-md px-3 py-2 text-sm"
        />
        <input
          name="address"
          placeholder="Address"
          value={shipping.address}
          onChange={handleChange}
          required
          className="w-full border border-cardBorder rounded-md px-3 py-2 text-sm"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            name="city"
            placeholder="City"
            value={shipping.city}
            onChange={handleChange}
            required
            className="border border-cardBorder rounded-md px-3 py-2 text-sm"
          />
          <input
            name="postalCode"
            placeholder="Postal code"
            value={shipping.postalCode}
            onChange={handleChange}
            required
            className="border border-cardBorder rounded-md px-3 py-2 text-sm"
          />
        </div>
        <input
          name="phone"
          placeholder="Phone number"
          value={shipping.phone}
          onChange={handleChange}
          required
          className="w-full border border-cardBorder rounded-md px-3 py-2 text-sm"
        />

        {/* Payment method selection */}
        <div className="border-t pt-4">
          <h3 className="font-semibold mb-3">Payment Method</h3>

          <div className="space-y-2">
            <label
              className={`flex items-center gap-3 border rounded-md px-4 py-3 cursor-pointer transition-colors ${
                paymentMethod === 'COD'
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-cardBorder'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="COD"
                checked={paymentMethod === 'COD'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="accent-primary-600"
              />
              <div>
                <p className="text-sm font-medium text-heading">Cash on Delivery</p>
                <p className="text-xs text-body">Pay with cash when your order arrives</p>
              </div>
            </label>

            <label
              className={`flex items-center gap-3 border rounded-md px-4 py-3 cursor-pointer transition-colors ${
                paymentMethod === 'Online'
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-cardBorder'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="Online"
                checked={paymentMethod === 'Online'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="accent-primary-600"
              />
              <div>
                <p className="text-sm font-medium text-heading">Online Payment</p>
                <p className="text-xs text-body">Pay now with a debit or credit card</p>
              </div>
            </label>
          </div>

          {/* Card details, shown only when Online Payment is selected.
              This is a demo form for academic purposes — no real payment
              gateway is integrated, and card details are not sent anywhere. */}
          {paymentMethod === 'Online' && (
            <div className="mt-4 space-y-3 bg-background rounded-md p-4 border border-cardBorder">
              <input
                name="cardNumber"
                placeholder="Card Number"
                value={card.cardNumber}
                onChange={handleCardChange}
                maxLength={19}
                required
                className="w-full border border-cardBorder rounded-md px-3 py-2 text-sm"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="expiry"
                  placeholder="MM/YY"
                  value={card.expiry}
                  onChange={handleCardChange}
                  maxLength={5}
                  required
                  className="border border-cardBorder rounded-md px-3 py-2 text-sm"
                />
                <input
                  name="cvv"
                  placeholder="CVV"
                  type="password"
                  value={card.cvv}
                  onChange={handleCardChange}
                  maxLength={4}
                  required
                  className="border border-cardBorder rounded-md px-3 py-2 text-sm"
                />
              </div>
              <p className="text-xs text-body">
                Enjoy a secure and seamless checkout experience with AURELLE.
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center border-t pt-4">
          <span className="text-lg font-semibold">Total: {formatPrice(subtotal)}</span>
          <button
            type="submit"
            disabled={loading}
            className="bg-primary-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-primary-700 disabled:bg-cardBorder"
          >
            {loading
              ? 'Placing order...'
              : paymentMethod === 'COD'
              ? 'Place Order'
              : 'Pay & Place Order'}
          </button>
        </div>
        <p className="text-xs text-body">
          Thank you for choosing AURELLE. Your order will be processed shortly.
        </p>
      </form>
    </div>
  );
}
