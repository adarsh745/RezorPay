import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product', error);
        toast.error('Failed to load product');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }
    
    addToCart(product._id, Number(qty));
    toast.success('Added to cart!');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 sm:p-10 border border-transparent dark:border-gray-700 transition-colors duration-300">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8 transition-colors font-medium"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden flex items-center justify-center p-8 aspect-square">
          <img
            src={product.image}
            alt={product.title}
            className="object-contain max-h-full mix-blend-multiply dark:mix-blend-normal"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-2">
            {product.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 leading-tight">
            {product.title}
          </h1>
          
          <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            ₹{product.price?.toLocaleString('en-IN')}
          </div>
          
          <div className="prose dark:prose-invert prose-indigo mb-8">
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-auto">
            <div className="w-24">
              <label htmlFor="qty" className="sr-only">Quantity</label>
              <select
                id="qty"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-lg rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-3 outline-none"
              >
                {[...Array(10).keys()].map((x) => (
                  <option key={x + 1} value={x + 1} className="bg-white dark:bg-gray-700">
                    {x + 1}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white font-bold py-4 px-8 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <ShoppingCart size={20} />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
