import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import Button from '../UI/Button';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => Promise<void>;
  onSignup: (username: string, email: string, password: string) => Promise<void>;
  isLoading: boolean;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin, onSignup, isLoading }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLoginMode) {
        await onLogin(formData.email, formData.password);
      } else {
        await onSignup(formData.username, formData.email, formData.password);
      }
      onClose();
      setFormData({ username: '', email: '', password: '' });
    } catch (err) {
      setError('Authentication failed. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg w-full max-w-md p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95 hover:rotate-90"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-white text-2xl font-bold mb-2">
            {isLoginMode ? 'Welcome Back' : 'Join VideoHub'}
          </h2>
          <p className="text-gray-400">
            {isLoginMode ? 'Sign in to your account' : 'Create your account to get started'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginMode && (
            <div>
              <label htmlFor="username" className="block text-gray-300 text-sm font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required={!isLoginMode}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none transition-colors"
                placeholder="Enter your username"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none transition-colors"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none transition-colors"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-red-400 text-sm bg-red-900 bg-opacity-20 p-3 rounded-lg">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="absolute top-4 right-1 text-gray-400 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-90 active:scale-95  p-1 rounded-lg hover:bg-gray-800"
            variant="primary"
            size="lg"
            fullWidth
            loading={isLoading}
          >
            {isLoading ? 'Loading...' : (isLoginMode ? 'Sign In' : 'Create Account')}
          </Button>
        </form>

        {/* Toggle mode */}
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            {isLoginMode ? "Don't have an account?" : 'Already have an account?'}
            <Button
              onClick={() => {
                setIsLoginMode(!isLoginMode);
                setError('');
                setFormData({ username: '', email: '', password: '' });
              }}
              variant="ghost"
              size="sm"
              className="ml-2 text-orange-500 hover:text-orange-400"
            >
              {isLoginMode ? 'Sign Up' : 'Sign In'}
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;