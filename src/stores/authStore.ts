import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Customer, loginCustomer, registerCustomer, logoutCustomer, checkAuthStatus, activateCustomer } from '../services/auth';

interface AuthStore {
  // State
  customer: Customer | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  login: (email: string, password: string) => Promise<{ success: boolean; errors?: string[] }>;
  register: (data: { firstName: string; lastName: string; email: string; password: string; acceptsMarketing?: boolean }) => Promise<{ success: boolean; errors?: string[] }>;
  activate: (activationUrl: string, password: string) => Promise<{ success: boolean; errors?: string[] }>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  setCustomer: (customer: Customer | null) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // Initial state
      customer: null,
      isAuthenticated: false,
      isLoading: false,

      // Login
      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        try {
          const response = await loginCustomer({ email, password });
          
          if (response.success && response.customer) {
            set({
              customer: response.customer,
              isAuthenticated: true,
              isLoading: false
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
              isLoading: false
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
              isLoading: false
            });
          } else {
            set({
              customer: null,
              isAuthenticated: false,
              isLoading: false
            });
          }
        } catch (error) {
          set({
            customer: null,
            isAuthenticated: false,
            isLoading: false
          });
        }
      },

      // Set customer (for manual updates)
      setCustomer: (customer: Customer | null) => {
        set({
          customer,
          isAuthenticated: !!customer
        });
      },

      // Set authenticated status
      setAuthenticated: (isAuthenticated: boolean) => {
        set({ isAuthenticated });
      },
    }),
    {
      name: 'auth-storage', // localStorage key
      partialize: (state) => ({ 
        customer: state.customer, 
        isAuthenticated: state.isAuthenticated 
      }), // Only persist customer and auth status
    }
  )
);
