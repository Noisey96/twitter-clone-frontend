import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AuthContextProvider from '../context/AuthContext';
import TweetsApiContextProvider from '../lib/api/tweets';

const client = new QueryClient();

export { ErrorBoundary } from 'expo-router';

export default function RootLayout() {
	return (
		<>
			<RootLayoutNav />
		</>
	);
}

function RootLayoutNav() {
	const colorScheme = useColorScheme();

	return (
		<>
			<AuthContextProvider>
				<TweetsApiContextProvider>
					<QueryClientProvider client={client}>
						<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
							<Stack>
								<Stack.Screen name="(drawer)" options={{ headerShown: false }} />
								<Stack.Screen name="tweet/[id]" options={{ title: 'Tweet' }} />
								<Stack.Screen name="user/[id]" options={{ title: 'User' }} />
								<Stack.Screen name="new-tweet" options={{ title: 'New Tweet', headerShown: false }} />
								<Stack.Screen name="(auth)/signin" options={{ title: 'Sign In' }} />
								<Stack.Screen name="(auth)/authenticate" options={{ title: 'Confirm' }} />
							</Stack>
						</ThemeProvider>
					</QueryClientProvider>
				</TweetsApiContextProvider>
			</AuthContextProvider>
		</>
	);
}
