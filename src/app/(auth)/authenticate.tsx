import { TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { View, Text } from '@/src/components/Themed';
import { useAuth } from '@/src/context/auth';
import { authenticate } from '@/src/lib/api/auth';
import { AuthContextProps } from '@/src/types';
import { getErrorMessage } from '@/src/utilities';

export const Authenticate = () => {
	const [emailToken, setEmailToken] = useState('');
	const { email } = useLocalSearchParams<{ email: string }>();
	const { updateAuthToken } = useAuth() as AuthContextProps;

	const onAuthenticate = async () => {
		if (typeof email !== 'string') return;
		try {
			const newToken = await authenticate({ email, emailToken });
			updateAuthToken(newToken);
		} catch (err) {
			const message = getErrorMessage(err);
			Alert.alert('Error: ', message);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Confirm your email address</Text>
			<TextInput style={styles.input} placeholder="Email Code" value={emailToken} onChangeText={setEmailToken} />
			<Pressable style={styles.button} onPress={onAuthenticate}>
				<Text style={styles.buttonText}>Confirm</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 24,
	},
	label: {
		fontSize: 24,
		marginVertical: 5,
	},
	input: {
		borderWidth: StyleSheet.hairlineWidth,
		padding: 10,
		fontSize: 20,
		marginVertical: 5,
		borderRadius: 10,
	},
	button: {
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 10,
		marginVertical: 5,
	},
	buttonText: {
		fontWeight: 'bold',
	},
});
