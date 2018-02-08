const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Goods = require('../models/goods');

mongoose.connect('mongodb://127.0.0.1:27017/runoob');

mongoose.connection.on("connected", function () {
    console.log("mongodb connected success.")
});

mongoose.connection.on("error", function () {
    console.log("mongodb connected fail.")
});
mongoose.connection.on("disconnection", function () {
    console.log("mongodb connected disconnected")
});

router.all('*',function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
});
router.get("/list", function (req,res,next) {
    let page = parseInt(req.param("page"));//获取页码
    let pageSize = parseInt(req.param("pageSize")); //一页几条数据
    // let priceLevel = req.param("priceLevel");
    let sort = req.param("sort");//排序
    let skip = (page-1)*pageSize;//默认跳过几条数据  skip是索引值
    // var priceGt= '',priceLte='';
    let params = {};
    let goodsModel  = Goods.find(params).skip(skip).limit(pageSize);//返回一个model
    goodsModel.sort({'salePrice':sort});
    goodsModel.exec(function(err,doc) {
    // })
    // Goods.find({}, function(err,doc){
        if(err){
            res.json({
                status: '1',
                msg: err.message
            })
        }else {
            res.json({
                status: '0',
                msg: '',
                result: {
                    count: doc.length,
                    list: doc
                }
            })
        }
    });

})

module.exports = router;
