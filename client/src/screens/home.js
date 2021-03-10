import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Alert, Dimensions, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { Button, TouchableRipple, Appbar } from "react-native-paper";

const screenWidth = Dimensions.get("window").width;

const Home = () => {
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

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
        const { status } = await Camera.requestPermissionsAsync();

        if (status === "granted") {
            let result = await camera.takePictureAsync();
            console.log(result);

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

            <View
                style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        position: "absolute",
                        backgroundColor: "rgba(255,255,255,0.3)",
                        height: 5,
                        width: 50,
                        borderRadius: 50,
                        top: 10,
                    }}
                />
                <Text
                    style={{
                        color: "rgba(255,255,255,0.5)",
                        position: "absolute",
                        top: 30,
                    }}
                >
                    SIGNBOARD TRANSLATOR
                </Text>
                <TouchableRipple
                    style={{
                        borderColor: "white",
                        borderWidth: 3,
                        marginBottom: 37,
                        padding: 5,
                        borderRadius: 50,
                    }}
                    onPress={() => pickFromCamera()}
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
                        mode="text"
                        // style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
                        labelStyle={{
                            color: "rgba(255,255,255,0.5)",
                            letterSpacing: 0,
                        }}
                        // uppercase={false}
                        onPress={() => pickImageFromGallery()}
                    >
                        Pick From Gallery
                    </Button>
                </View>
                {/* {image && (
                    <Image
                        source={{ uri: image }}
                        style={{ height: 300, width: 400 }}
                    />
                )} */}
                {/* {!image && {

                }} */}
            </View>
        </View>
    );
};

export default Home;

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
