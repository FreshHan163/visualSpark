// sql语句映射文件，以供api逻辑调用
// sql语句
var sqlVisualSPark = {
  // 用户
  bigChunk: {
    queryAll: 'select * from challenge',
    queryPort: 'select destPort, SUM(srcTotalBytes) as srcBytes from challenge group by destPort',
    querySun: '',
    // queryThreeBar: 'select timeDate, protocolCode, SUM(srcTotalBytes) from bigChunk group by timeDate , protocolCode',
    queryThreeBar: `select SUM(threeBar.srcBytes) AS srcAllBytes, threeBar.protocolCode, threeBar.hours
    FROM (
      select
        SUM(srcTotalBytes) as srcBytes, protocolCode,
        FROM_UNIXTIME(TimeSeconds,'%Y-%m-%d %H:00:00')
        AS hours,
        CONCAT(FROM_UNIXTIME(TimeSeconds,'%Y-%m-%d %H:00'), '-', FROM_UNIXTIME(TimeSeconds,'%H') + 1, ":00")
        AS dates
      from
        challenge
      GROUP BY
        TimeSeconds, protocolCode
    ) as threeBar

    GROUP BY
      threeBar.hours, threeBar.protocolCode
    ORDER BY
      threeBar.hours
    DESC`,
    queryMaxSrcIp: 'select heatmapSrcIp.srcIp, heatmapSrcIp.hours, SUM(heatmapSrcIp.srcBytes) as srcAllBytes from (select SUM(srcTotalBytes) as srcBytes, srcIp, timeDate, FROM_UNIXTIME(TimeSeconds, "%Y-%m-%d %H:00:00") AS hours from challenge GROUP BY timeDate, srcIp, TimeSeconds ) as heatmapSrcIp where heatmapSrcIp.hours = "2013-04-01 16:00:00" group by heatmapSrcIp.hours, heatmapSrcIp.srcIp order by srcAllBytes desc limit 0,100',
    queryMaxSrcPort: `select heatmapSrcPort.srcPort, heatmapSrcPort.hours, SUM(heatmapSrcPort.srcBytes) as srcAllBytes
      from (
        select
          SUM(srcTotalBytes) as srcBytes, srcPort, timeDate,
          FROM_UNIXTIME(TimeSeconds,'%Y-%m-%d %H:00:00')
          AS hours
        from
          challenge
        GROUP BY
          timeDate, srcPort, TimeSeconds
      ) as heatmapSrcPort
      where
        heatmapSrcPort.hours = '2013-04-01 16:00:00'
      group by
        heatmapSrcPort.hours, heatmapSrcPort.srcPort
      order by
        srcAllBytes
      desc
      limit 0,100`,
    queryMaxDestIp: `select heatmapDestIp.destIp, heatmapDestIp.hours, SUM(heatmapDestIp.destBytes) as destAllBytes
      from (
        select
          SUM(destTotalBytes) as destBytes, destIp, timeDate,
          FROM_UNIXTIME(TimeSeconds,'%Y-%m-%d %H:00:00')
          AS hours
        from
          challenge
        GROUP BY
          timeDate, destIp, TimeSeconds
      ) as heatmapDestIp
      where
        heatmapDestIp.hours = '2013-04-01 16:00:00'
      group by
        heatmapDestIp.hours, heatmapDestIp.destIp
      order by
        DestAllBytes
      desc
      limit 0,100`,
    queryMaxDestPort: `select heatmapDestPort.destPort, heatmapDestPort.hours, SUM(heatmapDestPort.destBytes) as destAllBytes
      from (
        select
          SUM(destTotalBytes) as destBytes, destPort, timeDate,
          FROM_UNIXTIME(TimeSeconds,'%Y-%m-%d %H:00:00')
          AS hours
        from
          challenge
        GROUP BY
          timeDate, destPort, TimeSeconds
      ) as heatmapDestPort
      where
        heatmapDestPort.hours = '2013-04-01 16:00:00'
      group by
        heatmapDestPort.hours, heatmapDestPort.destPort
      order by
        destAllBytes
      desc
      limit 0,100`,
    queryParaSrcIp: `SELECT
    t3.hours,
    t3.protocolCode,
    SUM(-t3.rate * LOG(t3.rate)) as srcIpEntropy
  from (
    SELECT
      t1.hours,
      t1.protocolCode,
      t1.srcIp,
      t1.countSrcIp,
      t2.countAllIp,
      t1.countSrcIp/t2.countAllIp as rate
    FROM(
        SELECT
          FROM_UNIXTIME(TimeSeconds,'%Y-%m-%d %H:00:00') AS hours,
          protocolCode,
          srcIp,
          COUNT(*) as countSrcIp
        FROM
          challenge
        GROUP BY
          hours,
          protocolCode,
          srcIp
      ) t1
      JOIN
      (
        SELECT
          FROM_UNIXTIME(TimeSeconds,'%Y-%m-%d %H:00:00') AS hours,
          protocolCode,
          SUM(srcTotalBytes),
          COUNT(*) as countAllIp
        FROM
          challenge
        GROUP BY
          hours,
          protocolCode
      ) t2
      ON t1.hours = t2.hours AND t1.protocolCode = t2.protocolCode
  ) t3
  GROUP BY
    t3.hours,
    t3.protocolCode
  order by
    hours`,
    queryParaSrcPort: `SELECT
    SUM(-t3.rate * LOG(t3.rate)) as srcPortEntropy,
    t3.hours,
    t3.protocolCode
  from (
    SELECT
      t1.hours,
      t1.protocolCode,
      t1.srcPort,
      t1.countSrcPort,
      t2.countAllPort,
      t1.countSrcPort/t2.countAllPort as rate
    FROM(
        SELECT
          FROM_UNIXTIME(TimeSeconds,'%Y-%m-%d %H:00:00') AS hours,
          protocolCode,
          srcPort,
          COUNT(*) as countSrcPort
        FROM
          challenge
        GROUP BY
          hours,
          protocolCode,
          srcPort
      ) t1
      JOIN
      (
        SELECT
          FROM_UNIXTIME(TimeSeconds,'%Y-%m-%d %H:00:00') AS hours,
          protocolCode,
          SUM(srcTotalBytes),
          COUNT(*) as countAllPort
        FROM
          challenge
        GROUP BY
          hours,
          protocolCode
      ) t2
      ON t1.hours = t2.hours AND t1.protocolCode = t2.protocolCode
  ) t3
  GROUP BY
    t3.hours,
    t3.protocolCode
  order by
    hours`,
    queryParaDestIp: `SELECT
    SUM(-t3.rate * LOG(t3.rate)) as destIpEntropy,
    t3.hours,
    t3.protocolCode
  from (
    SELECT
      t1.hours,
      t1.protocolCode,
      t1.destIp,
      t1.countDestIp,
      t2.countAllIp,
      t1.countDestIp/t2.countAllIp as rate
    FROM(
        SELECT
          FROM_UNIXTIME(TimeSeconds,'%Y-%m-%d %H:00:00') AS hours,
          protocolCode,
          destIp,
          COUNT(*) as countDestIp
        FROM
          challenge
        GROUP BY
          hours,
          protocolCode,
          destIp
      ) t1
      JOIN
      (
        SELECT
          FROM_UNIXTIME(TimeSeconds,'%Y-%m-%d %H:00:00') AS hours,
          protocolCode,
          SUM(destTotalBytes),
          COUNT(*) as countAllIp
        FROM
          challenge
        GROUP BY
          hours,
          protocolCode
      ) t2
      ON t1.hours = t2.hours AND t1.protocolCode = t2.protocolCode
  ) t3
  GROUP BY
    t3.hours,
    t3.protocolCode
  order by
    hours`,
    queryParaDestPort: `SELECT
    SUM(-t3.rate * LOG(t3.rate)) as destPortEntropy,
    t3.hours,
    t3.protocolCode
  from (
    SELECT
      t1.hours,
      t1.protocolCode,
      t1.destPort,
      t1.countDestPort,
      t2.countAllPort,
      t1.countDestPort/t2.countAllPort as rate
    FROM(
        SELECT
          FROM_UNIXTIME(TimeSeconds,'%Y-%m-%d %H:00:00') AS hours,
          protocolCode,
          destPort,
          COUNT(*) as countDestPort
        FROM
          challenge
        GROUP BY
          hours,
          protocolCode,
          destPort
      ) t1
      JOIN
      (
        SELECT
          FROM_UNIXTIME(TimeSeconds,'%Y-%m-%d %H:00:00') AS hours,
          protocolCode,
          COUNT(*) as countAllPort
        FROM
          challenge
        GROUP BY
          hours,
          protocolCode
      ) t2
      ON t1.hours = t2.hours AND t1.protocolCode = t2.protocolCode
  ) t3
  GROUP BY
    t3.hours,
    t3.protocolCode
  order by
    hours`,
    querySunburstUdp: `select sum(sunburst.srcBytes) as srcAllBytes, destPort, protocolCode
    from
    (select
      SUM(srcTotalBytes) as srcBytes, destPort, protocolCode,
      FROM_UNIXTIME(TimeSeconds,'%Y-%m-%d %H:00:00')
      AS hours
    from
      challenge
    GROUP BY
      TimeSeconds, protocolCode, destPort
    ) as sunburst
    where
      sunburst.hours = '2013-04-01 16:00:00' AND sunburst.protocolCode = 'UDP'
    group by
      sunburst.hours, sunburst.protocolCode, sunburst.destPort
    order by
      protocolCode, srcAllBytes
    DESC
    LIMIT 0,5`,
    querySunburstTcp: `select sum(sunburst.srcBytes) as srcAllBytes, destPort, protocolCode
    from
    (select
      SUM(srcTotalBytes) as srcBytes, destPort, protocolCode,
      FROM_UNIXTIME(TimeSeconds,'%Y-%m-%d %H:00:00')
      AS hours
    from
      challenge
    GROUP BY
      TimeSeconds, protocolCode, destPort
    ) as sunburst
    where
      sunburst.hours = '2013-04-01 16:00:00' AND sunburst.protocolCode = 'TCP'
    group by
      sunburst.hours, sunburst.protocolCode, sunburst.destPort
    order by
      protocolCode, srcAllBytes
    DESC
    LIMIT 0,5`,
    querySunburstOther: `select sum(sunburst.srcBytes) as srcAllBytes, srcPort, protocolCode
    from
    (select
      SUM(srcTotalBytes) as srcBytes, destPort, protocolCode,
      FROM_UNIXTIME(TimeSeconds,'%Y-%m-%d %H:00:00')
      AS hours
    from
      challenge
    GROUP BY
      TimeSeconds, protocolCode, destPort
    ) as sunburst
    where
      sunburst.hours = '2013-04-01 16:00:00' AND sunburst.protocolCode = 'OTHER'
    group by
      sunburst.hours, sunburst.protocolCode, sunburst.destPort
    order by
      protocolCode, srcAllBytes
    DESC
    LIMIT 0,10`,
    queryTimeData: `SELECT
    DISTINCT FROM_UNIXTIME(TimeSeconds,'%Y-%m-%d %H:00:00')
    AS hours
  from
    challenge
  ORDER BY
    hours`,
    queryIp: `SELECT
	FROM_UNIXTIME(TimeSeconds,'%Y-%m-%d %H:00:00') AS hours,
	SUM(destTotalBytes) as bytes, SUM(srcPacketCount) as packets
FROM
	challenge
WHERE
	srcIp = '172.10.0.3'
GROUP BY hours`,
    getIpDetail: `SELECT
    FROM_UNIXTIME(TimeSeconds,'%Y-%m-%d %H:00:00') AS hours,
    SUM(srcTotalBytes) as bytes, SUM(srcPacketCount) as packets
  FROM
    nfChunk
  WHERE
    srcIp = ?
  GROUP BY hours`
  }
}
module.exports = sqlVisualSPark;
