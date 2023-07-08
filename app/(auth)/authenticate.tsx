import { TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { View, Text } from '@/components/Themed';
import { useAuth } from '@/context/auth';
import { authenticate } from '@/lib/api/auth';
import { AuthContextProps } from '@/types';

export const Authenticate = () => {
	const [emailToken, setEmailToken] = useState('');
	const { email } = useLocalSearchParams();

	const { updateAuthToken } = useAuth() as AuthContextProps;

	const onAuthenticate = async () => {
		try {
			const newToken = await authenticate({ email, emailToken });
			updateAuthToken(newToken);
		} catch (err) {
			Alert.alert('Error: ', err.message);
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
