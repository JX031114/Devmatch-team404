import React from 'react';
import UpdateRecordForm from '../components/UpdateRecordForm';
import { useNavigate } from 'react-router-dom';

const UpdatePage: React.FC = () => {
  const navigate = useNavigate();

  const handleUpdate = (recordId: string, encryptedData: Uint8Array) => {
    // Placeholder: Integrate with backend API later
    console.log('Updated record', recordId, 'with data:', encryptedData);
    navigate('/main');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <UpdateRecordForm onUpdate={handleUpdate} />
    </div>
  );
};

export default UpdatePage;