import * as sdk from 'node-appwrite';

const {
	PROJECT_ID,
	API_KEY,
	DATABASE_ID,
	PATIENT_COLLECTION_ID,
	DOCTOR_COLLECTION_ID,
	APPOINTMENT_COLLECTION_ID,
	NEXT_PUBLIC_BUCKET_ID,
	NEXT_PUBLIC_ENDPOINT,
} = process.env;

const client = new sdk.Client();