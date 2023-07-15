import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

import { PrimaryText } from '@/src/components/Themed';
import Colors from '@/src/constants/Colors';

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) {
	return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? 'light'].text,
			}}
		>
			<Tabs.Screen
				name="feed"
				options={{
					title: 'Feed',
					tabBarIcon: ({ color }) => <TabBarIcon name="feed" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: 'Profile',
					tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
				}}
			/>
			
			<Tabs.Screen name="index" options={{ href: null }} />
		</Tabs>
	);
}
