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
        <div class="chart-wrap">这是第一个图表</div>
      </div>
      <div class="detail-col">
        <div class="chart-wrap">这是第一个图表</div>
      </div>
      <div class="detail-col">
        <div class="chart-wrap">这是第一个图表</div>
      </div>
    </div>
    <div class="detail-row clearfix">
      <div class="detail-col">
        <div class="chart-wrap">这是第一个图表</div>
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
export default {
  name: 'detail-page',
  data () {
    return {
      msg: 'hello',
    };
  },
  created () {
    console.log('子组件_____created');
  },
  methods: {
  }
};
</script>
