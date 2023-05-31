import { useRouter, useSegments } from 'expo-router';
import { PropsWithChildren, createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext({});

const AuthContextProvider = ({ children }: PropsWithChildren) => {
	const [authToken, setAuthToken] = useState<string | null>(null);
	const segments = useSegments();
	const router = useRouter();

	useEffect(() => {
		const isAuthGroup = segments[0] === '(auth)';

		if (!authToken && !isAuthGroup) router.replace('/signin');
		else if (authToken && isAuthGroup) router.replace('/');
	}, [authToken, segments]);

	return <AuthContext.Provider value={{ authToken, setAuthToken }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

export const useAuth = () => useContext(AuthContext);
