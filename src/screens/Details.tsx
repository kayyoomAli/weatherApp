import React, {useEffect, useState} from 'react';
import {
  View,
  ImageBackground,
  Image,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {
  deviceHeight,
  deviceWidth,
  normalize,
  vh,
  vw,
} from '../utils/dimensions';
import {API_KEY} from '../utils/Constant';
import {useNavigation} from '@react-navigation/native';

interface DetailsProps {
  route: {
    params: {
      name: string;
    };
  };
}

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  visibility: number;
  weather: {
    main: string;
  }[];
  wind: {
    speed: number;
  };
}

const Details: React.FC<DetailsProps> = ({route}) => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const {name} = route.params;
  const navigation = useNavigation();

  const fetchData = () => {
    setLoading(true); // Set loading to true before making the API call
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_KEY}`,
    )
      .then(res => res.json())
      .then(res => {
        setData(res);
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Something went wrong');
      })
      .finally(() => {
        setLoading(false); // Set loading to false after the API call is complete
      });
  };

  useEffect(() => {
    fetchData();
  }, [name]);

  const Data: React.FC<{title: string; value: string | number}> = ({
    title,
    value,
  }) => (
    <View style={styles.dataContainer}>
      <Text style={styles.grayText}>{title}</Text>
      <Text style={styles.whiteText}>{value}</Text>
    </View>
  );

  const handleRefresh = () => {
    fetchData();
  };

  return (
    <View>
      <ImageBackground
        source={require('../assets/images/appBackGround.png')}
        style={styles.backgroundImage}
        imageStyle={styles.imageOverlay}
      />
      <View style={styles.absoluteContainer}>
        <View style={styles.userImageContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/images/upArrow2.png')}
              style={[
                styles.userImage,
                {
                  transform: [{rotate: '-90deg'}],
                },
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRefresh}>
            <Image
              source={require('../assets/images/refresh.png')}
              style={styles.userImage}
            />
          </TouchableOpacity>
        </View>

        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : data ? (
          <View style={styles.weatherContainer}>
            <View>
              <Text style={styles.whiteText}>{name}</Text>
              <Text style={[styles.whiteText, styles.weatherDescription]}>
                {data?.weather[0]?.main}
              </Text>
            </View>

            <Text style={styles.largeTemperatureText}>
              {(data?.main?.temp - 273).toFixed(2)}&deg; C
            </Text>

            <View style={styles.weatherDetailsContainer}>
              <Text style={styles.sectionHeaderText}>Weather Details</Text>
              <View style={styles.detailsDataContainer}>
                <Data value={data?.wind?.speed} title="Wind" />
                <Data value={data?.main?.pressure} title="Pressure" />
                <Data value={`${data?.main?.humidity}%`} title="Humidity" />
                <Data value={data?.visibility} title="Visibility" />
              </View>
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    height: deviceHeight,
    width: deviceWidth,
  },
  loadingText: {
    color: 'white',
    fontSize: normalize(20),
    textAlign: 'center',
    marginTop: deviceHeight / 2.5,
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
  userImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: deviceWidth - vw(20),
  },
  userImage: {
    height: vw(36),
    width: vw(36),
    borderRadius: normalize(50),
    tintColor: 'white',
  },
  weatherContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: deviceHeight - vh(100),
  },
  grayText: {
    color: 'gray',
    fontSize: normalize(22),
  },
  whiteText: {
    color: 'white',
    fontSize: normalize(22),
  },
  largeTemperatureText: {
    color: 'white',
    fontSize: normalize(64),
  },
  weatherDetailsContainer: {
    marginTop: vh(16),
    width: deviceWidth - 60,
  },
  sectionHeaderText: {
    color: 'white',
    fontSize: normalize(22),
    marginBottom: vh(16),
  },
  detailsDataContainer: {
    width: '100%',
  },
  dataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weatherDescription: {
    textAlign: 'center',
  },
});

export default Details;
