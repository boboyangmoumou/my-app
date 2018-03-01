import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {LocaleProvider, Datepicker, message } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

import {
    createStore
} from 'redux';

import {
    Provider
} from 'react-redux';

import App from './App.js';
import changeMnunt from './redux/reducers/index.js';
let store = createStore(changeMnunt);
moment.locale('zh-cn');

export default class Root extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}

ReactDOM.render(
    <Root />,
    document.getElementById('root')
)