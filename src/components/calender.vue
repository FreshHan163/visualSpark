<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .layout-wrap {
    height: 100%;
    color: white;
    .heatmap-chart {
      // border: 1px solid blueviolet;
      margin: 0 auto;
      max-width: 100%;
      max-height: 100%;
    }
  }
</style>
<template>
  <div class="layout-wrap">
    <div class="heatmap-chart" id="heatmapChart" style="width: 600px;height: 280px;"></div>
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'HeatmapChart',
  data () {
    return {
      msg: 'hello',
      instances: []
    };
  },
  mounted () {
    // this.getHeatmapData();
        this.drawHeatmap();
  },
  methods: {
    getHeatmapData() {
      this.$http.get('/api/getHeatSrcIp').then((res) => {
        console.log('热力图--srcIp数据', res.body);
        this.instances = res.body;
      }).then(() => {
        this.drawHeatmap();
      });
    },
    drawHeatmap () {
      console.log(this.instances);
      // let instances = this.instances.slice(0, 20);
      // let data = [];
      // for (let i=0; i< 10; i++) {
      //     for (let j=0; j < 2; j++) {
      //       let arr = [];
      //       arr.push(i);
      //       arr.push(j);
      //       data.push(arr);
      //     }
      //   }
      //   instances.forEach((item, index) => {
      //     // data[index].push(item.srcIp);
      //     data[index].push(item.srcAllBytes);
      //   });
      //   console.log('新data', data);
      let heatmapChart = echarts.init(document.getElementById('heatmapChart'));
      // app.title = '端口流量分布图';

      var xData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      var yData = [0, 1];
      function getVirtulData(year) {
    year = year || '2017';
    var date = +echarts.number.parseDate(year + '-01-01');
    var end = +echarts.number.parseDate((+year + 1) + '-01-01');
    var dayTime = 3600 * 24 * 1000;
    var data = [];
    for (var time = date; time < end; time += dayTime) {
        data.push([
            echarts.format.formatTime('yyyy-MM-dd', time),
            Math.floor(Math.random() * 1000)
        ]);
    }
    console.log(data[data.length - 1]);
    return data;
}



var graphData = [
    [
        1485878400000,
        260
    ],
    [
        1486137600000,
        200
    ],
    [
        1486569600000,
        279
    ],
    [
        1486915200000,
        847
    ],
    [
        1487347200000,
        241
    ],
    [
        1487779200000,
        411
    ],
    [
        1488124800000,
        985
    ]
];

var links = graphData.map(function (item, idx) {
    return {
        source: idx,
        target: idx + 1
    };
});
links.pop();
console.log(getVirtulData(2017));
      let heatmapOption = {
          tooltip: {
              position: 'top'
          },
          visualMap: [{
              min: 0,
              max: 1000,
              calculable: true,
              seriesIndex: [1, 2, 3],
              orient: 'horizontal',
              left: '55%',
              bottom: 10
          }, {
              min: 0,
              max: 1000,
              // inRange: {
              //     color: ['grey'],
              //     opacity: [0, 0.3]
              // },
              // controller: {
              //     inRange: {
              //         opacity: [0.3, 0.6]
              //     },
              //     outOfRange: {
              //         color: '#ccc'
              //     }
              // },
              calculable: true,
              seriesIndex: [0],
              orient: 'horizontal',
              left: '10%',
              bottom: 10
          }],

          calendar: [
          {
              orient: 'vertical',
              yearLabel: {
                  // margin: 40,
                  show: false
              },
              monthLabel: {
                  nameMap: 'cn',
                  // margin: 20,
                  show: false
              },
              dayLabel: {
                  nameMap: 'cn',
                  show: false,
                  firstDay: 1
              },
              cellSize: 25,
              // range: ['2017-04-03', '2017-04-22'],
          },
          {
              orient: 'vertical',
              yearLabel: {
                  margin: 10,
                  show: false
              },
              monthLabel: {
                  margin: 20,
                  show: false
              },
              dayLabel: {
                  firstDay: 1,
                  show: false,
              },
              cellSize: 25,
              left: 300,
              range: ['2017-04-03', '2017-04-22'],
          },
          {
              orient: 'vertical',
              yearLabel: {
                  margin: 40,
                  show: false
              },
              monthLabel: {
                  margin: 20,
                  show: false
              },
              dayLabel: {
                  firstDay: 1,
                  show: false,
              },
              cellSize: 25,
              top: 170,
              range: ['2017-04-03', '2017-04-22'],
          },
          {
              orient: 'vertical',
              yearLabel: {
                  margin: 40,
                  show: false,
              },
              dayLabel: {
                  firstDay: 1,
                  show: false,
              },
              monthLabel: {
                  nameMap: 'cn',
                  margin: 20,
                  show: false
              },
              cellSize: 25,
              top: 170,
              left: 300,
              range: ['2017-04-03', '2017-04-22'],
          }],
          series: [
          //   {
          //     type: 'effectScatter',
          //     coordinateSystem: 'calendar',
          //     calendarIndex: 0,
          //     symbolSize: function (val) {
          //         return val[1] / 40;
          //     },
          //     data: getVirtulData(2017)
          // },
           {
              type: 'heatmap',
              coordinateSystem: 'calendar',
              calendarIndex: 0,
              data: getVirtulData(2017)
          },
          {
              type: 'heatmap',
              coordinateSystem: 'calendar',
              calendarIndex: 1,
              data: getVirtulData(2017)
          },
          // {
          //     type: 'effectScatter',
          //     coordinateSystem: 'calendar',
          //     calendarIndex: 2,
          //     symbolSize: function (val) {
          //         return val[1] / 40;
          //     },
          //     data: getVirtulData(2017)
          // },
          {
              type: 'heatmap',
              coordinateSystem: 'calendar',
              calendarIndex: 2,
              data: getVirtulData(2017)
          },
           {
              type: 'heatmap',
              coordinateSystem: 'calendar',
              calendarIndex: 3,
              data: getVirtulData(2017)
          }
          ]
      };
        heatmapChart.setOption(heatmapOption);
    }
  }
};
</script>
