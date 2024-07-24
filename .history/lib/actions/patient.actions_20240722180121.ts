'use server';
import { Query, ID } from 'node-appwrite';
import { InputFile } from 'node-appwrite/file';
import {
	users,
	storage,
	NEXT_PUBLIC_BUCKET_ID,
	databases,
	DATABASE_ID,
	PATIENT_COLLECTION_ID,
	NEXT_PUBLIC_ENDPOINT,
	PROJECT_ID,
} from '../appwite.config';
import { parseStringify } from '../utils';

export const createUser = async (user: CreateUserParams) => {
	try {
		const newUser = await users.create(
			ID.unique(),
			user.email,
			user.phone,
			undefined,
			user.name
		);
		return { error: false, data: parseStringify(newUser) };
	} catch (error: any) {
		if (error && error?.code === 409) {
			const existingUser = await users.list([
				Query.equal('email', [user.email]),
			]);
			return { error: true, data: error.response };
		}
	}
};

export const getUser = async (userId: string) => {
	try {
		const user = await users.get(userId);
		return parseStringify(user);
	} catch (error: any) {
		console.log(error);
	}
};

export const getPatient = async (userId: string) => {
	try {
		const patients = await databases.listDocuments(
			DATABASE_ID!,
			PATIENT_COLLECTION_ID!,
			[Query.equal('userId', userId)]
		);

		return parseStringify(patients.documents[0]);
	} catch (error: any) {
		console.log(error);
	}
};

export const registerPatient = async ({
	identificationDocument,
	...patient
}: RegisterUserParams) => {
	try {
		// Upload file ->  // https://appwrite.io/docs/references/cloud/client-web/storage#createFile
		let file;
		if (identificationDocument) {
			const inputFile =
				identificationDocument &&
				InputFile.fromBuffer(
					identificationDocument?.get('blobFile') as Blob,
					identificationDocument?.get('fileName') as string
				);

			file = await storage.createFile(
				NEXT_PUBLIC_BUCKET_ID!,
				ID.unique(),
				inputFile
			);
		}

		// Create new patient document -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#createDocument
		const newPatient = await databases.createDocument(
			DATABASE_ID!,
			PATIENT_COLLECTION_ID!,
			ID.unique(),
			{
				identificationDocumentId: file?.$id ? file.$id : null,
				identificationDocumentUrl: file?.$id
					? `${NEXT_PUBLIC_ENDPOINT}/storage/buckets/${NEXT_PUBLIC_BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}`
					: null,
				...patient,
			}
		);

		return parseStringify(newPatient);
	} catch (error) {
		console.error('An error occurred while creating a new patient:', error);
	}
};
