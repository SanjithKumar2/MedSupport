import React, { useState } from 'react';
import { Heart, Thermometer, Droplets, Wind, Activity, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import VitalsChart from './VitalsChart';
import { Patient } from '../types';

interface PatientWindowProps {
  patient: Patient;
}

const PatientWindow: React.FC<PatientWindowProps> = ({ patient }) => {
  const [expanded, setExpanded] = useState(false);

  // Determine status colors based on vital values
  const getHeartRateStatus = (rate: number) => {
    if (rate < 60 || rate > 100) return 'text-yellow-400';
    if (rate < 50 || rate > 110) return 'text-red-500';
    return 'text-green-400';
  };

  const getBPStatus = (systolic: number, diastolic: number) => {
    if ((systolic > 140 || diastolic > 90) || (systolic < 90 || diastolic < 60)) return 'text-yellow-400';
    if ((systolic > 160 || diastolic > 100) || (systolic < 80 || diastolic < 50)) return 'text-red-500';
    return 'text-green-400';
  };

  const getTempStatus = (temp: number) => {
    if (temp > 37.5 || temp < 36.5) return 'text-yellow-400';
    if (temp > 38.0 || temp < 36.0) return 'text-red-500';
    return 'text-green-400';
  };

  const getO2Status = (o2: number) => {
    if (o2 < 95) return 'text-yellow-400';
    if (o2 < 90) return 'text-red-500';
    return 'text-green-400';
  };

  const getRespStatus = (rate: number) => {
    if (rate < 12 || rate > 20) return 'text-yellow-400';
    if (rate < 10 || rate > 25) return 'text-red-500';
    return 'text-green-400';
  };

  // Check if any vitals are in alert state
  const hasAlert = 
    patient.vitals.heartRate < 50 || patient.vitals.heartRate > 110 ||
    patient.vitals.bloodPressure.systolic > 160 || patient.vitals.bloodPressure.diastolic > 100 ||
    patient.vitals.bloodPressure.systolic < 80 || patient.vitals.bloodPressure.diastolic < 50 ||
    patient.vitals.temperature > 38.0 || patient.vitals.temperature < 36.0 ||
    patient.vitals.oxygenSaturation < 90 ||
    patient.vitals.respirationRate < 10 || patient.vitals.respirationRate > 25;

  return (
    <div className={`bg-gray-800 rounded-lg overflow-hidden shadow-lg border-l-4 ${hasAlert ? 'border-red-500' : 'border-blue-500'}`}>
      {/* Patient header */}
      <div className="p-4 bg-gray-700 flex justify-between items-center">
        <div>
          <h2 className="font-bold text-lg flex items-center">
            {hasAlert && <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />}
            {patient.name}
          </h2>
          <p className="text-xs text-gray-400">ID: {patient.id} • Room: {patient.room}</p>
        </div>
        <div className="flex items-center">
          <span className={`inline-block w-2 h-2 rounded-full mr-2 ${hasAlert ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></span>
          <button 
            onClick={() => setExpanded(!expanded)}
            className="text-gray-400 hover:text-white"
          >
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>

      {/* Vitals summary */}
      <div className="p-4 grid grid-cols-3 gap-3 text-center">
        <div className="flex flex-col items-center">
          <Heart className={`h-5 w-5 ${getHeartRateStatus(patient.vitals.heartRate)}`} />
          <span className={`text-lg font-bold ${getHeartRateStatus(patient.vitals.heartRate)}`}>
            {Math.round(patient.vitals.heartRate)}
          </span>
          <span className="text-xs text-gray-400">BPM</span>
        </div>
        
        <div className="flex flex-col items-center">
          <Activity className={`h-5 w-5 ${getBPStatus(patient.vitals.bloodPressure.systolic, patient.vitals.bloodPressure.diastolic)}`} />
          <span className={`text-lg font-bold ${getBPStatus(patient.vitals.bloodPressure.systolic, patient.vitals.bloodPressure.diastolic)}`}>
            {Math.round(patient.vitals.bloodPressure.systolic)}/{Math.round(patient.vitals.bloodPressure.diastolic)}
          </span>
          <span className="text-xs text-gray-400">BP</span>
        </div>
        
        <div className="flex flex-col items-center">
          <Thermometer className={`h-5 w-5 ${getTempStatus(patient.vitals.temperature)}`} />
          <span className={`text-lg font-bold ${getTempStatus(patient.vitals.temperature)}`}>
            {patient.vitals.temperature.toFixed(1)}
          </span>
          <span className="text-xs text-gray-400">°C</span>
        </div>
        
        <div className="flex flex-col items-center">
          <Droplets className={`h-5 w-5 ${getO2Status(patient.vitals.oxygenSaturation)}`} />
          <span className={`text-lg font-bold ${getO2Status(patient.vitals.oxygenSaturation)}`}>
            {Math.round(patient.vitals.oxygenSaturation)}%
          </span>
          <span className="text-xs text-gray-400">SpO₂</span>
        </div>
        
        <div className="flex flex-col items-center">
          <Wind className={`h-5 w-5 ${getRespStatus(patient.vitals.respirationRate)}`} />
          <span className={`text-lg font-bold ${getRespStatus(patient.vitals.respirationRate)}`}>
            {Math.round(patient.vitals.respirationRate)}
          </span>
          <span className="text-xs text-gray-400">Resp</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="text-xs px-2 py-1 rounded bg-blue-900 text-blue-300">
            {patient.admissionDays}d
          </div>
          <span className="text-xs text-gray-400 mt-1">Admitted</span>
        </div>
      </div>

      {/* Expanded view with charts */}
      {expanded && (
        <div className="p-4 border-t border-gray-700">
          <VitalsChart history={patient.vitals.history} />
          
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div className="bg-gray-700 p-2 rounded">
              <p className="text-gray-400">Diagnosis</p>
              <p>{patient.diagnosis}</p>
            </div>
            <div className="bg-gray-700 p-2 rounded">
              <p className="text-gray-400">Attending</p>
              <p>{patient.attendingPhysician}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientWindow;