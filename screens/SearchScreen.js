import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { SearchBar } from 'react-native-elements';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Search',
    headerLeft: null,
    gesturesEnabled: false,
  };
  state={
	search: '',

  }
  searchMethod = (term) => {
	this.setState({search: term});
	console.log('searching for ' + this.state.search);
  }
  clearText = () => {
	console.log('clearingtext');
	this.search.clear();
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
        {/* <ExpoLinksView /> */}
	<SearchBar
		lightTheme
		onChangeText= {(searchTerm) => {this.searchMethod(searchTerm)} }
		icon={{ type: 'font-awesome', name: 'search' }}
		placeholder='Search For...'
		clearIcon={{color: '#86939e', name: 'close' }}
		cancelButtonTitle="Cancel"
		enableReturnKeyAutomatically={true}
		returnKeyType={'search'}
		autoCapitalize={'none'}
		autoFocus={true}
		enablesReturnKeyAutomatically={true}
		ref={search => this.search = search}
		onCancel={this.clearText}
		 />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: '#fff',
  },
});
