import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';
import Wallet from './screens/Wallet';
import Addtrans from './screens/Addtrans';
import Payments from './screens/Payments';
import Splash from './screens/Splash';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNetInfo} from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';

import {useEffect} from 'react';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
} from 'react-native-fontawesome';

import {useState} from 'react';
import Login from './screens/Login';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const App = () => {
  const netInfo = useNetInfo();
  let [state, setState] = useState(false);
  let [login, setLogin] = useState(false);

  useEffect(() => {
    async function getD() {
      const value = await AsyncStorage.getItem('codefreak.co.in');
      if (value !== null) {
        setLogin(true);
      }
    }
    try {
      let netc = netInfo.isConnected;
      if (netc) {
        setState(true);
        console.log('net' + state);
        getD();
      }
    } catch (err) {
      console.log('errr');
    }
  });

  async function storeData(value) {
    try {
      console.log(value);
      await AsyncStorage.setItem('codefreak.co.in', value);
      console.log('stored');
    } catch (e) {
      console.log('storage error');
    }
  }

  async function getData() {
    try {
      const value = await AsyncStorage.getItem('codefreak.co.in');
      if (value !== null) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }

  function handleLogin(uname, pass) {
    console.log('clickedd');
    axios
      .post('https://expensetrackerbackendvit.herokuapp.com/login', {
        email: uname,
        password: pass,
      })
      .then(response => {
        let tok = response.data.token;
        if (tok != false) {
          console.log('inside if');
          storeData(tok);
          setLogin(true);
        } else {
          alert('Please check credentails');
        }
      })
      .catch(err => alert('Some error' + err));
  }

  function HomeS(setLogin) {
    return (
      <>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              tabBarShowLabel: false,
              tabBarStyle: {
                height: 65,
                borderStartColor: 'white',
                shadowColor: 'white',
                backgroundColor: 'white',
                borderTopWidth: 0.3,
                borderTopColor: '#ebe4e4',
                // marginTop: 20,
              },
            }}>
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                header: () => null,
                tabBarIcon: ({focused}) => {
                  return (
                    <Image
                      source={require('./images/home.png')}
                      style={{
                        height: 20,
                        width: 20,
                        opacity: focused ? 1 : 0.3,
                      }}></Image>
                  );
                },
              }}
            />
            <Tab.Screen
              name="Wallet"
              component={Wallet}
              options={{
                header: () => null,
                tabBarIcon: ({focused}) => {
                  return (
                    <Image
                      source={require('./images/add2.jpg')}
                      style={{
                        height: 20,
                        width: 20,
                        opacity: focused ? 1 : 0.3,
                      }}></Image>
                  );
                },
              }}
            />
            <Tab.Screen
              name="Addtrans"
              component={Addtrans}
              options={{
                header: () => null,
                tabBarIcon: ({focused}) => {
                  return (
                    <Image
                      source={require('./images/wallet.jpg')}
                      style={{
                        height: 20,
                        width: 20,
                        opacity: focused ? 1 : 0.3,
                      }}></Image>
                  );
                },
              }}
            />
            <Tab.Screen
              name="Payments"
              children={() => <Payments setLogins={setLogin} />}
              options={{
                header: () => null,
                tabBarIcon: ({focused}) => {
                  return (
                    <Image
                      source={require('./images/transaction.png')}
                      style={{
                        height: 20,
                        width: 20,
                        opacity: focused ? 1 : 0.3,
                      }}></Image>
                  );
                },
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </>
    );
  }

  // conditional rendering
  if (state) {
    if (login) {
      return HomeS(setLogin);
    } else {
      if (getData() == true) {
        return <ActivityIndicator />;
      } else {
        return <Login handleLogin={handleLogin} />;
      }
    }
  } else {
    return (
      <>
        <View
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator></ActivityIndicator>
        </View>
      </>
    );
  }
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
