import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';
import {deviceHeight, deviceWidth, normalize} from '../utils/dimensions';

interface CardsProps {
  name: string;
  image: ImageSourcePropType;
  navigation: any;
}

const Cards: React.FC<CardsProps> = ({name, image, navigation}) => {
  const handlePress = () => {
    navigation.navigate('Details', {name});
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <ImageBackground
        source={image}
        style={styles.image}
        imageStyle={styles.imageStyle}
      />
      <View style={styles.overlay}>
        <Text style={styles.text}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    flex: 1,
  },
  image: {
    height: deviceHeight / 5,
    width: deviceWidth / 2 - 50,
    borderRadius: normalize(16),
  },
  imageStyle: {
    borderRadius: normalize(16),
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: normalize(22),
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default Cards;
