export const login = async (data: { email: string }) => {
	const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/login`, {
		method: 'POST',
		headers: {
			'Content-type': 'Application/json',
		},
		body: JSON.stringify(data),
	});
	if (res.status !== 200) throw new Error('Error during the login process');
};

export const authenticate = async (data: { email: string; emailToken: string }) => {
	const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/authenticate`, {
		method: 'POST',
		headers: {
			'Content-type': 'Application/json',
		},
		body: JSON.stringify(data),
	});
	if (res.status !== 200) throw new Error('Error during the authentication process');
	return res.json();
};
