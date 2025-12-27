import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Select from '../components/common/Select';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'technician',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      login(formData.email, formData.password, formData.role);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const roleOptions = [
    { value: 'technician', label: 'Technician' },
    { value: 'manager', label: 'Manager' },
    { value: 'admin', label: 'Administrator' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-2xl">G</span>
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold text-secondary-900">
                  GearGuard
                </h1>
              </div>
            </Link>
            
            <h2 className="text-3xl font-display font-bold text-secondary-900">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-secondary-600">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-primary-600 hover:text-primary-500">
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-danger-50 border border-danger-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="text-danger-600 flex-shrink-0 mt-0.5" size={20} />
                  <p className="text-sm text-danger-700">{error}</p>
                </div>
              )}

              <Input
                label="Email address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@company.com"
                icon={<Mail size={20} />}
                required
              />

              <Input
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                icon={<Lock size={20} />}
                required
              />

              <Select
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                options={roleOptions}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-secondary-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                    Forgot password?
                  </a>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                loading={loading}
              >
                Sign in
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-secondary-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-secondary-500">Demo Credentials</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFormData({ email: 'admin@company.com', password: 'admin', role: 'admin' })}
                >
                  Admin
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFormData({ email: 'manager@company.com', password: 'manager', role: 'manager' })}
                >
                  Manager
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFormData({ email: 'tech@company.com', password: 'tech', role: 'technician' })}
                >
                  Tech
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Image/Branding */}
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800">
          <div className="h-full w-full flex flex-col items-center justify-center text-white p-12">
            <div className="max-w-md">
              <h2 className="text-4xl font-display font-bold mb-6">
                Manage maintenance like never before
              </h2>
              <p className="text-xl text-primary-100 mb-8">
                Track equipment, manage teams, and streamline your maintenance operations all in one place.
              </p>
              <div className="space-y-4">
                {[
                  'Real-time equipment tracking',
                  'Smart maintenance scheduling',
                  'Team collaboration tools',
                  'Comprehensive reporting',
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary-400 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-lg">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
