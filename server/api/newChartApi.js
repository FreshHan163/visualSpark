// 测试api示例
var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sql/sqlNew');

//连接数据库
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

// 获取3d数据
router.get('/getThreeBar', (req, res) => {
    var sql = $sql.chart.getThreeBarDay;
    var params = req.body;
    conn.query(sql, [params.ips, params.hours], function(err, result) {
      if (err) {
        console.log(err);
      }
      if (result) {
        jsonWrite(res, result);
      }
    });
});

// 平行坐标数据--destPort
router.get('/getDestPortEntropyHours', (req, res) => {
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
router.get('/getDestIpEntropyHours', (req, res) => {
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
router.get('/getSrcIpEntropyHours', (req, res) => {
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
router.get('/getParaTimeData', (req, res) => {
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
module.exports = router;
