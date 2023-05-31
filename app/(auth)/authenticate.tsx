import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { authenticate } from '../../lib/api/auth';
import { useAuth } from '../../context/AuthContext';

const Authenticate = () => {
	const [code, setCode] = useState('');
	const { email } = useLocalSearchParams();

	const { setAuthToken } = useAuth();

	const onConfirm = async () => {
		if (typeof email !== 'string') return;
		try {
			const res = await authenticate({ email, emailToken: code });
			setAuthToken(res.authToken);
		} catch (err) {
			Alert.alert('Error: ', err.message);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Confirm your email address</Text>
			<TextInput style={styles.input} placeholder="Email Code" value={code} onChangeText={setCode} />
			<Pressable style={styles.button} onPress={onConfirm}>
				<Text style={styles.buttonText}>Confirm</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flex: 1,
		justifyContent: 'center',
		padding: 24,
	},
	label: {
		fontSize: 24,
		marginVertical: 5,
		color: 'gray',
	},
	error: {
		marginVertical: 5,
		color: 'red',
	},
	input: {
		borderColor: 'gray',
		borderWidth: StyleSheet.hairlineWidth,
		padding: 10,
		fontSize: 20,
		marginVertical: 5,
		borderRadius: 10,
	},
	button: {
		backgroundColor: '#050A12',
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 10,
		marginVertical: 5,
	},
	buttonText: {
		color: 'white',
		fontWeight: 'bold',
	},
});

export default Authenticate;
