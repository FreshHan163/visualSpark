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
    var query = req.query;
    conn.query(sql, [query.table], function(err, result) {
      if (err) {
        console.log(err);
      }
      if (result) {
        jsonWrite(res, result);
      }
    });
});

// 获取平行坐标数据
router.get('/getPara', (req, res) => {
  var sql = $sql.chart.getPara;
  var query = req.query;
  conn.query(sql, [query.table, query.table], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

// 获取热力图数据
router.get('/getHeat', (req, res) => {
  var sql = $sql.chart.getHeat;
  conn.query(sql, function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

// 获取气泡图数据
router.get('/getBubble', (req, res) => {
  var sql = $sql.chart.getBubble;
  conn.query(sql, function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

// 获取折线图数据
router.get('/getIp', (req, res) => {
  var sql = $sql.chart.getIp;
  var query = req.query;
  let ipTable = `dw_line_${query.ip}`;
  console.log('ipTable = ', ipTable);
  conn.query(sql, ipTable, function(err, result) {
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
router.get('/getHeatSrcIp', (req, res) => {
  var sql = $sql.chart.queryHeatSrcIp;
  var query = req.query;
  conn.query(sql, [query.mins], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});
router.get('/getHeatSrcPort', (req, res) => {
  var sql = $sql.chart.queryHeatSrcPort;
  var query = req.query;
  conn.query(sql, [query.mins], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});
router.get('/getHeatDestIp', (req, res) => {
  var sql = $sql.chart.queryHeatDestIp;
  var query = req.query;
  console.log('query = ', query.hours);
  conn.query(sql, [query.mins], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});
router.get('/getHeatDestPort', (req, res) => {
  var sql = $sql.chart.queryHeatDestPort;
  var query = req.query;
  conn.query(sql, [query.mins], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

// 气泡图
router.get('/getBubbleDestIpLink', (req, res) => {
  var sql = $sql.chart.queryBubbleDestIpLink;
  console.log('query = ', req.query);
  var query = req.query;
  conn.query(sql, [query.hours], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});
router.get('/getBubbleDestPortLink', (req, res) => {
  var sql = $sql.chart.queryBubbleDestPortLink;
  var query = req.query;
  conn.query(sql, [query.hours], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});
router.get('/getBubbleSrcIpLink', (req, res) => {
  var sql = $sql.chart.queryBubbleSrcIpLink;
  var query = req.query;
  console.log('query = ', req.query, sql);
  conn.query(sql, [query.hours], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});
router.get('/getBubbleSrcPortLink', (req, res) => {
  var sql = $sql.chart.queryBubbleSrcPortLink;
  var query = req.query;
  conn.query(sql, [query.hours], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});
router.get('/getBubbleDestIpPort', (req, res) => {
  var sql = $sql.chart.queryBubbleDestIpPort;
  var query = req.query;
  conn.query(sql, [query.hours], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});
router.get('/getBubbleSrcIpPort', (req, res) => {
  var sql = $sql.chart.queryBubbleSrcIpPort;
  var query = req.query;
  conn.query(sql, [query.hours], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

// 查询IP、端口号
router.get('/getSrcIp', (req, res) => {
  var sql = $sql.chart.querySrcIp;
  var query = req.query;
  conn.query(sql, [query.ip], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});
router.get('/getDestIp', (req, res) => {
  var sql = $sql.chart.queryDestIp;
  var query = req.query;
  conn.query(sql, [query.ip], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});
router.get('/getSrcPort', (req, res) => {
  var sql = $sql.chart.querySrcPort;
  var query = req.query;
  conn.query(sql, [query.port], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});
router.get('/getDestPort', (req, res) => {
  var sql = $sql.chart.queryDestPort;
  var query = req.query;
  conn.query(sql, [query.port], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});
module.exports = router;
