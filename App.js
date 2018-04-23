import React, { Component } from 'react';
import { View, ListView, StyleSheet, Text } from 'react-native';
import Contacts from './contacts';
import Header from './header';
import Footer from './footer';
import Toolbar from './lib/Toolbar';
import { getColor } from './lib/helpers';
import { loadContacts } from './actions/contacts';
import configureStore from './store/storeConf';
import { Provider } from 'react-redux';
import Loader from './loader';
import { hideLoader } from './actions/loader';


const store = configureStore();
store.dispatch(loadContacts());

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View>
          <Loader />
          <Toolbar title="Contacts" color={getColor('paperCyan')}></Toolbar>
          <Contacts></Contacts>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1
  },
  content: {
    flex: 2
  },
  footer: {

  }
});
