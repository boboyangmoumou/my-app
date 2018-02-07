import React from 'react';
import { 
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import Index from './redux/components/index';
import Header from './redux/components/header';
import ShopCart from './redux/components/shopCart';
import Address from './redux/components/address';

export default class App extends React.Component{
    render() {
        return (
            <Router>
                <div className="app">
                    <Header/>
                    <Switch>
                        <Route exact path='/' component={Index}/>
                        <Route path='/ShopCart' component={ShopCart}/>
                        <Route path='/Address' component={Address}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}