import React, { Component } from 'react';
import {Image,
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Modal,
  View,
  TextInput,
  Dimensions,
  AppRegistry } from 'react-native';
import { NavigationActions, StackNavigator } from 'react-navigation';
import { ExpoLinksView } from '@expo/samples';
 import HomeScreen from '../screens/HomeScreen'; 
import CreateScreenA from '../screens/CreateScreenA';

class HomeScreener extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go etails"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

class CreateScreenB extends React.Component {
static navigationOptions = ({ navigation }) => {
        header: null
	return {
		title: 'Review Jobs',
            headerRight: (
                <Button 
                    title='Setting' 
                    onPress={ () => navigation.navigate('Home') }                
                    backgroundColor= "rgba(0,0,0,0)"
                    color="rgba(0,122,255,1)"
                />
            ), 
            style: {
                marginTop: Platform.OS === 'android' ? 24 : 0 
            },
            tabBarIcon: ({ tintColor}) => {
                return <Icon name = "favorite" size={26} color={tintColor} />;
            } 
	}
  };
state = {
    modalVisible: true,
  };
setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  render() {
    return (
	<View style={{marginTop: 22}}>
        <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>Hello World!</Text>

              <TouchableHighlight
                onPress={() => {
	navigation.navigate('Home')
        {/*  this.props.navigation.dispatch(navigateAction);    */}
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
          }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const RootStack = StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Create: {
	screen: CreateScreenB,
  },
},
{
  initialRouteName: 'Create',
}
);

export default class App extends React.Component {
	render() {
		return <RootStack />;
	}
}
{/*
export default class App extends React.Component {
state = {
    modalVisible: true,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  onPress = () => {
        this.setModalVisible(true);
  }
  render() {
	
    return ( <View style={{marginTop: 22}}>
        <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>Hello World!</Text>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(false);
        {/*  this.props.navigation.dispatch(navigateAction);    
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>
      </View>  );
  }
} */}
