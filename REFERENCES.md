# Special thanks to these references for making this possible: 

https://github.com/react-native-community/react-native-modal  

https://snack.expo.io/ByBCD_2r-  

https://snack.expo.io/BJOB36c-b  

https://react-native-training.github.io/react-native-elements/docs/overlay.html  

https://github.com/react-native-training/react-native-elements   

https://www.youtube.com/watch?v=rT8ZV7W3Ybc  

https://facebook.github.io/react-native/docs/image.html  

https://reactnavigation.org/docs/tab-based-navigation.html  

https://facebook.github.io/react-native/docs/components-and-apis.html  

https://www.npmjs.com/package/react-native-customized-image-picker  

https://github.com/beefe/react-native-picker  

https://facebook.github.io/react-native/docs/modal.html  

https://facebook.github.io/react-native/docs/text.html  

https://facebook.github.io/react-native/docs/height-and-width.html  

https://facebook.github.io/react-native/docs/flexbox.html  

https://facebook.github.io/react-native/docs/view.html  

https://facebook.github.io/react-native/docs/scrollview.html  

https://facebook.github.io/react-native/docs/flatlist.html  

https://medium.com/the-react-native-log/tips-for-react-native-images-or-saying-goodbye-to-trial-and-error-b2baaf0a1a4d  


When passing to using navigation, from the `export default class MainClass extends` we need to pass `this.props.navigation.state.params` to a component and then use `state = this.props.info.info.data;` within that component

https://docs.expo.io/versions/latest/sdk/video



//state= this.props.navigation.state.params.data;

const {navigate} = this.props.navigation;
        //some creaty things
        //if successful, then do this
		const {id} = this.state;
        const {username} = this.state;
        const {password} = this.state;
        const {email} = this.state;
        const {firstname} = this.state;
        const {lastname} = this.state;
        const {phone} = this.state;
        const {handlelinks} = this.state;
		const {birthday} = this.state;

        fetch('http://chukwumaokere.com/socialite/webservice/edit.php', {
                method: 'post',
                header: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                },
                body: JSON.stringify({
						id : id,
                        username: username,
                        password: password,
                        email: email,
                        firstname: firstname,
                        lastname: lastname,
                        phone: phone
                })
        }).then( (response) => response.json() )
                .then( (responseJson) => { Alert.alert(responseJson); if(responseJson.includes("Success")){ /*navigate('Login')*/} return true;} )
                .catch( (error) => {console.error(error)} );
