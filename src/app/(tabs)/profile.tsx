import { StyleSheet } from 'react-native';

import { Text, BackgroundView } from '@/src/components/Themed';
import { useAuth } from '@/src/context/auth';
import { AuthContextProps } from '@/src/types';
import { useEffect } from 'react';

export default function Profile() {
	const { removeAuthToken } = useAuth() as AuthContextProps;

	useEffect(() => {
		removeAuthToken();
	}, []);

	return (
		<BackgroundView style={styles.container}>
			<Text>Test</Text>
		</BackgroundView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
