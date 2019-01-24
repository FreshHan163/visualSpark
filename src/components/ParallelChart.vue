<!-- Add "scoped" attribute to limit CSS to this component only -->
import func from './vue-temp/vue-editor-bridge';
<style lang="less">
  .layout-wrap {
    height: 100%;
    color: white;
    .parallel-chart {
      // border: 1px solid blueviolet;
      margin: 0 auto;
      max-width: 100%;
      max-height: 100%;
    }
  }
</style>
<template>
  <div class="layout-wrap">
    <div class="parallel-chart" id="parallelChart" style="width: 1200px;height: 500px;"></div>
  </div>
</template>

<script>
export default {
  name: 'ParallelChart',
  data () {
    return {
      msg: 'hello',
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
    // this.getParaDestPortData();
    // this.getParaAllDestPort();
    this.getTimeData();
  },
  methods: {
    getTimeData() {
      this.$http.get('/api/getParaTimeData').then((res) => {
        res.body.forEach((item) => {
          this.timeData = this.timeData.concat(Object.values(item));
        });
        console.log('处理后的数组timeData', this.timeData);

      }).then(() => {
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
      }).then(() => {
        setTimeout(() => {
          console.log('绘制平行坐标图');
          console.log(this.srcIpData);
          this.srcIpData.forEach((item, index) => {
            switch (item[1]) {
              case 'TCP':
                item.splice(1, 1);
                this.tcpInstances.push(item);
                break;
              case 'UDP':
                item.splice(1, 1);
                this.udpInstances.push(item);
                break;
              case 'OTHER':
                item.splice(1, 1);
                this.otherInstances.push(item);
                break;
              default:
                break;
            }
          });
          console.log('tcpInstances:', this.tcpInstances);
          console.log('udpInstances:', this.udpInstances);
          console.log('otherInstances:', this.otherInstances);
          this.drawChallParallel();
        }, 3000);
      });
    },
    getParaSrcIp() {
      // this.$http.get('/api/getParaSrcIp').then((res) => {
      return this.$http.get('/api/getSrcIpEntropyHours').then((res) => {
        res.body.forEach((item, index) => {
          // if (!item.srcIpEntropyTotal) {
          //   item.srcIpEntropyTotal = 0;
          // }
          // console.log(this.timeData[index])
            this.srcIpData.push(Object.values(item));

          // if (this.timeData[index] == item.hours) {
          // } else {
          //   let data = [item.hours, 0, 0];
          //   this.srcIpData.push(data);
          // }
        });
        console.log('平行坐标图----srcIp数据', this.srcIpData);
      });
    },
    getParaSrcPort() {
      // this.$http.get('/api/getParaSrcPort').then((res) => {
      return this.$http.get('/api/getSrcPortEntropyHours').then((res) => {
        res.body.forEach((item, index) => {
          // if (!item.srcPortEntropyTotal) {
          //   item.srcPortEntropyTotal = 0;
          // }
          this.srcPortData.push(Object.values(item));
          this.srcIpData[index].push(item.srcPortEntropyTotal);
        });
        console.log('平行坐标图----srcPort数据', this.srcPortData);
      });
    },
    getParaDestIp() {
      // this.$http.get('/api/getParaDestIp').then((res) => {
      return this.$http.get('/api/getDestIpEntropyHours').then((res) => {
        res.body.forEach((item, index) => {
          // if (!item.destIpEntropyTotal) {
          //   item.destIpEntropyTotal = 0;
          // }
          this.destIpData.push(Object.values(item));
          // this.srcIpData[index].push(item.destIpEntropy);
          this.srcIpData[index].push(item.destIpEntropyTotal);
        });
        console.log('平行坐标图----destIp数据', this.destPortData);
      });
    },
    getParaDestPort() {
      // this.$http.get('/api/getParaDestPort').then((res) => {
      return this.$http.get('/api/getDestPortEntropyHours').then((res) => {
        res.body.forEach((item, index) => {
          // if (!item.destPortEntropyTotal) {
          //   item.destPortEntropyTotal = 0;
          // }
          this.destPortData.push(Object.values(item));
          // this.srcIpData[index].push(item.destPortEntropy);
          this.srcIpData[index].push(item.destPortEntropyTotal);
        });
        console.log('平行坐标图----destPort数据', this.destPortData);
      });
    },
    getParaTotalCount() {
      return this.$http.get('/api/getParaTotalCount').then((res) => {
        res.body.forEach((item, index) => {
          // if (!item.destPortEntropyTotal) {
          //   item.destPortEntropyTotal = 0;
          // }
          this.countData.push(Object.values(item));
          this.srcIpData[index].push(item.count);
        });
        console.log('连接数完成！');
      });
    },
    getParaTotalBytes() {
      return this.$http.get('/api/getParaTotalBytes').then((res) => {
        res.body.forEach((item, index) => {
          // if (!item.destPortEntropyTotal) {
          //   item.destPortEntropyTotal = 0;
          // }
          this.bytesData.push(Object.values(item));
          this.srcIpData[index].push(item.bytes);
        });
        console.log('字节数完成！');
      });
    },
    getParaTotalPackets() {
      return this.$http.get('/api/getParaTotalPackets').then((res) => {
        res.body.forEach((item, index) => {
          // if (!item.destPortEntropyTotal) {
          //   item.destPortEntropyTotal = 0;
          // }
          this.pktsData.push(Object.values(item));
          this.srcIpData[index].push(item.packets);
        });
      }).then(() => {
        // setTimeout(() => {
        //           console.log('绘制平行坐标图');
        // console.log(this.srcIpData);
        // this.srcIpData.forEach((item, index) => {
        //   switch (item[1]) {
        //     case 'TCP':
        //       item.splice(1, 1);
        //       this.tcpInstances.push(item);
        //       break;
        //     case 'UDP':
        //       item.splice(1, 1);
        //       this.udpInstances.push(item);
        //       break;
        //     case 'OTHER':
        //       item.splice(1, 1);
        //       this.otherInstances.push(item);
        //       break;
        //     default:
        //       break;
        //   }
        // });

        // console.log('tcpInstances:', this.tcpInstances);
        // console.log('udpInstances:', this.udpInstances);
        // console.log('otherInstances:', this.otherInstances);
        // this.drawChallParallel();

        // }, 0);
      });
    },
    drawChallParallel () {
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
        backgroundColor: '#333',
        legend: {
            // center: 10,
            bottom: 10,
            data: ['TCP', 'UDP', 'OTHER'],
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
            right: 0,
            dimension: 6,
            type: 'piecewise',
            // inRange: {
            //       color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
            //   },
            inRange: {
                color: ['#d94e5d','#eac736','#50a3ba'].reverse(),
                // colorAlpha: [0, 1]
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
                name: 'TCP',
                type: 'parallel',
                lineStyle: lineStyle,
                data: this.tcpInstances
            },
            {
                name: 'UDP',
                type: 'parallel',
                lineStyle: lineStyle,
                data: this.udpInstances
            },
            {
                name: 'OTHER',
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
      parallelChart.on('axisareaselected', function () {
          var series0 = parallelChart.getModel().getSeries()[0];
          var series1 = parallelChart.getModel().getSeries()[1];
          var indices0 = series0.getRawIndicesByActiveState('active');
          var indices1 = series1.getRawIndicesByActiveState('active');
          console.log(indices0, indices1);
          console.log(series0, series1);
      });
      parallelChart.on('mouseover', function (params) {
          console.log(params);
      });
    }
  }
};
</script>
