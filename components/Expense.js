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
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function Expense({title, amount}) {
  return (
    <>
      <View style={styles.container}>
        {/* image */}
        <View style={styles.img}>
          <Image
            source={require('../images/money.png')}
            style={{
              width: 35,
              height: 35,
            }}></Image>
        </View>

        <View style={styles.content}>
          <Text style={{fontWeight: '600'}}>{title}</Text>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            top: 35,
            right: 0,
          }}>
          <Text style={{fontWeight: '500', color: 'black'}}>- {amount}</Text>
          <Text
            style={{
              fontSize: 8,
              position: 'relative',
              top: -2,
              marginLeft: 2,
              fontWeight: '700',
            }}>
            Rs
          </Text>
          <View>
            <Image
              source={require('../images/down1.png')}
              style={{
                height: 10,
                width: 13,
                marginLeft: 10,
                // opacity: 1,
              }}></Image>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'pink',
    marginBottom: 30,
    borderBottomColor: 'black',
    // opacity: 1,
    borderColor: 'black',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.3,
    // width: '100%',
    height: 90,
    display: 'flex',
    flexDirection: 'row',
  },
  img: {
    width: '24%',
    backgroundColor: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 29,
    height: 69,
    backgroundColor: '#d9e6ff',
  },
  content: {
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 35,
  },
});

export default Expense;
