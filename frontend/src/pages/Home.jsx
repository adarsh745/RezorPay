import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { Search } from 'lucide-react';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/products${keyword ? `?keyword=${keyword}` : ''}`);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [keyword]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled by the useEffect dependency on keyword, 
    // but we could also just trigger it here if we wanted to only search on submit.
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-indigo-600 rounded-2xl p-8 sm:p-12 mb-12 text-center text-white shadow-lg">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
          Welcome to TechStore
        </h1>
        <p className="text-lg sm:text-xl text-indigo-100 max-w-2xl mx-auto mb-8">
          Discover the latest gadgets, premium electronics, and unbeatable deals all in one place.
        </p>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-xl mx-auto relative">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full px-6 py-4 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-transparent dark:border-gray-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-900 shadow-sm text-lg transition-all"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-2 top-2 bottom-2 bg-indigo-600 dark:bg-indigo-500 text-white p-2 rounded-full hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
          >
            <Search size={24} />
          </button>
        </form>
      </div>

      {/* Product Grid */}
      <div className="mb-6 flex justify-between items-end">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Featured Products</h2>
        <span className="text-gray-500 dark:text-gray-400">{products.length} results</span>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-transparent dark:border-gray-700">
          <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300">No products found</h3>
          <p className="text-gray-400 dark:text-gray-500 mt-2">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
