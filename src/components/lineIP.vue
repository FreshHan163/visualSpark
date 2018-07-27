<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .layout-wrap {
    height: 100%;
    color: white;
    .line-ip-chart {
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
    <div class="line-ip-chart" ref="lineIpChart" style="width: 600px;height: 400px;"></div>
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'PieChart',
  data () {
    return {
      msg: 'hello',
      instances: [],
      bytes: [],
      packets: [],
      timeData: [],
      detailIp: []
    };
  },
  created () {
    this.$http.post('/api/getIpDetail', {
      srcIp: '172.10.0.3',
    }).then((res) => {
      res.body.forEach((item) => {
        item.bytes = item.bytes / 100000;
        item.packets = item.bytes / 100;
      });
      this.detailIp = res.body;
      console.log(this.detailIp);
    }).then(() => {
      this.drawBarLine();
      // this.drawColorLine();
    });
  },
  methods: {
    drawColorLine () {
      let lineChart = echarts.init(this.$refs.lineIpChart);

      var myColor = ['#45fda5', '#3ffd55', '#11da01', '#118b43', '#c3eb18',
                '#dfde14', '#eac736', '#ed5501', '#9d0700', '#e80c00'
            ];
      var lineOption = {
          backgroundColor: '#F9F9F9',
          title: {
            text: 'ip流量图--172.10.0.3',
            x: 'center',
            color: 'white'
          },
          grid: [{
              top: 15,
              left: 15,
              right: 15,
              height: '35%',
              containLabel: true //轴上的数值
          }, {
            top: '42%',
            left: 15,
            right: 15,
            bottom: 15,
            height: '35%',
            containLabel: true //轴上的数值
          }],
          dataset:{
            source: this.detailIp
          },
          xAxis: [{
              type: 'category',
              splitLine: false,
              boundaryGap: false,
              axisLine: {
                  show: true,
                  lineStyle: {
                      color: myColor[0]
                  }
              },
              axisTick: {
                  lineStyle: {
                      color: myColor[0]
                  }
              }
          },{
            gridIndex: 1,
              type: 'category',
              splitLine: false,
              boundaryGap: false,
              show: true,
              axisLine: {
                  show: true,
                  lineStyle: {
                      color: myColor[0]
                  }
              },
              axisTick: {
                  lineStyle: {
                      color: myColor[0]
                  }
              }
          }],
          dataZoom: [{
              type: 'inside',
              start: 0,
              end: 10
          }, {
              start: 0,
              end: 10,
              handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
              handleSize: '80%',
              handleStyle: {
                  color: '#fff',
                  shadowBlur: 3,
                  shadowColor: 'rgba(0, 0, 0, 0.6)',
                  shadowOffsetX: 2,
                  shadowOffsetY: 2
              }
          }],
          yAxis: [{
              type: 'value',
              min: 0,
              splitLine: false,
              axisLine: {
                  show: true,
                  lineStyle: {
                      color: myColor[0]
                  }
              },
              axisTick: {
                  show: false
              },
              // interval: 10,
              axisLabel: {
                  formatter: function (value) {
                      return value + " 千";
                  },
                  textStyle: {
                      color: function (value) {
                          //注意：当值大于999(三位)时，会以“1,0000”形式，所以要做以下处理
                          value = parseInt(value.replace(/,/g, ""));
                          var idx = parseInt(value / 100);
                          return myColor[idx > 9 ? 9 : idx];
                      }
                  }
              }
          }, {
            gridIndex: 1,
            inverse: true,
              type: 'value',
              min: 0,
              splitLine: false,
              axisLine: {
                  show: true,
                  lineStyle: {
                      color: myColor[0]
                  }
              },
              axisTick: {
                  show: false
              },
              // interval: 10,
              axisLabel: {
                  formatter: function (value) {
                      return value + " 千";
                  },
                  textStyle: {
                      color: function (value) {
                          //注意：当值大于999(三位)时，会以“1,0000”形式，所以要做以下处理
                          value = parseInt(value.replace(/,/g, ""));
                          var idx = parseInt(value / 100);
                          return myColor[idx > 9 ? 9 : idx];
                      }
                  }
              }
          }],
          visualMap: {
              show: false,
              calculable: true,
              min: 0,
              // max: 100,
              inRange: {
                  color: [myColor[0], myColor[1], myColor[2], myColor[3], myColor[4], myColor[5], myColor[6], myColor[7], myColor[8], myColor[9]]
              }
          },
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  label: {
                      textStyle: {
                          color: "white"
                      }
                  }
              }
          },
          series: [
            {
                name:'字节数(Bytes)',
                type:'line',
                symbolSize: 8,
                smooth: true,
                hoverAnimation: true,
                lineStyle: {
                    normal: {
                        width: 5
                    }
                },
                itemStyle: {
                    normal: {
                        opacity: 0
                    }
                },
                encode: {
                  tooltip: [0, 1],
                  x: 0,
                  y: 1
                }
            },
            {
                name:'包数(Packets)',
                type:'line',
                xAxisIndex: 1,
                yAxisIndex: 1,
                symbolSize: 8,
                hoverAnimation: true,
                lineStyle: {
                  normal: {
                      width: 5
                  }
              },
              itemStyle: {
                  normal: {
                      opacity: 0
                  }
              },
              encode: {
                tooltip: [0, 2],
                x: 0,
                y: 2
              }
            }
          ]
      }
      lineChart.setOption(lineOption);
    },
    drawBarLine () {
      let lineChart = echarts.init(this.$refs.lineIpChart);
      var colors = ['#5793f3', '#d14a61', '#675bba'];
      let lineOption = {
        color: colors,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            // formatter: function (params) {
                // params = params[0];
                // var date = new Date(params.name);
                // return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
            // },
        },
        grid: {
            right: '20%'
        },
        dataset: {
          source: this.detailIp
        },
        legend: {
            data:['字节数','包数']
        },
        dataZoom: [{
            type: 'inside',
            start: 0,
            end: 10
        }, {
            start: 0,
            end: 10,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
                color: '#fff',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: 2,
                shadowOffsetY: 2
            }
        }],
        xAxis: [
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                // data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '字节数',
                min: 0,
                // max: 250,
                position: 'right',
                axisLine: {
                    lineStyle: {
                        color: colors[0]
                    }
                },
                axisLabel: {
                    formatter: '{value}'
                }
            },
            {
                type: 'value',
                name: '包数',
                min: 0,
                // max: 25,
                position: 'left',
                axisLine: {
                    lineStyle: {
                        color: colors[2]
                    }
                },
                axisLabel: {
                    formatter: '{value}'
                }
            }
        ],
        series: [
            {
                name:'字节数',
                type:'bar',
                // data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
                encode: {
                  tooltip: [0, 1],
                  x: 0,
                  y: 1
                }
            },
            {
                name:'包数',
                type:'line',
                yAxisIndex: 1,
                // data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
                encode: {
                  tooltip: [0, 2],
                  x: 0,
                  y: 2
                }
            }
        ]
      }
      lineChart.setOption(lineOption);
    }
  }
};
</script>
