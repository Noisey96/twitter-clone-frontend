import { Alert, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { BackgroundView, PrimaryButton, PrimaryText, Text, TextInput } from '@/src/components/Themed';
import { useAuth } from '@/src/context/auth';
import { authenticate } from '@/src/lib/api/auth';
import { AuthContextProps } from '@/src/types';
import { getErrorMessage } from '@/src/utilities';

export default function Authenticate() {
	const [emailToken, setEmailToken] = useState('');
	const { email } = useLocalSearchParams<{ email: string }>();
	const { updateAuthToken } = useAuth() as AuthContextProps;

	const onAuthenticate = async () => {
		if (typeof email !== 'string') return;
		try {
			const res = await authenticate({ email, emailToken });
			await updateAuthToken(res.authToken);
		} catch (err) {
			const message = getErrorMessage(err);
			Alert.alert('Error: ', message);
		}
	};

	return (
		<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<BackgroundView style={{ flex: 1 }}>
					<BackgroundView style={styles.header}>
						<PrimaryText style={styles.title}>TwitterClone</PrimaryText>
					</BackgroundView>
					<BackgroundView style={styles.body}>
						<Text style={styles.label}>Confirm your email address</Text>
						<TextInput
							style={styles.input}
							placeholder="Email Code"
							value={emailToken}
							onChangeText={setEmailToken}
						/>
						<PrimaryButton style={styles.button} onPress={onAuthenticate}>
							<Text style={styles.buttonText}>Confirm</Text>
						</PrimaryButton>
					</BackgroundView>
				</BackgroundView>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
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
