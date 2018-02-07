import React from 'react';
import axios from 'axios';
import {
    connect
} from 'react-redux';
import {
    addShopcart
} from '../actions';
import '../../style/index.css';
export default class Index extends React.Component {
    constructor() {
        super();
        this.state = {
            newsItem: [],
            style: []
        }
    };
    componentDidMount() {
       axios.get('/goods')
       .then(data=>{
           this.setState({
                newsItem: data.data.result.list,
           })
           console.log(data);
       })
       .catch(error=>{
           console.error(error);
       })
    };
    render() {
        const {newsItem} = this.state;
        console.log(newsItem);
        const newsList = newsItem.length
        ? newsItem.map((Item, index) => (
            <div key={index} className="mainWrapper">
                <img src={`../../../static/${Item.productImage}`}/>
                <div>{Item.productName}</div>
                <div>{Item.salePrice}</div>
            </div>
        )):"none"
        return(
            <div className="cartContainer">
                {newsList}
            </div>
        )
    }
}