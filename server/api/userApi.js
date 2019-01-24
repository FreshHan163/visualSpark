// 测试api示例
var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sql/sqlMap');

//连接数据库
// var conn = mysql.createConnection(models.mysql);
// conn.connect();
var conn = mysql.createPool(models.mysql);

// 响应一个json数据
var jsonWrite = function(res, ret) {
  if(typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败！'
    });
  } else {
    res.json(ret);
  }
};

// 增加用户接口addUser的post方法，req是客户端发来的请求，res为服务端返回的数据
router.post('/addUser', (req, res) => {
  // res.send('THis is from /api/addUSer. Hello World!');
  var sql = $sql.test.add;
  var params = req.body;
  console.log(params);
  conn.query(sql, [params.class, params.score], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});
router.post('/getUserById', (req, res) => {
  var sql = $sql.test.getUserById;
  var params = req.body;
  var id = req.body.id;
  console.log('post请求req',req.body.id);
  // res.send('THis is from /api/addUSer. Hello World!');
  conn.query(sql, [id], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});
router.get('/getUser', (req, res) => {
  conn.getConnection((err, connection) => {
    // res.send('THis is from /api/addUSer. Hello World!');
    var sql = $sql.test.queryAll;
    connection.query(sql, function(err, result) {
      if (err) {
        console.log(err);
      }
      if (result) {
        jsonWrite(res, result);
      }
      connection.release();
    });
  });
  // var sql = $sql.test.queryAll;
  // var params = req.body;
  // console.log(params);
  // conn.query(sql, function(err, result) {
  //   if (err) {
  //     console.log(err);
  //   }
  //   if (result) {
  //     jsonWrite(res, result);
  //   }
  // });
});
module.exports = router;
