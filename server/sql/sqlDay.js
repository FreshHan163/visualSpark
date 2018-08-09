// sql语句映射文件，以供api逻辑调用
// sql语句
var sqlDay = {
  // 用户
  chart: {
    queryThreeBar: 'SELECT * FROM hoursThreeBarTwo',
    querySrcIpEntropy: `SELECT
    hours,
    protocolCode,
    srcIpEntropy/(select max(srcIpEntropy) from dw_para_srcIp_entropy_hours_TwoWeek) as srcIpEntropyTotal
  FROM
  dw_para_srcIp_entropy_hours_TwoWeek
  `,
  querySrcPortEntropy: `SELECT
	hours,
	protocolCode,
	srcPortEntropy/(select max(srcPortEntropy) from dw_para_srcPort_entropy_hours_TwoWeek) as srcPortEntropyTotal
FROM
dw_para_srcPort_entropy_hours_TwoWeek
`,
  queryDestIpEntropy: `
  SELECT
	hours,
	protocolCode,
	destIpEntropy/(select max(destIpEntropy) from dw_para_destIp_entropy_hours_TwoWeek) as destIpEntropyTotal
FROM
dw_para_destIp_entropy_hours_TwoWeek
  `,
  queryDestPortEntropy: `SELECT
	hours,
	protocolCode,
	destPortEntropy/(select max(destPortEntropy) from dw_para_destPort_entropy_hours_TwoWeek) as destPortEntropyTotal
FROM
dw_para_destPort_entropy_hours_TwoWeek
`,
  queryParaTimeData: `select *
  FROM	dw_para_time_hours`,
  queryParaTotalCount: `SELECT
	hours,
	protocolCode,
	linkCount / ((select max(linkCount) from dw_para_totalLinkCount_hours_TwoWeek) ) as count
from
dw_para_totalLinkCount_hours_TwoWeek`,
  queryParaTotalBytes: `SELECT
	hours,
	protocolCode,
	totalBytes / ((select max(totalBytes) from dw_para_totalBytes_hours_TwoWeek_src) ) as bytes
from
dw_para_totalBytes_hours_TwoWeek_src`,
  queryParaTotalPackets: `SELECT
	hours,
	protocolCode,
	totalPackets / ((select max(totalPackets) from dw_para_totalPackets_hours_TwoWeek_src) ) as packets
from
dw_para_totalPackets_hours_TwoWeek_src`,
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
queryHeatSrcIp0214: `select
*
from
dw_heat_srcIp_0214
limit 0, 100`,
queryHeatSrcPort0214: `select
*
from
dw_heat_srcPort_0214
limit 0, 100`,
queryHeatDestIp0214: `select
*
from
dw_heat_destIp_0214
limit 0, 100`,
queryHeatDestPort0214: `select
*
from
dw_heat_destPort_0214
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
hours`,
querySunTcp0619: `SELECT * FROM sunTcp0619`,
querySunUdp0619: `SELECT * FROM sunUdp0619`,
querySunOther0619: `SELECT * FROM sunOther0619`,
querySrcIp0619: `select
*
from
dw_Six19_srcIp_10_7_5_5_hours
order by
hours
ASC`,
querySrcPort0619_51358: `
select
*
from
dw_Six19_srcPort_51358_hours
order by
hours
ASC`,
queryDestIp0619_17220015: `select
*
from
dw_Six19_destIp_172_20_0_15_hours
order by
hours
ASC`,
queryDestIp0619_1722003: `select
*
from
dw_Six19_destIp_172_20_0_3_hours
order by
hours
ASC`,
queryHeatSrcIpLink0214: `select
*
from
dw_pubble_srcIp_link_0214
limit 0, 100`,
queryHeatSrcPortLink0214: `select
*
from
dw_pubble_srcPort_link_0214
limit 0, 100`,
queryHeatDestIpLink0214: `select
*
from
dw_pubble_destIp_link_0214
limit 0, 100`,
queryHeatDestPortLink0214: `select
*
from
dw_pubble_destPort_link_0214
limit 0, 100`,
queryHeatDestIpActivePort0214: `select
*
from
dw_pubble_destIp_activePort_0214
limit 0, 100`,
queryHeatSrcIpActivePort0214: `select
*
from
dw_pubble_srcIp_activePort_0214
limit 0, 100`,
queryDestIp0214: `
select
	*
from
	dw_Two14_destIp_172_30_0_4_hours
order by
	hours
ASC`,
querySrcIp0214: `
select
	*
from
	dw_Two14_srcIp_10_6_6_14_hours
order by
	hours
ASC`,
queryDestPort0214_80: `
select
	*
from
	dw_Two14_destPort_80_hours
order by
	hours
ASC`
  }
}
module.exports = sqlDay;
