import React, { Component } from 'react';
import {View, Text, StyleSheet, AsyncStorage, Image} from 'react-native';
import commonStyles from '../styles/commonStyles';
import AppHeader from "../sub_components/AppHeader";
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MainListItems from "../sub_components/MainListItems";
import * as SocketActions from '../redux/socketReducer';


class MainScreen extends Component {
    static navigationOptions = {
        drawerLabel: 'MAIN SCREEN'
    };

    async componentDidMount() {
       /* const { socketDataLoad } = this.props.socketActions;
        const server = await AsyncStorage.getItem('server');
        if (server) socketDataLoad(server);*/
    }


    render() {
        const styles = StyleSheet.create({
            backgroundVideo: {
                width: 1000,
                height: 1000,
                borderColor: 'black',
                borderWidth: 1
            }
        });
        const { c_total, cycleTime, sPartnumber, isReady } = this.props;
        return (
            <View style={[commonStyles.container, { backgroundColor: '#e5e8ea' }]}>
                <AppHeader {...this.props} title="MAIN SCREEN"/>
                <View style={[commonStyles.container2, { width: '100%' }]}>
                    <Card containerStyle={{ padding: 10, borderRadius: 5 }}>
                        <MainListItems name={"PARTNUMBER"} value={sPartnumber}/>
                        <MainListItems name={"CYCLETIME"} value={cycleTime}/>
                        <MainListItems name={"TOTAL"} value={c_total}/>
                        <MainListItems name={"OK"} value={0}/>
                        <MainListItems name={"NOK"} value={0}/>
                    </Card>
                </View>
                <View style={[commonStyles.container2, {flex: 0.1, width: '100%'}]}>
                    <Card containerStyle={[styles.center, { backgroundColor:  isReady ? '#64F493' : '#E56868' }]}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={commonStyles.text}>{ isReady ? 'machine ready' : 'machine not ready'}</Text>
                        </View>
                    </Card>
                </View>
            </View>
        )
    }
};

export default connect(
    (state) => ({
        c_total: state.main.c_total,
        cycleTime: state.main.cycleTime,
        sPartnumber: state.main.sPartnumber,
        isReady: state.opc.isReady
    }),
    (dispatch) => ({
        socketActions: bindActionCreators(SocketActions, dispatch)
    })
)(MainScreen);


const styles = StyleSheet.create({
    led: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderColor: '#d2d3d1',
        borderWidth: 1,
        backgroundColor: 'white',
        marginTop: 5,
        elevation: 1
    },
    row: {
        flexDirection: 'row'
    },
    rowANDalign: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'black'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});


