export interface VitalHistory {
  timestamp: Date;
  heartRate: number;
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  temperature: number;
  oxygenSaturation: number;
  respirationRate: number;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  room: string;
  admissionDays: number;
  diagnosis: string;
  attendingPhysician: string;
  vitals: {
    heartRate: number;
    bloodPressure: {
      systolic: number;
      diastolic: number;
    };
    temperature: number;
    oxygenSaturation: number;
    respirationRate: number;
    history: VitalHistory[];
  };
}