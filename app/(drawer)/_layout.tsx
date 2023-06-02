import { withLayoutContext } from 'expo-router';
import { ActivityIndicator, Text } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { useAuth } from '../../context/AuthContext';

const DrawerNavigator = createDrawerNavigator().Navigator;

const Drawer = withLayoutContext(DrawerNavigator);

function CustomDrawerContent(props) {
	return (
		<DrawerContentScrollView {...props}>
			<Text style={{ alignSelf: 'center', fontSize: 20 }}>Vadim</Text>
			<DrawerItemList {...props} />
		</DrawerContentScrollView>
	);
}

export default function DrawerLayout() {
	const { authToken } = useAuth();

	if (!authToken) return <ActivityIndicator />;

	return (
		<Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
			<Drawer.Screen name="(tabs)" options={{ headerShown: false, title: 'Home' }} />
			<Drawer.Screen name="bookmarks" options={{ title: 'Bookmarks' }} />
			<Drawer.Screen name="twitter-blue" options={{ title: 'Twitter Blue' }} />
		</Drawer>
	);
}
