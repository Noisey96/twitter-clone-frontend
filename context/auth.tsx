import { router, useSegments } from 'expo-router';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';

type AuthContextProps = {
	authToken: string | null;
	updateAuthToken: (newToken: string) => Promise<void>;
	removeAuthToken: () => Promise<void>;
};

const AuthContext = createContext<AuthContextProps | null>(null);

export function useAuth() {
	return useContext(AuthContext);
}

function useProtectedRoute(authToken: string | null) {
	const segments = useSegments();

	useEffect(() => {
		const inAuthGroup = segments[0] === 'auth';

		if (!authToken && !inAuthGroup) {
			router.replace('/login');
		} else if (authToken && inAuthGroup) {
			router.replace('/');
		}
	}, [authToken, segments]);
}

export function AuthProvider({ children }: PropsWithChildren) {
	const [authToken, setAuthToken] = useState<string | null>(null);

	useProtectedRoute(authToken);

	useEffect(() => {
		const loadAuthToken = async () => {
			const currentToken = await getItemAsync('authToken');
			if (currentToken) setAuthToken(currentToken);
		};
		loadAuthToken();
	}, []);

	const updateAuthToken = async (newToken: string) => {
		await setItemAsync('authToken', newToken);
		setAuthToken(newToken);
	};

	const removeAuthToken = async () => {
		await deleteItemAsync('authToken');
		setAuthToken(null);
	};

	return (
		<AuthContext.Provider value={{ authToken, updateAuthToken, removeAuthToken }}>{children}</AuthContext.Provider>
	);
}
