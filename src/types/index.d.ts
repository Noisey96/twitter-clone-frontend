export type AuthContextProps = {
	authToken: string | null;
	updateAuthToken: (newToken: string) => Promise<void>;
	removeAuthToken: () => Promise<void>;
};

export type User = {
	id: string;
	createdAt: string;
	updatedAt: string;
	username: string;
};

export type Tweet = {
	id: string;
};
