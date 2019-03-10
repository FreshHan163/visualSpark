<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .layout-wrap {
    height: 100%;
    color: white;
    .line-ip-chart {
      margin: 0 auto;
      max-width: 100%;
      max-height: 100%;
    }
  }
</style>
<template>
  <div class="layout-wrap">
    <div class="line-ip-chart" ref="lineIpChart" style="width: 1000px;height: 560px;"></div>
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'Line',
  data () {
    return {
      instances: [],
      data: [],
      time: [],
      timeFlag: false,
      srcIp109815Data: [],
      destIp1723003Data: [],
      srcPort51358Data: [],
      destIp17220015Data: [],
      data1: [],
      data2: [],
      data3: [],
      data4: [],
      name1: '目的主机172.30.0.4',
      name2: '源IP10.7.7.10',
      name3: '源IP10.16.5.15',
      name4: '源端口80',
    };
  },
  created () {
      this.getAllData().then(() => {
          this.drawLine();
      });
  },
  methods: {
    getAllData() {
        let data1 = this.getData('data1', 'destIp_1723004');
        let data2 = this.getData('data2', 'srcIp_107710');
        let data3 = this.getData('data3', 'srcIp_1016515');
        let data4 = this.getData('data4', 'srcPort_80');
        return Promise.all([data1, data2, data3, data4]).then((res) => {
            this.data.data1.map((item) => {
                this.data1.push(item.bytes);
            });
            this.data.data2.map((item) => {
                this.data2.push(item.bytes);
            });
            this.data.data3.map((item) => {
                this.data3.push(item.bytes);
            });
            this.data.data4.map((item) => {
                this.data4.push(item.bytes);
            });
        });
    },
    getData(name, queryIp) {
        return this.axios.get('/api/getIp', {params: {ip: queryIp}})
            .then((res) => {
                res.data.forEach((item) => {
                    // item.bytes = (item.bytes / 1024).toFixed(2);
                    if (name === 'data1') {
                        this.time.push(item.mins);
                    }
                });
                this.data[name] = res.data;
        });
    },
    drawLine () {
      let lineChart = echarts.init(this.$refs.lineIpChart);
      var colors = ['#5793f3', '#d14a61', '#675bba'];
      let lineOption = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}'
        },
        dataZoom: [{
            type: 'slider',
            xAxisIndex: [0, 1, 2, 3],
            realtime: false,
            start: 0,
            end: 10,
            top: 540,
            height: 12,
            handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '120%'
        }],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            backgroundColor: 'rgba(245, 245, 245, 0.8)',
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            textStyle: {
                color: '#000'
            },
            position: function (pos, params, el, elRect, size) {
                var obj = {top: 10};
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
                return obj;
            },
            extraCssText: 'width: 200px',
            formatter: function(params) {
                let time = params[0].name;
                let first, sec, third, four;
                params.map((item) => {
                    switch(item.seriesIndex) {
                        case 0:
                            first = `${params[0].seriesName}：${params[0].value}KB`;
                            break;
                        case 1:
                            sec = `${params[1].seriesName}：${params[1].value}KB`;
                            break;
                        case 2:
                            third = `${params[2].seriesName}：${params[2].value}KB`;
                            break;
                        case 3:
                            four = `${params[3].seriesName}：${params[3].value}KB`;
                            break;
                        default:
                            break;
                    }
                });
                // let first = `${params[0].seriesName}：${params[0].value}KB`;
                // let sec = `${params[1].seriesName}：${params[1].value}KB`;
                // let third = `${params[2].seriesName}：${params[2].value}KB`;
                // let four = `${params[3].seriesName}：${params[3].value}KB`;

                return `${time}<br />${sec}<br />${first}<br />${third}<br />${four}<br />`;
            }
        },
        axisPointer: {
            link: {xAxisIndex: 'all'},
            label: {
                backgroundColor: '#777'
            }
        },
        grid: [
            {top: '6%', left: '6%', width: '90%', height: '12%'},
            {top: '30%', left: '6%', width: '90%', height: '12%'},
            {top: '53%', left: '6%', width: '90%', height: '12%'},
            {top: '78%', left: '6%', width: '90%', height: '12%'}
        ],
        xAxis: [
            {
                gridIndex: 0, type: 'category', data: this.time,
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                  interval: 20,
                  textStyle: {
                      color: 'white'
                  },
                  formatter: function(value, index) {
                    var date = new Date(value);
                    var days = [(date.getMonth() + 1), date.getDate()];
                    var hours = [date.getHours(), date.getMinutes()];
                    var time = '';
                      time = days.join('/') + '\n' + hours.join(':');
                    return time;
                  }
                }
            },
            {
                gridIndex: 1, type: 'category', data: this.time,
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                  interval: 20,
                  textStyle: {
                      color: 'white'
                  },
                  formatter: function(value, index) {
                    var date = new Date(value);
                    var days = [(date.getMonth() + 1), date.getDate()];
                    var hours = [date.getHours(), date.getMinutes()];
                    var time = '';
                      time = days.join('/') + '\n' + hours.join(':');
                    return time;
                  }
                }
            },
            {
                gridIndex: 2, type: 'category', data: this.time,
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                  interval: 20,
                  textStyle: {
                      color: 'white'
                  },
                  formatter: function(value, index) {
                    var date = new Date(value);
                    var days = [(date.getMonth() + 1), date.getDate()];
                    var hours = [date.getHours(), date.getMinutes()];
                    var time = '';
                      time = days.join('/') + '\n' + hours.join(':');
                    return time;
                  }
                }
            },
            {
                gridIndex: 3, type: 'category', data: this.time,
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                  interval: 20,
                  textStyle: {
                      color: 'white'
                  },
                  formatter: function(value, index) {
                    var date = new Date(value);
                    var days = [(date.getMonth() + 1), date.getDate()];
                    var hours = [date.getHours(), date.getMinutes()];
                    var time = '';
                      time = days.join('/') + '\n' + hours.join(':');
                    return time;
                  }
                }
            }
        ],
        yAxis: [
            {
                gridIndex: 0,
                min: 0,
                type: 'value',
                name: this.name1,
                nameTextStyle: {
                    color: 'white',
                    fontSize: '14'
                },
                axisLine: {
                    lineStyle: {
                        color: colors[0]
                    }
                }
            },
            {
                gridIndex: 1,
                min: 0,
                type: 'value',
                name: this.name2,
                nameTextStyle: {
                    color: 'white',
                    fontSize: '14'
                },
                axisLine: {
                    lineStyle: {
                        color: colors[0]
                    }
                }
            },
            {
                gridIndex: 2,
                min: 0,
                type: 'value',
                name: this.name3,
                nameTextStyle: {
                    color: 'white',
                    fontSize: '14'
                },
                axisLine: {
                    lineStyle: {
                        color: colors[0]
                    }
                }
            },
            {
                gridIndex: 3,
                min: 0,
                type: 'value',
                name: this.name4,
                nameTextStyle: {
                    color: 'white',
                    fontSize: '14'
                },
                axisLine: {
                    lineStyle: {
                        color: colors[0]
                    }
                }
            }
        ],
        series: [
            {
                name: this.name4,
                type:'line',
                data: this.data4,
                xAxisIndex: 3,
                yAxisIndex: 3,
                lineStyle: {
                    color: 'red',
                    width: '4'
                }
            },
            {
                name: this.name3,
                type:'line',
                data: this.data3,
                xAxisIndex: 2,
                yAxisIndex: 2,
                lineStyle: {
                    color: 'rgb(129, 227, 238)',
                    width: '4',
                }
            },
            {
                name: this.name2,
                type:'line',
                data: this.data2,
                lineStyle: {
                    color: '#039647',
                    width: '4',
                },
                xAxisIndex: 1,
                yAxisIndex: 1,
            },
            {
                name: this.name1,
                type:'line',
                data: this.data1,
                xAxisIndex: 0,
                yAxisIndex: 0
            }
        ]
      }
      lineChart.setOption(lineOption);
    }
  }
};
</script>
