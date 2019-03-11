import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { Constants } from 'expo';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';


const CustomLeftComponent = (props) => {
    return (
        <View>
            <Icon name={"menu"} onPress={() => props.navigation.openDrawer()} color={'black'} size={30}/>
        </View>
    )
};

const CustomCenterComponent = (props) => {
    return (
        <Text style={{ color: '#2E2E2E' }}>
            {props.title}
        </Text>
    )
};

class AppHeader extends Component {
    render() {
        return (
            <View style={{ width: '100%', justifyContent: 'center' }}>
                <Header
                    statusBarProps={{ barStyle: 'light-content' }}
                    barStyle="light-content" // or directly
                    leftComponent={<CustomLeftComponent {...this.props} />}
                    centerComponent={<CustomCenterComponent {...this.props}/>}
                    containerStyle={{
                        justifyContent: 'space-around'
                    }}
                    backgroundColor={'white'}
                />
            </View>
        )
    }
};

export default connect((state) => ({
    })
)(AppHeader);

