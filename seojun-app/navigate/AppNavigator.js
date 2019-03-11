import { createAppContainer, createDrawerNavigator } from 'react-navigation';
import React from 'react';
import MainScreen from "../components/MainScreen";
import IpSettings from "../components/IpSettings";
import Cctv from "../components/Cctv";


const AppNavigator = createDrawerNavigator(
    {
       Main: MainScreen,
       cctv: Cctv,
       IP: IpSettings
    },
    {
       drawerWidth: 300
    }
);

export default createAppContainer(AppNavigator);






