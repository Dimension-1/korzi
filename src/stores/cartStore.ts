import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { addToCart } from '../services/shopify';
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
}

interface CartStore {
  // State
  cartItems: CartItem[];
  isDrawerOpen: boolean;
  isLoading: boolean;
  
  // Actions
  addToCart: (item: Omit<CartItem, 'id'>) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  
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

      // Add to cart with Shopify sync
      addToCart: async (item) => {
        const id = `${item.title}-${item.variant || 'default'}`;
        
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

        // Sync with Shopify
        if (item.variantId) {
          try {
            set({ isLoading: true });
            await addToCart(item.variantId, item.quantity);
          } catch (error) {
            console.error('Failed to sync with Shopify:', error);
          } finally {
            set({ isLoading: false });
          }
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
            await addToCart(item.variantId, quantity);
          } catch (error) {
            console.error('Failed to sync with Shopify:', error);
          } finally {
            set({ isLoading: false });
          }
        }
      },

      // Remove from cart
      removeFromCart: (id: string) => {
        set((state) => ({
          cartItems: state.cartItems.filter(item => item.id !== id)
        }));
      },

      // Clear cart
      clearCart: () => {
        set({ cartItems: [] });
      },

      // Drawer controls
      openDrawer: () => {
        set({ isDrawerOpen: true });
        document.body.classList.add('overflow-hidden');
      },

      closeDrawer: () => {
        set({ isDrawerOpen: false });
        document.body.classList.remove('overflow-hidden');
      },

      toggleDrawer: () => {
        const { isDrawerOpen } = get();
        if (isDrawerOpen) {
          get().closeDrawer();
        } else {
          get().openDrawer();
        }
      },

      // Computed values
      getTotalItems: () => {
        return get().cartItems.reduce((total, item) => total + item.quantity, 0);
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
      name: 'cart-storage', // localStorage key
      partialize: (state) => ({ cartItems: state.cartItems }), // Only persist cart items
    }
  )
);
