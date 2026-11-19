import { create } from 'zustand';
import { OrderData, OrderResponse, CustomerInfo, ShippingAddress } from '../services/orders';

interface OrderStore {
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
  
  setCurrentOrder: (order: OrderData) => void;
  clearCurrentOrder: () => void;
  addToOrderHistory: (order: any) => void;
  fetchOrderHistory: (email: string) => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateCustomerInfo: (customer: CustomerInfo) => void;
  updateShippingAddress: (address: ShippingAddress) => void;
  placeOrder: () => Promise<OrderResponse>;
  updateOrderWithTracking: (orderNumber: any, trackingInfo: any) => void;
}

export const useOrderStore = create<OrderStore>()((set, get) => ({
  currentOrder: null,
  orderHistory: [],
  isLoading: false,
  error: null,

  setCurrentOrder: (order: OrderData) => {
    set({ currentOrder: order, error: null });
  },

  clearCurrentOrder: () => {
    set({ currentOrder: null, error: null });
  },

  addToOrderHistory: (order) => {
    set((state) => ({
      orderHistory: [order, ...state.orderHistory]
    }));
  },

  updateOrderWithTracking: (orderNumber: string, trackingInfo: any) => {
    set((state) => ({
      orderHistory: state.orderHistory.map(order => 
        order.orderNumber === orderNumber 
          ? { ...order, ...trackingInfo }
          : order
      )
    }));
  },
  

  fetchOrderHistory: async (email: string) => {
    set({ isLoading: true, error: null });
    try {
      const { fetchOrderHistory } = await import('../services/orders');
      const orders = await fetchOrderHistory(email);
      set({ orderHistory: orders, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch order history', isLoading: false });
    }
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setError: (error: string | null) => {
    set({ error });
  },

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
      const { placeOrder } = await import('../services/orders');
      const result = await placeOrder(currentOrder);

      if (result.success) {
        get().addToOrderHistory({
          id: result.orderId!,
          orderNumber: result.orderNumber!,
          status: 'confirmed',
          totalAmount: currentOrder.totalAmount,
          createdAt: new Date().toISOString(),
          items: currentOrder.items
        });

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
}));
