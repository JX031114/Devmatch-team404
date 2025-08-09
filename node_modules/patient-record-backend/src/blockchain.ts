import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { Patient } from './types';

// Package ID from the provided bytecode
const PACKAGE_ID = '0xa9ee7b3b5db76a5bb516f6d9a7cd62ac3a3c9d9d3de57382f38179603ae1d420';

// Initialize Sui Client for Testnet
const suiClient = new SuiClient({
  url: getFullnodeUrl('testnet'),
});

// Function to fetch patient records owned by a wallet address
// Filters objects by the PatientRecord type
export async function fetchPatientRecords(walletAddress: string): Promise<Patient[]> {
  try {
    const objects = await suiClient.getOwnedObjects({
      owner: walletAddress,
      filter: {
        StructType: `${PACKAGE_ID}::patient_storage::PatientRecord`,
      },
      options: { showContent: true },
    });

    const patients: Patient[] = objects.data.map((obj: any) => {
      const fields = obj.data.content.fields;
      return {
        id: obj.data.objectId,
        name: fields.name || 'Unknown',  // Note: Bytecode shows no 'name' field; adapted based on frontend types. Adjust if needed.
        age: Number(fields.age) || 0,   // Assuming fields exist; bytecode has encrypted_data, but types have name/age/etc. Decrypt if necessary.
        condition: fields.condition || 'None',
        lastVisit: fields.lastVisit || 'N/A',
      };
    });

    return patients;
  } catch (error) {
    console.error('Error fetching patient records:', error);
    return [];
  }
}

// Function to create a new patient record
// Requires a signer (e.g., keypair)
export async function createPatientRecord(
  signer: Ed25519Keypair,
  encryptedData: Uint8Array
): Promise<string | null> {
  try {
    const tx = new TransactionBlock();
    tx.moveCall({
      target: `${PACKAGE_ID}::patient_storage::create_record`,
      arguments: [tx.pure(Array.from(encryptedData))],
    });

    const result = await suiClient.signAndExecuteTransactionBlock({
      signer,
      transactionBlock: tx,
    });

    console.log('Create Transaction digest:', result.digest);
    return result.digest;
  } catch (error) {
    console.error('Error creating patient record:', error);
    return null;
  }
}

// Function to update a patient record
export async function updatePatientRecord(
  signer: Ed25519Keypair,
  recordId: string,
  newEncryptedData: Uint8Array
): Promise<string | null> {
  try {
    const tx = new TransactionBlock();
    const record = tx.object(recordId);
    tx.moveCall({
      target: `${PACKAGE_ID}::patient_storage::update_record`,
      arguments: [record, tx.pure(Array.from(newEncryptedData))],
    });

    const result = await suiClient.signAndExecuteTransactionBlock({
      signer,
      transactionBlock: tx,
    });

    console.log('Update Transaction digest:', result.digest);
    return result.digest;
  } catch (error) {
    console.error('Error updating patient record:', error);
    return null;
  }
}

// Function to authorize a hospital
export async function authorizeHospital(
  signer: Ed25519Keypair,
  recordId: string,
  hospitalAddress: string
): Promise<string | null> {
  try {
    const tx = new TransactionBlock();
    const record = tx.object(recordId);
    tx.moveCall({
      target: `${PACKAGE_ID}::patient_storage::authorize_hospital`,
      arguments: [record, tx.pure.address(hospitalAddress)],
    });

    const result = await suiClient.signAndExecuteTransactionBlock({
      signer,
      transactionBlock: tx,
    });

    console.log('Authorize Transaction digest:', result.digest);
    return result.digest;
  } catch (error) {
    console.error('Error authorizing hospital:', error);
    return null;
  }
}

// Function to revoke a hospital
export async function revokeHospital(
  signer: Ed25519Keypair,
  recordId: string,
  hospitalAddress: string
): Promise<string | null> {
  try {
    const tx = new TransactionBlock();
    const record = tx.object(recordId);
    tx.moveCall({
      target: `${PACKAGE_ID}::patient_storage::revoke_hospital`,
      arguments: [record, tx.pure.address(hospitalAddress)],
    });

    const result = await suiClient.signAndExecuteTransactionBlock({
      signer,
      transactionBlock: tx,
    });

    console.log('Revoke Transaction digest:', result.digest);
    return result.digest;
  } catch (error) {
    console.error('Error revoking hospital:', error);
    return null;
  }
}

// Function to transfer ownership
export async function transferOwnership(
  signer: Ed25519Keypair,
  recordId: string,
  newOwnerAddress: string
): Promise<string | null> {
  try {
    const tx = new TransactionBlock();
    const record = tx.object(recordId);
    tx.moveCall({
      target: `${PACKAGE_ID}::patient_storage::transfer_ownership`,
      arguments: [record, tx.pure.address(newOwnerAddress)],
    });

    const result = await suiClient.signAndExecuteTransactionBlock({
      signer,
      transactionBlock: tx,
    });

    console.log('Transfer Transaction digest:', result.digest);
    return result.digest;
  } catch (error) {
    console.error('Error transferring ownership:', error);
    return null;
  }
}