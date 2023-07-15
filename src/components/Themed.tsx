import {
	Pressable,
	Text as DefaultText,
	TextInput as DefaultTextInput,
	useColorScheme,
	View as DefaultView,
	PressableProps as DefaultPressableProps,
} from 'react-native';

import Colors from '@/src/constants/Colors';

type ThemeProps = {
	lightColor?: string;
	darkColor?: string;
};

export type PressableProps = ThemeProps & DefaultPressableProps & DefaultView['props'];
export type TextProps = ThemeProps & DefaultText['props'];
export type TextInputProps = ThemeProps & DefaultTextInput['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function useThemeColor(
	overrides: { light?: string; dark?: string },
	colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
	const theme = useColorScheme() ?? 'light';
	const overrideColor = overrides[theme];

	if (overrideColor) return overrideColor;
	else return Colors[theme][colorName];
}

export function PrimaryButton(props: PressableProps) {
	const { style, lightColor, darkColor, ...otherProps } = props;

	const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'primary');

	return (
		<Pressable
			style={({ pressed }) => [{ backgroundColor: pressed ? backgroundColor + 'aa' : backgroundColor }, style]}
			{...otherProps}
		/>
	);
}

export function TextInput(props: TextInputProps) {
	const { style, lightColor, darkColor, ...otherProps } = props;

	const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'secondary');
	const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

	return <DefaultTextInput style={[{ backgroundColor, color }, style]} {...otherProps} />;
}

export function PrimaryText(props: TextProps) {
	const { style, lightColor, darkColor, ...otherProps } = props;

	const color = useThemeColor({ light: lightColor, dark: darkColor }, 'primary');

	return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function Text(props: TextProps) {
	const { style, lightColor, darkColor, ...otherProps } = props;

	const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

	return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function SecondaryView(props: ViewProps) {
	const { style, lightColor, darkColor, ...otherProps } = props;
	const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'secondary');

	return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function BackgroundView(props: ViewProps) {
	const { style, lightColor, darkColor, ...otherProps } = props;
	const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

	return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
