<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .layout-wrap {
    height: 100%;
    color: white;
    .top-chart {
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
    <div class="top-chart" ref="topChart" style="width: 850px;height: 400px;"></div>
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'TopChart',
  props: ['instances'],
  data () {
    return {
      msg: 'hello'
    };
  },
  mounted () {
    this.drawBubble();
  },
  methods: {
    drawBubble() {
      let topChart = echarts.init(this.$refs.topChart);
      var data = this.instances;
      console.log('气泡图', data);
      let topOption = {
          title: {
              text: 'Top-20气泡图',
              left: 'center'
          },
          dataset: {
            source: this.instances
          },
          legend: {
              left: 50,
              bottom: 10,
              // data: ['TCP', 'UDP', 'OTHER', 'TCP', 'UDP', 'OTHER'],
          },
          tooltip: {
              trigger: 'axis',
              showContent: false,
              axisPointer: {
                  type: 'cross',
                  label: {
                    show: false
                  }
              }
          },
          grid: {
            left: 120
          },
          xAxis: {
            type: 'value',
              splitLine: {
                  lineStyle: {
                      type: 'dashed'
                  }
              }
          },
          yAxis: {
            type: 'value',
            min: 0,
            gridIndex: 0,
              splitLine: {
                  lineStyle: {
                      type: 'dashed'
                  }
              },
              scale: true,
              axisLabel: {
                formatter: function(param) {
                  var text = '';
                  switch(param) {
                    case 1:
                      text = '源IP连接数';
                      break;
                    case 2:
                      text = '源端口连接数';
                      break;
                    case 3:
                      text = '目的IP连接数';
                      break;
                    case 4:
                      text = '目的端口连接数';
                      break;
                    case 5:
                      text = '源IP活跃端口数';
                      break;
                    case 6:
                      text = '目的IP活跃端口数';
                      break;
                  }
                  return text;
                }
              }
          },
          visualMap: [{
              show: false,
              seriesIndex: 0,
              dimension: 3, // 指向第三列（列序号从 0 开始记，所以设置为 2）。
              min: 0, // 需要给出数值范围，最小数值。
              max: 10000, // 需要给出数值范围，最大数值。
              inRange: {
                  // 气泡尺寸：5 像素到 60 像素。
                  symbolSize: [5, 30]
              }
          },{
              show: false,
              seriesIndex: 1,
              dimension: 3, // 指向第三列（列序号从 0 开始记，所以设置为 2）。
              min: 0, // 需要给出数值范围，最小数值。
              max: 10000, // 需要给出数值范围，最大数值。
              inRange: {
                  // 气泡尺寸：5 像素到 60 像素。
                  symbolSize: [5, 30]
              }
          },{
              show: false,
              seriesIndex: 2,
              dimension: 3, // 指向第三列（列序号从 0 开始记，所以设置为 2）。
              min: 0, // 需要给出数值范围，最小数值。
              max: 10000, // 需要给出数值范围，最大数值。
              inRange: {
                  // 气泡尺寸：5 像素到 60 像素。
                  symbolSize: [5, 30]
              }
          },{
              show: false,
              seriesIndex: 3,
              dimension: 3, // 指向第三列（列序号从 0 开始记，所以设置为 2）。
              min: 0, // 需要给出数值范围，最小数值。
              max: 10000, // 需要给出数值范围，最大数值。
              inRange: {
                  // 气泡尺寸：5 像素到 60 像素。
                  symbolSize: [5, 30]
              }
          },
          {
              show: false,
              seriesIndex: 4,
              dimension: 3, // 指向第三列（列序号从 0 开始记，所以设置为 2）。
              min: 0, // 需要给出数值范围，最小数值。
              max: 10000, // 需要给出数值范围，最大数值。
              inRange: {
                  // 气泡尺寸：5 像素到 60 像素。
                  symbolSize: [5, 30]
              }
          },
          {
              show: false,
              seriesIndex: 5,
              dimension: 3, // 指向第三列（列序号从 0 开始记，所以设置为 2）。
              min: 0, // 需要给出数值范围，最小数值。
              max: 10000, // 需要给出数值范围，最大数值。
              inRange: {
                  // 气泡尺寸：5 像素到 60 像素。
                  symbolSize: [5, 30]
              }
          }
          ],
          series: [
             {
              name: '源IP连接数',
              data: data[0],
              type: 'scatter',
              // symbolSize: function (param) {
              //     console.log('srcIPLink--symbolSize', param[3]);
              //     return param[3] / 10000;
              // },
              label: {
                  emphasis: {
                      show: true,
                      itemStyle: {
                        color: 'red'
                      },
                      formatter: function (param) {
                          return param.data[5] + '：' + param.data[4];
                      },
                      position: 'top'
                  }
              },
              itemStyle: {
                  normal: {
                      shadowBlur: 10,
                      shadowColor: 'rgba(25, 100, 150, 0.5)',
                      shadowOffsetY: 5,
                      color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                          offset: 0,
                          // color: 'rgb(129, 227, 238)'
                          color: 'rgb(255, 182, 193)'
                      }, {
                          offset: 1,
                          color: 'rgb(255, 192, 203)'
                      }])
                  }
              }
          },
          {
            name: '源端口连接数',
            type: 'scatter',
            data: data[1],
            // symbolSize: function (param) {
            //       console.log('srcPort--symbolSize', param[3]);
            //       return param[3] / 10000;
            //   },
              label: {
                  emphasis: {
                      show: true,
                      itemStyle: {
                        color: 'pink'
                      },
                      formatter: function (param) {
                        console.log('源端口连接数', param);
                          return param.data[2] + '：' + param.data[3];
                      },
                      position: 'top'
                  }
              },
            itemStyle: {
                normal: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(120, 36, 50, 0.5)',
                    shadowOffsetY: 5,
                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                        offset: 0,
                        color: 'rgb(251, 118, 123)'
                      }, {
                        offset: 1,
                        color: 'rgb(204, 46, 72)'
                    }])
                }
            }
        },{
              name: '目的IP连接数',
              data: data[2],
              type: 'scatter',
              // symbolSize: function (param) {
              //     console.log('srcIPLink--symbolSize', param[3]);
              //     return param[3] / 10000;
              // },
              label: {
                  emphasis: {
                      show: true,
                      itemStyle: {
                        color: 'pink'
                      },
                      formatter: function (param) {
                        console.log('destIPLink--label', param);
                          return param.data[5] + '：' + param.data[4];
                      },
                      position: 'top'
                  }
              },
              itemStyle: {
                  normal: {
                      shadowBlur: 10,
                      shadowColor: 'rgba(25, 100, 150, 0.5)',
                      shadowOffsetY: 5,
                      color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                          offset: 0,
                          color: 'rgb(238, 130, 238)'
                      }, {
                          offset: 1,
                          color: 'rgb(220, 161, 220)'
                      }])
                  }
              }
          },
          {
            name: '目的端口连接数',
            type: 'scatter',
            data: data[3],
            // symbolSize: function (param) {
            //       console.log('srcPort--symbolSize', param[3]);
            //       return param[3] / 10000;
            //   },
              label: {
                  emphasis: {
                      show: true,
                      itemStyle: {
                        color: 'pink'
                      },
                      formatter: function (param) {
                        // console.log('destPort--label', param[4]);
                          return param.data[5] + '：' + param.data[4];
                      },
                      position: 'top'
                  }
              },
            itemStyle: {
                normal: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(120, 36, 50, 0.5)',
                    shadowOffsetY: 5,
                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                        offset: 0,
                        color: 'rgb(123, 104, 238)'
                    }, {
                        offset: 1,
                        color: 'rgb(147, 112, 219)'
                    }])
                }
            }
        },
        {
              name: '源IP活跃端口数',
              data: data[4],
              type: 'scatter',
              // symbolSize: function (param) {
              //     console.log('srcIPLink--symbolSize', param[3]);
              //     return param[3] / 10000;
              // },
              label: {
                  emphasis: {
                      show: true,
                      itemStyle: {
                        color: 'pink'
                      },
                      formatter: function (param) {
                        console.log('srcIpActiveLink--label', param);
                          return param.data[5] + '：' + param.data[4];
                      },
                      position: 'top'
                  }
              },
              itemStyle: {
                  normal: {
                      shadowBlur: 10,
                      shadowColor: 'rgba(25, 100, 150, 0.5)',
                      shadowOffsetY: 5,
                      color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                          offset: 0,
                          color: 'rgb(30, 144, 255)'
                      }, {
                          offset: 1,
                          color: 'rgb(0, 143, 238)'
                      }])
                  }
              }
          },
          {
              name: '目的IP活跃端口数',
              type: 'scatter',
              data: data[5],
              // symbolSize: function (param) {
              //       console.log('srcPort--symbolSize', param[3]);
              //       return param[3] / 10000;
              //   },
              label: {
                  emphasis: {
                      show: true,
                      itemStyle: {
                        color: 'pink'
                      },
                      formatter: function (param) {
                        console.log('destIpActiveLink--label', param[4]);
                          return param.data[5] + '：' + param.data[4];
                      },
                      position: 'top'
                  }
              },
              itemStyle: {
                  normal: {
                      shadowBlur: 10,
                      shadowColor: 'rgba(120, 36, 50, 0.5)',
                      shadowOffsetY: 5,
                      color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                          offset: 0,
                          // color: 'rgb(0, 250, 154)'
                          color: 'rgb(129, 227, 238)'
                      }, {
                          offset: 1,
                          color: 'rgb(25, 183, 207)'
                      }])
                  }
              }
          }
          ]
        }
      topChart.setOption(topOption);
    }
  }
};
</script>
