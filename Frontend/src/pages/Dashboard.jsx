// src/pages/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Users,
  ClipboardList,
  AlertTriangle,
  TrendingUp,
  Calendar,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';

const Dashboard = () => {
  const { equipment, teams, requests } = useApp();

  // Calculate statistics
  const stats = {
    totalEquipment: equipment.length,
    operationalEquipment: equipment.filter(eq => eq.status === 'operational').length,
    totalTeams: teams.length,
    totalRequests: requests.length,
    newRequests: requests.filter(req => req.status === 'new').length,
    inProgressRequests: requests.filter(req => req.status === 'in-progress').length,
    completedRequests: requests.filter(req => req.status === 'repaired').length,
    highPriorityRequests: requests.filter(req => req.priority === 'high').length,
  };

  const statsCards = [
    {
      title: 'Total Equipment',
      value: stats.totalEquipment,
      subtitle: `${stats.operationalEquipment} operational`,
      icon: <Package size={24} />,
      color: 'primary',
      link: '/equipment',
    },
    {
      title: 'Maintenance Teams',
      value: stats.totalTeams,
      subtitle: 'Active teams',
      icon: <Users size={24} />,
      color: 'success',
      link: '/teams',
    },
    {
      title: 'Active Requests',
      value: stats.newRequests + stats.inProgressRequests,
      subtitle: `${stats.newRequests} new, ${stats.inProgressRequests} in progress`,
      icon: <ClipboardList size={24} />,
      color: 'warning',
      link: '/requests',
    },
    {
      title: 'High Priority',
      value: stats.highPriorityRequests,
      subtitle: 'Urgent requests',
      icon: <AlertTriangle size={24} />,
      color: 'danger',
      link: '/requests',
    },
  ];

  // Get recent requests
  const recentRequests = requests
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  // Get upcoming maintenance
  const upcomingMaintenance = requests
    .filter(req => req.type === 'preventive' && req.status !== 'repaired')
    .sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-secondary-900">
          Dashboard
        </h1>
        <p className="text-secondary-600 mt-1">
          Overview of your maintenance operations
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <Link key={index} to={stat.link}>
            <Card hover className="h-full">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-secondary-900 mt-2">
                    {stat.value}
                  </p>
                  <p className="text-xs text-secondary-500 mt-1">
                    {stat.subtitle}
                  </p>
                </div>
                <div className={`p-3 bg-${stat.color}-100 text-${stat.color}-600 rounded-lg`}>
                  {stat.icon}
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Requests */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-secondary-900">
              Recent Requests
            </h2>
            <Link to="/requests">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </div>

          <div className="space-y-4">
            {recentRequests.length > 0 ? (
              recentRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-start gap-4 p-4 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-secondary-900 truncate">
                        {request.subject}
                      </p>
                      <Badge variant={request.status} size="sm">
                        {request.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-secondary-600 mb-2">
                      {request.equipmentName}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-secondary-500">
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {new Date(request.createdAt).toLocaleDateString()}
                      </span>
                      {request.priority === 'high' && (
                        <Badge variant="danger" size="sm">High Priority</Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-secondary-500 text-center py-8">
                No recent requests
              </p>
            )}
          </div>
        </Card>

        {/* Upcoming Maintenance */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-secondary-900">
              Upcoming Maintenance
            </h2>
            <Link to="/calendar">
              <Button variant="ghost" size="sm">View Calendar</Button>
            </Link>
          </div>

          <div className="space-y-4">
            {upcomingMaintenance.length > 0 ? (
              upcomingMaintenance.map((maintenance) => (
                <div
                  key={maintenance.id}
                  className="flex items-start gap-4 p-4 bg-primary-50 rounded-lg"
                >
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <Calendar size={20} className="text-primary-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-secondary-900 truncate">
                      {maintenance.subject}
                    </p>
                    <p className="text-xs text-secondary-600 mb-1">
                      {maintenance.equipmentName}
                    </p>
                    <p className="text-xs text-primary-600 font-medium">
                      {new Date(maintenance.scheduledDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-secondary-500 text-center py-8">
                No upcoming maintenance scheduled
              </p>
            )}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <h2 className="text-xl font-semibold text-secondary-900 mb-6">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/equipment">
            <button className="w-full p-4 bg-secondary-50 hover:bg-secondary-100 rounded-lg transition-colors text-left">
              <Package className="text-primary-600 mb-2" size={24} />
              <p className="font-medium text-secondary-900">Add Equipment</p>
              <p className="text-xs text-secondary-600 mt-1">
                Register new equipment
              </p>
            </button>
          </Link>

          <Link to="/requests">
            <button className="w-full p-4 bg-secondary-50 hover:bg-secondary-100 rounded-lg transition-colors text-left">
              <ClipboardList className="text-success-600 mb-2" size={24} />
              <p className="font-medium text-secondary-900">Create Request</p>
              <p className="text-xs text-secondary-600 mt-1">
                Report new issue
              </p>
            </button>
          </Link>

          <Link to="/teams">
            <button className="w-full p-4 bg-secondary-50 hover:bg-secondary-100 rounded-lg transition-colors text-left">
              <Users className="text-warning-600 mb-2" size={24} />
              <p className="font-medium text-secondary-900">Manage Teams</p>
              <p className="text-xs text-secondary-600 mt-1">
                View team members
              </p>
            </button>
          </Link>

          <Link to="/calendar">
            <button className="w-full p-4 bg-secondary-50 hover:bg-secondary-100 rounded-lg transition-colors text-left">
              <Calendar className="text-danger-600 mb-2" size={24} />
              <p className="font-medium text-secondary-900">View Calendar</p>
              <p className="text-xs text-secondary-600 mt-1">
                See scheduled tasks
              </p>
            </button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
