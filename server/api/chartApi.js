// 测试api示例
var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sql/sqlMap');
var $sqlVisualSPark = require('../sql/sqlVisualSpark');

//连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();

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

router.get('/getPieData', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sql = $sql.chart.queryAll;
  var params = req.body;
  console.log(params);
  conn.query(sql, function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

router.get('/getVisual', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sqlVisual = $sqlVisualSPark.bigChunk.queryThreeBar;
  var params = req.body;
  console.log(params);
  conn.query(sqlVisual, function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});
router.get('/getPiePort', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sqlPort = $sqlVisualSPark.bigChunk.queryPort;
  var params = req.body;
  console.log(params);
  conn.query(sqlPort, function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});
router.get('/getHeatMapSrcIp', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sqlPort = $sqlVisualSPark.bigChunk.queryMaxSrcIp;
  var params = req.body;
  console.log(params);
  conn.query(sqlPort, function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});
router.get('/getHeatMapSrcPort', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sqlPort = $sqlVisualSPark.bigChunk.queryMaxSrcPort;
  var params = req.body;
  console.log(params);
  conn.query(sqlPort, function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});
router.get('/getHeatMapDestIp', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sqlPort = $sqlVisualSPark.bigChunk.queryMaxDestIp;
  var params = req.body;
  console.log(params);
  conn.query(sqlPort, function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});
router.get('/getHeatMapDestPort', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sqlPort = $sqlVisualSPark.bigChunk.queryMaxDestPort;
  var params = req.body;
  console.log(params);
  conn.query(sqlPort, function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});
router.get('/getParaSrcIp', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sqlPort = $sqlVisualSPark.bigChunk.queryParaSrcIp;
  var params = req.body;
  console.log(params);
  conn.query(sqlPort, function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});
router.get('/getSunUdp', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sqlPort = $sqlVisualSPark.bigChunk.querySunburstUdp;
  var params = req.body;
  console.log(params);
  conn.query(sqlPort, function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});
router.get('/getSunTcp', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sqlPort = $sqlVisualSPark.bigChunk.querySunburstTcp;
  var params = req.body;
  console.log(params);
  conn.query(sqlPort, function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});
router.get('/getSunOther', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sqlPort = $sqlVisualSPark.bigChunk.querySunburstOther;
  var params = req.body;
  console.log(params);
  conn.query(sqlPort, function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});
router.get('/getTimeData', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sqlPort = $sqlVisualSPark.bigChunk.queryTimeData;
  var params = req.body;
  console.log(params);
  conn.query(sqlPort, function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});
router.get('/getIp', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sqlPort = $sqlVisualSPark.bigChunk.queryIp;
  var params = req.body;
  console.log(params);
  conn.query(sqlPort, function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});
router.post('/getIpDetail', (req, res) => {
  let ip = req.body.srcIp;
  var sql = $sqlVisualSPark.bigChunk.getIpDetail;
  var params = req.body;
  conn.query(sql, [ip], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});
module.exports = router;
