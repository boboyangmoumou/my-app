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
import Carousels from './redux/components/Carousel';
import './style/app.css';
export default class App extends React.Component{
    render() {
        return (
            <Router>
                <div className="app">
                    <Header/>
                    <Carousels/>
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