import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
const EditPost = () => {
  const route = useRoute();
  const [caption, setCaption] = useState('');
  const [imageData, setImageData] = useState(null);
  const [name, setName] = useState('');
  const viewRef = useRef();
  const [username, setUsername] = useState('');
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Socialpost Pro App Camera Permission',
          message:
            'Socialpost Pro App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        openCamera();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Socialpost Pro App Storage Permission',
          message:
            'Socialpost Pro App needs access to your storage ' +
            'so you can save pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        openGallery();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const openCamera = async () => {
    const options = {
      mediaType: 'image',
    };
    const result = await launchCamera(options);

    if (result.didCancel) {
    } else {
      setImageData(result);
    }
  };
  const openGallery = async () => {
    const options = {
      mediaType: 'image',
    };
    const result = await launchImageLibrary(options);
    if (result.didCancel) {
    } else {
      setImageData(result);
    }
  };
  const captureImage = () => {
    viewRef.current.capture().then(uri => {
      console.log('do something with ', uri);
      Share.open({
        message: caption,
        url: uri,
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          err && console.log(err);
        });
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Post For {route.params.name}</Text>
      <ViewShot
        style={styles.viewShotStyle}
        ref={viewRef}
        options={{fileName: 'Your-File-Name', format: 'jpg', quality: 0.9}}>
        <View style={styles.postView}>
          <View style={styles.postTopView}>
            <View style={styles.topLeftView}>
              {imageData == null ? (
                <Image
                  source={require('../images/user.png')}
                  style={styles.postUserImage}
                />
              ) : (
                <Image
                  source={{uri: imageData.assets[0].uri}}
                  style={styles.postUserImage}
                />
              )}
              <View style={styles.nameView}>
                <Text style={styles.name}>{name == '' ? 'Name' : name}</Text>
                <Text style={styles.username}>
                  {username == '' ? '@username' : '@' + username}
                </Text>
              </View>
            </View>
            <Image source={route.params.icon} style={styles.icon} />
          </View>
          <Text style={styles.captionView}>{caption}</Text>
        </View>
      </ViewShot>
      <TextInput
        onChangeText={text => {
          setName(text);
        }}
        multiline={true}
        value={name}
        placeholder="Name"
        style={styles.captionInput}
      />
      <TextInput
        onChangeText={text => {
          setUsername(text);
        }}
        value={username}
        placeholder="@username"
        multiline={true}
        style={[styles.captionInput, {marginTop: 10}]}
      />
      <TextInput
        onChangeText={text => {
          setCaption(text);
        }}
        value={caption}
        multiline={true}
        placeholder="Caption"
        style={[styles.captionInput, {marginTop: 10}]}
      />

      <TouchableOpacity
        style={styles.pickImageFromGallery}
        onPress={() => {
          requestStoragePermission();
        }}>
        <Text style={styles.btnText}>Pick Image From Gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.pickImageFromGallery}
        onPress={() => {
          requestCameraPermission();
        }}>
        <Text style={styles.btnText}>Pick Image From Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.share}
        onPress={() => {
          captureImage();
        }}>
        <Image source={require('../images/share.png')} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default EditPost;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postView: {
    width: '100%',

    borderRadius: 10,
    backgroundColor: '#fff',
    marginTop: 50,
    elevation: 10,
  },
  postTopView: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topLeftView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postUserImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginTop: 20,
    marginLeft: 20,
  },
  nameView: {
    marginTop: 20,
    marginLeft: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
  },
  username: {
    fontWeight: '600',
    color: '#8e8e8e',
  },
  icon: {
    width: 24,
    height: 24,
    marginTop: 20,
    marginRight: 20,
  },
  captionInput: {
    height: 50,
    width: '80%',
    alignSelf: 'center',
    borderWidth: 0.3,
    marginTop: 50,
    borderRadius: 10,
    paddingLeft: 20,
  },
  captionView: {
    margin: 20,
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  pickImageFromGallery: {
    backgroundColor: '#2b79ff',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 50,
    borderRadius: 10,
    marginTop: 20,
  },
  btnText: {
    color: '#fff',
  },
  pickedImageStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
  },
  viewShotStyle: {
    width: '80%',
    alignSelf: 'center',
  },
  share: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});
