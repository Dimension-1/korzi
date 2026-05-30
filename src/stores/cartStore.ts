import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { addOrUpdateCart, removeFromCart, clearCart, syncCartWithShopify, validateAndRefreshCart, getCart } from '../services/shopify';
import { useAuthStore } from './authStore';

interface CartItem {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  variant?: string;
  variantId?: string; // Shopify variant ID
  productId?: string; // Shopify product ID
}

interface CartStore {
  // State
  cartItems: CartItem[];
  isDrawerOpen: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  operationInProgress: boolean; // Prevent race conditions
  
  // Actions
  addToCart: (item: Omit<CartItem, 'id'>) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
  openDrawer: () => Promise<void>; // Now async
  closeDrawer: () => void;
  toggleDrawer: () => Promise<void>; // Now async
  initializeCart: () => Promise<void>;
  syncWithShopify: () => Promise<void>;
  refreshCartCount: () => Promise<void>; // New function for header count
  
  // Computed
  getTotalItems: () => number;
  getTotalPrice: () => number;
  isUserLoggedIn: () => boolean;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // Initial state
      cartItems: [],
      isDrawerOpen: false,
      isLoading: false,
      isInitialized: false,
      operationInProgress: false,

      // Add to cart with Shopify sync and race condition prevention
      addToCart: async (item) => {
        const id = `${item.title}-${item.variant || 'default'}`;
        
        // Update local state immediately
        set((state) => {
          const existingItem = state.cartItems.find(cartItem => cartItem.id === id);
          
          if (existingItem) {
            return {
              cartItems: state.cartItems.map(cartItem =>
                cartItem.id === id
                  ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                  : cartItem
              )
            };
          } else {
            return {
              cartItems: [...state.cartItems, { ...item, id }]
            };
          }
        });

        // Sync with Shopify in background
        if (item.variantId) {
          try {
            set({ isLoading: true });
            const newQuantity = get().cartItems.find(cartItem => cartItem.id === id)?.quantity || item.quantity;
            const updatedCart = await addOrUpdateCart(item.variantId, newQuantity);
            
            if (updatedCart) {
              console.log('Cart synced with Shopify successfully');
              console.log('Shopify cart:', updatedCart);
            }
          } catch (error) {
            console.error('Failed to sync with Shopify:', error);
            // Revert React state on error
            set((state) => ({
              cartItems: state.cartItems.filter(cartItem => cartItem.id !== id)
            }));
          } finally {
            set({ isLoading: false });
          }
        } else {
          console.warn('No variantId provided, item not synced with Shopify');
        }
      },

      // Update quantity with Shopify sync
      updateQuantity: async (id: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(id);
          return;
        }

        set((state) => ({
          cartItems: state.cartItems.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
        }));

