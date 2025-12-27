import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Select from '../components/common/Select';

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'technician',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      signup(formData.email, formData.password, formData.name, formData.role);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create account. Please try again.');
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
              Create your account
            </h2>
            <p className="mt-2 text-sm text-secondary-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                Sign in
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
                label="Full name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                icon={<User size={20} />}
                required
              />

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
                helperText="Must be at least 6 characters"
                required
              />

              <Input
                label="Confirm password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
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
                helperText="Select your role in the organization"
              />

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-secondary-900">
                  I agree to the{' '}
                  <a href="#" className="text-primary-600 hover:text-primary-500">
                    Terms and Conditions
                  </a>
                </label>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                loading={loading}
              >
                Create account
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Right side - Image/Branding */}
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 bg-gradient-to-br from-success-600 to-success-800">
          <div className="h-full w-full flex flex-col items-center justify-center text-white p-12">
            <div className="max-w-md">
              <h2 className="text-4xl font-display font-bold mb-6">
                Join thousands of teams
              </h2>
              <p className="text-xl text-success-100 mb-8">
                Start managing your equipment maintenance efficiently with GearGuard today.
              </p>
              <div className="bg-success-700/30 backdrop-blur-sm rounded-xl p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-success-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📊</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Track Everything</h3>
                    <p className="text-success-100 text-sm">
                      Monitor all your equipment and maintenance activities in one place
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-success-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">👥</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Collaborate Better</h3>
                    <p className="text-success-100 text-sm">
                      Work seamlessly with your team on maintenance tasks
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-success-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Reduce Downtime</h3>
                    <p className="text-success-100 text-sm">
                      Prevent equipment failures with smart scheduling
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
