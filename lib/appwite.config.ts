import * as sdk from 'node-appwrite';

export const {
	PROJECT_ID,
	API_KEY,
	DATABASE_ID,
	PATIENT_COLLECTION_ID,
	DOCTOR_COLLECTION_ID,
	APPOINTMENT_COLLECTION_ID,
	NEXT_PUBLIC_BUCKET_ID,
	NEXT_PUBLIC_ENDPOINT,
} = process.env;

const adminClient = new sdk.Client();

adminClient
	.setEndpoint(NEXT_PUBLIC_ENDPOINT!)
	.setProject(PROJECT_ID!)
	.setKey(API_KEY!);

export const databases = new sdk.Databases(adminClient);
export const storage = new sdk.Storage(adminClient);
export const messaging = new sdk.Messaging(adminClient);
export const account = new sdk.Account(adminClient);

export const createAdminClient = async () => {
	adminClient
		.setEndpoint(NEXT_PUBLIC_ENDPOINT!)
		.setProject(PROJECT_ID!)
		.setKey(API_KEY!);

	return {
		get account() {
			return new sdk.Account(adminClient);
		},
	};
};

export const createSessionClient = async (session: any) => {
	const sessionClient = new sdk.Client();
	sessionClient.setEndpoint(NEXT_PUBLIC_ENDPOINT!).setProject(PROJECT_ID!);
	if (session) {
		sessionClient.setSession(session);
	}
	return {
		get accountUser() {
			return new sdk.Account(sessionClient);
		},
	};
};
