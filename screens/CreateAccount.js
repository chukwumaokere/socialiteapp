import { Notifications } from 'expo';
import { StackNavigator } from 'react-navigation';
import React from 'react';
import { ScrollView, StyleSheet, Alert, SafeAreaView, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, View, Image, TextInput, TouchableOpacity, Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { SearchBar } from 'react-native-elements';
import MainTabNavigator from '../navigation/MainTabNavigator';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

const bg = require('../assets/images/splashicon.png');

export default class CreateAccount extends React.Component {
  static navigationOptions = {title: 'Create a New Account'}
  state = {
        username: '',
        password: '',
        email: '',
        firstname: '',
        lastname: '',
        phone: '',
  }
  setAccountDetails = () => {
  }
  createAccount = () => {
	const {navigate} = this.props.navigation;
	//some creaty things
	//if successful, then do this
	const {username} = this.state;
	const {password} = this.state;
	const {email} = this.state;
	const {firstname} = this.state;
	const {lastname} = this.state;
	const {phone} = this.state;
	
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
			phone: phone
		})
	}).then( (response) => response.json() )
                .then( (responseJson) => { Alert.alert(responseJson); if(responseJson.includes("Successfully")){ navigate('Login')}} )
                .catch( (error) => {console.error(error)} );
	
	//navigate('Login');
  }
  clearText = () => {
	this.search.clear();
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
			<Text style={styles.h1}>Socialite</Text>
			<Text style={styles.h2}>All your social media in one place</Text>
		</View>
		<View style={styles.infoContainer}>
			<TextInput style={styles.input} returnKeyType='next' placeholder="Enter your First Name..." placeholderTextColor="rgba(0,0,0,0.3)" onSubmitEditing={()=> this.refs.lastn.focus()} autoCaptialize={'none'} autoCorrect={false} onChangeText={(something) => {this.setState({firstname: something})}} />
			<TextInput style={styles.input} returnKeyType='next' placeholder="Enter your Last Name..." placeholderTextColor="rgba(0,0,0,0.3)" ref={'lastn'} onSubmitEditing={()=> this.refs.usern.focus()} autoCaptialize={'none'} autoCorrect={false} onChangeText={(something) => {this.setState({lastname: something})}} />
			<TextInput style={styles.input} returnKeyType='next' placeholder="Choose A Username..." placeholderTextColor="rgba(0,0,0,0.3)" ref={'usern'} onSubmitEditing={()=> this.refs.txtPassword.focus()} autoCaptialize={'none'} autoCorrect={false} onChangeText={(something) => {this.setState({username: something})}} />
			<TextInput style={styles.input} returnKeyType='next'  placeholder="Enter A Password..." placeholderTextColor="rgba(0,0,0,0.3)" secureTextEntry={true} autoCorrect={false} ref={'txtPassword'} onSubmitEditing={()=> this.refs.email.focus()} autoCaptialize={'none'} autoCorrect={false} onChangeText={(something) => {this.setState({password: something})}} />
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
	marginBottom: 180,
  },
  logoContainer: {
	marginTop: -250,
	alignItems: 'center',
	justifyContent: 'center',
	flex: 1,
  },
  logo: {
	width: 100,
	height: 100,
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
	marginBottom: 80,
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
