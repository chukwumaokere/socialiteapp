import React, { Component } from 'react';
import { Platform, 
	TouchableWithoutFeedback, 
	View, 
	StyleSheet,
	Image,
	Modal,
	TouchableHighlight,
	Text,
	TouchableOpacity,
	TextInput,
	Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CreateScreen from '../screens/CreateScreen';
import SearchScreen from '../screens/SearchScreen';

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
	const { params } = this.props.navigation.state;
	const show = params ? params.show : null;
	const prevSc = params ? params.prevScene : null;
	console.log(this.state.modalVisible);	
	if (this.state.modalVisible == false){
		console.log('falsy');
		var vis = true;
		return null;
	}else{
		var vis = true;
		console.log('noey');
	
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={vis}
          onRequestClose={() => {
            alert('Modal has been closed.');
	   console.log(show);
	  }}
	  onDismiss={() => {
	//	this.setModalVisible(true);
		this.props.navigation.navigate(prevSc);
	  }}
          >
          <View style={{marginTop: 22}}>
            <View>
              <Text>Hello World!</Text>

              <TouchableHighlight
                onPress={() => {
		  this.props.navigation.navigate(prevSc);
                  this.setModalVisible(false);
		  console.log(JSON.stringify(show));
{/*	          navigation.navigate('Home');*/}
        {/*  this.props.navigation.dispatch(navigateAction);    */}
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
		console.log('Hi');
          }}>
          <Text>Show Modals</Text>
        </TouchableHighlight>
      </View>
    );}
  }
}



export default TabNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Create: {
      screen: CreateModal,
    },
    Search: {
      screen: SearchScreen,
    },
    Settings: {
      screen: SettingsScreen,
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Search': iconName = Platform.OS === 'ios' ? `ios-search${focused ? '' : '-outline'}` : 'pencil';
            break;
          case 'Create': iconName = Platform.OS === 'ios' ? `ios-brush${focused ? '' : '-outline'}` : 'brush';
            break;
          case 'Home': iconName = Platform.OS === 'ios' ? `ios-home${focused ? '' : '-outline'}` : 'md-options';
	    break;
	  case 'Settings': iconName = Platform.OS === 'ios' ? `ios-settings${focused ? '' : '-outline'}` : 'ion-android-settings';
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3, width: 25 }}
            color={focused ? 'tomato' : Colors.tabIconDefault}
          />
        );
      },
	tabBarOnPress: ({previousScene, route, jumpToIndex}) => {
		const { routeName } = navigation.state;
		if (routeName == 'Create'){
			navigation.navigate(routeName, {show: true, prevScene: previousScene});
			return(<View> <CreateModal show={true}/> </View>);
			console.log(routeName);
		}else{
			navigation.navigate(routeName);
		}
	}
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
); 
