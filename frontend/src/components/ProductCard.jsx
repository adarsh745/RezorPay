import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden group border border-transparent dark:border-gray-700">
      <Link to={`/product/${product._id}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
          <img
            src={product.image}
            alt={product.title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 mix-blend-multiply dark:mix-blend-normal"
          />
        </div>
      </Link>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              {product.category}
            </span>
            <Link to={`/product/${product._id}`}>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-1 line-clamp-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                {product.title}
              </h3>
            </Link>
          </div>
          <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4">
          {product.description}
        </p>
        <Link
          to={`/product/${product._id}`}
          className="w-full bg-gray-50 dark:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-600 text-indigo-600 dark:text-indigo-400 font-semibold py-2 px-4 rounded-lg flex items-center justify-center transition-colors border border-gray-100 dark:border-gray-600"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
