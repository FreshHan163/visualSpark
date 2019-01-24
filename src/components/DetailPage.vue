<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.detail-wrap {
  // color: white;
  height: 100%;
  background-color: #f1f1f1;
      .chart-wrap {
        // height: 400px;
            margin: 0 10px 20px 10px;
        background-color: #fff;
        border: 1px solid transparent;
        border-radius: 4px;
        -webkit-box-shadow: 0 1px 1px rgba(0,0,0,.3);
        box-shadow: 0 1px 1px rgba(0,0,0,.3);
      }
      .report-wrap {
        height: 400px;
        margin: 0 10px 20px 10px;
        background-color: #fff;
        border: 1px solid transparent;
        border-radius: 4px;
        -webkit-box-shadow: 0 1px 1px rgba(0,0,0,.3);
        box-shadow: 0 1px 1px rgba(0,0,0,.3);
        .report-list-top {
          display: inline-block;
          width: 200px;
          text-align: left;
          margin: 15px 0;
          li {
            padding: 5px 5px;
          }
          .src-ip-circle {
            list-style-type: disc;
            list-style-position: inside;
            line-height: 20px;
            font-size: 30px;
            span {
              color: black;
              vertical-align: top;
              line-height: 20px;
              font-size: 12px;
            }
          }
        }
        .report-list-top:first-of-type > .src-ip-circle{
          color: #C5473D;
        }
        .report-list-top:nth-of-type(2) > .src-ip-circle {
          color: #384B5A;
        }
        .report-list-top:nth-of-type(3) > .src-ip-circle {
          color: #7AAEB6;
        }
        .report-list-top:nth-of-type(4) > .src-ip-circle {
          color: #DD9375;
        }
      }
  // border: 1px solid green;
  .detail-row {
    .detail-col {
      // border: 1px solid white;
      width: 31%;
      margin: 10px 10px;
      box-shadow: 0 0 2px 2px inset hsla(210, 100%, 63%, 0.5);
      border-radius: 5px;
      .chart-wrap {
        // height: 400px;
        margin-bottom: 20px;
        background-color: #fff;
        border: 1px solid red;
        border-radius: 4px;
        -webkit-box-shadow: 0 1px 1px rgba(0,0,0,.05);
        box-shadow: 0 1px 1px rgba(0,0,0,.05);
      }
    }
    .detail-col:first-of-type, .detail-col:nth-of-type(2) {
      float: left;
    }
    .detail-col:nth-of-type(3) {
      float: right;
      width: 32%;
    }
  }
}
</style>
<template>
  <div class="detail-wrap">
    <Row>
      <Col span="16">
        <div class="chart-wrap">
          <heatmap-chart @transferReport="transferReport"></heatmap-chart>
        </div>
      </Col>
      <Col span="8">
        <div class="report-wrap">
          <!-- <Table :columns="srcIpColumns" :data="heatSrcIpData" width="300"></Table> -->
          <ul class="report-list-top">
            <li class="src-ip-circle"><span>源IP Top-5</span></li>
            <li v-for="(item, index) in heatSrcIpData" :key="index">
              {{item.srcIp}}：{{item.srcBytes}}
            </li>
          </ul>
          <ul class="report-list-top">
            <li class="src-ip-circle"><span>目的IP Top-5</span></li>
            <li v-for="(item, index) in heatDestIpData" :key="index">
              {{item.destIp}}：{{item.destAllBytes}}
            </li>
          </ul>
          <ul class="report-list-top">
            <li class="src-ip-circle"><span>源端口 Top-5</span></li>
            <li v-for="(item, index) in heatSrcPortData" :key="index">
              {{item.srcPort}}：{{item.srcBytes}}
            </li>
          </ul>
          <ul class="report-list-top">
            <li class="src-ip-circle"><span>目的端口 Top-5</span></li>
            <li v-for="(item, index) in heatDestPortData" :key="index">
              {{item.destPort}}：{{item.destBytes}}
            </li>
          </ul>
        </div>
      </Col>
    </Row>
    <Row>
      <Col span="16">
        <div class="chart-wrap">
          <top-chart :instances="instances"></top-chart>
        </div>
      </Col>
      <Col span="8">
        <div class="report-wrap">
          <line-chart></line-chart>
          <!-- <rose-chart></rose-chart> -->
        </div>
      </Col>
    </Row>
    <Row>
      <Col span="24">
        <div class="chart-wrap" style="height: 600px">
          <!-- <line-chart></line-chart> -->
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
import PieChart from './PieChart'
import LineChart from './lineIp0214'
// import HeatmapChart from './HeatmapChart'
import HeatmapChart from './HeatmapChart0214'
// import HeatmapSrcPort from './HeatmapSrcPort'
// import HeatmapDestIp from './HeatmapDestIp'
// import HeatmapDestPort from './HeatmapDestPort'
import ParallelChart from './ParallelChart'
import SunburstChart from './SunburstChart'
// import HeatmapCom from './HeatmapCom'
import TopChart from './topChart0214'
import RoseChart from './Rose'
// import HeatmapLinkSrcIp from './HeatmapLinkSrcIp'
// import HeatmapLinkSrcPort from './HeatmapLinkSrcPort'
// import HeatmapLinkDestIp from './HeatmapLinkDestIp'
// import HeatmapLinkDestPort from './HeatmapLinkDestPort'

