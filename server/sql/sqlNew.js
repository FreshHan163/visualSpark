// sql语句映射文件，以供api逻辑调用
// sql语句
var sqlNewChart = {
    // 用户
    chart: {
        getThreeBarDay: 'select * from dw_log_3d_count0410',
        queryDestPortEntropy: `
        SELECT
          hours,
          countServer,
          destPortEntropy/(select max(destPortEntropy) from dw_para_destPort0410) as destPortEntropyTotal
        FROM
        dw_para_destPort0410
      `,
      queryDestIpEntropy: `
        SELECT
          hours,
          countServer,
          destIpEntropy/(select max(destIpEntropy) from dw_para_destIp0410) as destIpEntropyTotal
        FROM
        dw_para_destIp0410
      `,querySrcPortEntropy: `
      SELECT
        hours,
        countServer,
        srcPortEntropy/(select max(srcPortEntropy) from dw_para_srcPort0410) as srcPortEntropyTotal
      FROM
      dw_para_srcPort0410
    `,querySrcIpEntropy: `
    SELECT
      hours,
      countServer,
      srcIpEntropy/(select max(srcIpEntropy) from dw_para_srcIp0410) as srcIpEntropyTotal
    FROM
      dw_para_srcIp0410
    `,queryParaTotalCount: `
    SELECT
      hours, countServer,
      linkCount/(SELECT MAX(linkCount) FROM dw_para_link0410 ) as count
    FROM
      dw_para_link0410
    ORDER BY hours, countServer
    `,  queryParaTotalBytes: `
    SELECT
      hours, countServer,
      totalBytes/(SELECT MAX(totalBytes) FROM dw_para_byte0410 ) as bytes
    FROM
      dw_para_byte0410
    ORDER BY hours, countServer`,
    queryParaTotalPackets: `
    SELECT
      hours, countServer,
      pktCount/(SELECT MAX(pktCount) FROM dw_para_pkt0410 ) as pkts
    FROM
      dw_para_pkt0410
    ORDER BY hours, countServer`,
    }
  }
  module.exports = sqlNewChart;