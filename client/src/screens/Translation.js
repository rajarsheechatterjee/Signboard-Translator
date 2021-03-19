import React, { useEffect } from 'react';
import { Text } from 'react-native';

import firebase from '../services/firebaseConfig';

const Translation = ({ route, navigation }) => {
	const { imageName } = route.params;

	const getImageFromFirebase = () => {
		// const storage = firebase.storage();
		// const pathReference = storage
		// 	.ref(`images/0960bd00-4310-41af-984f-e6092869004f.jpg`)
		// 	.getDownloadURL();

		// const encodedUri = encodeURIComponent(pathReference);
		fetch(`http://127.0.0.1:5000/`, {
			method: 'GET',
			headers: {
				'access-control-allow-origin': '*',
				'Content-type': 'application/json;',
			},
		})
			.then((response) => response.json())
			.then((json) => console.log(json));
	};

	useEffect(() => {
		getImageFromFirebase();
	}, []);

	return <Text>{imageName}</Text>;
};

export default Translation;
