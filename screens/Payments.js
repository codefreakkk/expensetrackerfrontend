import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

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

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Expense from '../components/Expense';
import axios from 'axios';

function Payments({setLogins}) {
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(true);
  let [flag, setFlag] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('codefreak.co.in').then(token => {
      axios
        .post('https://expensetrackerbackendvit.herokuapp.com/gettrans', {
          token: token,
        })
        .then(response => {
          setLoading(false);
          setData(response.data.req);
        })
        .catch(err => console.log(err));
    });
  }, [flag]);

  function handleRefresh() {
    setFlag(!flag);
    setLoading(true);
    console.log(flag);
  }

  async function handleLogout() {
    try {
      await AsyncStorage.removeItem('codefreak.co.in');
      setLogins(false);
      console.log('Done.');
    } catch (e) {
      console.log('remove error');
    }
  }

  return (
    <>
      <View style={styles.iheader}>
        <View
          style={{
            height: 75,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 75,
            backgroundColor: 'white',
            borderRadius: 100,
          }}>
          <Image
            source={require('../images/user.png')}
            style={{height: 70, width: 70}}></Image>
        </View>
        <View style={{marginLeft: 15}}>
          <Text style={{fontWeight: '800', color: 'black'}}>Hi User,</Text>
          <Text>Here's your transactions dashboard</Text>
        </View>
        <Pressable
          onPress={handleLogout}
          style={{
            display: 'flex',
            flexDirection: 'row',
            position: 'absolute',
            right: 20,
            top: -5,
          }}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>Logout</Text>
          <Image
            style={{height: 25, width: 25, marginLeft: 10}}
            source={require('../images/logout.png')}></Image>
        </Pressable>
      </View>
      <View
        style={{
          height: '90%',
          width: '100%',
          paddingBottom: '15%',
          backgroundColor: 'white',
          borderRadius: 25,
        }}>
        <Text style={styles.expense}>Last Transactions</Text>
        <Pressable
          style={{
            position: 'absolute',
            right: 35,
            top: 40,
          }}
          onPress={handleRefresh}>
          <Image
            style={{height: 21, width: 21}}
            source={require('../images/refresh.png')}></Image>
        </Pressable>
        <ScrollView style={styles.scrollView} alignItems={'center'}>
          {loading ? (
            <ActivityIndicator marginTop={25} />
          ) : (
            data.map(ele => {
              return (
                <Expense
                  key={Math.random(1, 999999)}
                  title={ele.title}
                  amount={ele.amount}
                />
              );
            })
          )}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    // backgroundColor: 'red',
    marginTop: 65,
    width: '100%',
    height: '60%',
  },
  iheader: {
    height: 90,
    width: '100%',
    paddingLeft: 20,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  expense: {
    position: 'relative',
    fontWeight: '500',
    color: 'black',
    top: 40,
    left: 60,
  },
});

export default Payments;
