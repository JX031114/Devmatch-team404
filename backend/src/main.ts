import { Mnemonic } from '@mysten/sui.js/cryptography';
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import {
  fetchPatientRecords,
  createPatientRecord,
  updatePatientRecord,
  authorizeHospital,
  revokeHospital,
  transferOwnership,
} from './blockchain';

async function main() {
  // Replace with your actual mnemonic phrase (e.g., 12 or 24 words)
  const mnemonic = new Mnemonic('your mnemonic phrase here with all words'); // e.g., "abandon amount liar ... zoo"
  const keypair = Ed25519Keypair.deriveKeypair(mnemonic);

  const walletAddress = keypair.getPublicKey().toSuiAddress();
  console.log('Using address:', walletAddress);

  // Example: Fetch records
  const patients = await fetchPatientRecords(walletAddress);
  console.log('Fetched Patient Records:', patients);

  // Example: Create record (encrypted_data as Uint8Array)
  const encryptedData = new Uint8Array([1, 2, 3]); // Example data
  const createDigest = await createPatientRecord(keypair, encryptedData);
  console.log('Create Digest:', createDigest);

  // Assume recordId from create or fetch
  const recordId = ''; // Replace with actual ID

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