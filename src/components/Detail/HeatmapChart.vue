<!-- Add "scoped" attribute to limit CSS to this component only -->
import { resolve } from 'url';
import { constants } from 'http2';
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
      instances: [],
      heatSrcIpData: [],
      heatSrcPortData: [],
      heatDestIpData: [],
      heatDestPortData: [],
      allHeatData: []
    };
  },
  created () {
    this.getHeat().then(() => {
      setTimeout(() => {
        this.drawHeatmap();
        this.drawReport(this.instances);
      });
    });
  },
  methods: {
    drawReport(val) {
      this.$emit('transferReport', val.slice(0, 5));
    },
    getHeat() {
      return this.axios.get('/api/getHeat').then((res) => {
        this.allHeatData = res.data;
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
          // srcPortData.push(arr);
          // destIpData.push(arr);
          // destPortData.push(arr);
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
      this.allHeatData.forEach((item, index) => {
        let srcIpBytes = (item.srcBytes / (1024 * 1024)).toFixed(2);
        srcIpData[index].push(srcIpBytes);
        this.heatSrcIpData.push([item.mins, item.srcIp, item.srcBytes]);

        let srcPortBytes = (item.srcPortBytes / (1024 * 1024)).toFixed(2);
        srcPortData[index].push(srcPortBytes);
        this.heatSrcPortData.push([item.mins, item.srcPort, item.srcPortBytes]);

        let destIpBytes = (item.destIpBytes / (1024 * 1024)).toFixed(2);
        destIpData[index].push(destIpBytes);
        this.heatDestIpData.push([item.mins, item.destIp, item.destIpBytes]);

        let destPortBytes = (item.destPortBytes / (1024 * 1024)).toFixed(2);
        destPortData[index].push(destPortBytes);
        this.heatDestPortData.push([item.mins, `${item.destPort}端口`, item.destPortBytes]);

        this.instances.push({mins: item.mins, srcIp: item.srcIp, srcBytes: srcIpBytes,
          srcPort: item.srcPort, srcPortBytes: srcPortBytes,
          destIp: item.destIp, destIpBytes: destIpBytes,
          destPort: item.destPort, destPortBytes: destPortBytes
        });
      });
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
            tooltip: {
              trigger: 'item',
              // trigger: 'axis',
              // axisPointer: {
              //     // type: 'cross'
              // },
              // backgroundColor: 'rgba(245, 245, 245, 0.8)',
              // borderWidth: 1,
              // borderColor: '#ccc',
              // padding: 10,
              // textStyle: {
              //     color: '#000'
              // },
              // position: function (pos, params, el, elRect, size) {
              //     var obj = {top: 10};
              //     obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
              //     return obj;
              // },
              // extraCssText: 'width: 200px',
            },
            axisPointer: {
                link: {xAxisIndex: 'all'},
                label: {
                    backgroundColor: '#333'
                }
            },
            animation: false,
            legend: [{
              show: true,
              left: 5,
              top: 70,
              itemGap: 30,
              data: [{
                name: '源IP',
                icon: 'circle',
                color: 'green',
                textStyle: {
                  color: 'white'
                }
              }],
              orient: 'vertical',
            },{
              show: true,
              right: 0,
              top: 70,
              itemGap: 10,
              data: [{
                name: '目的IP',
                icon: 'circle',
                color: '#ddc441',
                textStyle: {
                  color: 'white'
                }
              }],
              orient: 'vertical'
            },{
              show: true,
              left: 5,
              top: 200,
              itemGap: 10,
              data: [{
                name: '源端口',
                icon: 'circle',
                color: 'yellow',
                textStyle: {
                  color: 'white'
                }
              }],
              orient: 'vertical'
            },{
              show: true,
              right: -6,
              top: 200,
              itemGap: 10,
              data: [{
                name: '目的端口',
                icon: 'circle',
                color: 'green',
                textStyle: {
                  color: 'white'
                }
              }],
              orient: 'vertical'
            }],
            grid: [
              { height: '20%',y: '20%', x: '12%', width: '35%' },
              { height: '20%',y: '20%', x: '52%', width: '35%' },
              { height: '20%',y: '60%', x: '12%', width: '35%' },
              { height: '20%',y: '60%', x: '52%', width: '35%' }
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
            visualMap: [{
                min: 0,
                max: 200,
                calculable: true,
                orient: 'horizontal',
                left: '50',
                bottom: '10',
                seriesIndex: [0, 2],
                orient: 'horizontal',
                inRange: {
                  color: ['#eac736','#50a3ba'].reverse(),
                },
                textStyle: {
                  color: 'white'
                }
            }, {
                min: 0,
                max: 200,
                inRange: {
                  color: ['#eac736','#50a3ba'].reverse(),
                },
                calculable: true,
                seriesIndex: [1, 3],
                orient: 'horizontal',
                left: '55%',
                bottom: '10',
                textStyle: {
                  color: 'white'
                }
            }],
            series: [
              {
                name: '源IP',
                type: 'heatmap',
                data: srcIpData,
                xAxisIndex: 0,
                yAxisIndex: 0,
                // label: {
                    // normal: {
                        // show: false
                    // }
                // },
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
                        res += this.heatSrcIpData[subIndex][1];
                        res += '：' + params.data[2] + 'MB';
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
                        res += this.heatDestIpData[subIndex][1];
                        res += '：' + params.data[2] + 'MB';
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
                        let subIndex = params.data[0] * 2 + params.data[1];
                        res += this.heatSrcPortData[subIndex][1];
                        res += '：' + params.data[2] + 'MB';
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
                        let subIndex = params.data[0] * 2 + params.data[1];
                        res += this.heatDestPortData[subIndex][1];
                        res += '：' + params.data[2] + 'MB';
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
