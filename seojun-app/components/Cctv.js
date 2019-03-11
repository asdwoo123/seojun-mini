import React, { Component, Fragment } from 'react';
import {View, StyleSheet, WebView, Text} from 'react-native';
import AppHeader from "../sub_components/AppHeader";
import { connect } from 'react-redux';


class Cctv extends Component {
    static navigationOptions = {
        drawerLabel: 'CCTV'
    };

    render() {
        if (this.props.cctv) {
            return (
                <Fragment>
                    <AppHeader title="CCTV" {...this.props}/>
                    <WebView
                        source={{
                            html: '<div style="display: flex; justify-content: center; align-items: center">' +
                                '<img style="width: 100%;" src="' + this.props.cctv + '"></div>'
                        }}
                        style={{flex: 1}}
                    />
                </Fragment>
            );
        } else {
            return (
                <View style={{flex: 1, alignItems: 'center', backgroundColor: '#e5e8ea'}}>
                    <AppHeader title="CCTV" {...this.props}/>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text>
                            Not connected to the server or do not support CCTV
                        </Text>
                    </View>
                </View>
            )
        }
    }
}


export default connect(
    (state) => ({
        cctv: state.cctv.cctv
    })
)(Cctv);