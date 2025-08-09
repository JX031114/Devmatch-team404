import React, { useState } from 'react';

interface UpdateRecordFormProps {
  onUpdate: (recordId: string, encryptedData: Uint8Array) => void;
}

const UpdateRecordForm: React.FC<UpdateRecordFormProps> = ({ onUpdate }) => {
  const [recordId, setRecordId] = useState('');
  const [encryptedData, setEncryptedData] = useState<Uint8Array>(new Uint8Array());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(recordId, encryptedData);
  };

  const handleEncrypt = () => {
    const dummyData = new TextEncoder().encode('Updated encrypted data');
    setEncryptedData(dummyData);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Record</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Record ID</label>
          <input
            type="text"
            value={recordId}
            onChange={(e) => setRecordId(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter Record ID"
            required
          />
        </div>
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
          disabled={recordId === '' || encryptedData.length === 0}
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateRecordForm;