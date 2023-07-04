import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs, useNavigation } from 'expo-router';
import { Pressable, useColorScheme, Image } from 'react-native';
import { useQuery } from '@tanstack/react-query';

import Colors from '../../../constants/Colors';
import { useTweetsApi } from '../../../lib/api/tweets';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) {
	return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

function AvatarHeader() {
	const navigation = useNavigation();

	const { getCurrentUser } = useTweetsApi();

	const currentUserQuery = useQuery({
		queryKey: ['user/myself'],
		queryFn: getCurrentUser,
	});

	return (
		<Pressable onPress={() => navigation.openDrawer()}>
			{!currentUserQuery.isLoading && !currentUserQuery.isError && (
				<Image
					source={{ uri: currentUserQuery.data.image }}
					style={{ width: 30, aspectRatio: 1, borderRadius: 40, marginLeft: 10 }}
				/>
			)}
		</Pressable>
	);
}

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
			}}
		>
			<Tabs.Screen
				name="feed"
				options={{
					title: 'Feed',
					tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
					headerLeft: () => <AvatarHeader />,
				}}
			/>
		</Tabs>
	);
}
