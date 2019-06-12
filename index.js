import React from 'react'

import {AppRegistry} from 'react-native';
import { Provider as PaperUI } from 'react-native-paper'
import App from './App';
import {name as appName} from './app.json';


export default function Main(){
    return(
        <PaperUI>
            <App/>
        </PaperUI>
    )
}

AppRegistry.registerComponent(appName, () => Main);
