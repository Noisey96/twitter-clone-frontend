import { STORAGE_ENCRYPTION_KEY } from '@env';
import { useRouter, useSegments } from 'expo-router';
import { PropsWithChildren, createContext, useContext, useEffect } from 'react';
import { MMKV, useMMKVString } from 'react-native-mmkv';

const AuthContext = createContext({});
const storage = new MMKV({ id: 'global', encryptionKey: STORAGE_ENCRYPTION_KEY });

const AuthContextProvider = ({ children }: PropsWithChildren) => {
	const [authToken, setAuthToken] = useMMKVString('authToken', storage);
	const segments = useSegments();
	const router = useRouter();

	useEffect(() => {
		const isAuthGroup = segments[0] === '(auth)';

		if (!authToken && !isAuthGroup) router.replace('/signin');
		if (authToken && isAuthGroup) router.replace('/');
	}, [authToken, segments]);

	const updateAuthToken = async (newToken: string) => {
		setAuthToken(newToken);
	};

	const removeAuthToken = async () => {
		setAuthToken(undefined);
	};

	return (
		<AuthContext.Provider value={{ authToken, updateAuthToken, removeAuthToken }}>{children}</AuthContext.Provider>
	);
};

export default AuthContextProvider;

export const useAuth = () => useContext(AuthContext);
