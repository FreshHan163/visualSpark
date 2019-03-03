<template>
  <div class="detail-wrap">
    <!-- 时间序列图 -->
    <Row>
      <Col span="16" style="height: 400px">
        <panel :width="800" :height="400" titleIcon="ddd">
          <span slot="header">实时气泡图</span>
          <div slot="body">
            <line-chart />
          </div>
        </panel>
        <!-- <div class="chart-wrap">
          <line-chart />
        </div> -->
      </Col>
      <Col span="8">
        <panel :width="420" :height="400">
          <div slot="body">
            <Control />
            <!-- <line-chart /> -->
          </div>
        </panel>
        <!-- <div class="report-wrap">
            <Control />
        </div> -->
      </Col>
    </Row>
    <!-- 热力图 -->
    <Row>
      <Col span="16">
        <panel :width="800" :height="440" titleIcon="ddd">
          <span slot="header">实时流量图</span>
          <div slot="body">
            <heatmap-chart @transferReport="transferReport"></heatmap-chart>
          </div>
        </panel>
        <!-- <div class="chart-wrap">
          <heatmap-chart @transferReport="transferReport"></heatmap-chart>
        </div> -->
      </Col>
      <Col span="8">
        <heatmap-table :heatSrcIpData="heatSrcIpData"
          :heatDestIpData="heatDestIpData"
          :heatSrcPortData="heatSrcPortData"
          :heatDestPortData="heatDestPortData"/>
      </Col>
    </Row>
    <!-- 气泡图 -->
    <Row>
      <Col span="16">
        <panel :width="800" :height="400" titleIcon="ddd">
          <span slot="header">实时气泡图</span>
          <div slot="body">
            <bubble :instances="instances" :intervalFlag="intervalFlag"></bubble>
          </div>
        </panel>
        <!-- <div class="chart-wrap">
          <bubble :instances="instances" :intervalFlag="intervalFlag"></bubble>
        </div> -->
      </Col>
      <Col span="8">
        <div class="report-wrap">
          这里是气泡图的数据
        </div>
      </Col>
    </Row>
  </div>
