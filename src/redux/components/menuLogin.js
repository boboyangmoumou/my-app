import React from 'react';
import '../../style/menu.css';
export default class Menu extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="menuWrapper">
                <div className="logo">
                    logo
                </div>
                <div className="login">
                    登陆
                </div>
            </div>
        )
    }
} 