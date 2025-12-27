import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await login(formData.email, formData.password);

            if (result.success) {
                navigate('/dashboard');
            } else {
                setError(result.error || 'Invalid credentials. Please try again.');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
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

    return (
        <div className="min-h-screen flex">
            {/* Left side - Form */}
            <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div>
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

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-secondary-700">
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
                                className="w-full"
                                loading={loading}
                            >
                                Sign in
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Right side - Image/Brand */}
            <div className="hidden lg:block relative w-0 flex-1">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute inset-0 flex items-center justify-center p-12">
                        <div className="text-center text-white">
                            <Link to="/" className="flex items-center justify-center gap-3 mb-8">
                                <div className="w-15 h-15 bg-gradient-primary rounded-lg flex items-center justify-center p-0">
                                    <img
                                        src="/logo.jpg"
                                        alt="GearGuard logo"
                                        className="w-15 h-15 object-contain rounded-lg"
                                    />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-display font-bold text-white-900">
                                        GearGuard
                                    </h1>
                                </div>
                            </Link>
                            <h2 className="text-4xl font-display font-bold mb-4">
                                Maintenance Made Simple
                            </h2>
                            <p className="text-xl text-primary-100 max-w-md">
                                Track equipment, manage teams, and streamline your maintenance workflow.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
