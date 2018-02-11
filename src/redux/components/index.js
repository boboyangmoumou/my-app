import React from 'react';
import axios from 'axios';
import LimitInfiniteScroll from 'react-limited-infinite-scroll';
import { Carousel, Menu, Dropdown, Icon, message } from 'antd';

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
            loading: false,
            priceFilterList:[
                {
                  startPrice:'0.00',
                  endPrice:'100.00'
                },
                {
                  startPrice:'100.00',
                  endPrice:'500.00'
                },
                {
                  startPrice:'500.00',
                  endPrice:'1000.00'
                },
                {
                  startPrice:'1000.00',
                  endPrice:'5000.00'
                }
              ],
              priceChecked: 'all'
        }
    };
    componentDidMount() {
      this.newFetch();
    };
    // 发送请求
    newFetch(flag){
        let {page,pageSize,sortFlag,loading,newsItem,priceChecked} = this.state;
        let param =　{
            page:page,
            pageSize: pageSize,
            sort:sortFlag?1:-1,
            priceLevel:priceChecked
        }
        this.setState({
            loading:true
        })
        axios.get('/goods/list',{
            params:param
        })
        .then(data=>{
            if(flag){
                newsItem = newsItem.concat(data.data.result.list);
                this.setState({
                    newsItem:newsItem
                })
            }else{
                this.setState({
                    newsItem: data.data.result.list,
                })
            }
        })
        .catch(error=>{
            console.error(error);
        })
    }
    // 加入购物车
    addShopcart(e){
        const {onTodoClick} = this.props
        e.preventDefault();

    }
    // 价格升序降序
    sortGoods(e) {
        let {sortFlag} = this.state;
        sortFlag =!sortFlag;
        this.setState({
            sortFlag:sortFlag,
            page:1,
        })
        console.log(this.state.sortFlag);
        this.newFetch();
    }
    // 滚动翻页
    loadNextFunc(e) {
        let {page} = this.state;
        page +=1; 
        setTimeout(() => {
            this.setState({
                page: page
            })
            console.log(this.state.page)
            this.newFetch(true);
        },500)
    }
    // 价格区间过滤
    priceFilter(){
        alert(1);
    }
    render() {
        const {newsItem,priceFilterList} = this.state;
        // console.log(newsItem);
        const newsList = newsItem.length
        ? newsItem.map((Item, index) => (
            <div key={index} className="mainWrapper">
                <img src={process.env.PUBLIC_URL+Item.productImage} alt=""/>
                <div>{Item.productName}</div>
                <div className="price">￥{Item.salePrice}</div>
                <div className="btn-area">
                    <a className="btn" href="javascript:;" onClick={(e) => this.addShopcart(e)}>加入购物车</a>
                </div>
            </div>
        )):"none"
        const priceFilter = ({key}) => {
            // message.info(`Click on item ${key}`);
            let {priceChecked} = this.state;
            priceChecked = `${key}`;            
            this.setState({
                priceChecked: priceChecked,
                page:1
            })
            this.newFetch();
        }
        const priceFilterListChild= priceFilterList.map((Item,index) => (
            <Menu.Item key={index}>
                {Item.startPrice} - {Item.endPrice}
            </Menu.Item>
        ))
        const menu=(
            <Menu onClick={priceFilter}>
               {priceFilterListChild}
            </Menu>
        )
        return(
            <div className="cartContainer">
                <div className="handleLine">           
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" href="javascript:;">
                        价格区间 <Icon type="down" />
                        </a>
                    </Dropdown>
                    <div className="cuurPrice" onClick={(e) => this.sortGoods(e)}>
                        <a href="javascript:;" className="changePrice">
                            <span>价格</span>
                            <i>^</i>
                        </a>
                    </div>
                </div>
                <div className="scrollWrapper">
                    <LimitInfiniteScroll
                        limit={3}
                        spinLoader = {<div className="loader">Loading...</div>}
                        hasMore={newsItem.length>0}
                        mannualLoader={<span style={{fontSize: 20, lineHeight: 20, marginBottom: 20, display: 'inline-block'}}>Load More</span>}
                        noMore={<div className="loader">No More Items</div>}
                        loadNext={(e) => this.loadNextFunc(e)}
                        className="scrollWrapperOne">    
                            {newsList}            
                    </LimitInfiniteScroll>
                </div>   
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
)(Index);
