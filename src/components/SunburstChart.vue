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
      this.$http.get('/api/getSunTcp').then((res) => {
        console.log('太阳图tcp--数据', res.body);
        res.body.forEach(item => {
            item.name = item.srcPort;
            item.value = item.srcAllBytes;
        });
        this.tcpData = res.body;
      });
    },
    getSunUdpData() {
      this.$http.get('/api/getSunUdp').then((res) => {
        console.log('太阳图udp--数据', res.body);
        res.body.forEach(item => {
            item.name = item.srcPort;
            item.value = item.srcAllBytes;
        });
        this.udpData = res.body;
      }).then(() => {
        console.log('异步开始！');
        this.drawSunburst();
      });
    },
    getSunOtherData() {
      this.$http.get('/api/getSunOther').then((res) => {
        console.log('太阳图other--数据', res.body);
        res.body.forEach(item => {
            item.name = item.srcPort;
            item.value = item.srcAllBytes;
        });
        this.otherData = res.body;
      });
    },
    drawSunburst () {
      let sunburstChart = this.$echarts.init(document.getElementById('sunburstChart'));
      var data = [{
          name: 'TCP',
          itemStyle: {
              // color: '#da0d68'
          },
          children: this.tcpData
          // children: [{
          //     name: 'Black Tea',
          //     value: 1,
          //     itemStyle: {
          //         // color: '#975e6d'
          //     }
          // }, {
          //     name: 'Floral',
          //     value: 2,
          //     itemStyle: {
          //         // color: '#e0719c'
          //     }
          // }]
      }, {
          name: 'UDP',
          itemStyle: {
              // color: '#da1d23'
          },
          children: this.udpData
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
          // color: 'blue'
        },
        children: [{
          name: 'OTHER',
          value: 8,
          itemStyle: {
              // color: '#b09733'
          }
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
                r0: '25',
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
                r: '50%',
                label: {
                    align: 'right'
                }
            }, {
                r0: '50%',
                r: '72%',
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
