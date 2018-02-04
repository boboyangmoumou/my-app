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

router.get("/", function (req,res,next) {
    Goods.find({}, function(err,data){
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
                    count: data.length,
                    list: data
                }
            })
        }
    })
})

module.exports = router;
