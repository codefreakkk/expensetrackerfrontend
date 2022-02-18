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
  TextInput,
  ActivityIndicator,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {useState, useEffect} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

function Addtrans() {
  let [total, setTotal] = useState();
  let [title, setTitle] = useState('');
  let [message, setMessage] = useState('');
  let [amount, setAmount] = useState('');
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
  }, 100);

  function handleRefresh() {
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
  }

  async function submitData() {
    if (amount > 0 && title.length > 0) {
      const token = await AsyncStorage.getItem('codefreak.co.in');
      axios
        .put('https://expensetrackerbackendvit.herokuapp.com/addbalance', {
          title,
          message,
          amount,
          token: token,
        })
        .then(response => {
          alert(response.data.req);
          setAmount('');
          setMessage('');
          setTitle('');
        })
        .catch(err => console.log(err));
    } else {
      alert('Amount or Title not filled');
    }
  }

  return (
    <>
      <View style={styles.body}>
        <View
          style={{
            height: '36%',
            width: '100%',
            backgroundColor: '#f7f7f7',
            display: 'flex',
            alignItems: 'center',
          }}>
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
              <Text>Here's your Spending dashboard</Text>
            </View>
          </View>
          <View
            style={{
              width: '90%',
              shadowColor: 'black',
              shadowOffset: 10,
              elevation: 40,
              marginTop: 15,
              height: 120,
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text style={styles.rupee}>
                {loading ? (
                  <ActivityIndicator marginTop={15} color={'blue'} />
                ) : (
                  total
                )}
              </Text>
              <Text style={{marginTop: 15, marginLeft: 7, opacity: 0.6}}>
                Rs
              </Text>
            </View>
            <Text style={{fontSize: 10, marginLeft: 0, marginTop: 5}}>
              Amount you are left out with
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            height: '64%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.expense}>Fill your transaction</Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            defaultValue={title}
            onChangeText={title => setTitle(title)}
          />
          <TextInput
            style={styles.input}
            placeholder="Message (Optional)"
            defaultValue={message}
            onChangeText={message => setMessage(message)}
          />
          <TextInput
            style={styles.input}
            placeholder="Amount"
            defaultValue={amount}
            onChangeText={amount => setAmount(amount)}
          />
          <Pressable style={styles.btn} onPress={submitData}>
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
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
  iheader: {
    height: 90,
    width: '100%',
    paddingLeft: 20,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  rupee: {
    fontSize: 42,
    fontWeight: '800',
    color: '#160970',
  },
  body: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
  input: {
    height: 50,
    borderRadius: 5,
    // margin: 12,
    borderWidth: 0.5,
    padding: 10,
    width: '80%',
    marginTop: 15,
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
  body1: {
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
  expense: {
    position: 'relative',
    fontWeight: '500',
    color: 'black',
    top: -10,
    left: '-23%',
  },
});

export default Addtrans;
