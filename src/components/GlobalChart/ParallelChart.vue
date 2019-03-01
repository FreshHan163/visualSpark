<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .layout-wrap {
    height: 100%;
    color: white;
    .parallel-chart {
      margin: 0 auto;
      max-width: 100%;
      max-height: 100%;
      width: 100%;
      height: 500px;
    }
  }
</style>
<template>
  <div class="layout-wrap">
    <div class="parallel-chart" id="parallelChart" style=""></div>
  </div>
</template>

<script>
export default {
  name: 'ParallelChart',
  props: ['legend', 'changeLegendFlag'],
  data () {
    return {
      instances: [],
      timeData: [],
      tcpInstances: [],
      udpInstances: [],
      otherInstances: [],
      srcIpData: [],
      srcPortData: [],
      destIpData: [],
      destPortData: [],
      bytesData: [],
      countData: [],
      pktsData: []
    };
  },
  mounted () {
      this.getParaSrcIp().then(() => {
        this.getParaSrcPort();
      }).then(() => {
        this.getParaDestIp().then(() => {
          this.getParaDestPort();
        }).then(() => {
          this.getParaTotalCount();
        }).then(() => {
          this.getParaTotalBytes();
        }).then(() => {
          this.getParaTotalPackets();
        });
      });
    this.handleData();
  },
  methods: {
    handleData() {
        setTimeout(() => {
          console.log('绘制平行坐标图');
          this.srcIpData.forEach((item, index) => {
            switch (item[1]) {
              case '172.10':
                item.splice(1, 1);
                this.tcpInstances.push(item);
                break;
              case '172.20':
                item.splice(1, 1);
                this.udpInstances.push(item);
                break;
              case '172.30':
                item.splice(1, 1);
                this.otherInstances.push(item);
                break;
              default:
                break;
            }
          });
          this.drawChallParallel();
        }, 3000);
    },
    handleControl() {
      if(this.changeLegendFlag) {
        parallelChart.dispatchAction({
            type: 'selectDataRange',
            selected: this.legend
        });
      }
    },
    getParaSrcIp() {
      return this.axios.get('/api/getSrcIpEntropyHours').then((res) => {
        res.data.forEach((item, index) => {
            this.srcIpData.push(Object.values(item));
            this.timeData.push(item.hours);
        });
      });
    },
    getParaSrcPort() {
      return this.axios.get('/api/getSrcPortEntropyHours').then((res) => {
        res.data.forEach((item, index) => {
          this.srcPortData.push(Object.values(item));
          this.srcIpData[index].push(item.srcPortEntropyTotal);
        });
      });
    },
    getParaDestIp() {
      return this.axios.get('/api/getDestIpEntropyHours').then((res) => {
        res.data.forEach((item, index) => {
          this.destIpData.push(Object.values(item));
          this.srcIpData[index].push(item.destIpEntropyTotal);
        });
      });
    },
    getParaDestPort() {
      return this.axios.get('/api/getDestPortEntropyHours').then((res) => {
        res.data.forEach((item, index) => {
          this.destPortData.push(Object.values(item));
          this.srcIpData[index].push(item.destPortEntropyTotal);
        });
      });
    },
    getParaTotalCount() {
      return this.axios.get('/api/getParaTotalCount').then((res) => {
        res.data.forEach((item, index) => {
          this.countData.push(Object.values(item));
          this.srcIpData[index].push(item.count);
        });
      });
    },
    getParaTotalBytes() {
      return this.axios.get('/api/getParaTotalBytes').then((res) => {
        res.data.forEach((item, index) => {
          this.bytesData.push(Object.values(item));
          this.srcIpData[index].push(item.bytes);
        });
      });
    },
    getParaTotalPackets() {
      return this.axios.get('/api/getParaTotalPackets').then((res) => {
        res.data.forEach((item, index) => {
          this.pktsData.push(Object.values(item));
          this.srcIpData[index].push(item.pkts);
        });
      });
    },
    drawChallParallel() {
      let parallelChart = this.$echarts.init(document.getElementById('parallelChart'));

    var schema = [
        {name: 'date', index: 0, text: '日期'},
        {name: '源IP熵', index: 1, text: '源IP熵'},
        {name: '源端口熵', index: 2, text: '源端口熵'},
        {name: '目的IP熵', index: 3, text: '目的IP熵'},
        {name: '目的端口熵', index: 4, text: ' 目的端口熵'},
        {name: '连接数', index: 5, text: ' 连接数'},
        {name: '字节数', index: 6, text: ' 字节数'},
        {name: '包数', index: 7, text: ' 包数'},
    ];

    var lineStyle = {
        normal: {
            width: 1,
            opacity: 0.5
        }
    };

    let option = {
        legend: {
            bottom: 20,
            data: ['172.10', '172.20', '172.30'],
            itemGap: 20,
            textStyle: {
                color: '#fff',
                fontSize: 14
            }
        },
        parallelAxis: [
            {
              dim: 0,
              name:schema[0].text,
              type: 'category',
              data: this.timeData,
              axisTick: {
                inside: true,
                interval: 12,
                margin: -50,
                // interval: function (value, index) {
                //   var date = new Date(value);
                //     var days = [(date.getMonth() + 1), date.getDate()];
                //     var hours = date.getHours();
                //     if (hours === 0 || days[0] === 1 || days[0] === 2) {
                //       return true;
                //     }
                //     return false;
                // },
                length: 10
              },
              axisLabel: {
                  interval: 12,
                  formatter: function(value, index) {
                    var date = new Date(value);
                    var days = [(date.getMonth() + 1), date.getDate()];
                    var hours = [date.getHours(), date.getMinutes()];
                    var texts = '';
                    // if (hours[0] === 0 || hours[0] === 12 || days[1] === 1 & hours[0] === 15 || days[1] === 2 & hours[0] === 13) {
                    //   texts = days.join('/') + ' ' + hours.join(':') + '0';
                    // }
                      texts = days.join('/') + ' ' + hours.join(':') + '0';
                    return texts;
                  },
                  textStyle: {
                      color: 'white'
                  }
              }
            },
            {dim: 1, name: schema[1].text},
            {dim: 2, name: schema[2].text},
            {dim: 3, name: schema[3].text},
            {dim: 4, name: schema[4].text},
            {dim: 5, name: schema[5].text},
            {dim: 6, name: schema[6].text},
            {dim: 7, name: schema[7].text}
        ],
        visualMap: {
            show: true,
            min: 0,
            max: 1,
            right: 12,
            bottom: 200,
            dimension: 6,
            type: 'piecewise',
            inRange: {
                color: ['#d94e5d','#eac736','#50a3ba'].reverse(),
                // colorAlpha: [0, 1]
            },
            textStyle: {
              color: 'white'
            }
        },
        parallel: {
            left: '5%',
            right: '10%',
            bottom: 100,
            width: 1000,
            parallelAxisDefault: {
                type: 'value',
                // name: 'AQI指数',
                silent: 'true',
                triggerEvent: 'true',
                nameLocation: 'end',
                nameGap: 20,
                nameTextStyle: {
                    color: '#fff',
                    fontSize: 12
                },
                axisLine: {
                    lineStyle: {
                        color: '#aaa'
                    }
                },
                axisTick: {
                    lineStyle: {
                        color: '#777'
                    }
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff'
                    }
                }
            }
        },
        series: [
            {
                name: '172.10',
                type: 'parallel',
                lineStyle: lineStyle,
                data: this.tcpInstances
            },
            {
                name: '172.20',
                type: 'parallel',
                lineStyle: lineStyle,
                data: this.udpInstances
            },
            {
                name: '172.30',
                type: 'parallel',
                lineStyle: lineStyle,
                data: this.otherInstances
            }
        ]
    };
    parallelChart.setOption(option);
    // parallelChart.dispatchAction({
        // type: 'selectDataRange',
        // 选取 20 到 40 的值范围
        // selected: [0.8, 1],
        // // 取消选中第二段
        // selected: { 1: false },
        // // 取消选中类目 `优`
        // selected: { '优': false }
    // });
      // parallelChart.on('axisareaselected', function () {
      //     var series0 = parallelChart.getModel().getSeries()[0];
      //     var series1 = parallelChart.getModel().getSeries()[1];
      //     var indices0 = series0.getRawIndicesByActiveState('active');
      //     var indices1 = series1.getRawIndicesByActiveState('active');
      //     console.log(indices0, indices1);
      //     console.log(series0, series1);
      // });
      // parallelChart.on('mouseover', function (params) {
      //     console.log(params);
      // });
    }
  }
};
</script>
