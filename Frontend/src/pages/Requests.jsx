// src/pages/Requests.jsx
import React, { useState } from 'react';
import { Plus, Search, AlertCircle, Clock, CheckCircle2, Trash2, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import Input from '../components/common/Input';
import Select from '../components/common/Select';

const Requests = () => {
  const { requests, equipment, teams, addRequest, updateRequest } = useApp();
  const { user } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    type: 'corrective',
    priority: 'medium',
    equipmentId: '',
    scheduledDate: '',
  });

  const statuses = [
    { id: 'new', label: 'New', icon: <AlertCircle size={20} />, color: 'bg-primary-500' },
    { id: 'in-progress', label: 'In Progress', icon: <Clock size={20} />, color: 'bg-warning-500' },
    { id: 'repaired', label: 'Repaired', icon: <CheckCircle2 size={20} />, color: 'bg-success-500' },
    { id: 'scrap', label: 'Scrap', icon: <Trash2 size={20} />, color: 'bg-danger-500' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedEquipment = equipment.find(eq => eq.id === formData.equipmentId);
    if (selectedEquipment) {
      const teamData = teams.find(t => t.id === selectedEquipment.teamId);
      const newRequest = {
        ...formData,
        equipmentName: selectedEquipment.name,
        equipmentCategory: selectedEquipment.category,
        teamId: selectedEquipment.teamId,
        teamName: teamData?.name || 'Unassigned',
        createdBy: user?.name || 'Current User',
        createdAt: new Date().toISOString(),
        status: 'new',
      };
      addRequest(newRequest);
      setShowCreateModal(false);
      resetForm();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      subject: '',
      description: '',
      type: 'corrective',
      priority: 'medium',
      equipmentId: '',
      scheduledDate: '',
    });
  };

  const handleDragStart = (e, request) => {
    setDraggedItem(request);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    if (draggedItem && draggedItem.status !== newStatus) {
      updateRequest(draggedItem.id, { status: newStatus });
      setDraggedItem(null);
    }
  };

  const getRequestsByStatus = (status) => {
    return requests
      .filter(req => req.status === status)
      .filter(req =>
        req.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.equipmentName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
  };

  const isOverdue = (request) => {
    if (request.status === 'repaired' || request.status === 'scrap') return false;
    const scheduledDate = new Date(request.scheduledDate);
    return scheduledDate < new Date();
  };

  const selectedEquipmentData = equipment.find(eq => eq.id === formData.equipmentId);
  const autoFilledTeam = selectedEquipmentData
    ? teams.find(t => t.id === selectedEquipmentData.teamId)?.name
    : '';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-secondary-900">
            Maintenance Requests
          </h1>
          <p className="text-secondary-600 mt-1">
            Manage all maintenance requests with Kanban board
          </p>
        </div>
        <Button
          variant="primary"
          icon={<Plus size={20} />}
          onClick={() => setShowCreateModal(true)}
        >
          New Request
        </Button>
      </div>

      {/* Search */}
      <Card>
        <Input
          placeholder="Search requests..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={<Search size={20} />}
        />
      </Card>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {statuses.map((status) => {
          const statusRequests = getRequestsByStatus(status.id);

          return (
            <div key={status.id} className="flex flex-col">
              {/* Column Header */}
              <div className="mb-4 p-4 bg-white rounded-lg border-2 border-secondary-200 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`${status.color} p-2 rounded-lg text-white`}>
                      {status.icon}
                    </div>
                    <h3 className="font-semibold text-secondary-900">
                      {status.label}
                    </h3>
                  </div>
                  <Badge variant="secondary" size="sm">
                    {statusRequests.length}
                  </Badge>
                </div>
                <div className={`h-1 rounded-full ${status.color} opacity-30`}></div>
              </div>

              {/* Column Cards */}
              <div
                className="flex-1 space-y-3 min-h-[500px] p-3 bg-secondary-50 rounded-lg border-2 border-dashed border-secondary-200"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, status.id)}
              >
                {statusRequests.map((request) => {
                  const overdue = isOverdue(request);

                  return (
                    <div
                      key={request.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, request)}
                      onClick={() => setSelectedRequest(request)}
                      className={`
                        bg-white p-4 rounded-lg shadow-sm border-2 border-secondary-200
                        cursor-move hover:shadow-md hover:border-primary-300
                        transition-all duration-200
                        ${overdue ? 'border-l-4 border-l-danger-500' : ''}
                        ${draggedItem?.id === request.id ? 'opacity-50' : ''}
                      `}
                    >
                      {/* Priority & Overdue Badge */}
                      <div className="flex items-center justify-between mb-3">
                        <Badge
                          variant={
                            request.priority === 'high' ? 'danger' :
                              request.priority === 'medium' ? 'warning' :
                                'success'
                          }
                          size="sm"
                        >
                          {request.priority}
                        </Badge>
                        {overdue && (
                          <span className="text-xs font-medium text-danger-600 bg-danger-50 px-2 py-1 rounded">
                            🔴 Overdue
                          </span>
                        )}
                      </div>

                      {/* Subject */}
                      <h4 className="text-sm font-semibold text-secondary-900 mb-2 line-clamp-2">
                        {request.subject}
                      </h4>

                      {/* Equipment */}
                      <p className="text-xs text-secondary-600 mb-3 line-clamp-1">
                        {request.equipmentName}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-3 border-t border-secondary-100">
                        {/* Type Badge */}
                        <Badge
                          variant={request.type === 'preventive' ? 'primary' : 'secondary'}
                          size="sm"
                        >
                          {request.type === 'preventive' ? 'Preventive' : 'Corrective'}
                        </Badge>

                        {/* Technician */}
                        {request.assignedTo ? (
                          <div className="flex items-center gap-1">
                            <img
                              src={`https://ui-avatars.com/api/?name=${request.assignedTo}&background=3b82f6&color=fff&size=24`}
                              alt={request.assignedTo}
                              className="w-6 h-6 rounded-full"
                              title={request.assignedTo}
                            />
                          </div>
                        ) : (
                          <User size={16} className="text-secondary-400" />
                        )}
                      </div>
                    </div>
                  );
                })}

                {statusRequests.length === 0 && (
                  <div className="flex items-center justify-center h-32 text-secondary-400">
                    <p className="text-sm">No requests</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Request Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          resetForm();
        }}
        title="Create Maintenance Request"
        size="lg"
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Create Request
            </Button>
          </>
        }
      >
        <form className="space-y-4">
          <Input
            label="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Brief description of the issue"
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
              className="w-full px-4 py-2.5 rounded-lg border border-secondary-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-colors"
              placeholder="Detailed description of the maintenance issue"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              options={[
                { value: 'corrective', label: 'Corrective (Breakdown)' },
                { value: 'preventive', label: 'Preventive (Scheduled)' },
              ]}
            />

            <Select
              label="Priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              options={[
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' },
              ]}
            />
          </div>

          <Select
            label="Equipment"
            name="equipmentId"
            value={formData.equipmentId}
            onChange={handleChange}
            options={[
              { value: '', label: 'Select equipment...' },
              ...equipment.map(eq => ({
                value: eq.id,
                label: `${eq.name} (${eq.serialNumber})`
              }))
            ]}
            helperText="Team will be auto-filled based on equipment"
            required
          />

          {/* Auto-filled Team (Read-only) */}
          {autoFilledTeam && (
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                Maintenance Team (Auto-filled)
              </label>
              <div className="px-4 py-2.5 rounded-lg border border-secondary-200 bg-secondary-50 text-secondary-700">
                {autoFilledTeam}
              </div>
            </div>
          )}

          <Input
            label="Scheduled Date"
            name="scheduledDate"
            type="datetime-local"
            value={formData.scheduledDate}
            onChange={handleChange}
            helperText={formData.type === 'preventive' ? 'Required for preventive maintenance' : ''}
            required
          />
        </form>
      </Modal>

      {/* Request Details Modal */}
      {selectedRequest && (
        <Modal
          isOpen={!!selectedRequest}
          onClose={() => setSelectedRequest(null)}
          title={selectedRequest.subject}
          size="lg"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Badge variant={selectedRequest.status}>
                {selectedRequest.status.replace('-', ' ')}
              </Badge>
              <Badge variant={
                selectedRequest.priority === 'high' ? 'danger' :
                  selectedRequest.priority === 'medium' ? 'warning' :
                    'success'
              }>
                {selectedRequest.priority} priority
              </Badge>
              <Badge variant={selectedRequest.type === 'preventive' ? 'primary' : 'secondary'}>
                {selectedRequest.type}
              </Badge>
            </div>

            {selectedRequest.description && (
              <div>
                <p className="text-sm text-secondary-600 mb-2">Description</p>
                <p className="text-secondary-900">{selectedRequest.description}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-secondary-600 mb-1">Equipment</p>
                <p className="font-medium text-secondary-900">{selectedRequest.equipmentName}</p>
              </div>
              <div>
                <p className="text-sm text-secondary-600 mb-1">Team</p>
                <p className="font-medium text-secondary-900">{selectedRequest.teamName}</p>
              </div>
              <div>
                <p className="text-sm text-secondary-600 mb-1">Scheduled Date</p>
                <p className="font-medium text-secondary-900">
                  {new Date(selectedRequest.scheduledDate).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-secondary-600 mb-1">Created By</p>
                <p className="font-medium text-secondary-900">{selectedRequest.createdBy}</p>
              </div>
              {selectedRequest.assignedTo && (
                <div>
                  <p className="text-sm text-secondary-600 mb-1">Assigned To</p>
                  <p className="font-medium text-secondary-900">{selectedRequest.assignedTo}</p>
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Requests;