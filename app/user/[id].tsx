import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, Text } from 'react-native';
import { useQuery } from '@tanstack/react-query';

import User from '../../components/User';
import { useTweetsApi } from '../../lib/api/tweets';

export default function UserScreen() {
	const { id } = useLocalSearchParams();

	const { getUser } = useTweetsApi();

	const { data, isLoading, error } = useQuery({
		queryKey: ['tweet', id],
		queryFn: () => getUser(id as string),
	});

	if (isLoading) return <ActivityIndicator />;

	if (error) return <Text>Tweet {id} not found!</Text>;

	return <User user={data} />;
}
