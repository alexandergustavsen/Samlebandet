import React from 'react';
import {
    ActivityIndicator,
    Button,
    Clipboard,
    Image,
    Share,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Icon } from 'native-base';
import {ImagePicker, Permissions } from 'expo';
import * as firebase from 'firebase';

console.disableYellowBox = true;
export default class PhotoTest extends React.Component {
    state = {
        image: null,
        uploading: false,
    };

    async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
    }

    render() {
    let { image } = this.state;

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={this.pickImage}>
            <Icon
            name='camera'//{this.props.iconName}
            size={50}
            />
        </TouchableOpacity>
        {/*}
        {image ? null : (
            <Text
            style={{
                fontSize: 20,
                marginBottom: 20,
                textAlign: 'center',
                marginHorizontal: 15,
            }}>
            Example: Upload ImagePicker result
            </Text>
        )}

        <Button
            onPress={this.pickImage}
            title="Pick an image from camera roll"
        />

        <Button onPress={this.takePhoto} title="Take a photo" /> */}

        {this.renderImage()}
        {this.renderLoading()}

        <StatusBar barStyle="default" />
        </View>
    );
    }

    renderLoading = () => {
    if (this.state.uploading) {
        return (
        <View
            style={[
            StyleSheet.absoluteFill,
            {
                backgroundColor: 'rgba(0,0,0,0.4)',
                alignItems: 'center',
                justifyContent: 'center',
            },
            ]}>
            <ActivityIndicator color="#fff" animating size="large" />
        </View>
        );
    }
    };

  renderImage = () => {
    let { image } = this.state;
    if (!image) {
      return;
    }

    return (
      <View>
          <Image source={{ uri: image }} style={{ width: this.props.imageWidth, height: this.props.imageHeight }} />
      </View>
    );
  };

  takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this.handleImagePicked(pickerResult);
  };

  pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this.handleImagePicked(pickerResult);
  };

  handleImagePicked = async pickerResult => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        uploadUrl = await uploadImageAsync(pickerResult.uri);
        this.setState({ image: uploadUrl });
      }
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({ uploading: false });
    }
  };
}



async function uploadImageAsync(uri) {
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.onload = function() {
      resolve(request.response);
    };
    request.onerror = function(e) {
      console.log(e);
      reject(new TypeError('The network request failed'));
    };
    request.responseType = 'blob';
    request.open('GET', uri, true);
    request.send(null);
  });
  const userId = firebase.auth().currentUser.uid;
  const ref = firebase.storage().ref('ProfilePictures/' + userId)
  const snapshot = await ref.put(blob);
  blob.close();

  return await snapshot.ref.getDownloadURL();
}