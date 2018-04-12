import React, { Component } from 'react';
import {Image,
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

{/*
const navigateAction = NavigationActions.back({
	key: 'HomeScreen'
});
const goHere = StackNavigator({
	Home: {
		screen: HomeScreen
	},
});

AppRegistry.registerComponent('socialite', () => goHere);
*/}

class CreateModal extends Component {
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
    var show = this.props.show;
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
                  this.setModalVisible(false);
	{/*  this.props.navigation.dispatch(navigateAction);	*/}
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
      </View>
    );
  }
}

const BaseStack = StackNavigator({
	RealHome: {
		screen: HomeScreen
	},
});

class CreateScreen extends Component {
  static navigationOptions = {
    title: 'Create',
  };

  render() {
    return (
      <View style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
        <CreateModal show={true}  />
      </View> 
    );
  }

}
{/*
export default StackNavigator({
	Home: {
		screen: CreateScreen,
	},
});
*/}

export default class App extends Component {
  render() {
    return <BaseStack />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

