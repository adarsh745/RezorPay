import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ products: [] });
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        try {
          const config = {
            headers: { Authorization: `Bearer ${user.token}` },
          };
          const { data } = await axios.get('/api/cart', config);
          setCart(data);
        } catch (error) {
          console.error('Failed to fetch cart', error);
        }
      } else {
        setCart({ products: [] });
      }
    };

    fetchCart();
  }, [user]);

  const addToCart = async (productId, quantity = 1) => {
    if (!user) return alert('Please login to add items to cart');
    
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const { data } = await axios.post('/api/cart', { productId, quantity }, config);
      setCart(data);
    } catch (error) {
      console.error('Failed to add to cart', error);
    }
  };

  const removeFromCart = async (productId) => {
    if (!user) return;

    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const { data } = await axios.delete(`/api/cart/${productId}`, config);
      setCart(data);
    } catch (error) {
      console.error('Failed to remove from cart', error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (!user) return;

    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const { data } = await axios.put(`/api/cart/${productId}`, { quantity }, config);
      setCart(data);
    } catch (error) {
      console.error('Failed to update quantity', error);
    }
  };

  const clearCartState = () => setCart({ products: [] });

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCartState }}>
      {children}
    </CartContext.Provider>
  );
};
