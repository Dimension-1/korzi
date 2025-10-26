import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { OrderData, OrderResponse, CustomerInfo, ShippingAddress } from '../services/orders';

interface OrderStore {
  // State
  currentOrder: OrderData | null;
  orderHistory: Array<{
    id: string;
    orderNumber: string;
    status: string;
    totalAmount: number;
    createdAt: string;
    items: any[];
  }>;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setCurrentOrder: (order: OrderData) => void;
  clearCurrentOrder: () => void;
  addToOrderHistory: (order: any) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Order management
  updateCustomerInfo: (customer: CustomerInfo) => void;
  updateShippingAddress: (address: ShippingAddress) => void;
  placeOrder: () => Promise<OrderResponse>;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      // Initial state
      currentOrder: null,
      orderHistory: [],
      isLoading: false,
      error: null,

      // Set current order
      setCurrentOrder: (order: OrderData) => {
        set({ currentOrder: order, error: null });
      },

      // Clear current order
      clearCurrentOrder: () => {
        set({ currentOrder: null, error: null });
      },

      // Add to order history
      addToOrderHistory: (order) => {
        set((state) => ({
          orderHistory: [order, ...state.orderHistory]
        }));
      },

      // Set loading state
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      // Set error
      setError: (error: string | null) => {
        set({ error });
      },

      // Update customer info
      updateCustomerInfo: (customer: CustomerInfo) => {
        const currentOrder = get().currentOrder;
        if (currentOrder) {
          set({
            currentOrder: {
              ...currentOrder,
              customer
            }
          });
        }
      },

      // Update shipping address
      updateShippingAddress: (address: ShippingAddress) => {
        const currentOrder = get().currentOrder;
        if (currentOrder) {
          set({
            currentOrder: {
              ...currentOrder,
              shippingAddress: address
            }
          });
        }
      },

      // Place order
      placeOrder: async (): Promise<OrderResponse> => {
        const currentOrder = get().currentOrder;
        if (!currentOrder) {
          return {
            success: false,
            errors: ['No order data available']
          };
        }

        set({ isLoading: true, error: null });

        try {
          // Import the placeOrder function dynamically to avoid circular imports
          const { placeOrder } = await import('../services/orders');
          const result = await placeOrder(currentOrder);

          if (result.success) {
            // Add to order history
            get().addToOrderHistory({
              id: result.orderId!,
              orderNumber: result.orderNumber!,
              status: 'confirmed',
              totalAmount: currentOrder.totalAmount,
              createdAt: new Date().toISOString(),
              items: currentOrder.items
            });

            // Clear current order
            get().clearCurrentOrder();
          }

          return result;
        } catch (error) {
          const errorMessage = 'Failed to place order. Please try again.';
          set({ error: errorMessage });
          return {
            success: false,
            errors: [errorMessage]
          };
        } finally {
          set({ isLoading: false });
        }
      }
    }),
    {
      name: 'order-store',
      partialize: (state) => ({
        // Don't persist order history - it can be fetched from Shopify when needed
        // Only persist essential order state temporarily
      })
    }
  )
);

