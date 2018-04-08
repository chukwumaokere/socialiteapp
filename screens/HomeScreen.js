import React, { Component } from 'react';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import TopBarNav from 'top-bar-nav';

import {
  Picker,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Dimensions
} from 'react-native';
var logo = require('../assets/images/icon.png');
let imageSources = { 
        fb: require('../assets/images/fb.png'),
        tw: require('../assets/images/tw.png'),
        ig: require('../assets/images/ig.png'),
        pt: require('../assets/images/pt.png'),
        yt: require('../assets/images/yt.png'),
        fa: require('../assets/images/er.png'), //fallback
}
let appSources = { 
        fb: 'Facebook',
        tw: 'Twitter',
        ig: 'Instagram',
        pt: 'Pinterest',
        yt: 'YouTube',
        fa: 'Undefined', //fallback
}

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

const All = ({ index }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
	
	<Tile src={'fb'} datet={'April 5, 2018 12:34 pm'}> Theres a facebook status that no one cares about! </Tile>
        <Tile src={'ig'} datet={'April 5, 2018 11:36 am'}> Cute instagram pic with you and bae! </Tile>
        <Tile src={'tw'} datet={'April 5, 2018 10:25 am'}> This would be a tweet! But you have none.. </Tile>
        <Tile src={'yt'} datet={'April 4, 2018 10:24 pm'}> YouTube content, if you had any. </Tile>
        <Tile src={'pt'} datet={'April 4, 2018 09:34 pm'}> Who even uses pintrest? </Tile>
        <Tile> This tile comes from nowhere, so theres no icon </Tile>
        <Tile> This tile comes from nowhere, so theres no icon </Tile>
    </ScrollView>
  </View>
);

const ByApp = ({ index }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
   <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
	{/* //foreach... <Tile src={'fb'}> data.contents </Tile> */}
	<Tile src={'fb'} datet={'April 5, 2018 12:34 pm'}> Theres a facebook status that no one cares about! </Tile>
	<Tile src={'fb'} datet={'April 5, 2018 11:36 am'}> Phillip is a tool </Tile>
	<Tile src={'fb'} datet={'April 5, 2018 10:25 am'}> Marsha is pregnant... again </Tile>
	<Tile src={'fb'} datet={'April 4, 2018 10:24 pm'}> Cindy is engaged AGAIN.. </Tile>
	<Tile src={'fb'} datet={'April 4, 2018 09:34 pm'}> Sharkeisha is Sharkeisha </Tile>
	<Tile src={'fb'} datet={'April 5, 2018 8:37 pm'}> This is just an inspirational line, inspiring you to... be inspirational </Tile>
    </ScrollView>	
  </View>
);

const ROUTES = {
  All,
  ByApp
  // ideally you would have a ROUTES object with multiple React component scenes
};

const ROUTESTACK = [
//  { image: require('../assets/images/iconimg.png'), title: 'Scene' },
  { label: 'All', title: 'All' },
  { label: 'By App', title: 'ByApp' }, // label is what you see in the top bar // title is just the name of the Component being rendered.  See the renderScene property below
];

//Declaration of Tile Class:
class Tile extends Component {
  render() {
  
  var app = this.props.src;
  var date = this.props.datet;

  if (date === undefined){
     var date = 'No date information';
  }
  if (app === undefined ){
     var app = 'fa';
  }

  const srcPath = imageSources[app];
  const appName = appSources[app];
	return (
		<View style={styles.tilea}>
		<View style={{flex: 1, flexDirection:'row'}}>
			<Image style={styles.apiicon} source={srcPath} />
			<View style={styles.appdetails}>
				<Text style={styles.apptitle}> app/{appName} </Text>
				<Text style={styles.postdate}> Posted on: {date} </Text>
			</View>
		</View>
			
			<Text style={styles.appdata}> {this.props.children}</Text>
		</View>
	)
  }
}

export default class HomeScreen extends React.Component {
  static navigationOptions = {
	header: null
  };

  render() { 
    
    return (

      <View style={styles.container}>
	<View style={{ flex: 1}}>
		<TopBarNav
		  //custom: added logo param
                  icon={logo}
		  // routeStack and renderScene are required props
		  routeStack={ROUTESTACK}
		  renderScene={(route, i) => {
		    // This is a lot like the now deprecated Navigator component
		    let Component = ROUTES[route.title];
		    return (<Component />);
		  }}
		  // Below are optional props
		  headerStyle={[styles.headerStyle, { paddingTop: 30 }]} // probably want to add paddingTop: 20 if using TopBarNav for the  entire height of screen on iOS
		  labelStyle={styles.labelStyle}
		  underlineStyle={styles.underlineStyle}
		  imageStyle={styles.imageStyle}
		  sidePadding={80} // Can't set sidePadding in headerStyle because it's needed to calculate the width of the tabs
		  bottomPadding={20}
		  inactiveOpacity={0.5}
		  fadeLabels={false}
		/>
      	</View>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
    //paddingTop: 15,
  },
  apiicon: {
	flex: 1,
	resizeMode: 'contain',
	height:50, 
	width:50, 
	marginTop: height/60, 
	marginLeft: width/30
  },
  apptitle: {
	flex: 1,
	fontWeight: '500',
	//marginTop: height/25,
	//marginLeft: width/35,
	color: 'grey',
  },
  appdata: {
	flex: 2,
	marginTop: height/60,
	marginLeft: width/45,
  },
  postdate: {
	flex: 2,
	fontWeight: '300',
	color: 'grey',
  },
  appdetails: {
	flex: 6, 
	flexDirection: 'column',
	marginTop: height/27,
	marginLeft: width/35,
  },
  tilea: {
	backgroundColor: 'white',
	height: 200,
	width: width-20,
	//marginTop: 15,
	marginBottom: 15,
	marginLeft: 10,
	marginRight: 10,
  },
  tileb: {
        backgroundColor: 'white',
        height: 200,
        width: width+50,
        marginTop: 15, 
        marginBottom: 15, 
        //marginLeft: 5,
        marginRight: 10, 
  }, 
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 15,
   // paddingBottom: 15,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  headerStyle: {
    //borderBottomWidth: 15,
    //borderColor: 'lightgrey',
    //backgroundColor: '#fff',
  //marginBottom: 0,
  },
  underlineStyle: {
    height: 1.5,
    backgroundColor: '#ff3d3d',
    marginTop: 12 
  },
 labelStyle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000',
  },
  imageStyle: {
    height: 35,
    width: 35,
   // tintColor: '#e6faff'
  },
  
});
