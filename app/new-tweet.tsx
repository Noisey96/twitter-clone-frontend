import { useState } from 'react';
import { View, StyleSheet, Image, TextInput, Pressable, Text, SafeAreaView } from 'react-native';
import { Link, useRouter } from 'expo-router';

export default function NewTweet() {
	const [text, setText] = useState('');
	const router = useRouter();

	const onTweetPress = () => {
		console.warn('Posting new tweet: ', text);

		setText('');
		router.back();
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
			<View style={styles.container}>
				<View style={styles.buttonContainer}>
					<Link href="../" style={{ fontSize: 20 }}>
						Cancel
					</Link>
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
