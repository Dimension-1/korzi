import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { recoverPassword, LoginCredentials, RegisterData } from '../services/auth';
import { useAuthStore } from '../stores/authStore';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isRecovering, setIsRecovering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState('');
  
  const navigate = useNavigate();
  const { login, register, isAuthenticated } = useAuthStore();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Form states
  const [loginForm, setLoginForm] = useState<LoginCredentials>({
    email: '',
    password: ''
  });

  const [registerForm, setRegisterForm] = useState<RegisterData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    acceptsMarketing: false
  });

  const [recoverForm, setRecoverForm] = useState({
    email: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);
    setSuccessMessage('');

    try {
      const success = await login(loginForm.email, loginForm.password);
      
      if (success) {
        setSuccessMessage('Login successful! Redirecting...');
        // Redirect to home page
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        setErrors(['Invalid email or password']);
      }
    } catch (error) {
      setErrors(['An unexpected error occurred']);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);
    setSuccessMessage('');

    try {
      const success = await register(registerForm);
      
      if (success) {
        setSuccessMessage('Registration successful! Please check your email to verify your account.');
        // Auto-switch to login after successful registration
        setTimeout(() => {
          setIsLogin(true);
          setSuccessMessage('');
        }, 3000);
      } else {
        setErrors(['Registration failed. Please try again.']);
      }
    } catch (error) {
      setErrors(['An unexpected error occurred']);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecoverPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);
    setSuccessMessage('');

    try {
      const response = await recoverPassword(recoverForm.email);
      
      if (response.success) {
        setSuccessMessage(response.message || 'Password recovery email sent!');
        setIsRecovering(false);
      } else {
        setErrors(response.errors || ['Password recovery failed']);
      }
    } catch (error) {
      setErrors(['An unexpected error occurred']);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForms = () => {
    setLoginForm({ email: '', password: '' });
    setRegisterForm({ firstName: '', lastName: '', email: '', password: '', acceptsMarketing: false });
    setRecoverForm({ email: '' });
    setErrors([]);
    setSuccessMessage('');
  };

  return (
    <div className="h-auto bg-[var(--background)] flex items-center justify-center px-4 sm:px-6 md:px-8 pt-10 sm:pt-12 md:pt-14 lg:pt-16">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
            {isRecovering ? 'Reset Password' : isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-[var(--text-secondary)]">
            {isRecovering 
              ? 'Enter your email to receive password reset instructions'
              : isLogin 
                ? 'Sign in to your account to continue'
                : 'Sign up to get started with your account'
            }
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-[var(--primary)]/10 border border-[var(--primary)]/30 rounded-lg">
            <p className="text-[var(--primary)] text-sm">{successMessage}</p>
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

        {/* Forms */}
        {isRecovering ? (
          /* Password Recovery Form */
          <form onSubmit={handleRecoverPassword} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)] w-5 h-5" />
                <input
                  type="email"
                  value={recoverForm.email}
                  onChange={(e) => setRecoverForm({ ...recoverForm, email: e.target.value })}
                  placeholder="Enter your email address"
                  className="w-full pl-12 pr-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--foreground)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--primary)] transition-colors"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[var(--primary)] text-[var(--background)] py-3 rounded-lg font-semibold hover:bg-[var(--secondary)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending...' : 'Send Reset Email'}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setIsRecovering(false);
                  resetForms();
                }}
                className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
              >
                Back to Sign In
              </button>
            </div>
          </form>
        ) : (
          <>
            {/* Login Form */}
            {isLogin ? (
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)] w-5 h-5" />
                    <input
                      type="email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      placeholder="Email address"
                      className="w-full pl-12 pr-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--foreground)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--primary)] transition-colors"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)] w-5 h-5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      placeholder="Password"
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

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <input type="checkbox" className="rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]" />
                    Remember me
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsRecovering(true);
                      resetForms();
                    }}
                    className="text-sm text-[var(--primary)] hover:text-[var(--secondary)] transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[var(--primary)] text-[var(--background)] py-3 rounded-lg font-semibold hover:bg-[var(--secondary)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </button>

                <div className="text-center">
                  <span className="text-[var(--text-secondary)]">Don't have an account? </span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(false);
                      resetForms();
                    }}
                    className="text-[var(--primary)] hover:text-[var(--secondary)] transition-colors font-semibold"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            ) : (
              /* Registration Form */
              <form onSubmit={handleRegister} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)] w-5 h-5" />
                      <input
                        type="text"
                        value={registerForm.firstName}
                        onChange={(e) => setRegisterForm({ ...registerForm, firstName: e.target.value })}
                        placeholder="First name"
                        className="w-full pl-12 pr-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--foreground)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--primary)] transition-colors"
                        required
                      />
                    </div>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)] w-5 h-5" />
                      <input
                        type="text"
                        value={registerForm.lastName}
                        onChange={(e) => setRegisterForm({ ...registerForm, lastName: e.target.value })}
                        placeholder="Last name"
                        className="w-full pl-12 pr-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--foreground)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--primary)] transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)] w-5 h-5" />
                    <input
                      type="email"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                      placeholder="Email address"
                      className="w-full pl-12 pr-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--foreground)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--primary)] transition-colors"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)] w-5 h-5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                      placeholder="Password"
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

                <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                  <input
                    type="checkbox"
                    checked={registerForm.acceptsMarketing}
                    onChange={(e) => setRegisterForm({ ...registerForm, acceptsMarketing: e.target.checked })}
                    className="rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]"
                  />
                  <span>I want to receive marketing emails and updates</span>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[var(--primary)] text-[var(--background)] py-3 rounded-lg font-semibold hover:bg-[var(--secondary)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>

                <div className="text-center">
                  <span className="text-[var(--text-secondary)]">Already have an account? </span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(true);
                      resetForms();
                    }}
                    className="text-[var(--primary)] hover:text-[var(--secondary)] transition-colors font-semibold"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            )}
          </>
        )}

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-[var(--text-secondary)]">
            By continuing, you agree to our{' '}
            <Link to="/terms" className="text-[var(--primary)] hover:text-[var(--secondary)] transition-colors">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-[var(--primary)] hover:text-[var(--secondary)] transition-colors">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
