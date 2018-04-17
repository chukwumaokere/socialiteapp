import { Notifications } from 'expo';
import { StackNavigator } from 'react-navigation';
import React from 'react';
import { ScrollView, StyleSheet, SafeAreaView, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, View, Image, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { SearchBar } from 'react-native-elements';

import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

const bg = require('../assets/images/splashicon.png');


export default class LoginScreen extends React.Component {
  static navigationOptions = { 
	title: 'Login', 
  	header: false, 
	gesturesEnabled: false,
  };
  state = {
	username: '',
	password: '',
	email: '',
        firstname: '',
        lastname: '',
        phone: '',

  }
  setData(){
	//this.setState({email : responseJson.data.email, firstname: responseJson.data.firstname, lastname: responseJson.data.lastname, phone: responseJson.data.phone});
  }

  login = () => {
	const {navigate} = this.props.navigation;
        //some creaty things
        //if successful, then do this
        const {username} = this.state;
        const {password} = this.state;
        const {email} = this.state;
        const {firstname} = this.state;
        const {lastname} = this.state;
        const {phone} = this.state;

        fetch('http://chukwumaokere.com/socialite/webservice/login.php', {
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
                .then( (responseJson) => { if(responseJson.response.includes("Successful")){this.setState({email : responseJson.data.email, firstname: responseJson.data.firstname, lastname: responseJson.data.lastname, phone: responseJson.data.phone}); navigate('Home', {data: this.state,}); /*console.log(responseJson);*/ }else{ Alert.alert(responseJson); console.log('login issue');}} )
                .catch( (error) => {console.error(error)} );	
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
			<TextInput style={styles.input} returnKeyType='next' placeholder="Enter Username..." textContentType='none' secureTextEntry={false} placeholderTextColor="rgba(0,0,0,0.3)" onSubmitEditing={()=> this.refs.txtPassword.focus()} autoCapitalize={'none'} autoCorrect={false} onChangeText={(something) => {this.setState({username: something})}} />
			<TextInput style={styles.input} returnKeyType='go'  placeholder="Enter Password..." placeholderTextColor="rgba(0,0,0,0.3)" textContentType='none' secureTextEntry={true} autoCorrect={false} ref={'txtPassword'} clearButtonMode={'while-editing'} onChangeText={(something) => {this.setState({password: something}); this.obscureText  }} />
			<TouchableOpacity onPress={this.login}>
				<View style={styles.button}>
					<Text style={{fontSize: 20, color: 'white',}}>LOGIN</Text>
				</View>
			</TouchableOpacity>
			<TouchableOpacity onPress={()=> navigate('CreateAccount',)}>
				<View style={styles.signup}>
					<Text>Don't have an account? Sign up now!</Text>
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
	marginTop: -20,
	alignItems: 'center',
	justifyContent: 'center',
	flex: 1,
  },
  logo: {
	width: 190,
	height: 190,
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
	bottom: 0,
	padding: 22,
	marginBottom: 30,
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
