import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Entypo } from '@expo/vector-icons';

import { TweetType } from '../types';
import IconButton from './IconButton';

type TweetProps = {
	tweet: TweetType;
};

const Tweet = ({ tweet }: TweetProps) => {
	return (
		<Link href={`/tweet/${tweet.id}`} asChild>
			<Pressable style={styles.container}>
				<Image source={{ uri: tweet.user.image }} style={styles.userImage} />
				<View style={styles.mainContainer}>
					<View style={{ flexDirection: 'row' }}>
						<Text style={styles.name}>{tweet.user.name}</Text>
						<Text style={styles.username}>{tweet.user.username} ·2h</Text>
						<Entypo name="dots-three-horizontal" size={16} color="grey" style={{ marginLeft: 'auto' }} />
					</View>
					<Text style={styles.content}>{tweet.content}</Text>
					{tweet.image && <Image source={{ uri: tweet.image }} style={styles.image} />}
					<View style={styles.footer}>
						<IconButton icon="comment" text={tweet.numberOfComments || 0} />
						<IconButton icon="retweet" text={tweet.numberOfRetweets || 0} />
						<IconButton icon="heart" text={tweet.numberOfLikes || 0} />
						<IconButton icon="chart" text={tweet.impressions || 0} />
						<IconButton icon="share-apple" />
					</View>
				</View>
			</Pressable>
		</Link>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		padding: 10,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderColor: 'lightgrey',
		backgroundColor: 'white',
	},
	userImage: {
		width: 50,
		height: 50,
		borderRadius: 50,
	},
	mainContainer: {
		marginLeft: 10,
		flex: 1,
	},
	name: {
		fontWeight: 'bold',
	},
	username: {
		color: 'grey',
		marginLeft: 5,
	},
	content: {
		lineHeight: 20,
		marginTop: 5,
	},
	image: {
		width: '100%',
		aspectRatio: 16 / 9,
		marginTop: 5,
		borderRadius: 15,
	},
	footer: {
		flexDirection: 'row',
		marginTop: 5,
		justifyContent: 'space-between',
	},
});

export default Tweet;
