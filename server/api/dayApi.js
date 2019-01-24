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
// 饼图
router.get('/getSunTcp0619', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sql = $sql.chart.querySunTcp0619;
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
router.get('/getSunUdp0619', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sql = $sql.chart.querySunUdp0619;
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
router.get('/getSunOther0619', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sql = $sql.chart.querySunOther0619;
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
// 0214细节图
router.get('/getSrcIp0214', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sql = $sql.chart.querySrcIp0214;
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
router.get('/getSrcIp0214_1016515', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sql = $sql.chart.querySrcIp0214_1016515;
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
router.get('/getDestIp0214', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sql = $sql.chart.queryDestIp0214;
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
router.get('/getDestPort0214_80', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sql = $sql.chart.queryDestPort0214_80;
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
// 热力图
router.get('/getHeatSrcIp0214', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sql = $sql.chart.queryHeatSrcIp0214;
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
router.get('/getHeatSrcPort0214', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sql = $sql.chart.queryHeatSrcPort0214;
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
router.get('/getHeatDestIp0214', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sql = $sql.chart.queryHeatDestIp0214;
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
router.get('/getHeatDestPort0214', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sql = $sql.chart.queryHeatDestPort0214;
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
// 气泡图
router.get('/getHeatSrcIpLink0214', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sql = $sql.chart.queryHeatSrcIpLink0214;
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
router.get('/getHeatSrcPortLink0214', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sql = $sql.chart.queryHeatSrcPortLink0214;
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
router.get('/getHeatDestIpLink0214', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sql = $sql.chart.queryHeatDestIpLink0214;
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
router.get('/getHeatDestPortLink0214', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sql = $sql.chart.queryHeatDestPortLink0214;
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
router.get('/getHeatDestIpActivePort0214', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sql = $sql.chart.queryHeatDestIpActivePort0214;
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
router.get('/getHeatSrcIpActivePort0214', (req, res) => {
  // res.send('THis is from /api/getPieData. pieChart!');
  var sql = $sql.chart.queryHeatSrcIpActivePort0214;
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
