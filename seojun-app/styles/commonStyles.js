import { StyleSheet } from 'react-native';

const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    container2: {
        width: '90%'
    },
    container3: {
        flex: 0.6,
        alignItems: 'stretch'
    },
    container4: {
        flexDirection: 'row',
        marginTop: 5
    },
    text: {
        color: '#2E2E2E'
    },
    textInput: {
        width: '95%',
        height: 40,
        borderColor: '#b8babc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        margin: 5
    }
});

export default commonStyles;
