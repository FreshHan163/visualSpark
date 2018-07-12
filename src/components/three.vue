<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .layout-wrap {
    height: 100%;
    // color: white;
    .pie-chart {
      // border: 1px solid blueviolet;
      margin: 0 auto;
      max-width: 100%;
      max-height: 100%;
    }
  }
</style>
<template>
  <div class="layout-wrap">
    <!-- <h1>饼图展示</h1> -->
    <div class="three-bar-chart" ref="threeBarChart" style="width: inherit; height: inherit;"></div>
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'threeBarChart',
  data () {
    return {
      msg: 'hello',
      instances: [],
      xData: [],
      yData: [],
      zData: []
    };
  },
  mounted () {
    this.drawThreeBar();
  },

  methods: {
    drawThreeBar () {
      let threeBarChart = echarts.init(this.$refs.threeBarChart);
      let data =[
        [
          815,
          34.05,
          351014,
          "Australia",
          1800
        ],
        [
          1314,
          39,
          645526,
          "Canada",
          1800
        ],
        [
          985,
          32,
          321675013,
          "China",
          1800
        ],
        [
          864,
          32.2,
          345043,
          "Cuba",
          1800
        ],
        [
          1244,
          36.5731262,
          977662,
          "Finland",
          1800
        ],
        [
          1803,
          33.96717024,
          29355111,
          "France",
          1800
        ],
        [
          1639,
          38.37,
          22886919,
          "Germany",
          1800
        ]
      ];
      let threeBarption = {
        grid3D: {},
        tooltip: {},
        xAxis3D: {
            type: 'category'
        },
        yAxis3D: {
            type: 'category'
        },
        zAxis3D: {},
        visualMap: {
            max: 1e8,
            dimension: 'Population'
        },
        dataset: {
            dimensions: [
                'Income',
                'Life Expectancy',
                'Population',
                'Country',
                {name: 'Year', type: 'ordinal'}
            ],
            source: data
        },
        series: [
            {
                type: 'bar3D',
                // symbolSize: symbolSize,
                shading: 'lambert',
                encode: {
                    x: 'Year',
                    y: 'Country',
                    z: 'Life Expectancy',
                    tooltip: [0, 1, 2, 3, 4]
                }
            }
        ]
      };
      threeBarChart.setOption(threeBarption);
    }
  }
};
</script>
