import React, { useState, useEffect } from 'react';
import { LineChart, Activity, Heart, Thermometer, Droplets, Wind, PlusCircle } from 'lucide-react';
import PatientWindow from './components/PatientWindow';
import AddPatientModal from './components/AddPatientModal';
import { generatePatientData } from './utils/dataGenerator';
import { Patient } from './types';

function App() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    // Generate 5 patients with vitals data
    const patientData = Array.from({ length: 5 }, (_, i) => 
      generatePatientData(`P${1000 + i}`)
    );
    setPatients(patientData);

    // Update vitals every 3 seconds to simulate real-time monitoring
    const interval = setInterval(() => {
      setPatients(prevPatients => 
        prevPatients.map(patient => ({
          ...patient,
          vitals: {
            heartRate: Math.max(60, Math.min(120, patient.vitals.heartRate + (Math.random() * 6 - 3))),
            bloodPressure: {
              systolic: Math.max(100, Math.min(160, patient.vitals.bloodPressure.systolic + (Math.random() * 8 - 4))),
              diastolic: Math.max(60, Math.min(100, patient.vitals.bloodPressure.diastolic + (Math.random() * 6 - 3)))
            },
            temperature: Math.max(36.1, Math.min(38.5, patient.vitals.temperature + (Math.random() * 0.4 - 0.2))),
            oxygenSaturation: Math.max(90, Math.min(100, patient.vitals.oxygenSaturation + (Math.random() * 2 - 1))),
            respirationRate: Math.max(12, Math.min(25, patient.vitals.respirationRate + (Math.random() * 2 - 1))),
            history: [
              ...patient.vitals.history.slice(-19),
              {
                timestamp: new Date(),
                heartRate: Math.max(60, Math.min(120, patient.vitals.heartRate + (Math.random() * 6 - 3))),
                bloodPressure: {
                  systolic: Math.max(100, Math.min(160, patient.vitals.bloodPressure.systolic + (Math.random() * 8 - 4))),
                  diastolic: Math.max(60, Math.min(100, patient.vitals.bloodPressure.diastolic + (Math.random() * 6 - 3)))
                },
                temperature: Math.max(36.1, Math.min(38.5, patient.vitals.temperature + (Math.random() * 0.4 - 0.2))),
                oxygenSaturation: Math.max(90, Math.min(100, patient.vitals.oxygenSaturation + (Math.random() * 2 - 1))),
                respirationRate: Math.max(12, Math.min(25, patient.vitals.respirationRate + (Math.random() * 2 - 1)))
              }
            ]
          }
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleAddPatient = (newPatient: Omit<Patient, 'id' | 'vitals'>) => {
    const patientId = `P${1000 + patients.length}`;
    const patientWithVitals = generatePatientData(patientId);
    
    // Override generated data with user input
    const fullPatient: Patient = {
      ...patientWithVitals,
      name: newPatient.name,
      age: newPatient.age,
      gender: newPatient.gender,
      room: newPatient.room,
      diagnosis: newPatient.diagnosis,
      attendingPhysician: newPatient.attendingPhysician,
      admissionDays: newPatient.admissionDays
    };
    
    setPatients([...patients, fullPatient]);
    setIsAddModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <LineChart className="h-8 w-8 mr-2 text-blue-400" />
            <h1 className="text-2xl font-bold">Hospital Vitals Monitor</h1>
          </div>
          <div className="flex items-center">
            <div className="text-sm text-gray-400 mr-4">
              Live Updates Every 3 Seconds
            </div>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md transition-colors"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Patient
            </button>
          </div>
        </div>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {patients.map((patient) => (
          <PatientWindow key={patient.id} patient={patient} />
        ))}
      </div>

      <footer className="mt-6 text-center text-gray-500 text-sm">
        <p>Hospital Monitoring System - {new Date().getFullYear()}</p>
      </footer>

      {isAddModalOpen && (
        <AddPatientModal 
          onClose={() => setIsAddModalOpen(false)} 
          onAddPatient={handleAddPatient}
        />
      )}
    </div>
  );
}

export default App;