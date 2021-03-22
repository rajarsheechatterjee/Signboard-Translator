import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Alert, Dimensions, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

import firebase from '../services/firebaseConfig';
import { Button } from '../components/Button';

const screenWidth = Dimensions.get('window').width;

const Home = ({ navigation }) => {
	const [type, setType] = useState(Camera.Constants.Type.back);
	const [imageUri, setImageUri] = useState('');
	const getFileName = (path) => {
		return path.split('/').pop();
	};

	/**
	 * Upload image to firebase storage
	 */
	const handleUploadPhoto = async (imageUri) => {
		const response = await fetch(imageUri);
		const blob = await response.blob();
		const imageName = getFileName(imageUri);

		const ref = firebase
			.storage()
			.ref()
			.child('images/' + imageName);
		ref.put(blob).then((snapshot) => {
			snapshot.ref.getDownloadURL().then((url) => {
				setImageUri(url);
			});
		});
	};

	const pickImageFromGallery = async () => {
		// Get permission to access gallery
		const {
			granted,
		} = await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (granted) {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				allowsEditing: true,
				aspect: [3, 2],
				quality: 1,
			});

			console.log(result);

			if (!result.cancelled) {
				handleUploadPhoto(result.uri);
				navigation.navigate('Translation', {
					imageUri: imageUri,
				});
			}
		} else {
			Alert.alert('you need to give up permission to work');
		}
	};

	const pickFromCamera = async () => {
		// Get permission to access camera
		const { status } = await Camera.requestPermissionsAsync();

		if (status === 'granted') {
			let result = await camera.takePictureAsync();
			console.log(result);

			if (!result.cancelled) {
				handleUploadPhoto(result.uri);
				navigation.navigate('Translation', {
					imageUri: imageUri,
				});
			}
		} else {
			Alert.alert('you need to give up permission to work');
		}
	};

	return (
		<View style={styles.container}>
			<Camera
				style={styles.camera}
				type={type}
				ratio={'3:2'}
				ref={(ref) => (camera = ref)}
			/>

			<View style={{ flex: 1 }}>
				<View style={styles.bsIndicator} />
				<Text style={styles.appName}>SIGNBOARD TRANSLATOR</Text>
				<View style={styles.buttons}>
					<View style={{ flex: 1 }}>
						<View
							style={{
								flexDirection: 'row',
								marginVertical: 15,
							}}
						>
							<View style={{ flex: 1 / 2 }}>
								<Text style={styles.langHeader}>
									Source Language
								</Text>
								<Text style={styles.lang}>Hindi</Text>
							</View>

							<View style={{ flex: 1 / 2 }}>
								<Text style={styles.langHeader}>
									Translation Language
								</Text>
								<Text style={styles.lang}>English</Text>
							</View>
						</View>

						<Button
							label="pick from camera"
							onPress={() => pickFromCamera()}
						/>
						<Button
							label="Pick from gallery"
							onPress={() => pickImageFromGallery()}
						/>
					</View>
				</View>
			</View>
		</View>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000',
	},
	appName: {
		color: 'rgba(255,255,255,0.5)',
		position: 'absolute',
		top: 30,
		fontWeight: 'bold',
		alignSelf: 'center',
	},
	buttons: {
		flex: 1,
		flexDirection: 'row',
		paddingHorizontal: 15,
		alignItems: 'center',
		marginTop: 30,
	},
	camera: {
		height: (3 / 2) * screenWidth,
		width: screenWidth,
	},
	text: {
		color: 'white',
		textAlign: 'center',
		padding: 5,
	},
	bsIndicator: {
		position: 'absolute',
		backgroundColor: 'rgba(255,255,255,0.3)',
		height: 5,
		width: 50,
		borderRadius: 50,
		top: 10,
		alignSelf: 'center',
	},
	langHeader: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 15,
		marginBottom: 5,
	},
	lang: {
		color: 'rgba(255,255,255,0.7)',
		marginBottom: 10,
	},
});
