import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Patient } from '../types';

interface AddPatientModalProps {
  onClose: () => void;
  onAddPatient: (patient: Omit<Patient, 'id' | 'vitals'>) => void;
}

const AddPatientModal: React.FC<AddPatientModalProps> = ({ onClose, onAddPatient }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: 45,
    gender: 'Male',
    room: '',
    admissionDays: 1,
    diagnosis: '',
    attendingPhysician: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'age' || name === 'admissionDays' ? parseInt(value) : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddPatient(formData);
  };

  // Generate room options (floors 1-5, rooms 01-20)
  const roomOptions = [];
  for (let floor = 1; floor <= 5; floor++) {
    for (let room = 1; room <= 20; room++) {
      roomOptions.push(`${floor}${room.toString().padStart(2, '0')}`);
    }
  }

  // Common diagnoses
  const diagnoses = [
    'Pneumonia',
    'Congestive Heart Failure',
    'Acute Myocardial Infarction',
    'Diabetic Ketoacidosis',
    'Stroke',
    'COPD Exacerbation',
    'Sepsis',
    'Acute Kidney Injury',
    'Gastrointestinal Bleeding',
    'Pulmonary Embolism'
  ];

  // Physicians
  const physicians = [
    'Dr. Smith',
    'Dr. Johnson',
    'Dr. Williams',
    'Dr. Brown',
    'Dr. Jones',
    'Dr. Garcia',
    'Dr. Miller',
    'Dr. Davis',
    'Dr. Rodriguez',
    'Dr. Martinez'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Add New Patient</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Patient Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Full Name"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  min="1"
                  max="120"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Room
                </label>
                <select
                  name="room"
                  value={formData.room}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Room</option>
                  {roomOptions.map(room => (
                    <option key={room} value={room}>{room}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Days Admitted
                </label>
                <input
                  type="number"
                  name="admissionDays"
                  value={formData.admissionDays}
                  onChange={handleChange}
                  required
                  min="1"
                  max="365"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Diagnosis
              </label>
              <select
                name="diagnosis"
                value={formData.diagnosis}
                onChange={handleChange}
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Diagnosis</option>
                {diagnoses.map(diagnosis => (
                  <option key={diagnosis} value={diagnosis}>{diagnosis}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Attending Physician
              </label>
              <select
                name="attendingPhysician"
                value={formData.attendingPhysician}
                onChange={handleChange}
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Physician</option>
                {physicians.map(physician => (
                  <option key={physician} value={physician}>{physician}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              Add Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPatientModal;