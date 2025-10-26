import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Customer, loginCustomer, registerCustomer, logoutCustomer, checkAuthStatus, activateCustomer } from '../services/auth';

interface AuthStore {
  // State
  customer: Customer | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Persisted state (minimal)
  customerId: string | null;
  customerEmail: string | null;
  
  // Actions
  login: (email: string, password: string) => Promise<{ success: boolean; errors?: string[] }>;
  register: (data: { firstName: string; lastName: string; email: string; password: string; acceptsMarketing?: boolean }) => Promise<{ success: boolean; errors?: string[] }>;
  activate: (activationUrl: string, password: string) => Promise<{ success: boolean; errors?: string[] }>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  setCustomer: (customer: Customer | null) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  restoreFromPersistence: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      customer: null,
      isAuthenticated: false,
      isLoading: false,
      customerId: null,
      customerEmail: null,

      // Login
      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        try {
          const response = await loginCustomer({ email, password });
          
          if (response.success && response.customer) {
            set({
              customer: response.customer,
              isAuthenticated: true,
              isLoading: false,
              customerId: response.customer.id,
              customerEmail: response.customer.email
            });
            return { success: true };
          } else {
            set({ isLoading: false });
            return { 
              success: false, 
              errors: response.errors || ['Login failed'] 
            };
          }
        } catch (error) {
          set({ isLoading: false });
          return { 
            success: false, 
            errors: ['An unexpected error occurred'] 
          };
        }
      },

      // Register
      register: async (data) => {
        set({ isLoading: true });
        
        try {
          const response = await registerCustomer(data);
          
          if (response.success) {
            set({ isLoading: false });
            return { success: true };
          } else {
            set({ isLoading: false });
            return { 
              success: false, 
              errors: response.errors || ['Registration failed'] 
            };
          }
        } catch (error) {
          set({ isLoading: false });
          return { 
            success: false, 
            errors: ['An unexpected error occurred'] 
          };
        }
      },

      // Activate
      activate: async (activationUrl, password) => {
        set({ isLoading: true });
        
        try {
          const response = await activateCustomer(activationUrl, password);
          
          if (response.success && response.customer) {
            set({
              customer: response.customer,
              isAuthenticated: true,
              isLoading: false,
              customerId: response.customer.id,
              customerEmail: response.customer.email
            });
            return { success: true };
          } else {
            set({ isLoading: false });
            return { 
              success: false, 
              errors: response.errors || ['Activation failed'] 
            };
          }
        } catch (error) {
          set({ isLoading: false });
          return { 
            success: false, 
            errors: ['An unexpected error occurred'] 
          };
        }
      },

      // Logout
      logout: async () => {
        set({ isLoading: true });
        
        try {
          await logoutCustomer();
          set({
            customer: null,
            isAuthenticated: false,
            isLoading: false
          });
        } catch (error) {
          // Even if logout fails on server, clear local state
          set({
            customer: null,
            isAuthenticated: false,
            isLoading: false
          });
        }
      },

      // Check authentication status
      checkAuth: async () => {
        set({ isLoading: true });
        
        try {
          const response = await checkAuthStatus();
          
          if (response.success && response.customer) {
            set({
              customer: response.customer,
              isAuthenticated: true,
              isLoading: false,
              customerId: response.customer.id,
              customerEmail: response.customer.email
            });
          } else {
            set({
              customer: null,
              isAuthenticated: false,
              isLoading: false,
              customerId: null,
              customerEmail: null
            });
          }
        } catch (error) {
          set({
            customer: null,
            isAuthenticated: false,
            isLoading: false,
            customerId: null,
            customerEmail: null
          });
        }
      },

      // Set customer (for manual updates)
      setCustomer: (customer: Customer | null) => {
        set({
          customer,
          isAuthenticated: !!customer,
          customerId: customer?.id || null,
          customerEmail: customer?.email || null
        });
      },

      // Set authenticated status
      setAuthenticated: (isAuthenticated: boolean) => {
        set({ isAuthenticated });
      },

      // Restore customer data from persisted minimal data
      restoreFromPersistence: async () => {
        const state = get();
        
        // Validate persisted data
        const isValidPersistedData = (
          typeof state.isAuthenticated === 'boolean' &&
          (state.customerId === null || typeof state.customerId === 'string') &&
          (state.customerEmail === null || typeof state.customerEmail === 'string')
        );
        
        if (!isValidPersistedData) {
          console.warn('Invalid persisted auth data detected, clearing...');
          set({
            customer: null,
            isAuthenticated: false,
            isLoading: false,
            customerId: null,
            customerEmail: null
          });
          return;
        }
        
        // If we have persisted auth data but no full customer object
        if (state.isAuthenticated && state.customerId && !state.customer) {
          try {
            set({ isLoading: true });
            
            // Fetch full customer data from Shopify
            const response = await checkAuthStatus();
            
            if (response.success && response.customer) {
              set({
                customer: response.customer,
                isAuthenticated: true,
                isLoading: false,
                customerId: response.customer.id,
                customerEmail: response.customer.email
              });
            } else {
              // Clear invalid persisted data
              console.warn('Failed to restore customer data, clearing persisted state...');
              set({
                customer: null,
                isAuthenticated: false,
                isLoading: false,
                customerId: null,
                customerEmail: null
              });
            }
          } catch (error) {
            console.error('Failed to restore customer data:', error);
            // Clear invalid persisted data
            set({
              customer: null,
              isAuthenticated: false,
              isLoading: false,
              customerId: null,
              customerEmail: null
            });
          }
        }
      },
    }),
    {
      name: 'auth-storage', // localStorage key
      partialize: (state) => ({ 
        // Only persist essential auth data, not full customer object
        isAuthenticated: state.isAuthenticated,
        customerId: state.customer?.id || null, // Only customer ID, not full data
        customerEmail: state.customer?.email || null // Only email for display
      }), // Minimal persistence - full customer data fetched from Shopify
    }
  )
);
