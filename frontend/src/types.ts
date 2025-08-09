export interface Patient {
  id: string;
  owner: string;
  encryptedData: Uint8Array; // vector<u8> from contract
  authorizedHospitals: string[];
}

export interface HospitalRegistry {
  id: string;
  whitelist: string[];
}