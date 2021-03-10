import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
    Alert,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { Button, TouchableRipple } from "react-native-paper";

const screenWidth = Dimensions.get("window").width;

const App = () => {
    const [image, setImage] = useState(null);

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    let camera;

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    const pickImageFromGallery = async () => {
        const {
            granted,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (granted) {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            console.log(result);

            if (!result.cancelled) {
                setImage(result.uri);
            }
        } else {
            Alert.alert("you need to give up permission to work");
        }
    };

    const pickFromCamera = async () => {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync();
        if (granted) {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.cancelled) {
                setImage(result.uri);
            }
        } else {
            Alert.alert("you need to give up permission to work");
        }
    };
    return (
        <View style={styles.container}>
            <Camera
                style={styles.camera}
                type={type}
                ratio={"3:2"}
                ref={(ref) => (camera = ref)}
            />
            {/* <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setType(
                            type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                        );
                    }}
                >
                    <Text style={styles.text}> Flip </Text>
                </TouchableOpacity>
            </View> */}
            <View
                style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    alignItems: "center",
                }}
            >
                <TouchableRipple
                    style={{
                        borderColor: "white",
                        borderWidth: 3,
                        marginBottom: 30,
                        padding: 5,
                        borderRadius: 50,
                    }}
                    onPress={() =>
                        camera
                            .takePictureAsync()
                            .then((res) => setImage(res.uri))
                    }
                >
                    <View
                        style={{
                            backgroundColor: "white",
                            width: 55,
                            height: 55,
                            borderRadius: 50,
                            borderColor: "white",
                        }}
                    />
                </TouchableRipple>
                <View style={{ marginBottom: 50 }}>
                    <Button
                        icon="folder-multiple-image"
                        mode="contained"
                        style={{ backgroundColor: "white" }}
                        labelStyle={{ color: "black", letterSpacing: 0 }}
                        uppercase={false}
                        onPress={() => pickImageFromGallery()}
                    >
                        Pick From Gallery
                    </Button>
                </View>
                {image && (
                    <Image
                        source={{ uri: image }}
                        style={{ height: 300, width: 400 }}
                    />
                )}
            </View>
            {/* <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Button
                    title="Pick an image from camera roll"
                    onPress={pickImage}
                />
                <Button
                    title="Pick an image from Camera"
                    onPress={pickFromCamera}
                />
                {image && (
                    <Image
                        source={{ uri: image }}
                        style={{ height: 300, width: 400 }}
                    />
                )}
            </View>
        */}
        </View>
    );
};

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        // alignItems: "center",
        // justifyContent: "center",
    },
    camera: {
        height: (3 / 2) * screenWidth,
        width: screenWidth,
    },
    text: {
        color: "white",
        textAlign: "center",
        padding: 5,
    },
});
