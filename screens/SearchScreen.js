import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { SearchBar } from 'react-native-elements';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Search',
  };
  searchMethod = (term) => {
	console.log('searching for ' + term);
  }
  clearText = () => {
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
