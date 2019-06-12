import React from 'react'

import {AppRegistry} from 'react-native';
import { DefaultTheme,Provider as PaperUI } from 'react-native-paper'
import App from './App';
import {name as appName} from './app.json';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#17c0eb',
    }
  };

export default function Main(){
    return(
        <PaperUI theme={theme}>
            <App/>
        </PaperUI>
    )
}

AppRegistry.registerComponent(appName, () => Main);
