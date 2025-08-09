import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { fromB64 } from '@mysten/sui.js/utils';
import {
  fetchPatientRecords,
  createPatientRecord,
  updatePatientRecord,
  authorizeHospital,
  revokeHospital,
  transferOwnership,
} from './blockchain';

async function main() {
  // Using the converted private key (hex "d57a551eb6440ad0cdd890baa56a1cc939885761bc2d47d67b15e79970bb088c" to Base64)
  const keypair = Ed25519Keypair.fromSecretKey(fromB64('1XpVHrZECtDN2JC6pWocw5mIV2G8LUfWexXnmXC7CIw='));
  const walletAddress = keypair.toSuiAddress();

  // Example: Fetch records
  const patients = await fetchPatientRecords(walletAddress);
  console.log('Fetched Patient Records:', patients);
  // Example: Create record (encrypted_data as Uint8Array)
  const encryptedData = new Uint8Array([1, 2, 3]);  // Example data
  const createDigest = await createPatientRecord(keypair, encryptedData);
  console.log('Create Digest:', createDigest);

  // Assume recordId from create or fetch
  const recordId = 'EXAMPLE_RECORD_ID';  // Replace with actual ID

  // Example: Update record
  const newEncryptedData = new Uint8Array([4, 5, 6]);
  const updateDigest = await updatePatientRecord(keypair, recordId, newEncryptedData);
  console.log('Update Digest:', updateDigest);

  // Example: Authorize hospital
  const hospitalAddress = '0xEXAMPLE_HOSPITAL_ADDRESS';
  const authDigest = await authorizeHospital(keypair, recordId, hospitalAddress);
  console.log('Auth Digest:', authDigest);

  // Example: Revoke hospital
  const revokeDigest = await revokeHospital(keypair, recordId, hospitalAddress);
  console.log('Revoke Digest:', revokeDigest);

  // Example: Transfer ownership
  const newOwnerAddress = '0xNEW_OWNER_ADDRESS';
  const transferDigest = await transferOwnership(keypair, recordId, newOwnerAddress);
  console.log('Transfer Digest:', transferDigest);
}

main();