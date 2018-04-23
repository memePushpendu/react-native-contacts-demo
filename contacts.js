
import React from 'react';
import { View, ListView, TouchableOpacity, Modal, StyleSheet, Text } from 'react-native';
import Row from './row';
import { connect } from 'react-redux';
import { hideLoader } from './actions/loader';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import call from 'react-native-phone-call';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#9e9e9e',
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 200,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 50
    },
    icon: {
        // backgroundColor: 'red',
        // padding: 35,
    }
});

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class ContactsClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: ds.cloneWithRows([]),
            contactsLength: 0,
            selectedNumber: '',
            visible: false
        };
    }

    openAction = (number) => {
        this.setState({
            selectedNumber: number,
            visible: true
        });
    }

    hideAction = () => {
        this.setState({
            visible: false
        });
    }

    render() {
        return (
            <View>
                <ListView
                    initialListSize={200}
                    // scrollRenderAheadDistance={3000}
                    onEndReached={() => { this.props.hideLoader(); }}
                    removeClippedSubviews={true}
                    enableEmptySections={true}
                    dataSource={ds.cloneWithRows(this.props.contacts.filter((item) => { return item.match }))}
                    renderRow={(data) => <TouchableOpacity onPress={() => { this.openAction(data.number) }}><Row user={data} search={this.props.search} /></TouchableOpacity>}
                />

                <Modal
                    transparent={true}
                    animationType={'slide'}
                    visible={this.state.visible}
                    onRequestClose={() => { this.hideAction() }}>
                    <TouchableOpacity style={styles.modalBackground} onPress={() => { this.hideAction() }}>
                        <View style={styles.activityIndicatorWrapper}>
                            <TouchableOpacity onPress={() => {
                                const args = {
                                    number: '9093900003',
                                    prompt: false
                                }

                                call(args).catch(console.error)
                            }}>
                                <Text style={styles.icon}><Icon name='phone-square' color='#00bcd4' size={60} /></Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { console.log("Message") }}>
                                <Text style={styles.icon}><Icon name='envelope-square' color='#00bcd4' size={60} /></Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal >
            </View >
        );
    }
}


function mapStateToProps(state) {
    const { contacts, search } = state;
    return { contacts, search };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ hideLoader }, dispatch);
}

const Contacts = connect(mapStateToProps, mapDispatchToProps)(ContactsClass);
export default Contacts;