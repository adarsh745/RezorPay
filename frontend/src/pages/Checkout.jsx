import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import toast from 'react-hot-toast';
import { CreditCard, ShieldCheck } from 'lucide-react';

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const { cart, clearCartState } = useContext(CartContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!cart?.products || cart.products.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  const totalAmount = cart?.products?.reduce(
    (acc, item) => acc + (item.productId?.price || 0) * item.quantity,
    0
  ) || 0;

  const handlePayment = async () => {
    setLoading(true);
    try {
      // 1. Create order on backend
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      
      const { data: orderData } = await axios.post(
        '/api/payment/create-order',
        { amount: totalAmount },
        config
      );

      // 2. Open Razorpay Popup
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: 'INR',
        name: 'TechStore',
        description: 'Purchase Payment',
        order_id: orderData.id,
        handler: async (response) => {
          try {
            // 3. Verify payment on backend
            const verifyRes = await axios.post(
              '/api/payment/verify',
              {
                ...response,
                amount: totalAmount,
                products: cart.products
                  .filter(p => p.productId)
                  .map(p => ({
                    productId: p.productId._id,
                    quantity: p.quantity
                  }))
              },
              config
            );

            if (verifyRes.status === 200) {
              toast.success('Payment successful!');
              clearCartState();
              navigate('/success', { state: { orderId: verifyRes.data.order._id } });
            }
          } catch (error) {
            console.error(error);
            toast.error('Payment verification failed');
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: '#4F46E5',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      toast.error('Could not initiate payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Order Details */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Shipping Information</h2>
            <div className="space-y-2 text-gray-600">
              <p><span className="font-medium text-gray-900">Name:</span> {user?.name}</p>
              <p><span className="font-medium text-gray-900">Email:</span> {user?.email}</p>
              <p className="text-sm italic mt-2">Delivery to your registered address.</p>
            </div>
          </div>

          <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 flex items-start space-x-4">
            <div className="bg-indigo-600 text-white p-2 rounded-lg">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="font-bold text-indigo-900">Secure Payment</h3>
              <p className="text-indigo-700 text-sm">Your payment information is encrypted and processed securely through Razorpay.</p>
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Summary</h2>
            
            <div className="space-y-4 mb-8">
              {cart?.products?.filter(item => item.productId).map((item) => (
                <div key={item.productId._id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.productId.title} x {item.quantity}</span>
                  <span className="font-medium text-gray-900">₹{(item.productId.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
              <div className="border-t border-gray-100 pt-4 flex justify-between text-xl font-bold text-gray-900">
                <span>Total Amount</span>
                <span>₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <CreditCard size={20} />
              <span>{loading ? 'Processing...' : 'Pay with Razorpay'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
