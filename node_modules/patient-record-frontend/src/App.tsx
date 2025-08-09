import React from 'react';
import PatientList from './components/PatientList';
import { Patient } from './types';

const mockPatients: Patient[] = [
  { id: '1', name: 'John Doe', age: 30, condition: 'Flu', lastVisit: '2025-08-01' },
  { id: '2', name: 'Jane Smith', age: 45, condition: 'Hypertension', lastVisit: '2025-07-15' },
];

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Patient Record App</h1>
      <PatientList patients={mockPatients} />
    </div>
  );
};

export default App;