import { Notifications } from 'expo';
import { StackNavigator } from 'react-navigation';
import React from 'react';
import { DatePickerIOS, ScrollView, StyleSheet, Alert, SafeAreaView, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, View, Image, TextInput, TouchableOpacity, Text } from 'react-native';
import  Modal  from 'react-native-modal';
import { ExpoLinksView } from '@expo/samples';
import { SearchBar } from 'react-native-elements';
import MainTabNavigator from '../navigation/MainTabNavigator';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

const bg = require('../assets/images/splashicon.png');

function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return monthNames[monthIndex] + ' ' + day + ', ' + year;
}

console.log(formatDate(new Date()));

const today = new Date();
const dobString = formatDate(new Date()).toString(); 

export default class CreateAccount extends React.Component {
  static navigationOptions = {title: 'Create a New Account'}
  state = {
        username: '',
        password: '',
        email: '',
        firstname: '',
        lastname: '',
        phone: '',
	dobString: '',
	dob: today,
	showDob: false,
  }
  setAccountDetails = () => {
  }
  createAccount = () => {
	Keyboard.dismiss();
	const {navigate} = this.props.navigation;
	//some creaty things
	const {username} = this.state;
	const {password} = this.state;
	const {email} = this.state;
	const {firstname} = this.state;
	const {lastname} = this.state;
	const {phone} = this.state;
	const {dobString} = this.state;
	
	fetch('http://chukwumaokere.com/socialite/webservice/register.php', {
		method: 'post',
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			username: username,
			password: password,
			email: email,
			firstname: firstname,
			lastname: lastname,
			phone: phone,
			dob: dobString,
		})
	}).then( (response) => response.json() )
                .then( (responseJson) => { Alert.alert(responseJson); if(responseJson.includes("Successfully")){ navigate('Login')}} )
                .catch( (error) => {console.error(error)} );
	
	//navigate('Login');
  }
  clearText = () => {
	this.search.clear();
  }
  showDob = () => {	
	console.log('it ran');
	this.setState({showDob: !this.state.showDob});
  }
  updateDob = (date) => {
	var newDob = formatDate(new Date(date)).toString();
	this.setState({dobString: newDob});
  }

  render() {
   const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
	<KeyboardAvoidingView behavior='padding' style={styles.container}>
	<TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
	<View style={styles.container}>
	   <View style={styles.container}>
		<View style={styles.logoContainer}>
			<Image style={styles.logo} source={bg} />
			<View style={styles.logoText}>
				<Text style={styles.h1}>Socialite</Text>
				<Text style={styles.h2}>All your social media in one place</Text>
			</View>
		</View>
		<View style={styles.infoContainer}>
			<TextInput style={styles.input} returnKeyType='next' placeholder="Enter your First Name..." placeholderTextColor="rgba(0,0,0,0.3)" onSubmitEditing={()=> this.refs.lastn.focus()} autoCaptialize={'none'} autoCorrect={false} onChangeText={(something) => {this.setState({firstname: something})}} />
			<TextInput style={styles.input} returnKeyType='next' placeholder="Enter your Last Name..." placeholderTextColor="rgba(0,0,0,0.3)" ref={'lastn'} onSubmitEditing={()=> this.refs.usern.focus()} autoCaptialize={'none'} autoCorrect={false} onChangeText={(something) => {this.setState({lastname: something})}} />
			<TextInput style={styles.input} returnKeyType='next' placeholder="Choose A Username..." placeholderTextColor="rgba(0,0,0,0.3)" ref={'usern'} onSubmitEditing={()=> this.refs.txtPassword.focus()} autoCaptialize={'none'} autoCorrect={false} onChangeText={(something) => {this.setState({username: something})}} />
			<TextInput style={styles.input} returnKeyType='next'  placeholder="Enter A Password..." placeholderTextColor="rgba(0,0,0,0.3)" secureTextEntry={true} autoCorrect={false} ref={'txtPassword'} onSubmitEditing={()=> this.refs.txtdob.focus()} autoCaptialize={'none'} autoCorrect={false} onChangeText={(something) => {this.setState({password: something})}} />
			<TextInput style={styles.input} returnKeyType='next' placeholder="Enter your Birthdate..." placeholderTextColor="rgba(0,0,0,0.3)" autoCorrect={false} ref={'txtdob'} onFocus={() => {this.showDob(); console.log('clicked dob'); Keyboard.dismiss() }} value={this.state.dobString} />

			<View>
			<Modal style={styles.bottomModal} isVisible={this.state.showDob} onSwipe={() => this.setState({ showDob: false })}  swipeDirection="down" onBackdropPress={() => this.setState({ showDob: false })} >
			<View style={styles.datecontainer}>
				<DatePickerIOS date={this.state.dob} mode={'date'} onDateChange={ (newdate) => { this.setState({dob: newdate }); console.log(newdate); this.updateDob(newdate); console.log(this.state.dob) }} visible={false}  />
				 <TouchableOpacity onPress={()=>{this.showDob();}} >
                                        <View style={styles.button}>
                                                <Text style={{fontSize: 20, color: 'white',}}>DONE</Text>
                                        </View>
                                </TouchableOpacity>
			</View>
			</Modal>
			</View>


			<TextInput style={styles.input} returnKeyType='next' placeholder="Enter Your Email Address..." placeholderTextColor="rgba(0,0,0,0.3)" ref={'email'} keyboardType={'email-address'} onSubmitEditing={()=> this.refs.phonen.focus()} autoCaptialize={'none'} autoCorrect={false} onChangeText={(something) => {this.setState({email: something})}} />
			<TextInput style={styles.input} returnKeyType='go' keyboardType={'numeric'} placeholder="Enter Your Phone Number..." placeholderTextColor="rgba(0,0,0,0.3)" ref={'phonen'} autoCaptialize={'none'} autoCorrect={false} onChangeText={(something) => {this.setState({phone: something})}} />
			<TouchableOpacity onPress={this.createAccount} >
				<View style={styles.button}>
					<Text style={{fontSize: 20, color: 'white',}}>CREATE ACCOUNT</Text>
				</View>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => {navigate('Login')}}>
				<View style={styles.signup}>
					<Text>Already have an account? Just go Log In!</Text>
				</View>
			</TouchableOpacity>
		</View>
	   </View>
	</View>
	</TouchableWithoutFeedback>
	</KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  h1: {
	fontSize: 42,
	marginBottom: 5,
	marginTop: -20,
  },
  h2: {
	fontSize: 20,
	marginBottom: 60,
  },
  logoContainer: {
	marginTop: -420,
	alignItems: 'center',
	justifyContent: 'center',
	flex: 1,
  },
  logo: {
	width: 100,
	height: 100,
  },
  logoText: {
	alignItems: 'center',
	justifyContent: 'center',
  },
  datecontainer:{
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    margin: 10,
    marginBottom: 0,
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 2,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  signup: {
	marginTop: 20,
	alignItems: 'center',
	justifyContent: 'center',
  },
  infoContainer: {
	//backgroundColor: 'red',
	height: 200,
	position: 'absolute',
	left: 0,
	right: 0,
	bottom: 100,
	padding: 22,
	marginBottom: 180,
  },
  input: {
	height: 40,
	paddingHorizontal: 20,
	marginBottom: 10,
	backgroundColor: 'rgba(192,192,192,.2)',
	color: 'black',
  },
  button: {
    backgroundColor: '#e52f37',
    padding: 12,
    margin: 1,
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});
