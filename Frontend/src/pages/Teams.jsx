import React, { useState } from 'react';
import { Plus, Users as UsersIcon, Mail, Wrench } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import Input from '../components/common/Input';

const Teams = () => {
  const { teams, addTeam, getRequestsByTeam } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#3b82f6',
    members: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTeam(formData);
    setShowAddModal(false);
    resetForm();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      color: '#3b82f6',
      members: [],
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-secondary-900">
            Maintenance Teams
          </h1>
          <p className="text-secondary-600 mt-1">
            Manage your maintenance teams and members
          </p>
        </div>
        <Button
          variant="primary"
          icon={<Plus size={20} />}
          onClick={() => setShowAddModal(true)}
        >
          Add Team
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary-100 rounded-lg">
              <UsersIcon size={24} className="text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-secondary-600">Total Teams</p>
              <p className="text-3xl font-bold text-secondary-900">{teams.length}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-success-100 rounded-lg">
              <UsersIcon size={24} className="text-success-600" />
            </div>
            <div>
              <p className="text-sm text-secondary-600">Total Members</p>
              <p className="text-3xl font-bold text-secondary-900">
                {teams.reduce((acc, team) => acc + team.members.length, 0)}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-warning-100 rounded-lg">
              <Wrench size={24} className="text-warning-600" />
            </div>
            <div>
              <p className="text-sm text-secondary-600">Active Requests</p>
              <p className="text-3xl font-bold text-secondary-900">
                {teams.reduce((acc, team) => {
                  const requests = getRequestsByTeam(team.id);
                  return acc + requests.filter(r => r.status !== 'repaired' && r.status !== 'scrap').length;
                }, 0)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {teams.map((team) => {
          const requests = getRequestsByTeam(team.id);
          const activeRequests = requests.filter(r => r.status !== 'repaired' && r.status !== 'scrap');

          return (
            <Card key={team.id} hover onClick={() => setSelectedTeam(team)}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: team.color + '20' }}
                  >
                    <UsersIcon size={24} style={{ color: team.color }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900">
                      {team.name}
                    </h3>
                    <p className="text-sm text-secondary-600">
                      {team.members.length} member{team.members.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                {activeRequests.length > 0 && (
                  <Badge variant="warning" size="sm">
                    {activeRequests.length} active
                  </Badge>
                )}
              </div>

              <p className="text-sm text-secondary-600 mb-4">
                {team.description}
              </p>

              <div className="space-y-2">
                <p className="text-xs font-medium text-secondary-700 uppercase tracking-wide mb-2">
                  Team Members
                </p>
                {team.members.map((member) => (
                  <div key={member.id} className="flex items-center gap-3 p-2 bg-secondary-50 rounded-lg">
                    <img
                      src={`https://ui-avatars.com/api/?name=${member.name}&background=${team.color.slice(1)}&color=fff`}
                      alt={member.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-secondary-900 truncate">
                        {member.name}
                      </p>
                      <p className="text-xs text-secondary-600 truncate">
                        {member.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-secondary-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-secondary-600">Total Requests</span>
                  <span className="font-medium text-secondary-900">{requests.length}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Add Team Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          resetForm();
        }}
        title="Add New Team"
        size="md"
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Add Team
            </Button>
          </>
        }
      >
        <form className="space-y-4">
          <Input
            label="Team Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Electricians"
            required
          />

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1.5">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg border border-secondary-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:outline-none"
              placeholder="Brief description of the team's responsibilities"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1.5">
              Team Color
            </label>
            <div className="flex gap-3">
              <input
                type="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="w-20 h-10 rounded-lg border border-secondary-300 cursor-pointer"
              />
              <Input
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="#3b82f6"
                className="flex-1"
              />
            </div>
          </div>
        </form>
      </Modal>

      {/* Team Details Modal */}
      {selectedTeam && (
        <Modal
          isOpen={!!selectedTeam}
          onClose={() => setSelectedTeam(null)}
          title={selectedTeam.name}
          size="lg"
        >
          <div className="space-y-6">
            <div>
              <p className="text-sm text-secondary-600 mb-2">Description</p>
              <p className="text-secondary-900">{selectedTeam.description}</p>
            </div>

            <div>
              <h4 className="font-semibold text-secondary-900 mb-4">
                Team Members ({selectedTeam.members.length})
              </h4>
              <div className="space-y-3">
                {selectedTeam.members.map((member) => (
                  <div key={member.id} className="flex items-center gap-4 p-4 bg-secondary-50 rounded-lg">
                    <img
                      src={`https://ui-avatars.com/api/?name=${member.name}&background=${selectedTeam.color.slice(1)}&color=fff`}
                      alt={member.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-secondary-900">{member.name}</p>
                      <p className="text-sm text-secondary-600">{member.role}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-secondary-500">
                        <Mail size={12} />
                        <span>{member.email}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-secondary-200 pt-4">
              <h4 className="font-semibold text-secondary-900 mb-4">
                Active Requests ({getRequestsByTeam(selectedTeam.id).filter(r => r.status !== 'repaired' && r.status !== 'scrap').length})
              </h4>
              <div className="space-y-2">
                {getRequestsByTeam(selectedTeam.id)
                  .filter(r => r.status !== 'repaired' && r.status !== 'scrap')
                  .map(req => (
                    <div key={req.id} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-secondary-900">{req.subject}</p>
                        <p className="text-xs text-secondary-600">{req.equipmentName}</p>
                      </div>
                      <Badge variant={req.status} size="sm">{req.status}</Badge>
                    </div>
                  ))}
                {getRequestsByTeam(selectedTeam.id).filter(r => r.status !== 'repaired' && r.status !== 'scrap').length === 0 && (
                  <p className="text-sm text-secondary-500 text-center py-4">No active requests</p>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Teams;
