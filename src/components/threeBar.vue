<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .layout-wrap {
    height: 100%;
    // color: white;
    .three-bar-chart {
      width: 1000px;
      height: 400px;
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
              right: 10,
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
              type: 'category',
              name: '',
              axisLabel: {
                show: true,
                margin: 20,
                textStyle: {
                  color: 'white'
                },
                interval: 12,
                formatter: function (value, index) {
                    // 格式化成月/日，只在第一个刻度显示年份
                    var date = new Date(value);
                    var texts = [(date.getMonth() + 1), date.getDate()];
                    var hours = [date.getHours(), date.getMinutes()];
                    if (index === 0) {
                        // texts.unshift(date.getYear());
                    }
                    var time = texts.join('/') + ' ' + hours.join(':') + '0';
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
                  // formatter: '{c0}'
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
                        color: '#64A0B7'
                    }
                }
              }
          ]
      };
      threeBarChart.setOption(threeBarption);
    //   threeBarChart.dispatchAction({
    //     type: 'selectDataRange',
    //     // 选取 20 到 40 的值范围
    //     selected: [200000000, 4000000000],
    //     // 取消选中第二段
    //     // selected: { 1: false },
    //     // 取消选中类目 `优`
    //     // selected: { '优': false }
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
