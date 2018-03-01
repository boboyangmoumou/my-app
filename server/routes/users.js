const express = require('express');
const router = express.Router();
require ('./../util/util')
const User = require('./../models/users.js');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/test', function(req,res,next) {
  res.send('test');
})
router.all('*',function (req,res,next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  next();
});
//后端接口
router.post("/login",function (req,res,next) {
  let param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd,
  }
  User.findOne(param, function (err,doc) {
    console.log(doc);
    if(err){
      res.json({
        status: "1",
        msg: err.message
      });
    }else {
      if(doc){
        res.cookie("userId",doc.userId,{
          path:'/',
          maxAge:1000*60*60
        });
        res.cookie("userName",doc.userName,{
          path:'/',
          maxAge: 1000*60*60
        });
        res.json({
          status:'0',
          msg:'',
          result:{
            userName:doc.userName
          }
        });
      }else{
        res.json({
          status:'1',
          msg: '帐号密码错误',
          result:''
        });
      }
    }
  });
});
// 登出接口
router.post("logout", function(req, res, next){
  res.cookie("userId", "", {
    path:"/",
    maxAge: -1
  })
  res.json({
    status: "0",
    msg: '',
    result:''
  })
})
// 登陆校验
router.get("/checkLogin", function(req, res, next){
  if(req.cookies.userId){
    req.json({
      status:'0',
      msg: '',
      result: req.cookies.userName || ''
    });
  }else{
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    });
  }
});

module.exports = router;
