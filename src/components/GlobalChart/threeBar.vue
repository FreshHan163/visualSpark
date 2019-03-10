<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .layout-wrap {
    height: 100%;
    width: 100%;
    .three-bar-chart {
      width: 100%;
      height: 500px;
      margin: 0 auto;
    }
  }
</style>
<template>
  <div class="layout-wrap">
    <div class="three-bar-chart" ref="threeBarChart" style=""></div>
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'threeBarChart',
  props: ['legend', 'changeLegendFlag'],
  data () {
    return {
      instances: [],
      xData: [],
      yData: [],
      zData: [],
      threeBar: '',
    };
  },
  mounted () {
    this.getBarData();
    this.threeBarChart = echarts.init(this.$refs.threeBarChart);
  },
  watch: {
      legend: {
        handler(newValue, oldValue) {
          let flag = false;
          for (let i = 0; i < newValue.length; i++) {
　　　　　　　　if (oldValue[i] != newValue[i]) {
                flag = true;
                break;
　　　　　　　　}
　　　　　　}
          if (flag) {
            this.handleControl(this.threeBarChart);
          }
        },
        immediate: true,
        deep: true
      }
  },

  methods: {
    getBarData() {
      this.axios.get('/api/getThreeBar', {params: {table: 'dw_log_3d_count0406_mins'}}).then((res) => {
        console.log('获取的数据为', res.data);
        this.instances = res.data;
      }).then(() => {
        this.drawThreeBar();
      });
    },
    drawThreeBar () {
      let threeBarChart = echarts.init(this.$refs.threeBarChart);
      console.log('创建三维柱状图！');
      let data = [];
      this.instances.forEach(item => {
        let arr = [];
        for (let i in item) {
          arr.push(item[i]);
        }
        data.push(arr);
      });
      let threeBarption = {
          tooltip: {
            formatter: function (params) {
              return params.seriesName + '<br/>' + params.data;
            }
          },
          visualMap: {
              max: 180,
              min: 0,
              type: 'piecewise',
              right: 12,
              bottom: 200,
              dimension: 'srcAllBytes',
              inRange: {
                  color: ['#d94e5d','#eac736','#50a3ba'].reverse(),
              },
              textStyle: {
                color: '#fff'
              }
          },
          xAxis3D: {
              type: 'category',
              name: '',
              axisLabel: {
                show: true,
                margin: 5,
                textStyle: {
                  color: 'white'
                },
                interval: 5,
                formatter: function (value, index) {
                    // 格式化成月/日，小时:分钟
                    var date = new Date(value);
                    var days = [(date.getMonth() + 1), date.getDate()];
                    var hours = [date.getHours(), date.getMinutes()];
                    var time = '';
                      time = days.join('/') + '\n' + hours.join(':') + '0';
                    return time;
                }
              }
          },
          yAxis3D: {
              type: 'category',
              nameGap: 10,
              axisLabel: {
                show: true,
                textStyle: {
                  color: 'white'
                }
              }
          },
          zAxis3D: {
              type: 'value',
              name: '流量/MB',
              nameTextStyle: {
                color: 'white'
              },
              nameGap: 20,
              axisLabel: {
                formatter: function(value, index) {
                  return value;
                },
                textStyle: {
                  color: 'white'
                }
              },
          },
          grid3D: {
              boxWidth: 400,
              boxHeight: 100,
              boxDepth: 130,
              left: -80,
              top: -40,
              viewControl: {
                  distance: 320,
              },
              light: {
                  main: {
                      intensity: 1.2,
                      shadow: true
                  },
                  ambient: {
                      intensity: 0.3
                  }
              },
              axisPointer: {
                show: true,
                lineStyle: {
                  color: 'red',
                  width: 2,
                  type: 'dashed'
                }
              }
          },
          dataset: {
            dimensions: [
              'days',
              'protocolCode',
              'srcAllBytes'
            ],
            source: data
          },
          series: [
              {
                type: 'bar3D',
                name: '流量时序图',
                shading: 'lambert',
                encode: {
                    x: 'days',
                    y: 'protocolCode',
                    z: 'srcAllBytes',
                    tooltip: [0, 1, 2],
                    label: 2
                },
                label: {
                  formatter: function (params) {
                    return params.data[2];
                  }
                },
                itemStyle: {
                    // opacity: 0.4
                },
                emphasis: {
                    label: {
                        textStyle: {
                            fontSize: 20,
                            color: '#64A0B7'
                        }
                    },
                    itemStyle: {
                        color: 'green',
                        shadowBlur: 200,
                        opacity: 0.3,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowOffsetX: 3,
                        shadowOffsetY: 3,
                    }
                }
              }
          ]
      };
      threeBarChart.setOption(threeBarption);
      // this.threeBarChart.setOption(threeBarption);
      this.handleControl(threeBarChart);
      // if(this.changeLegendFlag) {
      //   threeBarChart.dispatchAction({
      //       type: 'selectDataRange',
      //       selected: this.legend
      //   });
      // }
      // threeBarChart.dispatchAction({
      //     type: 'selectDataRange',
      //     selected: ['0-40', '40-80', '80-120'],
      // });
      threeBarChart.on('click', (parmas) => {
        this.$router.push({path: '/detail', query: { id: '1'}});
        console.log(parmas);
          // $.get('detail?q=' + params.name, function (detail) {
          //     myChart.setOption({
          //         series: [{
          //             name: 'pie',
          //             // 通过饼图表现单个柱子中的数据分布
          //             data: [detail.data]
          //         }]
          //     });
          // });
      });
      threeBarChart.on('mouseover', function (parmas) {
        // console.log(parmas);
          // $.get('detail?q=' + params.name, function (detail) {
          //     myChart.setOption({
          //         series: [{
          //             name: 'pie',
          //             // 通过饼图表现单个柱子中的数据分布
          //             data: [detail.data]
          //         }]
          //     });
          // });
      });
    },
    handleControl(chart) {
      if(this.changeLegendFlag) {
        chart.dispatchAction({
            type: 'selectDataRange',
            selected: this.legend
        });
      }
    },
  }
};
</script>
