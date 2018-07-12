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
    this.getBarData();
  },

  methods: {
    getBarData() {
      this.$http.get('/api/getVisual').then((res) => {
        let index = 0;
        console.log('输出的数据为',res.body);
        // 数组取最早时间、最晚时间，然后划分时间段？
        this.xData = ['2018-04-02 14:00:00', '2018-04-02 13:00:00', '2018-04-02 12:00:00', '2018-04-02 11:00:00', '2018-04-02 10:00:00',
                      '2018-04-02 09:00:00', '2018-04-02 08:00:00', '2018-04-02 07:00:00', '2018-04-02 06:00:00', '2018-04-02 05:00:00',
                      '2018-04-02 04:00:00', '2018-04-02 03:00:00', '2018-04-02 02:00:00', '2018-04-02 01:00:00', '2018-04-02 00:00:00',
                      '2018-04-01 23:00:00', '2018-04-01 22:00:00', '2018-04-01 21:00:00', '2018-04-01 20:00:00', '2018-04-01 19:00:00',
                      '2018-04-01 18:00:00', '2018-04-01 17:00:00', '2018-04-01 16:00:00', '2018-04-01 15:00:00', '2018-04-01 14:00:00'];
        this.yData = ['TCP', 'UDP', 'OTHER'];
        let xlen = this.xData.length;
        let ylen = this.yData.length;
        const det = 0;
        // ylen对应y轴，[0, i, 0]
        for (let i=0; i< xlen; i++) {
          // xlen对应x轴, [j, 0, 0]
          for (let j=0; j < ylen; j++) {
            let xyLevel = [];
            xyLevel.push(j);
            xyLevel.push(i);
            this.zData.push(xyLevel);
          }
        }
        console.log('x轴的目录是：', this.xData);
        console.log('y轴的目录是', this.yData);
        console.log('z轴的拼接数据是：', this.zData);
        this.instances = res.body;
      }).then(() => {
        this.drawThreeBar();
      });
    },
    handleData() {
      let xData = [];
      let yData = [];
      let data = [];
    },
    drawThreeBar () {
      let threeBarChart = echarts.init(this.$refs.threeBarChart);
      // 数据 hours代表x轴，days代表y轴,data，代表z轴--值，都是数组类型
      // 替换 x--时间，y轴协议类型，z轴当前流量（入流量还是出流量？？？）
      console.log('创建三维柱状图！');
      let data = [];
      this.instances.forEach(item => {
        let arr = [];
        for (let i in item) {
          arr.push(item[i]);
        }
        data.push(arr);
      });
      // dataset = this.instances;
      console.log(data);
      let threeBarption = {
          tooltip: {},
          visualMap: {
              max: 2000000,
              min: 0,
              left: 10,
              bottom: 10,
              dimension: 'srcAllBytes',
              inRange: {
                  color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
              },
              // 超出最大值以后的特殊显示
              // outOfRange: {
              //     color: ['#121122', 'rgba(3,4,5,0.4)', 'red'],
              //     symbolSize: [30, 100]
              // }
          },
          xAxis3D: {
              type: 'category'
          },
          yAxis3D: {
              type: 'category'
          },
          zAxis3D: {
              type: 'value',
              name: '总流量',
              nameTextStyle: {
                verticalAlign: 'bottom',
              },
              nameLocation: 'end',
              min: 0,
              max: 2000000
          },
          grid3D: {
              boxWidth: 400,
              boxDepth: 80,
              left: -100,
              top: 0,
              viewControl: {
                  // projection: 'orthographic'
                  distance: 320,
              },
              light: {
                  main: {
                      intensity: 1.2,
                      shadow: true
                  },
                  ambient: {
                      intensity: 0.3
                  }
              }
          },
          dataset: {
            dimensions: [
              'srcAllBytes',
              'protocolCode',
              'hours'
            ],
            source: data
          },
          series: [
              {
                type: 'bar3D',
                // symbolSize: symbolSize,
                shading: 'lambert',
                encode: {
                    x: 'hours',
                    y: 'protocolCode',
                    z: 'srcAllBytes',
                    tooltip: [0, 1, 2]
                },
                itemStyle: {
                    opacity: 0.4
                },
                emphasis: {
                    label: {
                        textStyle: {
                            fontSize: 20,
                            color: '#900'
                        }
                    },
                    itemStyle: {
                        color: '#900'
                    }
                }
              }
          ]
      };
      threeBarChart.setOption(threeBarption);
    }
  }
};
</script>
