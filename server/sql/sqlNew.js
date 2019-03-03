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
    queryHeatSrcIp: `
      SELECT
        *
      FROM
        dw_heat_srcIp0410
      WHERE
        hours = ?
      ORDER By
        srcBytes
      DESC
      LIMIT 0, 100`,
    queryHeatSrcPort: `
      SELECT
        *
      FROM
        dw_heat_srcPort0410
      WHERE
        hours = ?
      ORDER By
        srcBytes
      DESC
      LIMIT 0, 100`,
      queryHeatDestIp: `
      SELECT
        *
      FROM
        dw_heat_destIp0410
      WHERE
        hours = ?
      ORDER By
        destBytes
      DESC
      LIMIT 0, 100`,
    queryHeatDestPort: `
    SELECT
      *
    FROM
      dw_heat_destPort0410
    WHERE
      hours = ?
    ORDER By
      destBytes
    DESC
    LIMIT 0, 100`,
    // 气泡图
    queryBubbleDestIpLink: `
    SELECT
      *
    FROM
      dw_bubble_link_destIp0410
    WHERE
      hours = ?
    ORDER By
      destIpLink
    DESC
    LIMIT 0, 100`,
    queryBubbleDestPortLink: `
    SELECT
      *
    FROM
      dw_bubble_link_destPort0410
    WHERE
      hours = ?
    ORDER By
      destPortLink
    DESC
    LIMIT 0, 100`,
    queryBubbleSrcIpLink: `
    SELECT
      *
    FROM
      dw_bubble_link_srcIp0410
    WHERE
      hours = ?
    ORDER By
      srcIpLink
    DESC
    LIMIT 0, 100`,
    queryBubbleSrcPortLink: `
    SELECT
      *
    FROM
      dw_bubble_link_srcPort0410
    WHERE
      hours = ?
    ORDER By
      srcPortLink
    DESC
    LIMIT 0, 100`,
    queryBubbleDestIpPort: `
    SELECT
      *
    FROM
      dw_bubble_port_destIp0410
    WHERE
      hours = ?
    ORDER By
      activePort
    DESC
    LIMIT 0, 100`,
    queryBubbleSrcIpPort: `
    SELECT
      *
    FROM
      dw_bubble_port_srcIp0410
    WHERE
      hours = ?
    ORDER By
      activePort
    DESC
    LIMIT 0, 100`,
    querySrcIp: `
    SELECT
      t1.hours as hours,
      if(t2.total is null,0,t2.total) as total
    FROM(
        SELECT
          hours
        FROM
          dw_log_mid0410
        GROUP BY
          hours
        ORDER BY
          hours
      ) t1
      left join
      (
        SELECT
          hours, srcIp, sum(srcTotalBytes) as total
        FROM
          dw_log_mid0410
        where
          srcIp = ?
        group by
          hours, srcIp
      ) t2
      on t1.hours = t2.hours
    ORDER BY
      hours`,
      queryDestIp: `
      SELECT
        t1.hours as hours,
        if(t2.total is null,0,t2.total) as total
      FROM(
          SELECT
            hours
          FROM
            dw_log_mid0410
          GROUP BY
            hours
          ORDER BY
            hours
        ) t1
        left join
        (
          SELECT
            hours, destIp, sum(destTotalBytes) as total
          FROM
            dw_log_mid0410
          where
            destIp = ?
          group by
            hours, destIp
        ) t2
        on t1.hours = t2.hours
      ORDER BY
        hours`,
      querySrcPort: `
      SELECT
        t1.hours as hours,
        if(t2.total is null,0,t2.total) as total
      FROM(
          SELECT
            hours
          FROM
            dw_log_mid0410
          GROUP BY
            hours
          ORDER BY
            hours
        ) t1
        left join
        (
          SELECT
            hours, srcPort, sum(srcTotalBytes) as total
          FROM
            dw_log_mid0410
          where
            srcPort = ?
          group by
            hours, srcPort
        ) t2
        on t1.hours = t2.hours
      ORDER BY
        hours`,
      queryDestPort: `
      SELECT
        t1.hours as hours,
        if(t2.total is null,0,t2.total) as total
      FROM(
          SELECT
            hours
          FROM
            dw_log_mid0410
          GROUP BY
            hours
          ORDER BY
            hours
        ) t1
        left join
        (
          SELECT
            hours, destPort, sum(destTotalBytes) as total
          FROM
            dw_log_mid0410
          where
          destPort = ?
          group by
            hours, destPort
        ) t2
        on t1.hours = t2.hours
      ORDER BY
        hours`,
    },
  }
  module.exports = sqlNewChart;