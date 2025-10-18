import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, Lock, CheckCircle } from 'lucide-react';
import { activateCustomer } from '../services/auth';
import { useAuthStore } from '../stores/authStore';

export default function CustomerActivationPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [isActivated, setIsActivated] = useState(false);
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setCustomer, setAuthenticated } = useAuthStore();

  // Get activation URL from query parameters
  const activationUrl = searchParams.get('url') || '';

  // Redirect if already authenticated
  useEffect(() => {
    if (isActivated) {
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }, [isActivated, navigate]);

  // Form state
  const [activationForm, setActivationForm] = useState({
    password: '',
    confirmPassword: ''
  });

  const handleActivation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);
    setSuccessMessage('');

    // Validate passwords match
    if (activationForm.password !== activationForm.confirmPassword) {
      setErrors(['Passwords do not match. Please try again.']);
      setIsLoading(false);
      return;
    }

    // Validate password length
    if (activationForm.password.length < 6) {
      setErrors(['Password must be at least 6 characters long.']);
      setIsLoading(false);
      return;
    }

    try {
      const result = await activateCustomer(activationUrl, activationForm.password);
      console.log('Activation result:', result);
      
      if (result.success && result.customer) {
        setSuccessMessage('Account activated successfully! You are now logged in.');
        setIsActivated(true);
        
        // Update auth store
        setCustomer(result.customer);
        setAuthenticated(true);
      } else {
        // Show specific error messages from the authentication service
        setErrors(result.errors || ['Account activation failed. Please try again.']);
      }
    } catch (error) {
      console.error('Activation error:', error);
      setErrors(['An unexpected error occurred. Please try again.']);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setActivationForm({ password: '', confirmPassword: '' });
    setErrors([]);
    setSuccessMessage('');
  };

  // If no activation URL provided, show error
  if (!activationUrl) {
    return (
      <div className="h-auto bg-[var(--background)] flex items-center justify-center px-4 sm:px-6 md:px-8 pt-10 sm:pt-12 md:pt-14 lg:pt-16">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
              Invalid Activation Link
            </h1>
            <p className="text-[var(--text-secondary)]">
              The activation link is missing or invalid. Please check your email for the correct activation link.
            </p>
          </div>
          
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-400 text-sm">
              No activation URL provided. Please use the link from your activation email.
            </p>
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate('/login')}
              className="text-[var(--primary)] hover:text-[var(--secondary)] transition-colors font-semibold"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-auto bg-[var(--background)] flex items-center justify-center px-4 sm:px-6 md:px-8 pt-10 sm:pt-12 md:pt-14 lg:pt-16">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
            {isActivated ? 'Account Activated!' : 'Activate Your Account'}
          </h1>
          <p className="text-[var(--text-secondary)]">
            {isActivated 
              ? 'Your account has been successfully activated. Redirecting...'
              : 'Set your password to complete your account activation'
            }
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-[var(--primary)]/10 border border-[var(--primary)]/30 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[var(--primary)]" />
              <p className="text-[var(--primary)] text-sm">{successMessage}</p>
            </div>
          </div>
        )}

        {/* Error Messages */}
        {errors.length > 0 && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <ul className="text-red-400 text-sm space-y-1">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Activation Form */}
        {!isActivated && (
          <form onSubmit={handleActivation} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)] w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={activationForm.password}
                  onChange={(e) => setActivationForm({ ...activationForm, password: e.target.value })}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--foreground)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--primary)] transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
                >
                  {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)] w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={activationForm.confirmPassword}
                  onChange={(e) => setActivationForm({ ...activationForm, confirmPassword: e.target.value })}
                  placeholder="Confirm your password"
                  className="w-full pl-12 pr-12 py-3 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--foreground)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--primary)] transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
                >
                  {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="text-sm text-[var(--text-secondary)]">
              <p>Password requirements:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>At least 6 characters long</li>
                <li>Choose a strong, unique password</li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[var(--primary)] text-[var(--background)] py-3 rounded-lg font-semibold hover:bg-[var(--secondary)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Activating Account...' : 'Activate Account'}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={resetForm}
                className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
              >
                Clear Form
              </button>
            </div>
          </form>
        )}

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-[var(--text-secondary)]">
            Having trouble?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-[var(--primary)] hover:text-[var(--secondary)] transition-colors"
            >
              Contact Support
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
