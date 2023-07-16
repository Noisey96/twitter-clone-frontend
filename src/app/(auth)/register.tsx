import { Alert, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';

import { BackgroundView, PrimaryButton, PrimaryText, Text, TextInput } from '@/src/components/Themed';
import { register } from '@/src/lib/api/auth';
import { getErrorMessage } from '@/src/utilities';

export default function RegisterScreen() {
	const { email } = useLocalSearchParams<{ email: string }>();
	const [username, setUsername] = useState('');

	const onRegister = async () => {
		try {
			await register({ email, username });
			router.push({ pathname: '/authenticate', params: { email } });
		} catch (err) {
			const message = getErrorMessage(err);
			Alert.alert('Error: ', message);
		}
	};

	return (
		<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<BackgroundView style={styles.container}>
					<BackgroundView style={styles.header}>
						<PrimaryText style={styles.title}>TwitterClone</PrimaryText>
					</BackgroundView>
					<BackgroundView style={styles.body}>
						<Text style={styles.label}>Enter Your Username</Text>
						<TextInput
							style={styles.input}
							placeholder="Username"
							value={username}
							onChangeText={setUsername}
						/>
						<PrimaryButton style={styles.button} onPress={onRegister}>
							<Text style={styles.buttonText}>Register</Text>
						</PrimaryButton>
					</BackgroundView>
				</BackgroundView>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 36,
	},
	body: {
		flex: 2,
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