export default {
  name: 'detail-page',
  data () {
    return {
      heatSrcIpLinkOption: {
        showChart: false,
        ids: 'heatmapSrcIpLink',
        title: '源IP连接数',
        seriesName: '源IP连接数'
      },
      heatSrcIpLinkData: [],
      heatSrcPortLinkOption: {
        showChart: false,
        ids: 'heatmapSrcPortLink',
        title: '源端口连接数',
        seriesName: '源端口连接数'
      },
      heatSrcPortLinkData: [],
      heatDestIpLinkOption: {
        showChart: false,
        ids: 'heatmapDestIpLink',
        title: '目的IP连接数',
        seriesName: '目的IP连接数'
      },
      heatDestIpLinkData: [],
      heatDestPortLinkOption: {
        showChart: false,
        ids: 'heatmapDestPortLink',
        title: '目的端口连接数',
        seriesName: '目的端口连接数'
      },
      heatDestPortLinkData: [],
      heatSrcIpActivePortOption: {
        showChart: false,
        ids: 'heatmapSrcIpActivePort',
        title: '源IP活跃端口数',
        seriesName: '源IP活跃端口数'
      },
      heatSrcIpActivePortData: [],
      heatDestIpActivePortOption: {
        showChart: false,
        ids: 'heatDestIpActivePort',
        title: '目的IP活跃端口数',
        seriesName: '目的IP活跃端口数'
      },
      heatDestIpActivePortData: [],
      instances: [],
      reportData: {},
      heatSrcIpData: [],
      heatSrcPortData: [],
      heatDestIpData: [],
      heatDestPortData: [],
      srcIpColumns: [
        {
            title: 'Name',
            key: 'srcIp'
        },
        {
            title: 'Name',
            key: 'srcAllBytes'
        },
      ]
    };
  },
  components: {
    PieChart,
    LineChart,
    HeatmapChart,
    ParallelChart,
    SunburstChart,
    // HeatmapSrcPort,
    // HeatmapDestIp,
    // HeatmapDestPort,
    // HeatmapCom,
    TopChart,
    RoseChart
  },
  created() {
    this.getHeatSrcIpLink();
    this.getHeatSrcPortLink();
    this.getHeatDestIpLink();
    this.getHeatDestPortLink();
    this.getHeatSrcIpActivePort();
    this.getHeatDestIpActivePort();
  },
  methods: {
    transferReport(val) {
      console.log('传回来report数据', val);
      this.reportData = val;
      this.heatSrcIpData = val.srcIp;
      this.heatSrcPortData = val.srcPort;
      this.heatDestIpData = val.destIp;
      this.heatDestPortData = val.destPort;
      console.log('排序后的srcIP', this.heatSrcIpData);
    },
    compare(prop) {
        return function (obj1, obj2) {
            var val1 = obj1.prop;
            var val2 = obj2.prop;
            if (val1 < val2) {
                return 1;
            } else if (val1 > val2) {
                return -1;
            } else {
                return 0;
            }
        }
    },
    getHeatSrcIpLink() {
      this.$http.get('/api/getHeatSrcIpLink0214').then((res) => {
        res.body.forEach((item, index) => {
          item.totalItem = item.srcIpLinkCount;
          item.dimension = item.srcIp;
          item.yAxis = 1;
          item.xAxis = index + 1;
          this.heatSrcIpLinkData.push(Object.values(item).reverse());
        });
        this.heatSrcIpLinkData = this.heatSrcIpLinkData.slice(0, 20);
        this.instances.push(this.heatSrcIpLinkData);
        console.log('热力图--srcIp数据--连接数', this.heatSrcIpLinkData);
      });
    },
    getHeatSrcPortLink() {
      this.$http.get('/api/getHeatSrcPortLink0214').then((res) => {
        res.body.forEach((item, index) => {
          item.totalItem = item.srcPortLinkCount;
          item.dimension = item.srcPort;
          item.yAxis = 2;
          item.xAxis = index + 1;
          this.heatSrcPortLinkData.push(Object.values(item).reverse());
        });
        this.heatSrcPortLinkData = this.heatSrcPortLinkData.slice(0, 20);
        this.instances.push(this.heatSrcPortLinkData);
        // console.log('热力图--srcIp数据--连接数', res.body);
        // res.body.forEach((item, index) => {
        //   item.totalItem = item.srcPortLinkCount;
        //   item.dimension = item.srcPort;
        // });
        // this.heatSrcPortLinkData = res.body;
        // this.heatSrcPortLinkOption.showChart = true;
      });
    },
    getHeatDestIpLink() {
      this.$http.get('/api/getHeatDestIpLink0214').then((res) => {
        res.body.forEach((item, index) => {
          item.totalItem = item.destIpLinkCount;
          item.dimension = item.destIp;
          item.yAxis = 3;
          item.xAxis = index + 1;
          this.heatDestIpLinkData.push(Object.values(item).reverse());
        });
        this.heatDestIpLinkData = this.heatDestIpLinkData.slice(0, 20);
        this.instances.push(this.heatDestIpLinkData);
        // console.log('热力图--srcIp数据--连接数', res.body);
        // res.body.forEach((item, index) => {
        //   item.totalItem = item.destIpLinkCount;
        //   item.dimension = item.destIp;
        // });
        // this.heatDestIpLinkData = res.body;
        // this.heatDestIpLinkOption.showChart = true;
      });
    },
    getHeatDestPortLink() {
      this.$http.get('/api/getHeatDestPortLink0214').then((res) => {
        res.body.forEach((item, index) => {
          item.totalItem = item.destPortLinkCount;
          item.dimension = item.destPort;
          item.yAxis = 4;
          item.xAxis = index + 1;
          this.heatDestPortLinkData.push(Object.values(item).reverse());
        });
        this.heatDestPortLinkData = this.heatDestPortLinkData.slice(0, 20);
        this.instances.push(this.heatDestPortLinkData);
        // console.log('热力图--srcIp数据--连接数', res.body);
        // res.body.forEach((item, index) => {
        //   item.totalItem = item.destPortLinkCount;
        //   item.dimension = item.destPort;
        // });
        // this.heatDestPortLinkData = res.body;
        // this.heatDestPortLinkOption.showChart = true;
      });
    },
    getHeatSrcIpActivePort() {
      this.$http.get('/api/getHeatSrcIpActivePort0214').then((res) => {
        res.body.forEach((item, index) => {
          item.totalItem = item.srcIpActivePort;
          item.dimension = item.srcIp;
          item.yAxis = 5;
          item.xAxis = index + 1;
          this.heatSrcIpActivePortData.push(Object.values(item).reverse());
        });
        this.heatSrcIpActivePortData = this.heatSrcIpActivePortData.slice(0, 20);
        this.instances.push(this.heatSrcIpActivePortData);
        // console.log('热力图--srcIp数据--连接数', res.body);
        // res.body.forEach((item, index) => {
        //   item.totalItem = item.srcIpActivePort;
        //   item.dimension = item.srcIp;
        // });
        // this.heatSrcIpActivePortData = res.body;
        // this.heatSrcIpActivePortOption.showChart = true;
      });
    },
    getHeatDestIpActivePort() {
      this.$http.get('/api/getHeatDestIpActivePort0214').then((res) => {
        res.body.forEach((item, index) => {
          item.totalItem = item.destIpActivePort;
          item.dimension = item.destIp;
          item.yAxis = 6;
          item.xAxis = index + 1;
          this.heatDestIpActivePortData.push(Object.values(item).reverse());
        });
        this.heatDestIpActivePortData = this.heatDestIpActivePortData.slice(0, 20);
        this.instances.push(this.heatDestIpActivePortData);
        console.log('最终气泡图数据', this.instances);
        // console.log('热力图--srcIp数据--连接数', res.body);
        // res.body.forEach((item, index) => {
        //   item.totalItem = item.destIpActivePort;
        //   item.dimension = item.destIp;
        // });
        // this.heatDestIpActivePortData = res.body;
        // this.heatDestIpActivePortOption.showChart = true;
      });
    },
  }
};
</script>
