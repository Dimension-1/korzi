import { Link, useNavigate } from 'react-router-dom';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { useOrderStore } from '../stores/orderStore';
import { useAuthStore } from '../stores/authStore';

interface CartDrawerProps {
  onCheckout?: () => void;
}

export default function CartDrawer({ onCheckout }: CartDrawerProps) {
  const navigate = useNavigate();
  const { 
    cartItems, 
    isDrawerOpen, 
    updateQuantity, 
    removeFromCart, 
    getTotalPrice,
    closeDrawer,
    isUserLoggedIn
  } = useCartStore();
  
  const { 
    setCurrentOrder
  } = useOrderStore();
  
  const { customer } = useAuthStore();
  
  const isLoggedIn = isUserLoggedIn();

  // Calculate totals
  const cartTotal = getTotalPrice();
  const originalTotal = cartItems.reduce((sum, item) => 
    sum + ((item.originalPrice || item.price) * item.quantity), 0
  );

  const handleClose = () => {
    closeDrawer();
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };

  const handleCheckout = async () => {
    try {
      // Call optional callback if provided
      onCheckout?.();
      
      // Prepare order data
      const orderData = {
        items: cartItems.map(item => ({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          variantId: item.variantId,
          image: item.image
        })),
        customer: customer ? {
          firstName: customer.firstName || '',
          lastName: customer.lastName || '',
          email: customer.email || '',
          phone: ''
        } : {
          firstName: '',
          lastName: '',
          email: '',
          phone: ''
        },
        shippingAddress: {
          address1: '',
          address2: '',
          city: '',
          province: '',
          country: 'India',
          zip: ''
        },
        totalAmount: cartTotal,
        currency: 'INR'
      };

      // Set current order
      setCurrentOrder(orderData);
      
      // Close the drawer
      closeDrawer();
      
      // Navigate to checkout page for customer details
      navigate('/checkout');
      
    } catch (error) {
      console.error('Error preparing checkout:', error);
    }
  };

  // Sample recommendation products
  const recommendations = [
    {
      id: 'rec-1',
      title: 'PROTEIN WAFERS - VARIETY PACK OF 10',
      price: 499,
      originalPrice: 550,
      image: '/image.png'
    },
    {
      id: 'rec-2',
      title: 'PROTEIN CHIPS - VARIETY PACK OF 10',
      price: 400,
      image: '/image.png'
    },
    {
      id: 'rec-3',
      title: 'CHOCOLATE 1 KG - FERMENTED YEAST PROTEIN',
      price: 2699,
      originalPrice: 2899,
      image: '/image.png'
    }
  ];

  const addRecommendation = (rec: typeof recommendations[0]) => {
    // This would typically add the product to cart
    console.log('Adding recommendation:', rec.title);
  };

  return (
    <>
      {/* Overlay */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={handleClose}
        />
      )}

      {/* Cart Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-[var(--background)] z-50 transform transition-transform duration-300 ease-in-out ${
        isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
            <h2 className="text-lg font-bold text-[var(--foreground)]">YOUR CART</h2>
            <button
              onClick={handleClose}
              className="text-[var(--primary)] hover:text-[var(--secondary)] transition-colors p-1"
              aria-label="Close cart"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Promotional Banner */}
          {cartItems.length > 0 && (
            <div className="bg-[var(--primary)] text-[var(--background)] px-5 py-3 text-center">
              <span className="text-sm font-semibold">Get 10% off orders over ₹1,499 – use code SUPER10</span>
            </div>
          )}

          {/* Discount Progress Bar */}
          {cartItems.length > 0 && (
            <div className="bg-[var(--background)] px-5 py-5 border-b border-[var(--border)]">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex flex-col items-center">
                  <div className="text-lg">🛍️</div>
                  <span className="text-xs font-semibold text-[var(--text-secondary)]">10% off</span>
                </div>
                <div className="flex-1 h-1 bg-[var(--border)]/30 rounded-full relative">
                  <div className="absolute inset-0 bg-[var(--primary)] rounded-full" style={{ width: '30%' }}></div>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs font-semibold text-[var(--text-secondary)]">15% off</span>
                </div>
              </div>
              <div className="text-sm text-[var(--primary)] font-semibold text-center">
                You're just ₹1,499.00 away from 10% off!
              </div>
            </div>
          )}

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                {isLoggedIn ? (
                  // Logged in user - show empty cart
                  <>
                    <div className="text-[var(--text-secondary)] mb-4">
                      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-[var(--foreground)] mb-2">Your cart is empty</h3>
                    <p className="text-[var(--text-secondary)] mb-6">Add some items to get started</p>
                    <button
                      onClick={handleClose}
                      className="bg-[var(--primary)] text-[var(--background)] px-6 py-3 rounded-lg font-medium hover:bg-[var(--secondary)] transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </>
                ) : (
                  // Not logged in user - show login prompt
                  <>
                    <div className="text-[var(--text-secondary)] mb-4">
                      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-[var(--foreground)] mb-2">Sign in to view your cart</h3>
                    <p className="text-[var(--text-secondary)] mb-6">Sign in to save your cart and get personalized recommendations</p>
                    <Link
                      to="/login"
                      onClick={handleClose}
                      className="bg-[var(--primary)] text-[var(--background)] px-6 py-3 rounded-lg font-medium hover:bg-[var(--secondary)] transition-colors mb-4 inline-block text-center"
                    >
                      Sign In
                    </Link>
                    <button
                      onClick={handleClose}
                      className="border-2 border-[var(--primary)] text-[var(--primary)] px-6 py-3 rounded-lg font-medium hover:bg-[var(--primary)] hover:text-[var(--background)] transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div className="p-5 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 border border-[var(--border)] rounded-lg bg-[var(--background)]">
                    {/* Product Image */}
                    <div className="w-16 h-16 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-[var(--foreground)] mb-1 line-clamp-2">
                        {item.title}
                      </h4>
                      {item.variant && (
                        <p className="text-xs text-[var(--text-secondary)] mb-2">{item.variant}</p>
                      )}
                      
                      {/* Price */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm font-bold text-[var(--primary)]">₹{item.price}</span>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <span className="text-xs text-[var(--text-secondary)] line-through">₹{item.originalPrice}</span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                    </div>
                    <div className="gap-2">
                       {/* Remove Button */}
                       <div className="flex items-end justify-end w-full gap-2">
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors p-1"
                      aria-label={`Remove ${item.title}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    </div>
                    <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="w-4 h-4 border border-[var(--border)] rounded-full flex items-center justify-center hover:bg-[var(--primary)]/20 transition-colors text-[var(--foreground)]"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-[var(--foreground)]">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="w-4 h-4 border border-[var(--border)] rounded-full flex items-center justify-center hover:bg-[var(--primary)]/20 transition-colors text-[var(--foreground)]"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Recommendations */}
            {cartItems.length > 0 && (
              <div className="p-5 border-t border-[var(--border)]">
                <h3 className="text-base font-bold text-[var(--foreground)] mb-5 uppercase">START WITH OUR TOP SELLERS</h3>
                <div className="space-y-4">
                  {recommendations.map((rec) => (
                    <div key={rec.id} className="flex items-center gap-4">
                      <div className="w-15 h-15 flex-shrink-0" style={{ width: '60px', height: '60px' }}>
                        <img
                          src={rec.image}
                          alt={rec.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-[var(--primary)] mb-2 uppercase">{rec.title}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-base font-bold text-[var(--primary)]">₹{rec.price}</span>
                          {rec.originalPrice && (
                            <span className="text-sm text-[var(--text-secondary)] line-through">₹{rec.originalPrice}</span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => addRecommendation(rec)}
                        className="border-2 border-[var(--primary)] text-[var(--primary)] px-4 py-2 rounded text-xs font-semibold hover:bg-[var(--primary)] hover:text-[var(--background)] transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer - Fixed at bottom */}
          {cartItems.length > 0 && (
            <div className="border-t border-[var(--border)] bg-[var(--background)] p-5">
              {/* Subtotal */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-base font-semibold text-[var(--primary)]">
                  Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-[var(--primary)]">₹{cartTotal}</span>
                  {originalTotal > cartTotal && (
                    <span className="text-base text-[var(--text-secondary)] line-through">₹{originalTotal}</span>
                  )}
                </div>
              </div>

              {/* Login Prompt for Non-Logged In Users */}
              {!isLoggedIn && (
                <div className="mb-4 p-4 bg-[var(--primary)]/10 border border-[var(--primary)]/30 rounded-lg">
                  <h4 className="text-sm font-semibold text-[var(--foreground)] mb-2">Sign in for faster checkout</h4>
                  <p className="text-xs text-[var(--text-secondary)] mb-3">
                    Save your cart and get personalized recommendations
                  </p>
                  <Link
                    to="/login"
                    onClick={handleClose}
                    className="w-full bg-[var(--primary)] text-[var(--background)] py-2 px-4 rounded-lg font-medium text-sm hover:bg-[var(--secondary)] transition-colors inline-block text-center"
                  >
                    Sign In
                  </Link>
                </div>
              )}

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-[var(--primary)] text-[var(--background)] py-4 px-5 rounded-lg font-bold text-base flex items-center justify-between hover:bg-[var(--secondary)] transition-colors shadow-lg"
              >
                <span>Proceed to Checkout</span>
                <div className="flex gap-2">
                  <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    💳
                  </span>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
