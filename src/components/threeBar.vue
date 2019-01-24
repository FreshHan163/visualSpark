<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .layout-wrap {
    height: 100%;
    width: 100%;
    // color: white;
    .three-bar-chart {
      width: 1300px;
      height: 300px;
      margin: 0 auto;
    }
  }
</style>
<template>
  <div class="layout-wrap">
    <!-- <h1>饼图展示</h1> -->
    <div class="three-bar-chart" ref="threeBarChart" style=""></div>
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
      this.$http.get('/api/getThreeBar').then((res) => {
        let index = 0;
        console.log('输出的数据为',res.body);
        // 数组取最早时间、最晚时间，然后划分时间段？
        this.xData = ['2018-04-01', '2018-04-02', '2018-04-03', '2018-04-04', '2018-04-05', '2018-04-06', '2018-04-07', ]
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
      // 数据 days代表x轴，days代表y轴,data，代表z轴--值，都是数组类型
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
          tooltip: {
            formatter: function (params) {
              return params.seriesName + '<br/>' + params.data;
            }
          },
          visualMap: {
              // max: 190000000,
              max: 4300000000,
              min: 0,
              type: 'piecewise',
              right: 100,
              bottom: 10,
              dimension: 'srcAllBytes',
              inRange: {
                  // color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                  color: ['#d94e5d','#eac736','#50a3ba'].reverse(),
              },
          },
          xAxis3D: {
              type: 'category',
              name: '',
              axisLabel: {
                show: true,
                margin: 5,
                textStyle: {
                  color: 'white'
                },
                interval: 12,
                formatter: function (value, index) {
                    // 格式化成月/日，小时:分钟
                    var date = new Date(value);
                    var days = [(date.getMonth() + 1), date.getDate()];
                    var hours = [date.getHours(), date.getMinutes()];
                    var time = '';
                      time = days.join('/') + '\n' + hours.join(':') + '0';
                    return time;
                }
              }
          },
          yAxis3D: {
              name: '',
              type: 'category',
              axisLabel: {
                show: true,
                textStyle: {
                  color: 'white'
                }
              }
          },
          zAxis3D: {
              type: 'value',
              name: '总流量',
              nameTextStyle: {
                color: 'white'
              },
              axisLabel: {
                formatter: function(value, index) {
                  return value / 1000000000 + 'TB';
                },
                textStyle: {
                  color: 'white'
                }
              },
              nameLocation: 'end',
              // min: 0,
              // max: 2000000
          },
          grid3D: {
              boxWidth: 400,
              boxDepth: 80,
              left: -100,
              top: 0,
              // boxWidth: 200,
              // boxDepth: 80,
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
              },
              axisPointer: {
                show: true,
                lineStyle: {
                  color: 'red',
                  width: 2,
                  type: 'dashed'
                }
              }
          },
          dataset: {
            dimensions: [
              'days',
              'protocolCode',
              'srcAllBytes'
            ],
            source: data
          },
          series: [
              {
                type: 'bar3D',
                name: '流量时序图',
                // symbolSize: symbolSize,
                shading: 'lambert',
                encode: {
                    x: 'days',
                    y: 'protocolCode',
                    z: 'srcAllBytes',
                    tooltip: [0, 1, 2],
                    label: 2
                },
                label: {
                  formatter: function (params) {
                    return params.data[2];
                  }
                },
                itemStyle: {
                    // opacity: 0.4
                },
                emphasis: {
                    label: {
                        textStyle: {
                            fontSize: 20,
                            color: '#64A0B7'
                        }
                    },
                    itemStyle: {
                        color: 'green',
                        shadowBlur: 200,
                        opacity: 0.3,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowOffsetX: 3,
                        shadowOffsetY: 3,
                    }
                }
              }
          ]
      };
      threeBarChart.setOption(threeBarption);
      // threeBarChart.dispatchAction({
        type: 'selectDataRange',
        // 选取 20 到 40 的值范围
        // selected: [3000000000, 40000000000],
        // 取消选中第二段
        // selected: { 1: false },
        // 取消选中类目 `优`
        // selected: { '优': false }
    // });
      threeBarChart.on('mouseover', function (parmas) {
        console.log(parmas);
          // $.get('detail?q=' + params.name, function (detail) {
          //     myChart.setOption({
          //         series: [{
          //             name: 'pie',
          //             // 通过饼图表现单个柱子中的数据分布
          //             data: [detail.data]
          //         }]
          //     });
          // });
      });
    }
  }
};
</script>
