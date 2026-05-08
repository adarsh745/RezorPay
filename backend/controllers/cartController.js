const Cart = require('../models/Cart');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user._id }).populate('products.productId');
    
    if (cart) {
      // Filter out products that no longer exist (population result is null)
      cart.products = cart.products.filter(item => item.productId !== null);
      res.json(cart);
    } else {
      cart = await Cart.create({ userId: req.user._id, products: [] });
      res.json(cart);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      cart = new Cart({ userId: req.user._id, products: [] });
    }

    const itemIndex = cart.products.findIndex((p) => p.productId.toString() === productId);

    if (itemIndex > -1) {
      // Product exists in cart, update quantity
      cart.products[itemIndex].quantity += quantity;
    } else {
      // Product does not exist in cart, add new item
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    
    const updatedCart = await Cart.findOne({ userId: req.user._id }).populate('products.productId');
    res.json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    let cart = await Cart.findOne({ userId: req.user._id });

    if (cart) {
      cart.products = cart.products.filter((p) => p.productId.toString() !== productId);
      await cart.save();
      
      const updatedCart = await Cart.findOne({ userId: req.user._id }).populate('products.productId');
      res.json(updatedCart);
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:productId
// @access  Private
const updateCartItemQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    let cart = await Cart.findOne({ userId: req.user._id });

    if (cart) {
      const itemIndex = cart.products.findIndex((p) => p.productId.toString() === productId);

      if (itemIndex > -1) {
        cart.products[itemIndex].quantity = quantity;
        await cart.save();
        
        const updatedCart = await Cart.findOne({ userId: req.user._id }).populate('products.productId');
        res.json(updatedCart);
      } else {
        res.status(404).json({ message: 'Item not in cart' });
      }
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
};
