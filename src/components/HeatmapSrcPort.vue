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
    <div class="heatmap-chart" id="heatSrcPort" style="width: 400px;height: 400px;"></div>
  </div>
</template>

<script>
export default {
  name: 'HeatmapSrcPort',
  data () {
    return {
      msg: 'hello',
      instances: []
    };
  },
  mounted () {
    this.getHeatmapData();
  },
  methods: {
    getHeatmapData() {
      this.$http.get('/api/getHeatMapSrcPort').then((res) => {
        console.log('热力图--srcPort数据', res.body);
        this.instances = res.body;
      }).then(() => {
        this.drawHeatmap();
      });
    },
    drawHeatmap () {
      console.log(this.instances);
      let instances = this.instances;
      let data = [];
      for (let i=0; i< 10; i++) {
          for (let j=0; j < 10; j++) {
            let arr = [];
            arr.push(i);
            arr.push(j);
            data.push(arr);
          }
        }
        instances.forEach((item, index) => {
          // data[index].push(item.srcPort);
          data[index].push(item.srcAllBytes);
        });
        console.log('新data', data);
      let heatmapChart = this.$echarts.init(document.getElementById('heatSrcPort'));
      app.title = '源端口流量分布图';

      var xData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      var yData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

        let heatmapOption = {
          title: {
            text: '源端口流量分布图',
            left: 'center',
            textStyle: {
              color: '#333',
              fontSize: 12,
            }
          },
            tooltip: {
                position: 'top',
                formatter: function(params) {
                    var res = params.seriesName+'Top100流量<br/>';
                    let subIndex = params.data[0] * 10 + params.data[1];
                    res += instances[subIndex].srcPort;
                    res += ':<br/>' + params.data[2];
                    return res;
                }
            },
            animation: false,
            grid: {
                height: '70%',
                y: '10%',
                x: '13%'
            },
            xAxis: {
                type: 'category',
                data: xData,
                splitArea: {
                    show: true
                },
                axisLine: {
                  lineStyle: {
                    color: 'rgba(255, 255, 255, 0.9)'
                  }
                }
            },
            yAxis: {
                type: 'category',
                data: yData,
                splitArea: {
                    show: true
                },
                axisLine: {
                  lineStyle: {
                    color: 'rgba(255, 255, 255, 0.9)'
                  }
              }
            },
            visualMap: {
                min: 17000000,
                max: 100000,
                calculable: true,
                orient: 'horizontal',
                left: 'center',
                bottom: '3%',
                inRange: {
                  color: ['green','pink','blue','red'],
                }
            },
            series: [{
                name: '总流量',
                type: 'heatmap',
                data: data,
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
                }
            }]
        };
        heatmapChart.setOption(heatmapOption);
    }
  }
};
</script>
