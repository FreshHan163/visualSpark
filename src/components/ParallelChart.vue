<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .layout-wrap {
    height: 100%;
    color: white;
    .parallel-chart {
      // border: 1px solid blueviolet;
      margin: 0 auto;
      max-width: 100%;
      max-height: 100%;
    }
  }
</style>
<template>
  <div class="layout-wrap">
    <div class="parallel-chart" id="parallelChart" style="width: 1000px;height: 400px;"></div>
  </div>
</template>

<script>
export default {
  name: 'ParallelChart',
  data () {
    return {
      msg: 'hello',
      instances: [],
      timeData: [],
      codeTypeData: [
        'TCP',
        'UDP',
        'OTHER'
      ]
    };
  },

  mounted () {
    // this.getParaDestPortData();
    // this.getParaAllDestPort();
    this.getTimeData();
  },
  methods: {
    getTimeData() {
      this.$http.get('/api/getTimeData').then((res) => {
        res.body.forEach((item) => {
          this.timeData = this.timeData.concat(Object.values(item));
        });
        console.log('处理后的数组timeData', this.timeData);
      }).then(() => {
        this.getParaDestPortData();
      });
    },
    getParaDestPortData() {
      this.$http.get('/api/getParaSrcIp').then((res) => {
        console.log('平行坐标图----DestPort数据', res.body);
        res.body.forEach((item) => {
          this.instances.push(Object.values(item));
        });
        console.log('处理后的数组instances', this.instances);
      }).then(() => {
        this.drawParallel();
      });
    },
    drawParallel () {
      let parallelChart = this.$echarts.init(document.getElementById('parallelChart'));
      var dataBJ = [
          [1,55,9,56,0.46,18,6,"良"],
          [2,25,11,21,0.65,34,9,"优"],
          [3,56,7,63,0.3,14,5,"良"],
          [4,33,7,29,0.33,16,6,"优"],
          [5,42,24,44,0.76,40,16,"优"],
          [6,82,58,90,1.77,68,33,"良"],
          [7,74,49,77,1.46,48,27,"良"],
          [8,78,55,80,1.29,59,29,"良"],
          [9,267,216,280,4.8,108,64,"重度污染"],
          [10,185,127,216,2.52,61,27,"中度污染"],
          [11,39,19,38,0.57,31,15,"优"],
          [12,41,11,40,0.43,21,7,"优"],
          [13,64,38,74,1.04,46,22,"良"],
          [14,108,79,120,1.7,75,41,"轻度污染"],
          [15,108,63,116,1.48,44,26,"轻度污染"],
          [16,33,6,29,0.34,13,5,"优"],
          [17,94,66,110,1.54,62,31,"良"],
          [18,186,142,192,3.88,93,79,"中度污染"],
          [19,57,31,54,0.96,32,14,"良"],
          [20,22,8,17,0.48,23,10,"优"],
          [21,39,15,36,0.61,29,13,"优"],
          [22,94,69,114,2.08,73,39,"良"],
          [23,99,73,110,2.43,76,48,"良"],
          [24,31,12,30,0.5,32,16,"优"],
          [25,42,27,43,1,53,22,"优"],
          [26,154,117,157,3.05,92,58,"中度污染"],
          [27,234,185,230,4.09,123,69,"重度污染"],
          [28,160,120,186,2.77,91,50,"中度污染"],
          [29,134,96,165,2.76,83,41,"轻度污染"],
          [30,52,24,60,1.03,50,21,"良"],
          [31,46,5,49,0.28,10,6,"优"]
      ];

      var schema = [
          {name: 'date', index: 0, text: '日期'},
          {name: 'AQIindex', index: 1, text: '连接数'},
          {name: 'PM25', index: 2, text: '字节数'},
          {name: 'PM10', index: 3, text: '源端口熵'},
          {name: 'CO', index: 4, text: ' 源IP熵'},
          {name: 'NO2', index: 5, text: '目的端口熵'},
          {name: 'SO2', index: 6, text: '目的IP熵'},
          {name: '等级', index: 7, text: '等级'}
      ];
      var srcIpEntropy = [
        {name: 'time', index: 0, text: '时间'},
        {name: 'codeType', index: 1, text: '协议类型'},
        {name: 'srcIp', index: 2, text: '源IP熵'}
      ];

      var lineStyle = {
          normal: {
              width: 1,
              opacity: 0.5
          }
      };

      let parallelOption = {
          // backgroundColor: '#333',
          // legend: {
          //     bottom: 30,
          //     data: ['北京', '上海', '广州'],
          //     itemGap: 20,
          //     textStyle: {
          //         color: 'black',
          //         fontSize: 14
          //     }
          // },
          tooltip: {
              triggerOn: 'mousemove',
              padding: 10,
              backgroundColor: '#222',
              borderColor: '#777',
              borderWidth: 1,
              // formatter: function (obj) {
              //     var value = obj[0].value;
              //     return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
              //         + obj[0].seriesName + ' ' + value[0] + '日期：'
              //         + value[7]
              //         + '</div>'
              //         + schema[1].text + '：' + value[1] + '<br>'
              //         + schema[2].text + '：' + value[2] + '<br>'
              //         + schema[3].text + '：' + value[3] + '<br>'
              //         + schema[4].text + '：' + value[4] + '<br>'
              //         + schema[5].text + '：' + value[5] + '<br>'
              //         + schema[6].text + '：' + value[6] + '<br>';
              // }
          },
          // dataZoom: {
          //     show: true,
          //     orient: 'vertical',
          //     parallelAxisIndex: [0]
          // },
          parallelAxis: [
            {dim: 0, name: srcIpEntropy[0].text, type: 'category', data: this.timeData},
            {dim: 1, name: srcIpEntropy[1].text, type: 'category', data: ['UDP', 'TCP', 'OTHER']},
            {dim: 2, name: srcIpEntropy[2].text},
              // {dim: 0, name: schema[0].text, inverse: true, max: 31, nameLocation: 'start'},
              // {dim: 1, name: schema[1].text},
              // {dim: 2, name: schema[2].text},
              // {dim: 3, name: schema[3].text},
              // {dim: 4, name: schema[4].text},
              // {dim: 5, name: schema[5].text},
              // {dim: 6, name: schema[6].text},
              // {dim: 7, name: schema[7].text,
              // type: 'category', data: ['优', '良', '正常', '0.8', '0.9', '1']}
          ],
          visualMap: {
              show: false,
              min: 0,
              max: 8,
              dimension: 2,
              inRange: {
                  color: ['green','blue','#50a3ba'].reverse(),
              }
          },
          parallel: {
              left: '5%',
              right: '18%',
              bottom: 100,
              parallelAxisDefault: {
                  type: 'value',
                  name: 'AQI指数',
                  nameLocation: 'end',
                  nameGap: 20,
                  nameTextStyle: {
                      color: 'black',
                      fontSize: 12
                  },
                  axisLine: {
                      lineStyle: {
                          color: '#aaa'
                      }
                  },
                  axisTick: {
                      lineStyle: {
                          color: '#777'
                      }
                  },
                  splitLine: {
                      show: false
                  },
                  axisLabel: {
                      textStyle: {
                          color: 'black'
                      }
                  }
              }
          },
          series: [
              {
                  name: '北京',
                  type: 'parallel',
                  lineStyle: lineStyle,
                  data: this.instances
              }
          ]
      };
      parallelChart.setOption(parallelOption);
    }
  }
};
</script>
