import React, { Component } from 'react';
import { Platform, 
	TouchableWithoutFeedback, 
	View,
	Button, 
	StyleSheet,
	Image,
	Modal,
	TouchableHighlight,
	Text,
	TouchableOpacity,
	TextInput,
	ScrollView,
	Dimensions } from 'react-native';
import { CheckBox } from 'react-native-elements';
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
   checkboxes: {
    fbChecked: false,
    igChecked: false,
    twChecked: false,
    ytChecked: false,
    ptChecked: false
   },
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  resetModalState(){
	this.setState({modalVisible: true});
  }

  render() {
	const { params } = this.props.navigation.state;
	var show = params ? params.show : null;
	const prevSc = params ? params.prevScene : null;
	console.log(this.state.modalVisible);	
	if (this.state.modalVisible == false){
		console.log('falsy');
		this.props.navigation.navigate(prevSc);
		var show = true;
		var vis = true;
		return this.state.modalVisible = true;
	}else{
		var vis = true;
		console.log('noey');
	
    return (
      <View style={{marginTop: 0}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={show}
          onRequestClose={() => {
            alert('Modal has been closed.');
	   console.log(show);
	  }}
	  onDismiss={() => {
		this.props.navigation.navigate(prevSc);
	  }}
          >
          <View style={{marginTop: 25, marginBottom: 25}}>
            <View>
		<View style={{backgroundColor: 'white', flex: 0, flexDirection: 'row', paddingLeft: 0, paddingRight: 0, marginTop: 20, marginBottom: 0}}>
			<View style={styles.container, {flex: 3}}>
				<TouchableHighlight style={styles.button} onPress={() => { console.log('closing'); this.setState({modalVisible: false, fbChecked: false, igChecked: false, twChecked: false, ptChecked: false, ytChecked: false})} }>	
					<Text style={{fontSize: 18}}>Cancel</Text>
				</TouchableHighlight>
			</View>

			<Text style={{flex: 6, fontWeight: 'bold', fontSize: 30, textAlign: 'center', marginTop: 0}}>Create Post</Text>

			<View style={styles.container, {flex: 3}}>
				<TouchableHighlight style={styles.button} onPress={() => { console.log('sending'); console.log(this.state.checkboxes) } }> 
					<Text style={{fontSize: 18}}>Post</Text>
				</TouchableHighlight>
			</View>
		</View>

		<ScrollView style={{marginTop: 0, marginBottom: 110}}>
		<TextInput style={{ padding: 20, paddingTop:20, paddingBottom: 20, borderWidth: 2 , height: 300, borderRadius: 15, marginTop: 10, marginLeft: 10, marginRight: 10, marginBottom: 25 }} placeholder={'Write something meaningful...'} multiline={true} />
			<CheckBox title={'Facebook'} checked={this.state.fbChecked} onPress={() => this.setState({fbChecked: !this.state.fbChecked}) } />
			<CheckBox title={'Instagram'} checked={this.state.igChecked} onPress={() => this.setState({igChecked: !this.state.igChecked}) } />
			<CheckBox title={'Twitter'} checked={this.state.twChecked} onPress={() => this.setState({twChecked: !this.state.twChecked}) } />
			<CheckBox title={'Pinterest'} checked={this.state.ptChecked} onPress={() => this.setState({ptChecked: !this.state.ptChecked}) } />
			<CheckBox title={'YouTube'} checked={this.state.ytChecked} onPress={() => this.setState({ytChecked: !this.state.ytChecked}) } />
		</ScrollView>
		
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
		console.log('Hi');
          }}>
          <Text> </Text>
        </TouchableHighlight>
      </View>
    );}
  }
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 10
  },

});


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
