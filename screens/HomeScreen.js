import React, { Component } from 'react';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import TopBarNav from 'top-bar-nav';
import Modal from 'react-native-modal';
import {
  Picker,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  TextInput,
  Dimensions
} from 'react-native';
import { Icon, Overlay } from 'react-native-elements';

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
let iconNames = {
	facebook: 'facebook-square',
	twitter: 'twitter-square',
	instagram: 'instagram',
	youtube: 'youtube-square',
	pinterest: 'pinterest-square',
}
let sourceToFilter = {
	Facebook: 'fb',
	Twitter: 'tw',
	Instagram: 'ig',
	Pinterest: 'pt',
	YouTube: 'yt',
	Undefined: 'fa',
}

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

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
  var hour = date.getHours();
  var min = date.getMinutes();
  var postscript;
  if (hour >= 12){ postscript = 'pm'; }else{ postscript = 'am'; }
  if (hour > 12){ hour = hour - 12 }

  var timo = `${hour}:${min} ${postscript}`;

  return monthNames[monthIndex] + ' ' + day + ', ' + year + ' ' + timo;
}
function TileFactory() {
	var igPosts = [];
	//Instagram
	fetch('https://api.instagram.com/v1/users/self/media/recent/?access_token=46253620.561ca3f.abe403ef59b64910869beb5a55fe61a2').then(function(response){ 
		return response.json();
	}).then(function(ret){
		var posts = ret.data;
		var x = 12;
		var bar = new Promise((resolve, reject) =>{
		posts.forEach(function(post){
			var im = post.images.standard_resolution.url;
			var cap = '';
			if(post.caption !== null){
				cap = post.caption.text;
			}
			var ms = parseInt(post.created_time) * 1000;
			var likes = post.likes.count;
			var comments = post.comments.count;
			var url = post.link;
			var tags = post.tags;
			var datea = new Date(ms);
			var date = formatDate(datea);
			
			igPosts.push(
				<Tile key={x} src={'ig'} datet={date}> {cap} </Tile>
			);	
			x++;
		//	console.log(igPosts);
			if (x == 20) resolve();
		});
		});
		//console.log(igPosts);
		bar.then(() => {
			console.log(postObj.concat(igPosts).length); //postObj.concat(igPosts).length == 20 and postObj.concat(igPosts) has all 20, but later down the code, it only shows 12... the concat isnt working
			postObj.concat(igPosts);
			console.log(igPosts.length);
			console.log(postObj.length);
		});
		console.log(postObj.length);
	//postObj.concat(igPosts);
	});
	//console.log(igPosts);
	//postObj.concat(igPosts);
/*
	return new Promise(resolve => {
		resolve('resolved');
	});
*/
	//console.log(igPosts.length);
	//return(igPosts);
}
/*
async function pushAry() {
	console.log('pushing');
	var result = await TileFactory();
	console.log(result);
	console.log(TileFactory.igPosts);
}*/


const postObj = [ 
	<Tile key={0} src={'fb'} datet={'April 5, 2018 12:34 pm'}> Theres a facebook status that no one cares about! </Tile>,
	<Tile key={1} src={'fb'} datet={'April 5, 2018 8:37 pm'}> This is just an inspirational line, inspiring you to... be inspirational </Tile>,
	<Tile key={2} src={'ig'} datet={'April 5, 2018 11:36 am'}> Cute instagram pic with you and bae! </Tile>,
	<Tile key={3} src={'fb'} datet={'April 5, 2018 11:36 am'}> Phillip is a tool </Tile>,
	<Tile key={4} src={'tw'} datet={'April 5, 2018 10:25 am'}> This would be a tweet! But you have none.. </Tile>,
	<Tile key={5} src={'fb'} datet={'April 5, 2018 10:25 am'}> Marsha is pregnant... again </Tile>,
	<Tile key={6} src={'yt'} datet={'April 4, 2018 10:24 pm'}> YouTube content, if you had any. </Tile>,
	<Tile key={7} src={'fb'} datet={'April 4, 2018 10:24 pm'}> Cindy is engaged AGAIN.. </Tile>,
	<Tile key={8} src={'pt'} datet={'April 4, 2018 09:34 pm'}> Who even uses pintrest? </Tile>,
	<Tile key={9} src={'fb'} datet={'April 4, 2018 09:34 pm'}> Sharkeisha is Sharkeisha </Tile>,
	
	<Tile key={10}> This tile comes from nowhere, so theres no icon </Tile>,
	<Tile key={11}> This tile comes from nowhere, so theres no icon </Tile>
]

