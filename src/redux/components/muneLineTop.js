import React from 'react';
import '../../style/menuLineTop.css';
export default class MenuLineTop extends React.Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div className="handleLine">
                <div className="f-price-set">
                    <div className="f1"><input type="text" value="¥"/></div>                                                            
                    <em> - </em>
                    <div className="f1"><input type="text" value="¥"/></div>
                </div>
                <div className="cuurPrice">
                    <a href="javascript:;" className="changePrice">
                        <span>价格</span>
                        <i>^</i>
                    </a>
                </div>
            </div>
        )
    }
}