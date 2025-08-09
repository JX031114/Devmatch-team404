import React, { useState } from 'react';

interface LoginFormProps {
  onLogin: (address: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [address, setAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(address);
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <h1 style={{
        fontSize: '2rem',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '1.5rem',
        color: '#333'
      }}>
        Login
      </h1>

      <label style={{
        display: 'block',
        fontSize: '1rem',
        fontWeight: '500',
        marginBottom: '0.5rem',
        color: '#555'
      }}>
        Address
      </label>

      <input
        type="text"
        placeholder="Enter Sui address (e.g., 0x...)"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{
          width: '100%',
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          marginBottom: '1.5rem',
          fontSize: '1rem',
          outline: 'none'
        }}
      />

      <button
        type="submit"
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#2563eb',
          color: '#fff',
          fontSize: '1rem',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1d4ed8')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