        // Sync with Shopify
        const item = get().cartItems.find(item => item.id === id);
        if (item?.variantId) {
          try {
            set({ isLoading: true });
            const updatedCart = await addOrUpdateCart(item.variantId, quantity);
            
            if (updatedCart) {
              console.log('Cart quantity updated in Shopify');
            }
          } catch (error) {
            console.error('Failed to sync with Shopify:', error);
            // Revert React state on error
            const originalItem = get().cartItems.find(item => item.id === id);
            if (originalItem) {
              set((state) => ({
                cartItems: state.cartItems.map(item =>
                  item.id === id ? { ...item, quantity: originalItem.quantity } : item
                )
              }));
            }
          } finally {
            set({ isLoading: false });
          }
        }
      },

      // Remove from cart with Shopify sync
      removeFromCart: async (id: string) => {
        const item = get().cartItems.find(item => item.id === id);
        
        // Update React state first
        set((state) => ({
          cartItems: state.cartItems.filter(item => item.id !== id)
        }));

        // Sync with Shopify
        if (item?.variantId) {
          try {
            set({ isLoading: true });
            
            // Get current Shopify cart to find the line ID
            const shopifyCart = await getCart();
            if (shopifyCart) {
              const lineToRemove = shopifyCart.lines.edges.find(
                edge => edge.node.merchandise.id === item.variantId
              );
              
              if (lineToRemove) {
                const updatedCart = await removeFromCart([lineToRemove.node.id]);
                
                if (updatedCart) {
                  console.log('Item removed from Shopify cart successfully');
                }
              }
            }
          } catch (error) {
            console.error('Failed to remove from Shopify:', error);
            // Revert React state on error
            set((state) => ({
              cartItems: [...state.cartItems, item!]
            }));
          } finally {
            set({ isLoading: false });
          }
        }
      },

      // Clear cart with Shopify sync
      clearCart: async () => {
        // Update React state first
        set({ cartItems: [] });

        // Sync with Shopify
        try {
          set({ isLoading: true });
          const clearedCart = await clearCart();
          
          if (clearedCart) {
            console.log('Cart cleared in Shopify successfully');
          }
        } catch (error) {
          console.error('Failed to clear Shopify cart:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      // Drawer controls
      openDrawer: async () => {
        console.log('Opening cart drawer...');
        set({ isDrawerOpen: true });
        document.body.classList.add('overflow-hidden');
      },

      closeDrawer: () => {
        set({ isDrawerOpen: false });
        document.body.classList.remove('overflow-hidden');
      },

      toggleDrawer: async () => {
        const { isDrawerOpen } = get();
        if (isDrawerOpen) {
          get().closeDrawer();
        } else {
          await get().openDrawer();
        }
      },

      // Initialize cart from Shopify
      initializeCart: async () => {
        console.log('Cart initialization requested...');
        console.log('Current isInitialized state:', get().isInitialized);
        
        // Only skip if already initialized AND we have items
        if (get().isInitialized && get().cartItems.length > 0) {
          console.log('Cart already initialized with items, skipping...');
          return;
        }

        try {
          set({ isLoading: true });
          console.log('Starting cart initialization...');
          
          // Validate and refresh cart
          console.log('Validating and refreshing cart...');
          const shopifyCart = await validateAndRefreshCart();
          console.log('Shopify cart from validation:', shopifyCart);
          
          if (shopifyCart) {
            console.log('Cart lines:', shopifyCart.lines);
            console.log('Cart lines edges:', shopifyCart.lines.edges);
            
            // Debug each edge to see the actual data
            shopifyCart.lines.edges.forEach((edge, index) => {
              console.log(`Edge ${index}:`, edge);
              console.log(`Edge ${index} quantity:`, edge.node.quantity);
              console.log(`Edge ${index} merchandise:`, edge.node.merchandise);
            });
            
            // Convert Shopify cart to React cart format
            const cartItems: CartItem[] = shopifyCart.lines.edges.map(edge => ({
              id: `${edge.node.merchandise.product.title}-${edge.node.merchandise.title}`,
              title: edge.node.merchandise.product.title,
              price: parseFloat(edge.node.merchandise.price.amount),
              quantity: edge.node.quantity,
              variant: edge.node.merchandise.title,
              variantId: edge.node.merchandise.id,
              productId: edge.node.merchandise.product.id,
              image: edge.node.merchandise.image?.url || '/image.webp'
            }));
            
            console.log('Converted cart items:', cartItems);
            
            set({ 
              cartItems,
              isInitialized: true 
            });
            
            console.log('Cart initialized from Shopify with', cartItems.length, 'items:', cartItems);
          } else {
            console.log('No Shopify cart found, marking as initialized');
            set({ isInitialized: true });
          }
        } catch (error) {
          console.error('Failed to initialize cart:', error);
          set({ isInitialized: true }); // Mark as initialized even on error
        } finally {
          set({ isLoading: false });
        }
      },

      // Sync React state with Shopify
      syncWithShopify: async () => {
        try {
          set({ isLoading: true });
          
          const shopifyCart = await syncCartWithShopify();
          
          if (shopifyCart) {
            // Convert Shopify cart to React cart format
            const cartItems: CartItem[] = shopifyCart.lines.edges.map(edge => ({
              id: `${edge.node.merchandise.product.title}-${edge.node.merchandise.title}`,
              title: edge.node.merchandise.product.title,
              price: parseFloat(edge.node.merchandise.price.amount),
              quantity: edge.node.quantity,
              variant: edge.node.merchandise.title,
              variantId: edge.node.merchandise.id,
              productId: edge.node.merchandise.product.id,
              image: edge.node.merchandise.image?.url || '/image.webp'
            }));
            
            set({ cartItems });
            console.log('Cart synced with Shopify:', cartItems);
          }
        } catch (error) {
          console.error('Failed to sync with Shopify:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      // Refresh cart count for header display (lightweight version)
      refreshCartCount: async () => {
        try {
          console.log('Refreshing cart count for header...');
          const shopifyCart = await syncCartWithShopify();
          
          if (shopifyCart) {
            // Convert Shopify cart to React cart format
            const cartItems: CartItem[] = shopifyCart.lines.edges.map(edge => ({
              id: `${edge.node.merchandise.product.title}-${edge.node.merchandise.title}`,
              title: edge.node.merchandise.product.title,
              price: parseFloat(edge.node.merchandise.price.amount),
              quantity: edge.node.quantity,
              variant: edge.node.merchandise.title,
              variantId: edge.node.merchandise.id,
              productId: edge.node.merchandise.product.id,
              image: edge.node.merchandise.image?.url || '/image.webp'
            }));
            
            set({ cartItems });
            console.log('Cart count refreshed:', cartItems.length, 'items');
          } else {
            set({ cartItems: [] });
            console.log('No cart found, count reset to 0');
          }
        } catch (error) {
          console.error('Failed to refresh cart count:', error);
        }
      },

      // Computed values
      getTotalItems: () => {
        const total = get().cartItems.reduce((total, item) => total + item.quantity, 0);
        console.log('getTotalItems called - cartItems:', get().cartItems);
        console.log('getTotalItems result:', total);
        return total;
      },

      getTotalPrice: () => {
        return get().cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
      },

      isUserLoggedIn: () => {
        // Check if user is authenticated via auth store
        const authStore = useAuthStore.getState();
        return authStore.isAuthenticated;
      },
    }),
    {
      name: 'cart-storage',
      partialize: () => ({
        isDrawerOpen: false, // Always start closed
      }),
    }
  )
);
