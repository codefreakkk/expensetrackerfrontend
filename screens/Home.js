import React from 'react';

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

import Expense from '../components/Expense';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect} from 'react';
import axios from 'axios';

function Home() {
  let [data, setData] = useState([]);
  let [flag, setFlag] = useState(false);
  let [loading, setLoading] = useState(true);
  let [total, setTotal] = useState(0);

  useEffect(() => {
    AsyncStorage.getItem('codefreak.co.in').then(token => {
      axios
        .post(
          'https://expensetrackerbackendvit.herokuapp.com/getthreerecords',
          {
            token: token,
          },
        )
        .then(response => {
          // console.log(response.data.req);
          setData(response.data.req);
          setLoading(false);
          setFlag(true);
        })
        .catch(err => console.log(err));
    });
  }, [flag]);

  setTimeout(() => {
    AsyncStorage.getItem('codefreak.co.in').then(token => {
      axios
        .post('https://expensetrackerbackendvit.herokuapp.com/getbalance', {
          token: token,
        })
        .then(response => {
          setLoading(false);
          setTotal(response.data.req);
        })
        .catch(err => console.log(err));
    });
  }, 0);

  function handleRefresh() {
    setLoading(true);
    setFlag(!flag);
  }

  return (
    <>
      <View style={styles.header}>
        <Image
          style={{
            width: 500,
            height: 150,
            position: 'absolute',
            right: -215,
            opacity: 0.1,
            transform: [{rotate: '90deg'}],
            top: 0,
          }}
          source={require('../images/w.png')}></Image>
        {/* content */}

        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Text
            style={{
              marginLeft: -10,
              fontSize: 12,
              opacity: 0.5,
              marginBottom: 5,
            }}>
            Current balcance
          </Text>
          <View
            style={{
              height: 14,
              width: 14,
              backgroundColor: '#bbebfa',
              borderRadius: 100,
              marginLeft: 10,
              marginTop: 4,
            }}></View>
        </View>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Text style={styles.rupee}>{total}</Text>
          <Text style={{marginTop: 15, marginLeft: 7, opacity: 0.6}}>Rs</Text>
        </View>

        <Image
          source={require('../images/w.png')}
          style={{
            height: 200,
            width: 240,
            position: 'absolute',
            left: -90,
            bottom: 10,
            opacity: 0.1,
            transform: [{rotate: '270deg'}],
          }}></Image>
      </View>
      <View style={styles.body}>
        <Text style={styles.expense}>Breakdown of expenses</Text>
        <Pressable
          style={{
            position: 'absolute',
            right: 35,
            top: 35,
          }}
          onPress={handleRefresh}>
          <Image
            style={{height: 22, width: 22}}
            source={require('../images/refresh.png')}></Image>
        </Pressable>
        <ScrollView
          style={styles.scrollView}
          alignItems={'center'}
          justifyContent={'center'}>
          {!loading ? (
            data.map(ele => {
              return (
                <Expense
                  key={Math.random(0, 999999)}
                  title={ele.title}
                  amount={ele.amount}
                />
              );
            })
          ) : (
            <ActivityIndicator />
          )}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    // backgroundColor: 'red',
    width: '100%',
    height: '80%',
  },
  expense: {
    fontWeight: '500',
    color: 'black',
    // opacity: 0.6,
    marginTop: 35,
    marginLeft: 50,
  },
  body: {
    backgroundColor: 'white',
    height: '65%',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  header: {
    backgroundColor: '#f7faff',
    height: '40%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rupee: {
    fontSize: 52,
    fontWeight: '300',
    color: '#160987',
  },
});

export default Home;
