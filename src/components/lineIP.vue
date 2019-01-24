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
    <div class="line-ip-chart" ref="lineIpChart" style="width: 600px;height: 180px;"></div>
    <div class="line-ip-chart" ref="linePortChart" style="width: 600px;height: 180px;"></div>
    <!-- <div class="line-ip-chart" ref="destIpChart15" style="width: 600px;height: 180px;"></div> -->
    <div class="line-ip-chart" ref="destIpChart03" style="width: 600px;height: 180px;"></div>
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
      detailIp: [],
      srcIp0619: [],
      srcPort51358: [],
      destIp15: [],
      destIp03: []
    };
  },
  created () {
    this.getSrcPort51358().then(() => {
      this.drawSrcPortBar();
    });
    this.getDestIp15().then(() => {
      this.drawBarDestIp15();
    });
    this.getDestIp03().then(() => {
      this.drawBarDestIp03();
    });
    this.$http.get('/api/getSrcIp0619').then((res) => {
      res.body.forEach((item) => {
        item.bytes = item.bytes / 1000000;
        // item.links = item.links;
      });
      this.detailIp = res.body;
      console.log('处理后的源IP分布图', this.detailIp);
    }).then(() => {
      // this.getTimeData();
      this.drawBar();
      // this.drawBarLine();
    });
  },
  methods: {
    getSrcPort51358() {
      return this.$http.get('/api/getSrcPort0619_51358').then((res) => {
        res.body.forEach((item) => {
          item.bytes = item.bytes / 1000000;
          // item.links = item.links;
        });
        this.srcPort51358 = res.body;
      });
    },
    getDestIp15() {
      return this.$http.get('/api/getDestIp061915').then((res) => {
        res.body.forEach((item) => {
          item.bytes = item.bytes / 1000000;
          // item.links = item.links;
        });
        this.destIp15 = res.body;
      });
    },
    getDestIp03() {
      return this.$http.get('/api/getDestIp061903').then((res) => {
        res.body.forEach((item) => {
          item.bytes = item.bytes / 1000000;
          // item.links = item.links;
        });
        this.destIp03 = res.body;
      });
    },
    drawSrcPortBar () {
      let lineChart = echarts.init(this.$refs.linePortChart);
      var colors = ['#5793f3', '#d14a61', '#675bba'];
      let lineOption = {
        title: {
          text: '源端口--51358流量时序图',
          left: 'center',
          textStyle: {
            color: '#333',
            fontSize: 16,
          }
        },
        color: colors,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            showContent: false
            // formatter: function (params) {
                // var params = params[0];
                // var date = new Date(params.name);
                // return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
                // return params.value[1];
            // },
        },
        grid: {
            right: '20%'
        },
        dataset: {
          source: this.srcPort51358
        },
        legend: {
            data:['字节数'],
            show: false
        },
        dataZoom: [{
            type: 'inside',
            start: 0,
            end: 10
        },
         {
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
        }
        ],
        xAxis: [
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                  interval: 24,
                  formatter: function(value, index) {
                    var date = new Date(value);
                    var days = [(date.getMonth() + 1), date.getDate()];
                    var hours = [date.getHours(), date.getMinutes()];
                    var time = '';
                      time = days.join('/') + '\n' + hours.join(':') + '0';
                    return time;
                  }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '字节数/M',
                min: 0,
                // max: 250,
                position: 'left',
                axisLine: {
                    lineStyle: {
                        color: colors[0]
                    }
                },
                axisLabel: {
                    // formatter: '{value}'
                }
            }
        ],
        series: [
            {
                name:'字节数',
                type:'bar',
                encode: {
                  tooltip: [0, 1],
                  x: 0,
                  y: 1
                }
            }
        ]
      }
      lineChart.setOption(lineOption);
    },
    drawBar () {
      let lineChart = echarts.init(this.$refs.lineIpChart);
      var colors = ['#5793f3', '#d14a61', '#675bba'];
      let lineOption = {
        title: {
          text: '源IP--10.7.5.5流量时序图',
          left: 'center',
          textStyle: {
            color: '#333',
            fontSize: 16,
          }
        },
        color: colors,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            showContent: false
            // formatter: function (params) {
                // var params = params[0];
                // var date = new Date(params.name);
                // return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
                // return params.value[1];
            // },
        },
        grid: {
            right: '20%'
        },
        dataset: {
          source: this.detailIp
        },
        legend: {
            data:['字节数'],
            show: false
        },
        dataZoom: [{
            type: 'inside',
            start: 0,
            end: 10
        },
         {
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
        }
        ],
        xAxis: [
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                  interval: 24,
                  formatter: function(value, index) {
                    var date = new Date(value);
                    var days = [(date.getMonth() + 1), date.getDate()];
                    var hours = [date.getHours(), date.getMinutes()];
                    var time = '';
                      time = days.join('/') + '\n' + hours.join(':') + '0';
                    return time;
                  }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '字节数/M',
                min: 0,
                // max: 250,
                position: 'left',
                axisLine: {
                    lineStyle: {
                        color: colors[0]
                    }
                },
                axisLabel: {
                    // formatter: '{value}'
                }
            }
        ],
        series: [
            {
                name:'字节数',
                type:'bar',
                encode: {
                  tooltip: [0, 1],
                  x: 0,
                  y: 1
                }
            }
        ]
      }
      lineChart.setOption(lineOption);
    },
    drawBar () {
      let lineChart = echarts.init(this.$refs.lineIpChart);
      var colors = ['#5793f3', '#d14a61', '#675bba'];
      let lineOption = {
        title: {
          text: '源IP--10.7.5.5流量时序图',
          left: 'center',
          textStyle: {
            color: '#333',
            fontSize: 16,
          }
        },
        color: colors,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            showContent: false
        },
        grid: {
            right: '20%'
        },
        dataset: {
          source: this.detailIp
        },
        legend: {
            data:['字节数'],
            show: false
        },
        dataZoom: [{
            type: 'inside',
            start: 0,
            end: 10
        },
         {
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
        }
        ],
        xAxis: [
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                  interval: 24,
                  formatter: function(value, index) {
                    var date = new Date(value);
                    var days = [(date.getMonth() + 1), date.getDate()];
                    var hours = [date.getHours(), date.getMinutes()];
                    var time = '';
                      time = days.join('/') + '\n' + hours.join(':') + '0';
                    return time;
                  }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '字节数/M',
                min: 0,
                // max: 250,
                position: 'left',
                axisLine: {
                    lineStyle: {
                        color: colors[0]
                    }
                },
                axisLabel: {
                    // formatter: '{value}'
                }
            }
        ],
        series: [
            {
                name:'字节数',
                type:'bar',
                encode: {
                  tooltip: [0, 1],
                  x: 0,
                  y: 1
                }
            }
        ]
      }
      lineChart.setOption(lineOption);
    },
    drawBarDestIp15 () {
      let lineChart = echarts.init(this.$refs.destIpChart15);
      var colors = ['#5793f3', '#d14a61', '#675bba'];
      let lineOption = {
        title: {
          text: '目的IP--172.20.0.15流量时序图',
          left: 'center',
          textStyle: {
            color: '#333',
            fontSize: 16,
          }
        },
        color: colors,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            showContent: false
        },
        grid: {
            right: '20%'
        },
        dataset: {
          source: this.destIp15
        },
        legend: {
            data:['字节数'],
            show: false
        },
        dataZoom: [{
            type: 'inside',
            start: 0,
            end: 10
        },
         {
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
        }
        ],
        xAxis: [
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                  interval: 24,
                  formatter: function(value, index) {
                    var date = new Date(value);
                    var days = [(date.getMonth() + 1), date.getDate()];
                    var hours = [date.getHours(), date.getMinutes()];
                    var time = '';
                      time = days.join('/') + '\n' + hours.join(':') + '0';
                    return time;
                  }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '字节数/M',
                min: 0,
                // max: 250,
                position: 'left',
                axisLine: {
                    lineStyle: {
                        color: colors[0]
                    }
                },
                axisLabel: {
                    // formatter: '{value}'
                }
            }
        ],
        series: [
            {
                name:'字节数',
                type:'bar',
                encode: {
                  tooltip: [0, 1],
                  x: 0,
                  y: 1
                }
            }
        ]
      }
      lineChart.setOption(lineOption);
    },
    drawBarDestIp03 () {
      let lineChart = echarts.init(this.$refs.destIpChart03);
      var colors = ['#5793f3', '#d14a61', '#675bba'];
      let lineOption = {
        title: {
          text: '目的IP--172.20.0.03流量时序图',
          left: 'center',
          textStyle: {
            color: '#333',
            fontSize: 16,
          }
        },
        color: colors,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            showContent: false
        },
        grid: {
            right: '20%'
        },
        dataset: {
          source: this.destIp03
        },
        legend: {
            data:['字节数'],
            show: false
        },
        dataZoom: [{
            type: 'inside',
            start: 0,
            end: 10
        },
         {
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
        }
        ],
        xAxis: [
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                  interval: 24,
                  formatter: function(value, index) {
                    var date = new Date(value);
                    var days = [(date.getMonth() + 1), date.getDate()];
                    var hours = [date.getHours(), date.getMinutes()];
                    var time = '';
                      time = days.join('/') + '\n' + hours.join(':') + '0';
                    return time;
                  }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '字节数/M',
                min: 0,
                // max: 250,
                position: 'left',
                axisLine: {
                    lineStyle: {
                        color: colors[0]
                    }
                },
                axisLabel: {
                    // formatter: '{value}'
                }
            }
        ],
        series: [
            {
                name:'字节数',
                type:'bar',
                encode: {
                  tooltip: [0, 1],
                  x: 0,
                  y: 1
                }
            }
        ]
      }
      lineChart.setOption(lineOption);
    },
  }
};
</script>
