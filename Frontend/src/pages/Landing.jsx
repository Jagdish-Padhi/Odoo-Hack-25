import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Wrench, 
  Calendar, 
  Users, 
  BarChart3,
  ArrowRight,
  Shield,
  Zap
} from 'lucide-react';
import Button from '../components/common/Button';

const Landing = () => {
  const features = [
    {
      icon: <Wrench size={24} />,
      title: 'Equipment Tracking',
      description: 'Track all your assets in one place with detailed records and maintenance history.',
    },
    {
      icon: <Users size={24} />,
      title: 'Team Management',
      description: 'Organize specialized teams and assign maintenance tasks efficiently.',
    },
    {
      icon: <Calendar size={24} />,
      title: 'Smart Scheduling',
      description: 'Schedule preventive maintenance and never miss critical service dates.',
    },
    {
      icon: <BarChart3 size={24} />,
      title: 'Insights & Reports',
      description: 'Get actionable insights with comprehensive maintenance analytics.',
    },
    {
      icon: <Shield size={24} />,
      title: 'Warranty Management',
      description: 'Track warranty information and ensure timely claims.',
    },
    {
      icon: <Zap size={24} />,
      title: 'Real-time Updates',
      description: 'Stay informed with instant notifications and status updates.',
    },
  ];

  const benefits = [
    'Reduce equipment downtime by up to 40%',
    'Streamline maintenance workflows',
    'Extend asset lifespan',
    'Improve team productivity',
    'Comprehensive audit trails',
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <div>
                <h1 className="text-xl font-display font-bold text-secondary-900">
                  GearGuard
                </h1>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50 opacity-50"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-secondary-900 mb-6">
              The Ultimate
              <span className="block mt-2 bg-gradient-primary bg-clip-text text-transparent">
                Maintenance Tracker
              </span>
            </h1>
            
            <p className="text-xl text-secondary-600 mb-8 max-w-3xl mx-auto">
              Streamline your equipment maintenance, manage teams efficiently, and reduce downtime with our comprehensive maintenance management system.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button 
                  size="lg" 
                  variant="primary"
                  className="w-full sm:w-auto"
                  icon={<ArrowRight size={20} />}
                >
                  Start Free Trial
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Watch Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-secondary-900 mb-4">
              Everything you need to manage maintenance
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Powerful features designed to make equipment maintenance simple and efficient.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl border border-secondary-200 hover:border-primary-300 hover:shadow-lg transition-all duration-200"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-secondary-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-secondary-900 mb-6">
                Reduce costs and increase efficiency
              </h2>
              <p className="text-lg text-secondary-600 mb-8">
                GearGuard helps organizations optimize their maintenance operations and maximize equipment uptime.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="text-success-600 mt-1 flex-shrink-0" size={20} />
                    <span className="text-secondary-700">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <Link to="/signup">
                  <Button size="lg" variant="primary">
                    Get Started Now
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl p-8">
                <div className="bg-white rounded-xl shadow-xl p-6 h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Wrench size={48} className="text-white" />
                    </div>
                    <p className="text-2xl font-bold text-secondary-900">40%</p>
                    <p className="text-secondary-600">Reduction in Downtime</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-6">
            Ready to optimize your maintenance?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of companies already using GearGuard to streamline their operations.
          </p>
          <Link to="/signup">
            <Button size="lg" variant="secondary" className="bg-white text-primary-700 hover:bg-secondary-50">
              Start Your Free Trial
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">G</span>
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold">GearGuard</h3>
                </div>
              </div>
              <p className="text-secondary-400 text-sm">
                The ultimate maintenance tracking solution for modern businesses.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-secondary-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-secondary-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-secondary-400">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-secondary-800 mt-12 pt-8 text-center text-sm text-secondary-400">
            <p>&copy; 2024 GearGuard. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
