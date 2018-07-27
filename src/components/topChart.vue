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
    <div class="top-chart" ref="topChart" style="width: 700px;height: 400px;"></div>
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'TopChart',
  props: ['instances'],
  data () {
    return {
      msg: 'hello',
      // instances: [],
      // heatSrcIpLinkData: [],
      // heatSrcPortLinkData: []
    };
  },
  mounted () {
    this.drawBubble();
    // this.getHeatSrcIpLink();
    // this.getHeatSrcPortLink();
  },
  methods: {
    // getHeatSrcIpLink() {
    //   this.$http.get('/api/getHeatSrcIpLink').then((res) => {
    //     res.body.forEach((item, index) => {
    //       item.totalItem = item.srcIpLinkCount;
    //       item.dimension = item.srcIp;
    //       item.yAxis = 1;
    //       item.xAxis = index + 1;
    //       this.heatSrcIpLinkData.push(Object.values(item).reverse());
    //     });
    //     this.heatSrcIpLinkData = this.heatSrcIpLinkData.slice(0, 20);
    //     this.instances.push(this.heatSrcIpLinkData);
    //     console.log('热力图--srcIp数据--连接数', this.heatSrcIpLinkData);
    //   });
    // },
    // getHeatSrcPortLink() {
    //   this.$http.get('/api/getHeatSrcPortLink').then((res) => {
    //     res.body.forEach((item, index) => {
    //       item.totalItem = item.srcPortLinkCount;
    //       item.dimension = item.srcPort;
    //       item.yAxis = 2;
    //       item.xAxis = index + 1;
    //       this.heatSrcPortLinkData.push(Object.values(item).reverse());
    //     });
    //     this.heatSrcPortLinkData = this.heatSrcPortLinkData.slice(0, 20);
    //     this.instances.push(this.heatSrcPortLinkData);
    //     console.log('top图连接数', this.instances);
    //   });
    // },
    drawBubble() {
      let topChart = echarts.init(this.$refs.topChart);
      var data = this.instances;
      console.log('气泡图', data);
      let topOption = {
          // backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
          //     offset: 0,
          //     color: '#f7f8fa'
          // }, {
          //     offset: 1,
          //     color: '#cdd0d5'
          // }]),
          title: {
              text: ''
          },
          dataset: {
            source: this.instances
          },
          legend: {
              left: 50,
              bottom: 10,
          },
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'cross'
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
              name: 'srcIpLink',
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
                        color: 'pink'
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
                          color: 'rgb(129, 227, 238)'
                      }, {
                          offset: 1,
                          color: 'rgb(25, 183, 207)'
                      }])
                  }
              }
          },
          {
            name: 'srcPortLink',
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
                          return param.data[3] + '：' + param.data[5];
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
              name: 'destIpLink',
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
                          color: 'rgb(129, 227, 238)'
                      }, {
                          offset: 1,
                          color: 'rgb(25, 183, 207)'
                      }])
                  }
              }
          },
          {
            name: 'destPortLink',
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
                        console.log('destPort--label', param[4]);
                          return param.data[4] + '：' + param.data[5];
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
        },
        {
              name: 'srcIpActiveLink',
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
                          color: 'rgb(129, 227, 238)'
                      }, {
                          offset: 1,
                          color: 'rgb(25, 183, 207)'
                      }])
                  }
              }
          },
          {
              name: 'destIpActiveLink',
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
                          return param.data[4] + '：' + param.data[5];
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
          }
          ]
        }
      topChart.setOption(topOption);
    }
  }
};
</script>
