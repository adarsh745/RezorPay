import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const subtotal = cart?.products?.reduce(
    (acc, item) => acc + (item.productId?.price || 0) * item.quantity,
    0
  ) || 0;

  const handleCheckout = () => {
    if (!user) {
      navigate('/login?redirect=checkout');
    } else {
      navigate('/checkout');
    }
  };

  if (!cart?.products || cart.products.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl shadow-sm max-w-2xl mx-auto">
        <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag size={40} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link
          to="/"
          className="inline-flex items-center bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-700 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.products.filter(item => item.productId).map((item) => (
            <div
              key={item.productId._id}
              className="bg-white p-4 rounded-xl shadow-sm flex flex-col sm:flex-row items-center border border-gray-100"
            >
              <div className="w-24 h-24 bg-gray-50 rounded-lg flex-shrink-0 mb-4 sm:mb-0 sm:mr-6 p-2">
                <img
                  src={item.productId.image}
                  alt={item.productId.title}
                  className="w-full h-full object-contain"
                />
              </div>
              
              <div className="flex-grow text-center sm:text-left mb-4 sm:mb-0">
                <Link to={`/product/${item.productId._id}`}>
                  <h3 className="font-bold text-gray-900 hover:text-indigo-600 transition-colors line-clamp-1">
                    {item.productId.title}
                  </h3>
                </Link>
                <p className="text-gray-500 text-sm">{item.productId.category}</p>
                <p className="text-indigo-600 font-bold mt-1">₹{item.productId.price.toLocaleString('en-IN')}</p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center bg-gray-100 rounded-lg">
                  <button
                    onClick={() => updateQuantity(item.productId._id, Math.max(1, item.quantity - 1))}
                    className="p-2 hover:text-indigo-600 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-bold text-gray-900">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}
                    className="p-2 hover:text-indigo-600 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                <button
                  onClick={() => removeFromCart(item.productId._id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-2"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">FREE</span>
              </div>
              <div className="border-t border-gray-100 pt-4 flex justify-between text-xl font-bold text-gray-900">
                <span>Total</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={20} />
            </button>
            
            <p className="text-center text-xs text-gray-400 mt-4">
              Secure Checkout Powered by Razorpay
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
