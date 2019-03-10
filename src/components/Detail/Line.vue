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
    <div class="line-ip-chart" ref="lineIpChart" style="width: 800px;height: 400px;"></div>
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
      srcIp1722003Data: [],
      srcIp10755Data: [],
      destIp100012Data: [],
      destIp17220015Data: []
    };
  },
  created () {
      this.getAllData().then(() => {
          this.drawLine();
      });
  },
  methods: {
    getAllData() {
        // 4.5 07:20的源IP和目的IP
        // let srcIp1722003 = new Promise(() => {
        //     return this.getData('srcIp1722003', 'srcIp_1722003');
        // });
        // let destIp100012 = new Promise(() => {
        //     return this.getData('destIp100012', 'destIp_100012');
        // });
        // let srcIp10755 = new Promise(() => {
        //     return this.getData('srcIp10755', 'srcIp_10755');
        // });
        // let destIp17220015 = new Promise(() => {
        //     return this.getData('destIp17220015', 'destIp_17220015');
        // });
        let srcIp1722003 = this.getData('srcIp1722003', 'srcIp_1722003');
        let srcIp10755= this.getData('srcIp10755', 'srcIp_10755');
        let destIp100012 = this.getData('destIp100012', 'destIp_100012');
        let destIp17220015 = this.getData('destIp17220015', 'destIp_17220015');
        return Promise.all([srcIp1722003, srcIp10755, destIp100012, destIp17220015]).then((res) => {
            console.log('折线图最终数据： data = ', this.data);
            this.data.srcIp1722003.map((item) => {
                this.srcIp1722003Data.push(item.bytes);
            });
            this.data.srcIp10755.map((item) => {
                this.srcIp10755Data.push(item.bytes);
            });
            this.data.destIp100012.map((item) => {
                this.destIp100012Data.push(item.bytes);
            });
            this.data.destIp17220015.map((item) => {
                this.destIp17220015Data.push(item.bytes);
            });
            // this.srcIp10755Data = this.data.srcIp10755;
            // this.destIp100012Data = this.data.destIp100012;
            // this.destIp17220015Data = this.data.destIp17220015;
            console.log('srcIp1722003Data data = ', this.srcIp1722003Data);
        });
    },
    getData(name, queryIp) {
        console.log('name = ', name, 'queryIp = ', queryIp);
        return this.axios.get('/api/getIp', {params: {ip: queryIp}})
            .then((res) => {
                res.data.forEach((item) => {
                    item.bytes = (item.bytes / 1024).toFixed(2);
                    if (name === 'srcIp1722003') {
                        this.time.push(item.mins);
                    }
                });
                this.data[name] = res.data;
        });
    },
    // getData(ip) {
    //   return this.axios.get('/api/getIp').then((res) => {
    //     res.data.forEach((item) => {
    //       item.bytes = (item.bytes / 1024).toFixed(2);
    //       this.time.push(item.mins);
    //     });
    //     console.log('折线图数据', res.data);
    //     this.data = res.data;
    //   });
    // },
    drawLine () {
      let lineChart = echarts.init(this.$refs.lineIpChart);
      var colors = ['#5793f3', '#d14a61', '#675bba'];
      let lineOption = {
        // color: colors,
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}'
        },
        // tooltip: {
        //     trigger: 'axis',
        //     axisPointer: {
        //         // type: 'cross',
        //         label: {
        //             backgroundColor: '#6a7985'
        //         }
        //     },
        //     // showContent: false,
        //     formatter: function (params) {
        //         let mins = params[0].value.mins;
        //         let bytes = params[0].value.bytes;
        //         // 处理时间
        //         var date = new Date(mins);
        //         var days = [(date.getMonth() + 1), date.getDate()];
        //         var hours = [date.getHours(), date.getMinutes()];
        //         var time = '';
        //             time = days.join('/') + '\n' + hours.join(':');
        //         return `${params[0].seriesName}<br />${time}: ${bytes}KB`;
        //     },
        // },
        grid: {
            right: '5%'
        },
        // dataset: {
        //   source: this.data.srcIp1722003
        // },
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
                data: this.time,
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                  interval: 100,
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
                type: 'value',
                name: '字节数/KB',
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
                name:'源IP 172.20.0.3',
                type:'line',
                data: this.srcIp1722003Data,
                // lineStyle: {
                //     color: 'red',
                //     width: '3'
                // }
                // encode: {
                //   tooltip: [0, 1],
                //   x: 0,
                //   y: 1
                // }
            },
            // {
            //     name:'源IP 10.7.5.5',
            //     type:'line',
            //     data: this.srcIp10755Data,
            //     // encode: {
            //     //   tooltip: [0, 1],
            //     //   x: 0,
            //     //   y: 1
            //     // }
            // },
            {
                name:'目的IP 10.0.0.12',
                type:'line',
                data: this.destIp100012Data,
                lineStyle: {
                    color: '#039647',
                    width: '4',
                }
                // encode: {
                //   tooltip: [0, 1],
                //   x: 0,
                //   y: 1
                // }
            },
            {
                name:'目的IP 172.20.0.15',
                type:'line',
                data: this.destIp17220015Data,
                // encode: {
                //   tooltip: [0, 1],
                //   x: 0,
                //   y: 1
                // }
            }
        ]
      }
      lineChart.setOption(lineOption);
    }
  }
};
</script>
