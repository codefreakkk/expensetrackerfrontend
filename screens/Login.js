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
  TextInput,
  Pressable,
  ActivityIndicator,
} from 'react-native';

import {useState} from 'react';

function Login({handleLogin}) {
  const [uname, setUname] = useState('');
  const [pass, setPass] = useState('');
  return (
    <>
      <View style={styles.cont}>
        <Text style={styles.login}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          defaultValue={uname}
          onChangeText={uname => setUname(uname)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          defaultValue={pass}
          onChangeText={pass => setPass(pass)}
        />
        <Pressable style={styles.btn} onPress={() => handleLogin(uname, pass)}>
          <Text style={{color: 'white'}}>Submit</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  login: {
    fontSize: 35,
    position: 'relative',
    color: 'black',
    left: -115,
    bottom: 30,
  },
  cont: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    color: 'white',
  },
});

export default Login;
