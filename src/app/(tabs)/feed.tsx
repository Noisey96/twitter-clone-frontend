import { StyleSheet } from 'react-native';

import { Text, BackgroundView } from '@/src/components/Themed';

export default function FeedScreen() {
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
