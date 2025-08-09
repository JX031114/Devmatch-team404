import React from 'react';
import CreateRecordForm from '../components/CreateRecordForm';
import { useNavigate } from 'react-router-dom';

const CreatePage: React.FC = () => {
  const navigate = useNavigate();

  const handleCreate = (encryptedData: Uint8Array) => {
    // Placeholder: Integrate with backend API later
    console.log('Created record with data:', encryptedData);
    navigate('/main');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <CreateRecordForm onCreate={handleCreate} />
    </div>
  );
};

export default CreatePage;