//pushAry();
TileFactory();
console.log(postObj.length); //still prints 12 even though the TileFactory runs...



class PickerModal extends Component{
        constructor(props){
        super(props);
                this.state={
                        isModalVisible: false,
                        currentlistview: 'Facebook', //default to facebook
                        iconName: 'facebook-square', //default to facebook
			initialArray: postObj,
			filteredArray: [],
                };
        }

        //Functions - start
        _toggleModal = () => this.setState({isModalVisible: !this.state.isModalVisible});
        _renderModalContent = () => (
          <View style={styles.modalContent}>
                <Text style={styles.sorty}>SORT POSTS BY</Text>
                <View style={styles.horizontalbar} />
                <Text style={styles.apppickname} onPress={() => {this._updateCurrentListView('facebook'); this.setState({ isModalVisible: false }); this._filterList('Facebook')}}><View style={{marginTop:-2, marginLeft: 3}}><Icon style={styles.appselectoricon} color='#3b5998' type='font-awesome' name={'facebook-square'} size={18} /></View> Facebook</Text>
                <Text style={styles.apppickname} onPress={() => {this._updateCurrentListView('instagram'); this.setState({ isModalVisible: false }); this._filterList('Instagram')}}><View style={{marginTop:-2, marginLeft: 3}}><Icon style={styles.appselectoricon} color='#ffc838' type='font-awesome' name={'instagram'} size={18} /></View> Instagram</Text>
                <Text style={styles.apppickname} onPress={() => {this._updateCurrentListView('twitter'); this.setState({ isModalVisible: false }); this._filterList('Twitter')}}><View style={{marginTop:-2, marginLeft: 3}}><Icon style={styles.appselectoricon} color='#00aced' type='font-awesome' name={'twitter-square'} size={18} /></View> Twitter</Text>
                <Text style={styles.apppickname} onPress={() => {this._updateCurrentListView('youtube'); this.setState({ isModalVisible: false }); this._filterList('YouTube')}}><View style={{marginTop:-2, marginLeft: 3}}><Icon style={styles.appselectoricon} color='#ff0000' type='font-awesome' name={'youtube-square'} size={18} /></View> YouTube</Text>
                <Text style={styles.apppickname} onPress={() => {this._updateCurrentListView('pinterest'); this.setState({ isModalVisible: false }); this._filterList('Pinterest') }}><View style={{marginTop:-2, marginLeft: 3}}><Icon style={styles.appselectoricon} color='#bd081c' type='font-awesome' name={'pinterest-square'} size={18} /></View> Pinterest</Text>
                {this._renderButton('CLOSE', () => this.setState({ isModalVisible: false }) )}
          </View>
        );
        _renderButton = (text, onPress) => (
            <TouchableOpacity onPress={onPress}>
              <View style={styles.button}>
                <Text style={{fontSize: 20, color: 'white',}}>{text}</Text>
              </View>
            </TouchableOpacity>
         );
        _updateCurrentListView(listviewname){
                this.setState({currentlistview: listviewname});
                this.setState({iconName: iconNames[listviewname]});

        }
	_filterList(srcName){
		const newArray = [];
		var ogName = srcName;
		var srcName = sourceToFilter[srcName];
		//console.log('changing to ' + ogName);
		var arrayStart = this.state.initialArray;
	//		console.log(arrayStart);
		arrayStart.forEach(function(tile){
			if(tile.props.src == srcName){
				newArray.push(tile);
			}
			//console.log(tile);
		});
		//console.log(newArray);

		this.setState({filteredArray: newArray});
	}

	componentDidMount(){
		this._filterList('Facebook');
	}
        //Functions - end

