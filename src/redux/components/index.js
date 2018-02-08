import React from 'react';
import axios from 'axios';
// import MuneLineTop from './muneLineTop';
import {
    connect
} from 'react-redux';
import {
    addShopcart
} from '../actions';
import '../../style/index.css';
import '../../style/menuLineTop.css';
class Index extends React.Component {
    constructor() {
        super();
        this.state = {
            newsItem: [],
            style: [],
            sortFlag:true,
            page:1,
            pageSize: 8,
            loading: false
        }
    };
    componentDidMount() {
      this.newFetch();
    };
    newFetch(){
        const {page,pageSize,sortFlag,loading} = this.state;
        let param =　{
            page:page,
            pageSize: pageSize,
            sort:sortFlag?1:-1,
        }
        this.setState({
            loading:true
        })
        axios.get('/goods/list',{
            params:param
        })
        .then(data=>{
            this.setState({
                 newsItem: data.data.result.list,
            })
            console.log(data);
        })
        .catch(error=>{
            console.error(error);
        })
    }
    sortGoods(e) {
        this.setState(prevState =>({
            sortFlag:!prevState.sortFlag,
            page:1,
        }))
        console.log(this.state.sortFlag);
        this.newFetch();
    }
    render() {
        const {newsItem} = this.state;
        console.log(newsItem);
        const newsList = newsItem.length
        ? newsItem.map((Item, index) => (
            <div key={index} className="mainWrapper">
                <img src={process.env.PUBLIC_URL+Item.productImage} alt=""/>
                <div>{Item.productName}</div>
                <div className="price">￥{Item.salePrice}</div>
                <div className="btn-area">
                    <a className="btn" href="javascript:;">加入购物车</a>
                </div>
            </div>
        )):"none"
        return(
            <div className="cartContainer">
                <div className="handleLine">
                    <div className="f-price-set">
                        <div className="f1"><input type="text" value="¥"/></div>                                                            
                        <em> - </em>
                        <div className="f1"><input type="text" value="¥"/></div>
                    </div>
                    <div className="cuurPrice" onClick={(e) => this.sortGoods(e)}>
                        <a href="javascript:;" className="changePrice">
                            <span>价格</span>
                            <i>^</i>
                        </a>
                    </div>
                </div>
                {newsList}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        
    }    
}


export default connect(
    undefined,
    mapDispatchToProps
)(Index)
