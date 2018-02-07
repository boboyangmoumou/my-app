import React from 'react';
import {
    Link
} from 'react-router-dom';
import {
    connect
} from 'react-redux';
import Menu from './menuLogin';
import '../../style/menu.css';
export default class Header extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="HeaderWrapper">
                <Menu></Menu>
                <div className="Nav">
                    <ul>
                        <li>
                            <Link to="/">index</Link>
                        </li>
                        <li>
                            <Link to="/ShopCart">ShopCart</Link>
                        </li>
                        <li>
                            <Link to="/Address">address</Link>
                        </li>
                    </ul>   
                </div>
            </div>
        )
    }   
}


// export default connect(
//     mapStateToProps
// )(Header);