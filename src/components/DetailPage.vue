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
          <top-chart :instances="instances"></top-chart>
        </div>
      </Col>
      <Col span="8">
        <div class="chart-wrap">
          这里是列表显示
        </div>
      </Col>
    </Row>
    <Row>
      <Col span="6">
        <div class="chart-wrap">
          <heatmap-chart></heatmap-chart>
        </div>
      </Col>
      <Col span="6">
        <div class="chart-wrap">
          <heatmap-src-port></heatmap-src-port>
        </div>
      </Col>
      <Col span="6">
        <div class="chart-wrap">
          <heatmap-dest-ip></heatmap-dest-ip>
        </div>
      </Col>
      <Col span="6">
        <div class="chart-wrap">
          <heatmap-dest-port></heatmap-dest-port>
        </div>
      </Col>
    </Row>
    <Row>
      <Col span="24">
        <div class="chart-wrap" style="width: 1000px; height: 400px;">
          <!-- <line-chart></line-chart> -->
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
import PieChart from './PieChart'
import LineChart from './lineIp'
import HeatmapChart from './HeatmapChart'
import HeatmapSrcPort from './HeatmapSrcPort'
import HeatmapDestIp from './HeatmapDestIp'
import HeatmapDestPort from './HeatmapDestPort'
import ParallelChart from './ParallelChart'
import SunburstChart from './SunburstChart'
import HeatmapCom from './HeatmapCom'
import TopChart from './topChart'
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
      instances: []
    };
  },
  components: {
    PieChart,
    LineChart,
    HeatmapChart,
    ParallelChart,
    SunburstChart,
    HeatmapSrcPort,
    HeatmapDestIp,
    HeatmapDestPort,
    HeatmapCom,
    TopChart
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
    getHeatSrcIpLink() {
      this.$http.get('/api/getHeatSrcIpLink').then((res) => {
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
      this.$http.get('/api/getHeatSrcPortLink').then((res) => {
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
      this.$http.get('/api/getHeatDestIpLink').then((res) => {
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
      this.$http.get('/api/getHeatDestPortLink').then((res) => {
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
      this.$http.get('/api/getHeatSrcIpActivePort').then((res) => {
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
      this.$http.get('/api/getHeatDestIpActivePort').then((res) => {
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
