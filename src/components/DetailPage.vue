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
    <div class="detail-row clearfix">
      <div class="detail-col">
        <div class="chart-wrap">
          <pie-chart></pie-chart>
        </div>
      </div>
      <div class="detail-col">
        <div class="chart-wrap">
          <heatmap-chart></heatmap-chart>
        </div>
      </div>
      <div class="detail-col">
        <div class="chart-wrap">
          <parallel-chart></parallel-chart>
        </div>
      </div>
    </div>
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
  </div>
</template>

<script>
import PieChart from './PieChart'
import HeatmapChart from './HeatmapChart'
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
    HeatmapChart,
    ParallelChart,
    SunburstChart
  },
  created () {
    console.log('子组件_____created');
  },
  methods: {
  }
};
</script>
