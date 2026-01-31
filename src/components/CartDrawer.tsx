import { Link, useNavigate } from 'react-router-dom';
import { X, ArrowUpRight } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { useOrderStore } from '../stores/orderStore';
import { useAuthStore } from '../stores/authStore';
import { getCloudinaryUrl } from '../utils/cloudinary';
import { eventNames, gaEvent } from '../utils/gtm';

export enum Operation {
  INCREASE = 'INCREASE',
  DECREASE = 'DECREASE',
}

interface CartDrawerProps {
  onCheckout?: () => void;
}

export default function CartDrawer({ onCheckout }: CartDrawerProps) {
  const navigate = useNavigate();
  const { 
    cartItems, 
    isDrawerOpen, 
    updateQuantity, 
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

  const handleClose = () => {
    closeDrawer();
  };

  const handleQuantityChange = (id: string, newQuantity: number, currentQuantity:number, operation:Operation, price:number) => {
    console.log("$$$Id-------", operation)
    if(operation === Operation.DECREASE){
      gaEvent(eventNames.remove_from_cart, {
        button_name: '-',
        newQuantity:newQuantity,
        prevQuantiry:currentQuantity,
        previousValue:price * newQuantity,
        product_id:id,
        value:price * currentQuantity
      })
    }
    else if(operation === Operation.INCREASE){
      gaEvent(eventNames.add_quantity_cart, {
        button_name: '+',
        newQuantity:newQuantity,
        prevQuantiry:currentQuantity,
        product_id:id,
        previousValue:price * newQuantity,
        value:price * currentQuantity
      })
    }
  
    updateQuantity(id, newQuantity);
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
      <div className={`fixed top-0 right-0 w-[365px] md:w-[480px] h-[636px] md:h-[780px] bg-black border border-[#5E5E5E] z-50 transform transition-transform duration-300 ease-in-out ${
        isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/20">
            <h2 className="text-xl md:text-2xl font-bebas tracking-wide text-white">YOUR CART</h2>
            <button
              onClick={handleClose}
              className="text-white hover:text-[#02FF00] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-6 h-6 md:w-8 md:h-8" strokeWidth={2} />
            </button>
          </div>



          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                {/* Large Cart Icon */}
                <div className="relative mb-6 inline-block">
                  <img src={getCloudinaryUrl('/assets/homepage/cart.png')} alt="Empty Cart" className="w-24 h-24" />
                  <div className="absolute -top-1 -right-1 w-10 h-10 bg-[#02FF00] rounded-full flex items-center justify-center">
                    <span className="text-black text-xl font-bold">0</span>
                  </div>
                </div>
                
                {/* Empty Cart Message */}
                <h3 className="font-bebas text-[38px] leading-[38px] text-center mb-3" style={{
                  background: 'linear-gradient(100.06deg, #FFFFFF 1.37%, #999999 57.42%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  UH OH! YOUR CART<br />IS EMPTY
                </h3>
                
                {/* Continue Shopping Button */}
                <button
                  onClick={() => { handleClose(); navigate('/shop'); }}
                  className="bg-[#393737] text-white flex items-center justify-center gap-2 border-l-[3px] border-[#02FF00] group relative overflow-hidden cursor-pointer mt-6"
                  style={{
                    width: '190px',
                    height: '46px',
                    fontFamily: 'DM Sans',
                    fontSize: '13px',
                    lineHeight: '16px',
                  }}
                >
                  <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                  <span className="relative z-10 group-hover:text-black transition-colors duration-300">CONTINUE SHOPPING</span>
                  <ArrowUpRight className="relative z-10 w-3.5 h-3.5 text-[#02FF00] group-hover:text-black transition-colors duration-300" />
                </button>
                
                {/* Sign In Section */}
                <div className="mt-12">
                  {isLoggedIn ? (
                    <>
                      <p className="text-white text-sm mb-2">Signed in to:</p>
                      <p className="text-[#02FF00] text-sm">{customer?.email}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-white text-sm mb-2">Have an account?</p>
                      <Link
                        to="/login"
                        onClick={handleClose}
                        className="text-white text-sm underline hover:text-[#02FF00] transition-colors"
                      >
                        SIGN IN TO CHECKOUT FASTER
                      </Link>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-0 border-b border-white/20">
                    {/* Product Image */}
                    <div className="w-[120px] h-[120px] md:w-[180px] md:h-[180px] flex-shrink-0 bg-[#808080]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 px-3 py-2 md:px-5 md:py-4 flex flex-col justify-between">
                      <div>
                        <h4 className="text-[#02FF00] font-bebas text-lg md:text-2xl mb-1 tracking-wide">
                          {item.title}
                        </h4>
                        {item.variant && (
                          <p className="text-white text-xs md:text-sm mb-2 md:mb-3">{item.variant}</p>
                        )}
                      </div>
                      
                      {/* Price and Quantity */}
                      <div className="flex items-center justify-between">
                        <span className="text-white text-base md:text-xl font-bold">₹{item.price.toLocaleString()}</span>
                        <div className="flex items-center gap-2 md:gap-3 border border-white/30 px-2 py-1 md:px-3 md:py-1.5">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1, item.quantity, Operation.DECREASE, item.price)}
                            className="text-white hover:text-[#02FF00] transition-colors text-lg md:text-xl leading-none"
                          >
                            −
                          </button>
                          <span className="text-white text-sm md:text-lg font-medium min-w-[24px] md:min-w-[30px] text-center">{String(item.quantity).padStart(2, '0')}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1, item.quantity, Operation.INCREASE, item.price)}
                            className="text-white hover:text-[#02FF00] transition-colors text-lg md:text-xl leading-none"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer - Fixed at bottom */}
          {cartItems.length > 0 && (
            <div className="bg-black">
              {/* Features Section */}
              <div className="grid grid-cols-3 border-t border-b border-white/20">
                <div className="flex flex-col items-center justify-center py-3 md:py-5 border-r border-white/20">
                  <img src={getCloudinaryUrl('/assets/CartDrawer/shipping.png')} alt="Delivery" className="w-7 h-7 md:w-10 md:h-10 mb-1 md:mb-2" />
                  <span className="text-white text-[10px] md:text-xs">2-5 Days Delivery</span>
                </div>
                <div className="flex flex-col items-center justify-center py-3 md:py-5 border-r border-white/20">
                  <img src={getCloudinaryUrl('/assets/CartDrawer/exchange.png')} alt="Exchange" className="w-7 h-7 md:w-10 md:h-10 mb-1 md:mb-2" />
                  <span className="text-white text-[10px] md:text-xs">Easy Support</span>
                </div>
                <div className="flex flex-col items-center justify-center py-3 md:py-5">
                  <img src={getCloudinaryUrl('/assets/CartDrawer/cod.png')} alt="Cash" className="w-7 h-7 md:w-10 md:h-10 mb-1 md:mb-2" />
                  <span className="text-white text-[10px] md:text-xs">Value for money</span>
                </div>
              </div>

              {/* Subtotal */}
              <div className="bg-[#393437] px-4 py-3 md:px-5 md:py-4">
                <div className="flex justify-between items-center">
                  <span className="text-white text-base md:text-lg">Subtotal:</span>
                  <span className="text-white text-xl md:text-2xl font-bold">₹{cartTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Tax Notice */}
              <div className="px-4 py-2 md:px-5 md:py-3 text-center border-t border-b border-white/20">
                <p className="text-white text-[10px] md:text-xs">Price inclusive of shipping and taxes.</p>
              </div>

              {/* Action Buttons */}
              <div className="p-3 md:p-5 flex gap-2 md:gap-3">
                <button
                  onClick={handleClose}
                  className="flex-1 bg-[#393737] text-white py-2 md:py-3 border-l-[3px] border-[#02FF00] group relative overflow-hidden flex items-center justify-center gap-1 md:gap-2 text-xs md:text-sm"
                >
                  <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                  <span className="relative z-10 group-hover:text-black transition-colors duration-300">‹ BACK TO SHOPPING</span>
                </button>
                <button
                  onClick={handleCheckout}
                  className="flex-1 bg-[#02FF00] text-black py-2 md:py-3 font-bold hover:bg-[#00dd00] transition-colors text-xs md:text-sm"
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
