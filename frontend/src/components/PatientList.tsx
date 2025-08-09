import React from 'react';
import { Patient } from '../types';

interface PatientListProps {
  patients: Patient[];
}

const PatientList: React.FC<PatientListProps> = ({ patients }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <table className="w-full border-collapse bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Age</th>
            <th className="p-3 text-left">Condition</th>
            <th className="p-3 text-left">Last Visit</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{patient.id}</td>
              <td className="p-3">{patient.name}</td>
              <td className="p-3">{patient.age}</td>
              <td className="p-3">{patient.condition}</td>
              <td className="p-3">{patient.lastVisit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;