        render(){
                return(
                        <View style={{flex: 1}}>
                        <View style={styles.appselector}>
                                <Text onPress={this._toggleModal} style={styles.appselectortext} filterBy={sourceToFilter[this.state.currentlistview]}>
                                        {this.state.currentlistview.toUpperCase()} <View style={{marginTop:-2, marginLeft: 3}}> <Icon style={styles.appselectoricon} color='#9e9e9e' type='font-awesome' name={this.state.iconName} size={16} /> </View>
                                <View style={{marginTop:0, marginLeft: 3}}> <Icon style={styles.appselectoricon} color='#9e9e9e' type='font-awesome' name='sort-down' size={16} /> </View>
                                </Text>
                        </View>
                        <Modal isVisible={this.state.isModalVisible} style={styles.bottomModal} onSwipe={() => this.setState({ isModalVisible: false })} swipeDirection="down" onBackdropPress={() => this.setState({ isModalVisible: false })}>
                                {this._renderModalContent()}
                        </Modal>
			 	{this.state.filteredArray}
                      </View>

                );
        }

}
class GreetingHeader extends Component {
	state = this.props.info.info.data;
	render(){
		timer = new Date();
		var timest = timer.toString();
		var hour = timer.getHours();
		var gtype;
		//console.log(this.state); //shows passed parameters
		var greetings = { standard:  ['Hello', 'Hi', 'You\'re awesome', 'What\'s up', 'G\'day', 'Hiya', 'Hiiiiiii', 'Oh Hi', 'Howdy', 'Hey',],
				  morning: 'Good Morning',
				  afternoon: 'Good Afternoon',
				  evening: 'Good Evening',
				};
		var randNum = Math.floor(Math.random() * 20) + 1;
		if (randNum >= 1 && randNum <= 10){
			gmethod = 'formal';
		}else{
			gmethod = 'casual';
		}
		if (gmethod == 'formal'){
			if (hour < 12){ gtype = 'morning'; }
                	if (hour >= 12 && hour < 18){ gtype = 'afternoon'; }
                	if (hour >= 18 && hour < 24){ gtype = 'evening'; }
		}else if (gmethod == 'casual'){
			gtype = 'standard';
		}
		//console.log(`gtype = ${gtype}, num = ${randNum}`);
		var greeting;
		if (gmethod == 'formal'){ 
			greeting = greetings[gtype];
		}else if (gmethod == 'casual'){
			var digit = greetings['standard'].length - 1;
			var rNum = Math.floor(Math.random() * digit) + 0;
			greeting = greetings['standard'][rNum];
		}
		return(
		<View style={styles.appselectorb}>
                	<Text style={styles.appselectortextb}> {greeting}, {this.state.firstname}!</Text> 
                </View>

		);
	}

}
const All = (props) => (
<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}> 
	<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
		<View style={{flex: 1}}>
			<GreetingHeader info={props} />
			{postObj}
		</View>
	</ScrollView>
</View>
);

filterBy = (filtername, originalArray) => {
	var filterby = filtername;	
	var originalAry = originalArray;
}

const ByApp = ({ index }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* //foreach... <Tile src={'fb'}> data.contents </Tile> */}
        <PickerModal></PickerModal>
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

export default class HomeScreen extends React.Component {
  static navigationOptions = {
	header: null,
	gesturesEnabled: false,
  };

  render() { 
//console.log('first things first');
// console.log(this.props.navigation.state.params);
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
		    return (<Component info={this.props.navigation.state.params} />);
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
/*
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
  }; */
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
  apppickname: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 22,
    marginBottom: 10,
  },
  appselector: {
	flex: 1,
	marginBottom: 10, 
	marginLeft: 20	
  },
  appselectorb: {
        flex: 1,
        marginBottom: 13,
        marginLeft: 20
  },
  appselectortext: {
	flex: 1,
	fontSize: 16,
	color: '#9e9e9e'
  },
  appselectortextb: {
        flex: 1,
        fontSize: 16,
        color: '#9e9e9e'
  },
  appselectoricon: {
	flex: 2,
	color: '#9e9e9e',
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
  horizontalbar: {
	borderBottomWidth: 1,
	marginBottom: 10 
  },
  sorty: {
	fontSize: 16,
	marginBottom: 10,
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
  modalContent: {
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
  tilea: {
	backgroundColor: 'white',
	height: 200,
	width: width-20,
	//marginTop: 15,
	marginBottom: 10,
	marginLeft: 10,
	marginRight: 10,
	borderRadius: 2
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
