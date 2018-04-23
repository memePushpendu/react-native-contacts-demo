//
// Toolbar Component
//
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Typo } from './Typography';
import { getColor } from './helpers';
import { connect } from 'react-redux';
import * as contactsAction from './../actions/contacts';
import { bindActionCreators } from 'redux';
import * as DisplayAction from './../actions/loader';

class ToolbarClass extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchEnabled: false,
      text: ''
    }
  }

  // toggle search
  showSearch = () => {
    this.setState({ searchEnabled: true });
  }

  hideSearch = () => {
    let currentText = this.state.text;
    this.setState({ searchEnabled: false, text: '' }, function () {
      if (currentText.trim != "") {
        this.handleContactSearch('');
      }
    });
  }

  clearSearch = () => {
    let currentText = this.state.text;
    this.setState({ text: '' }, function () {
      if (currentText.trim() != "") {
        this.handleContactSearch('');
      } else {
        this.setState({ searchEnabled: '' })
      }
    });
  }

  //handle search / initiate search
  handleContactSearch = (searchText) => {
    this.setState({
      text: searchText
    });
    this.props.action.searchContacts(searchText);
  }

  render() {

    const {
      color,
      title
    } = this.props;

    return (
      (!this.state.searchEnabled) ?
        <View style={[styles.toolbar, { backgroundColor: getColor(color) }]}>
          <Text style={[styles.title, Typo.toolbarTitle]} >
            {title.toUpperCase()}
          </Text>
          <View style={[styles.icon]} onTouchStart={() => { this.showSearch() }} >
            <Icon style={[styles.signSearch]} name="search" size={22} color="white" />
          </View>
        </View>
        :
        <View style={[styles.searchBar]}>
          <View style={[styles.crossLeftIcon]} onTouchStart={() => { this.hideSearch() }} >
            <Icon style={[styles.signBack]} name='arrow-left' color='#00bcd4' size={22} />
          </View>
          <TextInput
            editable={true}
            maxLength={17}
            style={[styles.search]}
            placeholder="search contact"
            placeholderTextColor="lightgrey"
            underlineColorAndroid="white"
            onChangeText={(text) => this.handleContactSearch(text)}
            value={this.state.text}
          />
          <View style={[styles.crossRightIcon]} onTouchStart={() => { this.clearSearch() }} >
            <Icon style={[styles.signCross]} name='times' color='#00bcd4' size={22} />
          </View>
        </View>
    )
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(contactsAction, dispatch),
    display: bindActionCreators(DisplayAction, dispatch)
  }
}

const Toolbar = connect(mapStateToProps, mapDispatchToProps)(ToolbarClass);
export default Toolbar;
// 00bcd4
const styles = StyleSheet.create({
  toolbar: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: 'white'
  },
  title: {
    marginLeft: 12,
    color: 'white',
    flex: 10,
    fontFamily: 'times',
    fontWeight: '800',
  },
  icon: {
    backgroundColor: '#00bcd4',
    height: 52,
    paddingLeft: 40,
    flex: 1
  },
  search: {
    height: 52,
    fontSize: 20,
    marginLeft: 12,
    backgroundColor: 'white',
    flex: 10,
    fontFamily: 'times',
    fontWeight: '800',
  },
  crossRightIcon: {
    flex: 1,
    // backgroundColor: '#00bcd4',
    backgroundColor: 'white',
    height: 52,
    paddingLeft: 40,
    alignItems: 'center'
  },
  crossLeftIcon: {
    flex: 1,
    // backgroundColor: '#00bcd4',
    backgroundColor: 'white',
    height: 52,
    paddingRight: 40,
    alignItems: 'center'
  },
  signSearch: {
    top: 15,
    right: 5
  },
  signBack: {
    top: 15,
    left: 15
  },
  signCross: {
    top: 15,
    right: 15
  }
})
