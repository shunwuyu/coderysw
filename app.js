'use strict';
var domain = require('domain');
var express = require('express');
var AV = require('leanengine');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var todos = require('./routes/todos');
var others = require('./routes/others');
var weipiao = require('./routes/weipiao'); //引用微票儿路由
var qzone = require('./routes/qzone');
var meituan = require('./routes/meituan');
var guanjia = require('./routes/guanjia');
var douban = require('./routes/douban');
var geolocation = require('./routes/geolocation');
var game = require('./routes/game');
var transform3d = require('./routes/transform3d');
var member = require('./routes/member');
var bing = require('./routes/bing');
var fee = require('./routes/fee');
var lesson = require('./routes/lesson');
var cloud = require('./cloud');

var app = express();
var AV = require('leanengine');
app.use(AV.Cloud.CookieSession({ secret: 'haha', maxAge: 3600000, fetchUser: true }));

// 设置 view 引擎
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
app.use(express.static('public'));

// 加载云代码方法
app.use(cloud);

// 使用 LeanEngine 中间件
// （如果没有加载云代码方法请使用此方法，否则会导致部署失败，详细请阅读 LeanEngine 文档。）
// app.use(AV.Cloud);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// 未处理异常捕获 middleware
app.use(function(req, res, next) {
  var d = null;
  if (process.domain) {
    d = process.domain;
  } else {
    d = domain.create();
  }
  d.add(req);
  d.add(res);
  d.on('error', function(err) {
    console.error('uncaughtException url=%s, msg=%s', req.url, err.stack || err.message || err);
    if(!res.finished) {
      res.statusCode = 500;
      res.setHeader('content-type', 'application/json; charset=UTF-8');
      res.end('uncaughtException');
    }
  });
  d.run(next);
});

app.get('/', function(req, res) {
    // var uid = AV.User.current().id;
    // var query = new AV.Query(AV.User);
    // query.get(uid).then(function (user) {
    //     console.log(user);
    // }, function (error) {
    // // 失败了
    // });
    res.render('index', {});
});


app.get('/home', function(req, res) {
  res.render('home', {});
});

app.get('/swiper', function(req, res) {
  res.render('swiper', {});
});

app.get("/login",function(req,res){
  if(AV.User.current()) {
      res.redirect('/');
  }
  res.render('login',{});
});

app.get("/register",function(req,res){
  res.render('register',{});
});

app.post('/login',function(req,res,next){
  var username = req.body.username;
  var password = req.body.password;
  AV.User.logIn(username, password).then(function (loginedUser) {
    //console.log(loginedUser);
    res.redirect('/');
  }, (function (error) {
    res.render('/error');
  }));

});

app.get('/logout', function(req,res,next) {
     AV.User.logOut();
     res.redirect('/');
});

app.post('/register',function(req,res,next){

  var user = new AV.User();// 新建 AVUser 对象实例
  var username = req.body.username;
  var password = req.body.password;
  // var email = req.body.email;
  user.setUsername(username);// 设置用户名
  user.setPassword(password);// 设置密码
  //user.setEmail(email);// 设置邮箱
  user.signUp().then(function (loginedUser) {
      res.redirect('/login');
  }, (function (error) {
    // res.render('error');
  }));
});

app.get('/send_yzm/:telephone', function(req, res) {
    var telephone = req.params.telephone;
    AV.Cloud.requestSmsCode('18770919330').then(function(){
        res.json({status:'ok'});
	}, function(err){
        res.json({status:'error'});
	});
});


app.get('/login', function(req, res) {
  res.render('login', {});
});




// 可以将一类的路由单独保存在一个文件中
app.use('/todos', todos);
app.use('/weipiao',weipiao);
app.use('/others', others);
app.use('/qzone',qzone);
app.use('/meituan', meituan);
app.use('/guanjia', guanjia);
app.use('/douban', douban);
app.use('/geolocation', geolocation);
app.use('/game',game);
app.use('/member',member);
app.use('/transform3d',transform3d);
app.use('/bing',bing);
app.use('/fee',fee);
app.use('/lesson',lesson);


// 如果任何路由都没匹配到，则认为 404
// 生成一个异常让后面的 err handler 捕获
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// 如果是开发环境，则将异常堆栈输出到页面，方便开发调试
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) { // jshint ignore:line
    var statusCode = err.status || 500;
    if(statusCode === 500) {
      console.error(err.stack || err);
    }
    res.status(statusCode);
    res.render('error', {
      message: err.message || err,
      error: err
    });
  });
}

// 如果是非开发环境，则页面只输出简单的错误信息
app.use(function(err, req, res, next) { // jshint ignore:line
  res.status(err.status || 500);
  res.render('error', {
    message: err.message || err,
    error: {}
  });
});

module.exports = app;
