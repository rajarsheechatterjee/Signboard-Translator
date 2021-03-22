import React, { useEffect } from 'react';
import { Text, Button, View } from 'react-native';

import firebase from '../services/firebaseConfig';

const Translation = ({ route, navigation }) => {
	const { imageUri } = route.params;

	const getTranslationFromApi = async () => {
		const encodedUri = encodeURIComponent(imageUri);

		let data = await fetch(
			`http://192.168.1.37:5000/translate?imageUri=${encodedUri}`
		);
		let res = await data.json();
		console.log(res);
	};

	useEffect(() => {
		getTranslationFromApi();
	}, []);

	return (
		<View style={{ marginTop: 60 }}>
			<Text>{imageUri}</Text>
			<Button title="Get image" onPress={() => getTranslationFromApi()} />
		</View>
	);
};

export default Translation;
