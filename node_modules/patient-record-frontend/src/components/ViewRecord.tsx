import React from 'react';

interface ViewRecordProps {
  patient: Patient | null;
}

const ViewRecord: React.FC<ViewRecordProps> = ({ patient }) => {
  if (!patient) return <p className="text-center mt-10">No record selected</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">View Record</h2>
      <div className="space-y-2">
        <p><strong>ID:</strong> {patient.id}</p>
        <p><strong>Owner:</strong> {patient.owner}</p>
        <p><strong>Encrypted Data:</strong> {Array.from(patient.encryptedData).join(', ')}</p>
        <p><strong>Authorized Hospitals:</strong> {patient.authorizedHospitals.join(', ') || 'None'}</p>
      </div>
    </div>
  );
};

export default ViewRecord;