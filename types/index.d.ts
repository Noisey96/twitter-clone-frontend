export type AuthContextProps = {
	authToken: string | null;
	updateAuthToken: (newToken: string) => Promise<void>;
	removeAuthToken: () => Promise<void>;
};
