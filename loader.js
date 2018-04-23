import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Modal,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';

class LoaderClass extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal
                transparent={true}
                animationType={'none'}
                visible={this.props.loading}
                onRequestClose={() => { console.log('close modal') }}>
                <View style={styles.modalBackground}>
                    <View style={styles.activityIndicatorWrapper}>
                        <ActivityIndicator animating={this.props.loading} size="large" color="#00b8d4" />
                    </View>
                </View>
            </Modal >
        )
    }
}

function mapStateToProps(state) {
    const { loading } = state;
    return { loading };
}

const Loader = connect(mapStateToProps)(LoaderClass);
export default Loader;

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 52,
        width: 52,
        borderRadius: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});