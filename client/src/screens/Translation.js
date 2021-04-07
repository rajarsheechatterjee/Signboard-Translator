import React, { useEffect, useState } from 'react';
import { Text, Image, View, ActivityIndicator } from 'react-native';
import * as Speech from 'expo-speech';
import { IconButton } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

const Translation = ({ route, navigation }) => {
	const { imageUri, tl } = route.params;

	const [loading, setLoading] = useState(true);
	const [data, setData] = useState();

	const textToSpeech = (tts, languageCode) => {
		Speech.speak(tts, { language: languageCode });
	};

	const getTranslationFromApi = async () => {
		const encodedUri = encodeURIComponent(imageUri);

		let data = await fetch(
			`http://192.168.1.34:5000/translate?imageUri=${encodedUri}&tl=${tl}`
		);
		console.log(
			`http://192.168.1.34:5000/translate?imageUri=${encodedUri}&tl=${tl}`
		);
		let res = await data.json();
		setData(res);
		setLoading(false);

		console.log(res);
	};

	useEffect(() => {
		getTranslationFromApi();
	}, []);

	return (
		<View style={{ flex: 1, backgroundColor: 'black' }}>
			<StatusBar style="light" />
			<Image
				source={{ uri: imageUri }}
				style={{
					flex: 1,
					justifyContent: 'center',
				}}
				resizeMode="contain"
			/>
			{!loading ? (
				<View style={{ flex: 1, padding: 24 }}>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							borderBottomWidth: 1,
							marginBottom: 10,
							borderBottomColor: 'grey',
						}}
					>
						<Text
							style={{
								fontWeight: 'bold',
								color: 'white',
								fontSize: 18,
							}}
						>
							Original Text
						</Text>
						<IconButton
							icon="text-to-speech"
							color="white"
							onPress={() =>
								textToSpeech(
									data.originalText,
									data.originalTextCode
								)
							}
						/>
					</View>
					<Text
						style={{
							fontSize: 20,
							marginBottom: 10,
							color: 'white',
							marginBottom: 20,
						}}
						onPress={() =>
							textToSpeech(
								data.originalText,
								data.originalTextCode
							)
						}
					>
						{data.originalText}
					</Text>

					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							borderBottomWidth: 1,
							marginBottom: 10,
							borderBottomColor: 'grey',
							marginTop: 50,
						}}
					>
						<Text
							style={{
								fontWeight: 'bold',
								color: 'white',
								fontSize: 18,
							}}
						>
							Translated Text
						</Text>
						<IconButton
							icon="text-to-speech"
							color="white"
							onPress={() =>
								textToSpeech(
									data.translatedText,
									data.translatedTextCode
								)
							}
						/>
					</View>
					<Text
						style={{
							fontSize: 20,
							marginBottom: 10,
							color: 'white',
						}}
						onPress={() =>
							textToSpeech(
								data.translatedText,
								data.translatedTextCode
							)
						}
					>
						{data.translatedText}
					</Text>
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
