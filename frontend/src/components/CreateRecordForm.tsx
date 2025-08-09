import React, { useState } from 'react';

interface CreateRecordFormProps {
  onCreate: (encryptedData: Uint8Array) => void;
}

const CreateRecordForm: React.FC<CreateRecordFormProps> = ({ onCreate }) => {
  const [encryptedData, setEncryptedData] = useState<Uint8Array>(new Uint8Array());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(encryptedData);
  };

  // Simplified: In reality, you'd encrypt data here (e.g., via a library like CryptoJS)
  const handleEncrypt = () => {
    const dummyData = new TextEncoder().encode('Sample encrypted data');
    setEncryptedData(dummyData);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Record</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <button
            type="button"
            onClick={handleEncrypt}
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
          >
            Generate Encrypted Data
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          disabled={encryptedData.length === 0}
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateRecordForm;