import { Patient, VitalHistory } from '../types';

// List of sample diagnoses
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

// List of sample physician names
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

// First names and last names for generating patient names
const firstNames = [
  'Sanjith', 'Sai', 'Aron', 'Monika'
];

const lastNames = [
  'Kumar', 'Surya', 'Fernando', 'Rinith'
];

// Function to generate random vital history data
const generateVitalHistory = (count: number): VitalHistory[] => {
  const history: VitalHistory[] = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    // Generate data points going back in time
    const timestamp = new Date(now.getTime() - (count - i) * 3 * 60 * 1000); // 3 minutes apart
    
    history.push({
      timestamp,
      heartRate: 60 + Math.random() * 40, // 60-100 bpm
      bloodPressure: {
        systolic: 110 + Math.random() * 30, // 110-140 mmHg
        diastolic: 70 + Math.random() * 20  // 70-90 mmHg
      },
      temperature: 36.5 + Math.random() * 1.5, // 36.5-38.0 °C
      oxygenSaturation: 92 + Math.random() * 8, // 92-100%
      respirationRate: 12 + Math.random() * 8 // 12-20 breaths per minute
    });
  }
  
  return history;
};

// Function to generate a random patient with vitals
export const generatePatientData = (id: string): Patient => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const name = `${firstName} ${lastName}`;
  
  const age = 25 + Math.floor(Math.random() * 60); // 25-85 years
  const gender = Math.random() > 0.5 ? 'Male' : 'Female';
  
  // Generate room number (floor 1-5, room 01-20)
  const floor = 1 + Math.floor(Math.random() * 5);
  const roomNumber = 1 + Math.floor(Math.random() * 20);
  const room = `${floor}${roomNumber.toString().padStart(2, '0')}`;
  
  const admissionDays = 1 + Math.floor(Math.random() * 14); // 1-14 days
  
  const diagnosis = diagnoses[Math.floor(Math.random() * diagnoses.length)];
  const attendingPhysician = physicians[Math.floor(Math.random() * physicians.length)];
  
  // Generate initial vitals
  const vitalHistory = generateVitalHistory(20);
  const latestVitals = vitalHistory[vitalHistory.length - 1];
  
  return {
    id,
    name,
    age,
    gender,
    room,
    admissionDays,
    diagnosis,
    attendingPhysician,
    vitals: {
      heartRate: latestVitals.heartRate,
      bloodPressure: latestVitals.bloodPressure,
      temperature: latestVitals.temperature,
      oxygenSaturation: latestVitals.oxygenSaturation,
      respirationRate: latestVitals.respirationRate,
      history: vitalHistory
    }
  };
};