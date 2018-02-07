import React from 'react';
import ReactDOM from 'react-dom';

import {
    createStore
} from 'redux';

import {
    Provider
} from 'react-redux';

import App from './App.js';
import changeMnunt from './redux/reducers/index.js';
let store = createStore(changeMnunt);

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