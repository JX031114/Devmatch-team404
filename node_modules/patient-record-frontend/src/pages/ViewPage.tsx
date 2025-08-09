import React, { useState, useEffect } from 'react';
import ViewRecord from '../components/ViewRecord';
import { useNavigate, useParams } from 'react-router-dom';

const ViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    // Placeholder: Fetch record from backend API later
    if (id) {
      setPatient({
        id: id,
        owner: '0xOwnerAddress',
        encryptedData: new Uint8Array([1, 2, 3]),
        authorizedHospitals: ['0xHospital1', '0xHospital2'],
      });
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <ViewRecord patient={patient} />
    </div>
  );
};

export default ViewPage;