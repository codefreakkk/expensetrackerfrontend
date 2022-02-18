import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  TextInput,
  View,
  Image,
  ActivityIndicator,
  Pressable,
} from 'react-native';

import {useState, useEffect} from 'react';

import axios from 'axios';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Expense from '../components/Expense';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Wallet() {
  let [amount, setAmount] = useState();
  let [msg, setMsg] = useState('');
  let [total, setTotal] = useState();
  let [loading, setLoading] = useState(true);

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

  const handleRefresh = () => {
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
  };

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem('codefreak.co.in');
    if (amount > 0) {
      axios
        .post('https://expensetrackerbackendvit.herokuapp.com/addbalance', {
          amount: amount,
          message: msg,
          token: token,
        })
        .then(response => {
          alert(response.data.req);
          setAmount('');
          setMsg('');
        })
        .catch(err => console.log(err));
    } else {
      alert('Please enter valid amount');
    }
  };
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
            Current balance
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
          <Text style={styles.rupee}>
            {loading ? (
              <ActivityIndicator marginTop={15} color={'blue'} />
            ) : (
              total
            )}
          </Text>
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
        <Text style={styles.expense}>Add Balance in wallet</Text>
        <TextInput
          style={styles.input}
          placeholder="Amount"
          defaultValue={amount}
          onChangeText={text => setAmount(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Message (Optional)"
          defaultValue={msg}
          onChangeText={text => setMsg(text)}
        />
        <Pressable style={styles.btn} onPress={handleSubmit}>
          <Text
            style={{
              color: 'white',
              letterSpacing: 2,
              fontSize: 16,
              fontWeight: '400',
            }}>
            SUBMIT
          </Text>
        </Pressable>
        <Pressable style={styles.btn1} onPress={handleRefresh}>
          <Text
            style={{
              color: 'white',
              letterSpacing: 2,
              fontSize: 16,
              fontWeight: '400',
            }}>
            REFRESH
          </Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderRadius: 5,
    // margin: 12,
    borderWidth: 0.5,
    padding: 10,
    width: '80%',
    marginTop: 15,
  },
  btn1: {
    height: 50,
    borderRadius: 5,
    // margin: 12,
    backgroundColor: '#689efc',
    padding: 10,
    width: '80%',
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    height: 50,
    borderRadius: 5,
    // margin: 12,
    backgroundColor: '#689efc',
    padding: 10,
    width: '80%',
    marginTop: 25,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    // backgroundColor: 'red',
    width: '100%',
    height: '80%',
  },
  expense: {
    fontWeight: '500',
    color: 'black',
    position: 'absolute',
    top: 30,
    left: 50,
  },
  body: {
    backgroundColor: 'white',
    height: '65%',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#f7faff',
    height: '40%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  expense: {
    position: 'relative',
    fontWeight: '500',
    color: '#160987',
    top: -10,
    left: '-21%',
  },
  rupee: {
    fontSize: 52,
    fontWeight: '300',
    color: '#160987',
  },
});

export default Wallet;
