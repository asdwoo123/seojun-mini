import React from 'react';
import {Text, View} from "react-native";
import commonStyles from "../styles/commonStyles";

const MainListItems = (props) => {
    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
        }}>
            <Text style={commonStyles.text}>{ props.name }</Text>
            <Text style={commonStyles.text}>{ props.value }</Text>
        </View>
    );
};

export default MainListItems;