import React, { useEffect, useState } from 'react';
import { Text, Image, View, ActivityIndicator } from 'react-native';
import * as Speech from 'expo-speech';
import { IconButton, Appbar } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../theme/theme';

const Translation = ({ route, navigation }) => {
	const { imageUri, tl } = route.params;

	const [loading, setLoading] = useState(true);
	const [data, setData] = useState();

	const languages = {
		en: 'English',
		hi: 'Hindi',
		mr: 'Marathi',
		te: 'Telugu',
		ta: 'Tamil',
		kn: 'Kannada',
		bn: 'Bengali',
	};

	const textToSpeech = (tts, languageCode) => {
		Speech.speak(tts, { language: languageCode });
	};

	const getTranslationFromApi = async () => {
		const encodedUri = encodeURIComponent(imageUri);

		let data = await fetch(
			`http://192.168.1.37:5000/translate?imageUri=${encodedUri}&tl=${tl}`
		);
		console.log(
			`Url -> http://192.168.1.37:5000/translate?imageUri=${encodedUri}&tl=${tl}`
		);
		let res = await data.json();
		setData(res);
		console.log(res);
	};

	useEffect(() => {
		let mounted = true;

		getTranslationFromApi().then(() => setLoading(false));

		return () => (mounted = false);
	}, []);

	return (
		<View style={{ flex: 1, backgroundColor: theme.colorPrimary }}>
			<StatusBar style="light" />
			<Appbar.Header
				dark
				style={{ backgroundColor: theme.colorPrimaryDark }}
			>
				<Appbar.Action
					icon="arrow-left"
					onPress={() => navigation.goBack()}
				/>

				<Appbar.Content title="Translation" />
			</Appbar.Header>
			<Image
				source={{ uri: imageUri }}
				style={{ height: 280 }}
				resizeMode="contain"
			/>
			{!loading ? (
				<View style={{ marginTop: 20 }}>
					<View
						style={{
							backgroundColor: theme.colorPrimaryDark,
							margin: 8,
							padding: 16,
							borderRadius: 4,
							elevation: 3,
						}}
					>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-between',
								marginBottom: 8,
							}}
						>
							<Text
								style={{
									color: theme.textColorSecondary,
									fontSize: 18,
								}}
							>
								{languages[data.originalTextCode] ??
									languages['en']}
							</Text>
							<IconButton
								icon="volume-high"
								color={theme.textColorSecondary}
								style={{
									margin: 0,
									marginRight: 8,
								}}
								onPress={() =>
									textToSpeech(
										data.originalText,
										data.originalTextCode
									)
								}
								size={22}
							/>
						</View>
						<Text
							style={{
								color: theme.textColorPrimary,
								fontSize: 20,
							}}
						>
							{data.originalText}
						</Text>
					</View>
					<View
						style={{
							padding: 16,
							alignSelf: 'center',
						}}
					>
						<IconButton
							icon="google-translate"
							color={theme.colorAccent}
							style={{
								margin: 0,
								marginRight: 8,
							}}
							size={22}
						/>
					</View>
					<View
						style={{
							backgroundColor: theme.colorPrimaryDark,
							margin: 8,
							padding: 16,
							borderRadius: 4,
							elevation: 3,
						}}
					>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-between',
								marginBottom: 8,
							}}
						>
							<Text
								style={{
									color: theme.textColorSecondary,
									fontSize: 18,
								}}
							>
								{languages[data.translatedTextCode]}
							</Text>
							<IconButton
								icon="volume-high"
								color={theme.textColorSecondary}
								style={{
									margin: 0,
									marginRight: 8,
								}}
								onPress={() =>
									textToSpeech(
										data.translatedText,
										data.translatedTextCode
									)
								}
								size={22}
							/>
						</View>
						<Text
							style={{
								color: theme.textColorPrimary,
								fontSize: 20,
							}}
						>
							{data.translatedText}
						</Text>
					</View>
				</View>
			) : (
				<ActivityIndicator
					color="#0366d6"
					size={50}
					style={{ flex: 1 }}
				/>
			)}
		</View>
	);
};

export default Translation;
