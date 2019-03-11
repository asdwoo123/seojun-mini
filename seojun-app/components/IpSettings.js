import React, { Component } from 'react';
import {View, Text, ScrollView, TextInput, AsyncStorage, TouchableHighlight} from 'react-native';
import AppHeader from "../sub_components/AppHeader";
import commonStyles from "../styles/commonStyles";
import { Card } from 'react-native-elements';
import Btn from 'react-native-micro-animated-button';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as socketActions from '../redux/socketReducer';
import SceneView from "@react-navigation/core/src/views/SceneView";


class IpSettings extends Component{
    state = {
        ip_array: null,
        ip: '',
        name: ''
    };

    async componentWillMount() {
        AsyncStorage.clear();
        const server = await AsyncStorage.getItem('server-list');
        if (server) {
            this.props.SocketActions.setSaveIPList(JSON.parse(server));
        }
    }

    static navigationOptions = {
        drawerLabel: 'IP SETTINGS'
    };

    btn = null;

    handleOnChange = (text) => {
        this.setState({ ip: text });
    };

    handleOnChangeIP = (text) => {
        this.setState({ name: text });
    };


    handleOnPress = async () => {
        const { isReady } = this.props;
        try {
            /*await socketActions.networkConnect(this.state.ip);*/
            this.props.SocketActions.socketDataLoad({
                ip: this.state.ip,
                name: this.state.name
            });
            setTimeout(() => {this.btn.reset(); this.setState({ ip: '', name: '' })}, 1000);
        } catch (e) {
            console.log('연결에 실패했습니다.');
            this.btn.reset();
        }
    };

    render() {
        return (
            <View style={[commonStyles.container, { backgroundColor: '#e5e8ea' }]}>
                <AppHeader title="IP SETTING" {...this.props}/>
                <View style={{ width: '90%', marginTop: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={commonStyles.text}>IP registration</Text>
                    <Text style={commonStyles.text}>{ (this.props.isReady) ? 'Connected' : 'Not connected' }</Text>
                </View>
                <Card containerStyle={{ width: '90%', height: 160, padding: 0, borderRadius: 5 }}>
                    <View style={{ alignItems: 'center' }}>
                        <TextInput value={this.state.ip} placeholder="Enter IP of the equipment server" onChangeText={this.handleOnChange} style={commonStyles.textInput}/>
                        <TextInput value={this.state.name} placeholder="Enter name of the equipment" onChangeText={this.handleOnChangeIP} style={commonStyles.textInput}/>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '95%' }}>
                        <Btn
                            label="Connect"
                            width={80}
                            style={{ borderRadius: 5 }}
                            onPress={this.handleOnPress}
                            ref={ref => (this.btn = ref)}
                        />
                    </View>
                    </View>
                </Card>
                <ScrollView style={{ width: '90%', marginTop: 20 }}>
                    <Text style={[commonStyles.text, {marginBottom: 20}]}>Registered IP</Text>
                    {
                        this.props.saveIPList ? this.props.saveIPList.map((v, k) => (
                            <View key={k} style={{ width: '100%', backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                                <Text>{v.ip}</Text>
                                <Text>{v.name}</Text>
                                <TouchableHighlight style={{ width: 80, height: 35, borderWidth: 1, borderColor: '#2E9AFE',
                                    justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                                    { this.props.connectIP === v.ip ? <Text style={{ color: '#2E9AFE' }} onPress={() => { this.props.SocketActions.socketDisConnect()}}>disconnect</Text> :
                                        <Text style={{ color: '#2E9AFE' }} onPress={() => { this.props.SocketActions.socketDataLoad(v); }}>connect</Text> }
                                </TouchableHighlight>
                            </View>
                        )) : null
                    }
                </ScrollView>
            </View>
        )
    }
};

export default connect(
    (state) => ({
        isReady: state.opc.isReady,
        connectIP: state.opc.connectIP,
        saveIPList: state.opc.saveIPList
    }),
    (dispatch) => ({
        SocketActions: bindActionCreators(socketActions, dispatch)
    })
)(IpSettings);


