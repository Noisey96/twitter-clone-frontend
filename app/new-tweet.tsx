import { useState } from 'react';
import { View, StyleSheet, Image, TextInput, Pressable, Text, SafeAreaView, ActivityIndicator } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createTweet } from '../lib/tweets';

export default function NewTweet() {
	const [text, setText] = useState('');

	const router = useRouter();

	const queryClient = useQueryClient();
	const { mutateAsync, isLoading, isError, error } = useMutation({
		mutationFn: createTweet,
		onSuccess: (data) => {
			queryClient.setQueriesData(['tweets'], (existingTweets) => [data, ...existingTweets]);
		},
	});

	const onTweetPress = async () => {
		console.warn('Posting new tweet: ', text);

		try {
			await mutateAsync({ content: text });

			setText('');
			router.back();
		} catch (err) {
			console.log('Error: ', err.message);
		}
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
			<View style={styles.container}>
				<View style={styles.buttonContainer}>
					<Link href="../" style={{ fontSize: 20 }}>
						Cancel
					</Link>
					{isLoading && <ActivityIndicator />}
					<Pressable onPress={onTweetPress} style={styles.button}>
						<Text style={styles.buttonText}>Tweet</Text>
					</Pressable>
				</View>
				<View style={styles.inputContainer}>
					<Image source={{ uri: '' }} style={styles.image} />
					<TextInput
						value={text}
						onChangeText={setText}
						placeholder="What's happening?"
						multiline
						numberOfLines={5}
						style={{ flex: 1 }}
					/>
				</View>
				{isError && <Text>Error: {error.message}</Text>}
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		flex: 1,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginVertical: 10,
	},
	button: {
		backgroundColor: '#1C9BF0',
		padding: 10,
		paddingHorizontal: 20,
		borderRadius: 50,
	},
	buttonText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 16,
	},
	inputContainer: {
		flexDirection: 'row',
	},
	image: {
		width: 50,
		aspectRatio: 1,
		borderRadius: 50,
		marginRight: 10,
	},
});
