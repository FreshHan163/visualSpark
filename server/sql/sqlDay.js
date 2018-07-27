// sql语句映射文件，以供api逻辑调用
// sql语句
var sqlDay = {
  // 用户
  chart: {
    queryThreeBar: 'SELECT * FROM hoursThreeBar',
    querySrcIpEntropy: `SELECT
    hours,
    protocolCode,
    srcIpEntropy/(select max(srcIpEntropy) from srcIpEntropy) as srcIpEntropyTotal
  FROM
    srcIpEntropy
  `,
  querySrcPortEntropy: `SELECT
	hours,
	protocolCode,
	srcPortEntropy/(select max(srcPortEntropy) from srcPortEntropy) as srcPortEntropyTotal
FROM
	srcPortEntropy
`,
  queryDestIpEntropy: `
  SELECT
	hours,
	protocolCode,
	destIpEntropy/(select max(destIpEntropy) from destIpEntropy) as destIpEntropyTotal
FROM
	destIpEntropy
  `,
  queryDestPortEntropy: `SELECT
	hours,
	protocolCode,
	destPortEntropy/(select max(destPortEntropy) from destPortEntropy) as destPortEntropyTotal
FROM
destPortEntropy
`,
  queryParaTimeData: `select *
  FROM	paraTimeTable`,
  queryParaTotalCount: `SELECT
	hours,
	protocolCode,
	linkCount / ((select max(linkCount) from totalCount) ) as count
from
	totalCount`,
  queryParaTotalBytes: `SELECT
	hours,
	protocolCode,
	totalBytes / ((select max(totalBytes) from totalBytes) ) as bytes
from
	totalBytes`,
  queryParaTotalPackets: `SELECT
	hours,
	protocolCode,
	totalPackets / ((select max(totalPackets) from totalPackets) ) as packets
from
  totalPackets`,
  queryHeatSrcIp: `select
	*
from
	heatSrcIp0619
limit 0, 100`,
queryHeatSrcPort: `select
*
from
heatSrcPort0619
limit 0, 100`,
  queryHeatDestIp: `select
	*
from
	heatDestIp0619
limit 0, 100`,
queryHeatDestPort: `select
*
from
heatDestPort0619
limit 0, 100`,
queryHeatSrcIpLink: `select
*
from
heatSrcIpLink0619
limit 0, 100`,
queryHeatSrcPortLink: `select
*
from
heatSrcPortLink0619
limit 0, 100`,
queryHeatDestIpLink: `select
*
from
heatDestIpLink0619
limit 0, 100`,
queryHeatDestPortLink: `select
*
from
heatDestPortLink0619
limit 0, 100`,
queryHeatDestIpActivePort: `select
*
from
heatDestIpActivePort0619
limit 0, 100`,
queryHeatSrcIpActivePort: `select
*
from
heatSrcIpActivePort0619
limit 0, 100`,
querySrcIp: `SELECT
FROM_UNIXTIME(TimeSeconds,'%Y-%m-%d %H:00:00') AS hours,
COUNT(*) as linkCount,
SUM(destTotalBytes) as bytes
FROM
nfChunk
where
srcIp = '10.9.81.5'
GROUP BY
hours
order by
hours`
  }
}
module.exports = sqlDay;
