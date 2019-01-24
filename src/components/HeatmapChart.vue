<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .layout-wrap {
    height: 100%;
    color: white;
    .heatmap-chart {
      // border: 1px solid blueviolet;
      margin: 0 auto;
      max-width: 100%;
      max-height: 100%;
    }
  }
</style>
<template>
  <div class="layout-wrap">
    <div class="heatmap-chart" id="heatmapChart" style="width: 600px;height: 400px;"></div>
  </div>
</template>

<script>
export default {
  name: 'HeatmapChart',
  data () {
    return {
      msg: 'hello',
      instances: [],
      heatSrcIpData: [],
      heatSrcPortData: [],
      heatDestIpData: [],
      heatDestPortData: [],
    };
  },
  created () {
    this.getHeatmapData().then(() => {
      console.log('开始绘制--热力图');
      setTimeout(() => {
        this.drawHeatmap();
        this.drawReport(this.instances);
      });
    });
  },
  methods: {
    drawReport(val) {
      this.$emit('transferReport', val);
    },
    getHeatmapData() {
      return new Promise((resolve, reject) => {
        this.getHeatSrcIp();
        this.getHeatDestIp();
        this.getHeatDestPort();
        this.getHeatSrcPort();
        resolve();
      });
    },
    getHeatSrcIp() {
      this.$http.get('/api/getHeatSrcIp').then((res) => {
        console.log(res.body);
        console.log(res.body.slice(0, 20));
        this.heatSrcIpData = res.body.slice(0, 20);
        console.log('热力图--srcIp数据', this.heatSrcIpData);
        this.instances = Object.assign({}, {srcIp: res.body.slice(0, 5)});
      });
    },
    getHeatSrcPort() {
      this.$http.get('/api/getHeatSrcPort').then((res) => {
        this.heatSrcPortData = res.body.slice(0, 20);
        console.log('热力图--srcIp数据', this.heatSrcPortData);
        this.instances = Object.assign(this.instances, {srcPort: res.body.slice(0, 5)});
      });
    },
    getHeatDestIp() {
      this.$http.get('/api/getHeatDestIp').then((res) => {
        this.heatDestIpData = res.body.slice(0, 20);
        console.log('热力图--srcIp数据', this.heatDestIpData);
        this.instances = Object.assign(this.instances, {destIp: res.body.slice(0, 5)});
      });
    },
    getHeatDestPort() {
      this.$http.get('/api/getHeatDestPort').then((res) => {
        this.heatDestPortData = res.body.slice(0, 20);
        console.log('热力图--srcIp数据', this.heatDestPortData);
        this.instances = Object.assign(this.instances, {destPort: res.body.slice(0, 5)});
        // console.log('最终的对象数组', this.instances);
      });
    },
    drawHeatmap () {
      let srcIpData = [];
      let srcPortData = [];
      let destIpData = [];
      let destPortData = [];
      for (let i=0; i< 10; i++) {
        for (let j=0; j < 2; j++) {
          let arr = [];
          arr.push(i);
          arr.push(j);
          srcIpData.push(arr);
        }
      }
      for (let i=0; i< 10; i++) {
        for (let j=0; j < 2; j++) {
          let arr = [];
          arr.push(i);
          arr.push(j);
          srcPortData.push(arr);
        }
      }
      for (let i=0; i< 10; i++) {
        for (let j=0; j < 2; j++) {
          let arr = [];
          arr.push(i);
          arr.push(j);
          destIpData.push(arr);
        }
      }
      for (let i=0; i< 10; i++) {
        for (let j=0; j < 2; j++) {
          let arr = [];
          arr.push(i);
          arr.push(j);
          destPortData.push(arr);
        }
      }
      this.heatSrcIpData.forEach((item, index) => {
        srcIpData[index].push(item.srcAllBytes);
      });
      this.heatSrcPortData.forEach((item, index) => {
        srcPortData[index].push(item.srcAllBytes);
      });
      this.heatDestIpData.forEach((item, index) => {
        destIpData[index].push(item.destAllBytes);
      });
      this.heatDestPortData.forEach((item, index) => {
        destPortData[index].push(item.destAllBytes);
      });
      // this.instances = Object.assign({}, {srcIp: srcIpData}, {srcPort: srcPortData}, {destIp: destIpData}, {destPort: destPortData});
      console.log('生成instances', this.instances);
      console.log('最终生产srcIpData',srcIpData);
      console.log('最终生产srcPortData',srcPortData);
      console.log('最终生产destIpData',destIpData);
      console.log('最终生产destPortData',destPortData);
      let heatmapChart = this.$echarts.init(document.getElementById('heatmapChart'));

      var xData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      var yData = [0, 1];

        let heatmapOption = {
            title: {
              text: 'Top20流量分布图',
              left: 'center',
              textStyle: {
                color: '#333',
                fontSize: 16,
              }
            },
            // tooltip: {
            //     position: 'top',
            //     formatter: function(params) {
            //         var res = params.seriesName + '<br/>';
            //         console.log(params);
            //         let subIndex = params.data[0] * 10 + params.data[1];
            //         // res += instances[subIndex].srcIp;
            //         // res += ':<br/>' + params.data[2];
            //         return res;
            //     }
            // },
            tooltip: {
              trigger: 'item'
            },
            animation: false,
            // legend: {
            //   show: true,
            //   left: 5,
            //   top: 50,
            //   itemGap: 30,
            //   data: [{
            //     name: '源IP',
            //     icon: 'circle',
            //     color: 'green',
            //     textStyle: {
            //       color: 'black'
            //     }
            //   },{
            //     name: '源端口',
            //     icon: 'circle'
            //   },{
            //     name: '目的IP',
            //     icon: 'circle'
            //   },{
            //     name: '目的端口',
            //     icon: 'circle',
            //     right: 20,
            //   }],
            //   orient: 'vertical',
            //   color: 'white',
            //   color: ['pink', 'pink', 'pink', 'black']
            // },
            legend: [{
              show: true,
              left: 5,
              top: 50,
              itemGap: 30,
              data: [{
                name: '源IP',
                icon: 'circle',
                color: 'green',
                textStyle: {
                  color: 'black'
                }
              }],
              orient: 'vertical',
              color: 'white',
              color: ['pink', 'pink', 'pink', 'black']
            },{
              show: true,
              right: 12,
              top: 50,
              itemGap: 10,
              data: [{
                name: '目的IP',
                icon: 'circle',
                color: 'green',
                textStyle: {
                  color: 'black'
                }
              }],
              orient: 'vertical'
            },{
              show: true,
              left: 5,
              top: 150,
              itemGap: 10,
              data: [{
                name: '源端口',
                icon: 'circle'
              }],
              orient: 'vertical',
              // color: 'white',
              // color: ['pink', 'pink', 'pink', 'black']
            },{
              show: true,
              right: 0,
              top: 150,
              itemGap: 10,
              data: [{
                name: '目的端口',
                icon: 'circle'
              }],
              orient: 'vertical'
            }],
            grid: [
              { height: '20%',y: '10%', x: '12%', width: '35%' },
              { height: '20%',y: '10%', x: '52%', width: '35%' },
              { height: '20%',y: '40%', x: '12%', width: '35%' },
              { height: '20%',y: '40%', x: '52%', width: '35%' }
            ],
            xAxis: [
              {
                type: 'category', gridIndex: 0, data: xData,
                splitArea: { show: true },
                axisLine: {
                  lineStyle: {
                    color: 'rgba(255, 255, 255, 0.9)'
                  }
                }
              },
              {
                type: 'category', gridIndex: 1, data: xData,
                splitArea: { show: true },
                axisLine: {
                  lineStyle: {
                    color: 'rgba(255, 255, 255, 0.9)'
                  }
                }
              },
              {
                type: 'category', gridIndex: 2, data: xData,
                splitArea: { show: true },
                axisLine: {
                  lineStyle: {
                    color: 'rgba(255, 255, 255, 0.9)'
                  }
                }
              },
              {
                type: 'category', gridIndex: 3, data: xData,
                splitArea: { show: true },
                axisLine: {
                  lineStyle: {
                    color: 'rgba(255, 255, 255, 0.9)'
                  }
                }
              }
            ],
            yAxis: [
              {
                type: 'category',
                data: yData,
                gridIndex: 0,
                splitArea: {
                    show: true
                },
                axisLine: {
                  lineStyle: {
                    color: 'rgba(255, 255, 255, 0.9)'
                  }
                }
              },
              {
                type: 'category',
                data: yData,
                gridIndex: 1,
                splitArea: {
                    show: true
                },
                axisLine: {
                  lineStyle: {
                    color: 'rgba(255, 255, 255, 0.9)'
                  }
                }
              },
              {
                type: 'category',
                data: yData,
                gridIndex: 2,
                splitArea: {
                    show: true
                },
                axisLine: {
                  lineStyle: {
                    color: 'rgba(255, 255, 255, 0.9)'
                  }
                }
              },
              {
                type: 'category',
                data: yData,
                gridIndex: 3,
                splitArea: {
                    show: true
                },
                axisLine: {
                  lineStyle: {
                    color: 'rgba(255, 255, 255, 0.9)'
                  }
                }
              }
            ],
            // visualMap: {
            //     min: 10000,
            //     max: 100000000,
            //     calculable: true,
            //     orient: 'horizontal',
            //     left: 'center',
            //     bottom: '0',
            //     inRange: {
            //       color: ['#9D409C','#7769CE','#45AE37'].reverse(),
            //     }
            // },
            visualMap: [{
                min: 10000,
                max: 100000000,
                calculable: true,
                orient: 'horizontal',
                left: '50',
                bottom: '100',
                seriesIndex: [0, 2],
                orient: 'horizontal',
                inRange: {
                  color: ['#9D409C','#45AE37'].reverse(),
                }
            }, {
                min: 10000,
                max: 100000000,
                // inRange: {
                //     color: ['grey'],
                //     opacity: [0, 0.3]
                // },
                // controller: {
                //     inRange: {
                //         opacity: [0.3, 0.6]
                //     },
                //     outOfRange: {
                //         color: '#ccc'
                //     }
                // },
                calculable: true,
                seriesIndex: [1, 3],
                orient: 'horizontal',
                left: '55%',
                bottom: '100'
            }],
            series: [
              {
                name: '源IP',
                type: 'heatmap',
                data: srcIpData,
                xAxisIndex: 0,
                yAxisIndex: 0,
                label: {
                    normal: {
                        show: false
                    }
                },
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                tooltip: {
                    position: 'top',
                    formatter: (params) => {
                        console.log(params);
                        var res = params.seriesName + '<br/>';
                        let subIndex = params.data[0] * 2 + params.data[1];
                        res += this.heatSrcIpData[subIndex].srcIp;
                        res += '：' + params.data[2];
                        return res;
                    }
                }
              },
              {
                name: '目的IP',
                type: 'heatmap',
                data: destIpData,
                xAxisIndex: 1,
                yAxisIndex: 1,
                label: {
                    normal: {
                        show: false
                    }
                },
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                tooltip: {
                    position: 'top',
                    formatter: (params) => {
                        var res = params.seriesName + '<br/>';
                        let subIndex = params.data[0] * 2 + params.data[1];
                        res += this.heatDestIpData[subIndex].destIp;
                        res += '：' + params.data[2];
                        return res;
                    }
                }
              },
              {
                name: '源端口',
                type: 'heatmap',
                xAxisIndex: 2,
                yAxisIndex: 2,
                data: srcPortData,
                label: {
                    normal: {
                        show: false
                    }
                },
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                tooltip: {
                    position: 'top',
                    formatter: (params) => {
                        var res = params.seriesName + '<br/>';
                        // let subIndex = params.data[1] * 10 + params.data[0];
                        let subIndex = params.data[0] * 2 + params.data[1];
                        res += this.heatSrcPortData[subIndex].srcPort;
                        res += '：' + params.data[2];
                        return res;
                    }
                }
              },
              {
                name: '目的端口',
                type: 'heatmap',
                data: destPortData,
                xAxisIndex: 3,
                yAxisIndex: 3,
                label: {
                    normal: {
                        show: false
                    }
                },
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                tooltip: {
                    position: 'top',
                    formatter: (params) => {
                        var res = params.seriesName + '<br/>';
                        // let subIndex = params.data[1] * 10 + params.data[0];
                        let subIndex = params.data[0] * 2 + params.data[1];
                        res += this.heatDestPortData[subIndex].destPort;
                        res += '：' + params.data[2];
                        return res;
                    }
                }
              }
            ]
        };
        heatmapChart.setOption(heatmapOption);
    }
  }
};
</script>
