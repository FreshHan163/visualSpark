// 测试api示例
var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sql/sqlDay');

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

router.get('/getThreeBar', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sql = $sql.chart.queryThreeBar;
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
router.get('/getSrcIpEntropyHours', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sql = $sql.chart.querySrcIpEntropy;
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
router.get('/getSrcPortEntropyHours', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sql = $sql.chart.querySrcPortEntropy;
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
router.get('/getDestIpEntropyHours', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sql = $sql.chart.queryDestIpEntropy;
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
router.get('/getDestPortEntropyHours', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sql = $sql.chart.queryDestPortEntropy;
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
router.get('/getParaTimeData', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sql = $sql.chart.queryParaTimeData;
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
router.get('/getParaTotalBytes', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sql = $sql.chart.queryParaTotalBytes;
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
router.get('/getParaTotalCount', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sql = $sql.chart.queryParaTotalCount;
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
router.get('/getParaTotalPackets', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sql = $sql.chart.queryParaTotalPackets;
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
router.get('/getHeatSrcIp', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sql = $sql.chart.queryHeatSrcIp;
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
router.get('/getHeatSrcPort', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sql = $sql.chart.queryHeatSrcPort;
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
router.get('/getHeatDestIp', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sql = $sql.chart.queryHeatDestIp;
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
router.get('/getHeatDestPort', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sql = $sql.chart.queryHeatDestPort;
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
router.get('/getHeatSrcIpLink', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sql = $sql.chart.queryHeatSrcIpLink;
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
router.get('/getHeatSrcPortLink', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sql = $sql.chart.queryHeatSrcPortLink;
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
router.get('/getHeatDestIpLink', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sql = $sql.chart.queryHeatDestIpLink;
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
router.get('/getHeatDestPortLink', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sql = $sql.chart.queryHeatDestPortLink;
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
router.get('/getHeatDestIpActivePort', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sql = $sql.chart.queryHeatDestIpActivePort;
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
router.get('/getHeatSrcIpActivePort', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sql = $sql.chart.queryHeatSrcIpActivePort;
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
router.get('/getSrcIP', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sql = $sql.chart.querySrcIp;
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
module.exports = router;
