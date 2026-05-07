import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';

const Success = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 text-center">
      <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-gray-100">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-600 rounded-full mb-8">
          <CheckCircle size={48} />
        </div>
        
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Payment Successful!</h1>
        <p className="text-gray-600 text-lg mb-8">
          Thank you for your purchase. Your order has been placed successfully and is being processed.
        </p>

        {orderId && (
          <div className="bg-gray-50 rounded-2xl p-6 mb-8 flex items-center justify-between border border-gray-100">
            <div className="text-left">
              <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Order ID</p>
              <p className="text-gray-900 font-mono font-bold break-all">{orderId}</p>
            </div>
            <div className="text-indigo-600">
              <Package size={32} />
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to="/"
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-md hover:shadow-lg"
          >
            Continue Shopping
          </Link>
          <button
            className="w-full sm:w-auto text-gray-600 font-bold py-4 px-8 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all flex items-center justify-center space-x-2"
          >
            <span>View Order History</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
