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
    <div class="heatmap-chart" :id="heatOption.ids" style="width: 400px;height: 400px;"></div>
  </div>
</template>

<script>
export default {
  name: 'heatCom',
  props: ['heatOption', 'heatDataObj'],
  data () {
    return {
    };
  },
  mounted () {
    this.drawHeatmap();
  },
  methods: {
    drawHeatmap () {
      let instances = this.heatDataObj;
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
        data[index].push(item.totalItem);
      });
      console.log('heatmap组件数据', data);
      let heatmapLinkSrcIp = this.$echarts.init(document.getElementById(`${this.heatOption.ids}`));

      var xData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      var yData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

        let heatmapOption = {
          title: {
            text: this.heatOption.title,
            left: 'center',
            textStyle: {
              color: '#333',
              fontSize: 12,
            }
          },
            tooltip: {
                position: 'top',
                formatter: function(params) {
                    var res = params.seriesName+'Top100连接数<br/>';
                    let subIndex = params.data[0] * 10 + params.data[1];
                    res += instances[subIndex].dimension;
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
                min: 0,
                max: 5000,
                calculable: true,
                orient: 'horizontal',
                left: 'center',
                bottom: '3%',
                inRange: {
                  color: ['red','blue','black'].reverse(),
                }
            },
            series: [{
                name: this.heatOption.seriesName,
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
        heatmapLinkSrcIp.setOption(heatmapOption);
    }
  }
};
</script>
