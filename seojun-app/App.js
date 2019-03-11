import React from 'react';
import { StyleSheet, YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import store from './redux';
import AppNavigator from "./navigate/AppNavigator";
import { AppLoading, Font } from 'expo';


export default class App extends React.Component {
  state = {
    theme: null,
    currentTheme: null,
    isReady: false
  };

  changeTheme = (theme, currentTheme) => {
    this.setState({ theme, currentTheme });
  };

  async componentDidMount() {
    await Font.loadAsync(
        'antoutline',
        require('@ant-design/icons-react-native/fonts/antoutline.ttf')
    );

    await Font.loadAsync(
        'antfill',
        require('@ant-design/icons-react-native/fonts/antfill.ttf')
    );
    this.setState({ isReady: true });
  }

  render() {
    const { theme, currentTheme, isReady } = this.state;
    if (!isReady) {
      return <AppLoading />;
    }
    return (
        <Provider store={store} theme={theme}>
          <AppNavigator
              screenProps={{ changeTheme: this.changeTheme, currentTheme }}
          />
        </Provider>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
