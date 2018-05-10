<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .layout-wrap {
    height: 100%;
    color: white;
    .campus-chart {
      border: 1px solid blueviolet;
      margin: 0 auto;
    }
  }
</style>
<template>
  <div class="layout-wrap">
    <h1>展示校园地图--快速定位</h1>
    <div class="campus-chart" id="campusChart" style="width: 500px;height: 600px;"></div>
  </div>
</template>

<script>
export default {
  name: 'CampusChart',
  data () {
    return {
      msg: 'hello',
    };
  },
  created () {
    console.log('子组件_____created');
  },
  mounted () {
    console.log('子组件_____mounted');
    this.drawCampus();
    // this.drawLine();
    // this.draw3DBar();
  },
  methods: {
    drawCampus () {

    }
  }
};
</script>
