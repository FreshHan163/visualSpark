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
    this.getIpData();
    this.$http.post('/api/getIpDetail', {
      srcIp: '172.10.0.3',
    }).then((res) => {
      console.log('post请求172.10.0.4',res);
      res.body.forEach((item) => {
        item.bytes = item.bytes / 100000;
        item.packets = item.bytes / 10000;
      });
      this.detailIp = res.body;
      console.log(res);
    }).then(() => {
      this.drawColorLine();
    });
  },
  methods: {
    getIpData() {
      this.$http.get('/api/getIp').then((res) => {
        let data = [];
        res.body.forEach((item) => {
          data = data.concat(Object.values(item));
          this.bytes.push(item.bytes / 1000);
          this.packets.push(item.packets / 1000);
          this.timeData.push(item.hours);
        });
        this.instances = data;
        console.log('ip数据包11', this.instances);
      }).then(() => {
        // this.drawColorLine();
      });
    },
    drawColorLine () {
      let lineChart = echarts.init(this.$refs.lineIpChart);

      var myColor = ['#45fda5', '#3ffd55', '#11da01', '#118b43', '#c3eb18',
                '#dfde14', '#eac736', '#ed5501', '#9d0700', '#e80c00'
            ];
      var lineOption = {
          backgroundColor: 'gray',
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
          series: [{
              name: '人',
              type: 'line',
              symbol: 'none', //这句就是去掉折线上的点的
              smooth: true, //这句就是让曲线变平滑的
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
          }, {
              name: '人',
              type: 'line',
              symbol: 'none', //这句就是去掉折线上的点的
              smooth: true, //这句就是让曲线变平滑的
              xAxisIndex: 1,
              yAxisIndex: 1,
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
          }]
      }
      lineChart.setOption(lineOption);

    },
    drawLine () {
      let lineChart = echarts.init(this.$refs.lineIpChart);
      let instances = this.instances;
      let lineOption = {
        title: {
          text: 'ip流量图--172.10.0.3',
          x: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                animation: false
            }
        },
        legend: {
            data:['包数','字节数'],
            x: 'left'
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        axisPointer: {
            link: {xAxisIndex: 'all'}
        },
        // dataZoom: [
        //     {
        //         show: true,
        //         realtime: true,
        //         start: 30,
        //         end: 70,
        //         xAxisIndex: [0, 1]
        //     },
        //     {
        //         type: 'inside',
        //         realtime: true,
        //         start: 30,
        //         end: 70,
        //         xAxisIndex: [0, 1]
        //     }
        // ],
        grid: [{
            left: 50,
            right: 0,
            height: '35%'
        }, {
            left: 50,
            right: 0,
            top: '55%',
            height: '35%'
        }],
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                axisLine: {onZero: true},
                data: this.timeData
            },
            {
                gridIndex: 1,
                type : 'category',
                boundaryGap : false,
                axisLine: {onZero: true},
                data: this.timeData,
                position: 'top'
            }
        ],
        yAxis : [
            {
                name : '字节数(Bytes)',
                type : 'value',
                max : 10000
            },
            {
                gridIndex: 1,
                name : '包数(Packets)',
                type : 'value',
                inverse: true
            }
        ],
        series : [
            {
                name:'字节数(Bytes)',
                type:'line',
                symbolSize: 8,
                hoverAnimation: false,
                data: this.bytes
            },
            {
                name:'包数(Packets)',
                type:'line',
                xAxisIndex: 1,
                yAxisIndex: 1,
                symbolSize: 8,
                hoverAnimation: false,
                data: this.packets
            }
        ]
      };
      lineChart.setOption(lineOption);
    }
  }
};
</script>
