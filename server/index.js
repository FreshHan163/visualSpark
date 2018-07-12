// node 后端服务器入口文件
const userApi = require('./api/userApi');
const chartApi = require('./api/chartApi');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// 后端api路由
// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Accept');
// });
app.use('/api', userApi);
app.use('/api', chartApi);
// app.use('/', userApi);
// app.use('/api/addUser', function(req, res) {
//   res.send('Hello World!');
// });

// 监听端口
// http.createServer(app).listen(3000);
app.listen(3000);
console.log('success listen at port: 3000 ... ... ');