</template>
<script>
import HeatmapChart from './HeatmapChart'
import HeatmapTable from './HeatmapTable'
import ParallelChart from '../ParallelChart'
import SunburstChart from '../SunburstChart'
import Bubble from './Bubble'
import Control from './control.vue'
import LineChart from './Line'
import Panel from '@/components/Panel'

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
      instances: {}, // 气泡图的整体数据
      intervalFlag: {}, // 气泡大小的设置
      reportData: {},
      heatSrcIpData: [], // 热力图表格
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
    HeatmapChart,
    HeatmapTable,
    ParallelChart,
    SunburstChart,
    Control,
    Bubble,
    LineChart,
    Panel
  },
  created() {
    this.getBubbleSrcIpLink();
    this.getBubbleSrcPortLink();
    this.getBubbleDestIpLink();
    this.getBubbleDestPortLink();
    this.getBubbleSrcIpActivePort();
    this.getBubbleDestIpActivePort();
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
    getBubbleSrcIpLink() {
      this.axios.get('/api/getBubbleSrcIpLink',
        {params: {
            hours: '2013-04-10 15:00:00'
          }})
      .then((res) => {
        let bubbleData = res.data.slice(0, 20);
        bubbleData.forEach((item, index) => {
          item.totalItem = item.srcIpLink;
          item.dimension = item.srcIp;
          item.yAxis = 1;
          item.xAxis = index + 1;
          this.heatSrcIpLinkData.push(Object.values(item).reverse());
          // this.heatSrcIpLinkData.push(item);
        });
        // this.instances.push(this.heatSrcIpLinkData);
        this.instances = Object.assign(this.instances, {srcIpLink: this.heatSrcIpLinkData});

        // 气泡图大小间隔自动调节
        let interval = (bubbleData[0].totalItem / 40).toFixed();
        this.intervalFlag = Object.assign({}, this.intervalFlag, {srcIpLinkInterval: interval});
      });
    },
    getBubbleSrcPortLink() {
      this.axios.get('/api/getBubbleSrcPortLink',
      {params: {
          hours: '2013-04-10 15:00:00'
        }})
      .then((res) => {
        let bubbleData = res.data.slice(0, 20);
        bubbleData.forEach((item, index) => {
          item.totalItem = item.srcPortLink;
          item.dimension = item.srcPort;
          item.yAxis = 2;
          item.xAxis = index + 1;
          this.heatSrcPortLinkData.push(Object.values(item).reverse());
        });
        // this.instances.push(this.heatSrcPortLinkData);
        this.instances = Object.assign(this.instances, {srcPortLink: this.heatSrcPortLinkData});

        // 气泡图大小间隔自动调节
        let interval = (bubbleData[0].totalItem / 40).toFixed();
        this.intervalFlag = Object.assign({}, this.intervalFlag, {srcPortLinkInterval: interval});
      });
    },
    getBubbleDestIpLink() {
      this.axios.get('/api/getBubbleDestIpLink',
      {params: {
          hours: '2013-04-10 15:00:00'
        }})
      .then((res) => {
        let bubbleData = res.data.slice(0, 20);
        bubbleData.forEach((item, index) => {
          item.totalItem = item.destIpLink;
          item.dimension = item.destIp;
          item.yAxis = 3;
          item.xAxis = index + 1;
          this.heatDestIpLinkData.push(Object.values(item).reverse());
        });
        // this.instances.push(this.heatDestIpLinkData);
        this.instances = Object.assign(this.instances, {destIpLink: this.heatDestIpLinkData});

        // 气泡图大小间隔自动调节
        let interval = (bubbleData[0].destIpLink / 40).toFixed();
        this.intervalFlag = Object.assign({}, this.intervalFlag, {destIpLinkInterval: interval});
      });
    },
    getBubbleDestPortLink() {
      this.axios.get('/api/getBubbleDestPortLink',
      {params: {
          hours: '2013-04-10 15:00:00'
        }})
      .then((res) => {
        let bubbleData = res.data.slice(0, 20);
        bubbleData.forEach((item, index) => {
          item.totalItem = item.destPortLink;
          item.dimension = item.destPort;
          item.yAxis = 4;
          item.xAxis = index + 1;
          this.heatDestPortLinkData.push(Object.values(item).reverse());
        });
        // this.instances.push(this.heatDestPortLinkData);
        this.instances = Object.assign(this.instances, {destPortLink: this.heatDestPortLinkData});

        // 气泡图大小间隔自动调节
        let interval = (bubbleData[0].totalItem / 40).toFixed();
        this.intervalFlag = Object.assign({}, this.intervalFlag, {destPortLinkInterval: interval});
      });
    },
    getBubbleSrcIpActivePort() {
      this.axios.get('/api/getBubbleSrcIpPort',
      {params: {
          hours: '2013-04-10 15:00:00'
        }})
      .then((res) => {
        res.data.forEach((item, index) => {
          item.totalItem = item.activePort;
          item.dimension = item.srcIp;
          item.yAxis = 5;
          item.xAxis = index + 1;
          this.heatSrcIpActivePortData.push(Object.values(item).reverse());
        });
        this.heatSrcIpActivePortData = this.heatSrcIpActivePortData.slice(0, 20);
        // this.instances.push(this.heatSrcIpActivePortData);
        this.instances = Object.assign(this.instances, {srcIpActivePort: this.heatSrcIpActivePortData});

        // 气泡图大小间隔自动调节
        let interval = (res.data[0].activePort / 40).toFixed();
        this.intervalFlag = Object.assign({}, this.intervalFlag, {srcIpPortInterval: interval});
      });
    },
    getBubbleDestIpActivePort() {
      this.axios.get('/api/getBubbleDestIpPort',
      {params: {
          hours: '2013-04-10 15:00:00'
        }})
      .then((res) => {
        res.data.forEach((item, index) => {
          item.totalItem = item.activePort;
          item.dimension = item.destIp;
          item.yAxis = 6;
          item.xAxis = index + 1;
          this.heatDestIpActivePortData.push(Object.values(item).reverse());
        });
        this.heatDestIpActivePortData = this.heatDestIpActivePortData.slice(0, 20);
        // this.instances.push(this.heatDestIpActivePortData);
        this.instances = Object.assign(this.instances, {destIpActivePort: this.heatDestIpActivePortData});

        // 气泡图大小间隔自动调节
        let interval = (res.data[0].activePort / 40).toFixed();
        this.intervalFlag = Object.assign({}, this.intervalFlag, {destIpPortInterval: interval});
      });
    },
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.detail-wrap {
  // color: white;
    position: relative;
    top: 80px;
    height: 100%;
    padding-top: 40px;
    // background-color: #f1f1f1;
    background-color: #001832;
      .chart-wrap {
        // height: 400px;
        margin: 20px 10px;
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


