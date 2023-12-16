import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';

import {
  deviceHeight,
  deviceWidth,
  normalize,
  vh,
  vw,
} from '../utils/dimensions';
import Cards from '../components/Card';
import {cities} from '../utils/Constant';

const Home = (props: any) => {
  const [city, setCity] = useState('');
  const [showEmptyInputPopup, setShowEmptyInputPopup] = useState(false);

  const handleSearch = () => {
    if (!city.trim()) {
      setShowEmptyInputPopup(true);
    } else {
      setShowEmptyInputPopup(false);
      props.navigation.navigate('Details', {name: city});
    }
  };

  const closeModal = () => {
    setShowEmptyInputPopup(false);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/appBackGround.png')}
        style={styles.backgroundImage}
        imageStyle={styles.imageOverlay}
      />
      <View style={styles.absoluteContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.greetingText}>Hello there.</Text>
          <Text style={styles.searchPrompt}>Search the city by the name</Text>
          <View style={styles.searchInputContainer}>
            <TextInput
              value={city}
              onChangeText={val => setCity(val)}
              placeholder="Search City"
              placeholderTextColor="white"
              style={styles.searchInput}
            />
            <TouchableOpacity onPress={handleSearch}>
              <Image
                style={styles.searchIcon}
                source={require('../assets/images/search.png')}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.myLocationsText}>My Locations</Text>
          <FlatList
            horizontal
            data={cities}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <Cards
                name={item.name}
                image={item.image}
                navigation={props.navigation}
              />
            )}
          />
        </View>
      </View>
      <Modal
        transparent={true}
        animationType="slide"
        visible={showEmptyInputPopup}
        onRequestClose={closeModal}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Please enter a city</Text>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    height: deviceHeight,
    width: deviceWidth,
  },
  imageOverlay: {
    opacity: 0.6,
    backgroundColor: 'black',
  },
  absoluteContainer: {
    position: 'absolute',
    paddingVertical: vw(20),
    paddingHorizontal: vw(10),
  },
  profileImageContainer: {
    width: deviceWidth - vw(20),
  },
  profileImage: {
    height: vw(46),
    width: vw(46),
    borderRadius: vw(50),
  },
  textContainer: {
    paddingHorizontal: vw(20),
    marginTop: vh(100),
  },
  greetingText: {
    fontSize: normalize(40),
    color: 'white',
  },
  searchPrompt: {
    color: 'white',
    fontSize: vw(22),
    fontWeight: '400',
  },
  searchInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'white',
    marginTop: normalize(16),
    paddingHorizontal: vw(10),
  },
  searchInput: {
    paddingHorizontal: vw(10),
    color: 'white',
    fontSize: normalize(16),
  },
  searchIcon: {
    height: vw(22),
    width: vw(22),
  },
  myLocationsText: {
    color: 'white',
    fontSize: normalize(25),
    paddingHorizontal: vw(10),
    marginTop: vw(250),
    marginBottom: vw(20),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: vw(20),
    borderRadius: vw(10),
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalText: {
    fontSize: normalize(18),
    color: 'black',
    textAlign: 'center',
  },
});

export default Home;
