import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 12,
        flexDirection: 'row',
        alignItems: 'center',
        height: 52,
        // backgroundColor: 'green'
    },
    text: {
        marginLeft: 12,
        fontSize: 16,
        fontFamily: 'times',
        fontWeight: '500',
    },
    photo: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#9e9e9e',
    }
});


class Row extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            (this.props.user.name.toLowerCase().includes(this.props.search) || this.props.user.number.includes(this.props.search)) ?
                <View>
                    <View style={styles.container}>
                        {
                            (this.props.user.avatar) ?
                                <Image
                                    source={{ uri: this.props.user.avatar }}
                                    style={styles.photo}
                                /> :
                                <Image source={{ uri: 'data:image/png;base64,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' }} style={styles.photo} />
                        }
                        <Text style={styles.text}>
                            {this.props.user.name}
                        </Text>
                    </View>
                    <Seperator />
                </View >
                :
                <View></View>
        );
    }
}

const Seperator = () => (
    <View style={styles.separator} />
);

export default Row;