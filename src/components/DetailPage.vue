<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.detail-wrap {
  // color: white;
  height: 100%;
  // border: 1px solid green;
  .detail-row {
    .detail-col {
      // border: 1px solid white;
      width: 31%;
      margin: 10px 10px;
      box-shadow: 0 0 2px 2px inset hsla(210, 100%, 63%, 0.5);
      border-radius: 5px;
      .chart-wrap {
        height: 400px;
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
      <Col span="24">
        <div class="chart-wrap" style="width: 1000px; height: 400px;">
          <parallel-chart></parallel-chart>
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
          <line-chart></line-chart>
        </div>
      </Col>
    </Row>
    <!-- <div class="detail-row clearfix"> -->
      <!-- <div class="detail-col">
        <div class="chart-wrap">
          <pie-chart></pie-chart>
        </div>
      </div> -->
      <!-- <div class="detail-col">
        <div class="chart-wrap">
          <heatmap-chart></heatmap-chart>
        </div>
      </div>
      <div class="detail-col">
        <div class="chart-wrap">
          <heatmap-chart></heatmap-chart>
        </div>
      </div>
      <div class="detail-col">
        <div class="chart-wrap">
          <heatmap-chart></heatmap-chart>
        </div>
      </div>
      <div class="detail-col">
        <div class="chart-wrap">
          <heatmap-chart></heatmap-chart>
        </div>
      </div> -->
      <!-- <div class="detail-col">
        <div class="chart-wrap" style="width: 1000px; height: 400px;">
          <parallel-chart></parallel-chart>
        </div>
      </div> -->
    <!-- </div>
    <div class="detail-row clearfix">
      <div class="detail-col">
        <div class="chart-wrap">
          <sunburst-chart></sunburst-chart>
        </div>
      </div>
      <div class="detail-col">
        <div class="chart-wrap">这是第一个图表</div>
      </div>
      <div class="detail-col">
        <div class="chart-wrap">这是第一个图表</div>
      </div>
    </div>
    <div class="detail-col">
      <div class="chart-wrap" style="width: 1000px; height: 400px;">
        <parallel-chart></parallel-chart>
      </div>
    </div> -->
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

export default {
  name: 'detail-page',
  data () {
    return {
      msg: 'hello',
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
  },
  methods: {
  }
};
</script>
