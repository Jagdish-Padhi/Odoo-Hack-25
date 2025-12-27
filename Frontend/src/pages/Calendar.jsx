// src/pages/Calendar.jsx
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import Input from '../components/common/Input';
import Select from '../components/common/Select';

const Calendar = () => {
  const { requests, equipment, teams, addRequest } = useApp();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    equipmentId: '',
    scheduledDate: '',
    priority: 'medium',
  });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const previousMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const today = () => setCurrentDate(new Date());

  const getRequestsForDate = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return requests.filter(req => {
      const reqDate = new Date(req.scheduledDate);
      const reqDateStr = `${reqDate.getFullYear()}-${String(reqDate.getMonth() + 1).padStart(2, '0')}-${String(reqDate.getDate()).padStart(2, '0')}`;
      return reqDateStr === dateStr && req.type === 'preventive';
    });
  };

  const calendarDays = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();
  };

  const handleDateClick = (day) => {
    setSelectedDate(day);
    const dateTime = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}T09:00`;
    setFormData(prev => ({ ...prev, scheduledDate: dateTime }));
    setShowCreateModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedEquipment = equipment.find(eq => eq.id === formData.equipmentId);
    if (selectedEquipment) {
      const teamData = teams.find(t => t.id === selectedEquipment.teamId);
      const newRequest = {
        ...formData,
        type: 'preventive',
        description: '',
        equipmentName: selectedEquipment.name,
        equipmentCategory: selectedEquipment.category,
        teamId: selectedEquipment.teamId,
        teamName: teamData?.name || 'Unassigned',
        createdBy: 'Current User',
        createdAt: new Date().toISOString(),
        status: 'new',
      };
      addRequest(newRequest);
      setShowCreateModal(false);
      setFormData({ subject: '', equipmentId: '', scheduledDate: '', priority: 'medium' });
    }
  };

  const dateRequests = selectedDate ? getRequestsForDate(selectedDate) : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-secondary-900">
          Maintenance Calendar
        </h1>
        <p className="text-secondary-600 mt-1">
          View and schedule preventive maintenance
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-secondary-900">
                {monthNames[month]} {year}
              </h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={today}>
                  Today
                </Button>
                <Button variant="ghost" size="sm" onClick={previousMonth}>
                  <ChevronLeft size={20} />
                </Button>
                <Button variant="ghost" size="sm" onClick={nextMonth}>
                  <ChevronRight size={20} />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-2">
              {dayNames.map((day) => (
                <div key={day} className="text-center text-xs font-semibold text-secondary-600 py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day, index) => {
                const dayRequests = day ? getRequestsForDate(day) : [];
                const hasRequests = dayRequests.length > 0;

                return (
                  <div
                    key={index}
                    onClick={() => day && handleDateClick(day)}
                    className={`
                      min-h-[100px] p-2 rounded-lg border transition-all cursor-pointer
                      ${!day ? 'bg-secondary-50 border-transparent cursor-default' : ''}
                      ${day && isToday(day) ? 'border-2 border-primary-500 bg-primary-50' : 'border-secondary-200'}
                      ${day && hasRequests ? 'bg-success-50 border-success-200' : day ? 'bg-white hover:bg-secondary-50 hover:border-primary-300' : ''}
                    `}
                  >
                    {day && (
                      <>
                        <div className="text-right mb-1">
                          <span className={`text-sm font-medium ${isToday(day) ? 'text-primary-700' : 'text-secondary-900'}`}>
                            {day}
                          </span>
                        </div>
                        {hasRequests && (
                          <div className="space-y-1">
                            {dayRequests.slice(0, 2).map((req) => (
                              <div
                                key={req.id}
                                className="text-xs px-2 py-1 bg-white rounded border border-success-300 truncate font-medium text-success-900"
                              >
                                • {req.subject}
                              </div>
                            ))}
                            {dayRequests.length > 2 && (
                              <div className="text-xs text-success-700 font-medium px-2">
                                +{dayRequests.length - 2} more
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <CalendarIcon size={24} className="text-primary-600" />
              <h3 className="text-lg font-semibold text-secondary-900">
                {selectedDate ? `${monthNames[month]} ${selectedDate}, ${year}` : 'Select a date'}
              </h3>
            </div>

            {selectedDate && dateRequests.length > 0 ? (
              <div className="space-y-3">
                {dateRequests.map((request) => (
                  <div key={request.id} className="p-3 bg-secondary-50 rounded-lg border border-secondary-200">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm font-medium text-secondary-900">
                        {request.subject}
                      </h4>
                      <Badge variant={request.priority} size="sm">
                        {request.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-secondary-600 mb-2">
                      {request.equipmentName}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-secondary-500">
                      {new Date(request.scheduledDate).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-secondary-500 text-center py-8">
                {selectedDate ? 'No maintenance scheduled for this date. Click to create one.' : 'Click on a date to schedule maintenance'}
              </p>
            )}
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-secondary-900 mb-3">
              Legend
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-primary-50 border-2 border-primary-500"></div>
                <span className="text-secondary-700">Today</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-success-50 border border-success-200"></div>
                <span className="text-secondary-700">Has preventive maintenance</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-white border border-secondary-200"></div>
                <span className="text-secondary-700">Available</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Create Preventive Maintenance Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title={`Schedule Maintenance - ${selectedDate ? `${monthNames[month]} ${selectedDate}` : ''}`}
        size="md"
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Schedule
            </Button>
          </>
        }
      >
        <form className="space-y-4">
          <Input
            label="Subject"
            name="subject"
            value={formData.subject}
            onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
            placeholder="e.g., Monthly inspection"
            required
          />

          <Select
            label="Equipment"
            name="equipmentId"
            value={formData.equipmentId}
            onChange={(e) => setFormData(prev => ({ ...prev, equipmentId: e.target.value }))}
            options={[
              { value: '', label: 'Select equipment...' },
              ...equipment.map(eq => ({
                value: eq.id,
                label: `${eq.name} (${eq.serialNumber})`
              }))
            ]}
            required
          />

          <Input
            label="Scheduled Date & Time"
            name="scheduledDate"
            type="datetime-local"
            value={formData.scheduledDate}
            onChange={(e) => setFormData(prev => ({ ...prev, scheduledDate: e.target.value }))}
            required
          />

          <Select
            label="Priority"
            name="priority"
            value={formData.priority}
            onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
            options={[
              { value: 'low', label: 'Low' },
              { value: 'medium', label: 'Medium' },
              { value: 'high', label: 'High' },
            ]}
          />
        </form>
      </Modal>
    </div>
  );
};

export default Calendar;