import { TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

import { View, Text } from '@/components/Themed';
import { login } from '@/lib/api/auth';

export const Login = () => {
	const [email, setEmail] = useState('');

	const onLogin = async () => {
		try {
			await login({ email });
			// router
		} catch (err) {
			Alert.alert('Error: ', err.message);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Login or Create an Account</Text>
			<TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
			<Pressable style={styles.button} onPress={onLogin}>
				<Text style={styles.buttonText}>Login</Text>
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
