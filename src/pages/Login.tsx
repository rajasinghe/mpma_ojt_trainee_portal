import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, Eye, EyeOff, Users } from 'lucide-react';
import { ValidatedInput } from '../components/ui/FormField';
import { useFormValidation } from '../hooks/useFormValidation';
import { loginSchema, type LoginFormData } from '../lib/validations';

export default function Login() {
  const { user, login } = useAuth();
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const { errors, isSubmitting, handleSubmit, getFieldError } = useFormValidation({
    schema: loginSchema,
    onSubmit: async (data: LoginFormData) => {
      setLoginError('');
      try {
        const success = await login(data.username, data.password);
        if (!success) {
          setLoginError('Invalid username or password');
        }
      } catch (err) {
        setLoginError('Login failed. Please try again.');
      }
    }
  });

  if (user) {
    if (!user.hasCompletedOnboarding) {
      return <Navigate to="/onboarding" replace />;
    }

    if (user.hasCompletedOnboarding) {
      return <Navigate to="/trainee" replace />;
    }
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%)' }}>
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <Users className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            OJT Portal
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your training account
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow-xl rounded-xl border border-gray-200">
          <form className="space-y-6" onSubmit={onSubmit}>
            <ValidatedInput
              label="Username"
              type="text"
              required
              value={formData.username}
              onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
              error={getFieldError('username')}
              placeholder="Enter your username"
            />

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className={`block w-full px-4 py-3 pr-10 rounded-lg shadow-sm border transition-all duration-300 hover:border-gray-400 focus:shadow-lg focus:outline-none ${
                    getFieldError('password')
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                  } bg-white text-gray-900 placeholder-gray-400`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
              {getFieldError('password') && (
                <p className="text-sm text-red-600 font-medium">{getFieldError('password')}</p>
              )}
            </div>

            {loginError && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-sm text-red-600">{loginError}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <>
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </>
              )}
            </button>

            <div className="text-center">
              <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}