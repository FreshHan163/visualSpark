<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .layout-wrap {
    height: 100%;
    color: white;
    .sunburst-chart {
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
    <div class="sunburst-chart" id="sunburstChart" style="width: 400px;height: 400px;"></div>
  </div>
</template>

<script>
export default {
  name: 'SunburstChart',
  data () {
    return {
      msg: 'hello',
      instances: [],
      udpData: [],
      tcpData: [],
      otherData: [],
    };
  },
  created () {
    this.getSunData().then(() => {
      console.log('异步请求结束');
    });
  },
  mounted () {
  },
  methods: {
    getSunData() {
      return new Promise((resolve, reject) => {
        this.getSunTcpData()
        this.getSunOtherData();
        this.getSunUdpData();
        resolve();
      });
    },
    getSunTcpData() {
      this.$http.get('/api/getSunTcp0619').then((res) => {
        console.log('太阳图tcp--数据', res.body);
        res.body.forEach(item => {
            item.name = item.destPort;
            item.value = item.destAllBytes;
        });
        this.tcpData = res.body;
      });
    },
    getSunUdpData() {
      this.$http.get('/api/getSunUdp0619').then((res) => {
        console.log('太阳图udp--数据', res.body);
        res.body.forEach(item => {
            item.name = item.destPort;
            item.value = item.destAllBytes;
        });
        this.udpData = res.body;
      }).then(() => {
        console.log('异步开始！');
        this.drawSunburst();
      });
    },
    getSunOtherData() {
      this.$http.get('/api/getSunOther0619').then((res) => {
        console.log('太阳图other--数据', res.body);
        res.body.forEach(item => {
            item.name = item.destPort;
            item.value = item.destAllBytes;
        });
        this.otherData = res.body;
      });
    },
    drawSunburst () {
      let sunburstChart = this.$echarts.init(document.getElementById('sunburstChart'));
      var data = [{
          name: 'TCP',
          itemStyle: {
              color: '#0aa3b5'
          },
          // children: this.tcpData
          children: [{
              name: '80',
              value: 100,
              itemStyle: {
                  color: '#975e6d'
              },
              children: [{
                name: '80',
                value: 100,
                itemStyle: {
                    color: '#975e6d'
                },
              }]
          }, {
              name: '123',
              value: 20,
              itemStyle: {
                  color: '#e0719c'
              },
              children: [{
                name: '80',
                value: 100,
                itemStyle: {
                    color: 'black'
                }
              }]
          }]
      }, {
          name: 'UDP',
          itemStyle: {
              color: '#e65832'
          },
          // children: this.udpData
          children: [{
              name: '80',
              value: 100,
              itemStyle: {
                  color: '#975e6d'
              },
              children: [{
                name: '80',
                value: 100,
                itemStyle: {
                    color: '#975e6d'
                },
              }]
          }, {
              name: '123',
              value: 20,
              itemStyle: {
                  color: '#e0719c'
              },
              children: [{
                name: '80',
                value: 100,
                itemStyle: {
                    color: 'black'
                }
              }]
          }]
          // children: [{
          //     name: 'Berry',
          //     value: 2,
          //     itemStyle: {
          //         // color: '#dd4c51'
          //     },
          // }, {
          //     name: 'Dried Fruit',
          //     value: 0.5,
          //     itemStyle: {
          //         // color: '#c94a44'
          //     },
          // }, {
          //     name: 'OTHER',
          //     itemStyle: {
          //         // color: '#ebb40f'
          //     },
          //     value: 0.3
          // }]
      }, {
        name: 'OTHER',
        itemStyle: {
          color: '#ebb40f'
        },
        children: [{
              name: '80',
              value: 100,
              itemStyle: {
                  color: '#975e6d'
              },
              children: [{
                name: '80',
                value: 100,
                itemStyle: {
                    color: '#975e6d'
                },
              }]
          }, {
              name: '123',
              value: 20,
              itemStyle: {
                  color: '#e0719c'
              },
              children: [{
                name: '80',
                value: 100,
                itemStyle: {
                    color: 'black'
                }
              }]
          }]
      }];
      let sunburstOption = {
        title: {
          text: '区域流量分布图',
          textStyle: {
              fontSize: 14,
              align: 'center'
          },
          subtextStyle: {
              align: 'center'
          }
        },
        series: {
            type: 'sunburst',
            highlightPolicy: 'ancestor',
            data: data,
            radius: [0, '95%'],
            label: {
              show: true,
            },
            sort: null,
            levels: [{}, {
                r0: '15%',
                r: '35%',
                itemStyle: {
                    borderWidth: 3
                },
                highlight: {
                    itemStyle: {
                        color: 'orange'
                    }
                },
                downplay: {
                    itemStyle: {
                        color: '#ccc'
                    }
                }
            }, {
                r0: '35%',
                r: '70%',
                label: {
                    align: 'right'
                }
            }, {
                r0: '70%',
                r: '75%',
                label: {
                    position: 'outside',
                    padding: 3,
                    silent: false
                },
                itemStyle: {
                    borderWidth: 3
                }
            }]
        }

      };
      sunburstChart.setOption(sunburstOption);

    }
  }
};
</script>
