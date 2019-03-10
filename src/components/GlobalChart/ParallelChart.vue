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
      timeData: [],
      tcpInstances: [],
      udpInstances: [],
      otherInstances: [],
      paraData: [],
    };
  },
  mounted () {
    this.getPara();
    this.handleData();
  },
  methods: {
    handleData() {
        setTimeout(() => {
          console.log('绘制平行坐标图 paraData = ', this.paraData);
          this.paraData.forEach((item, index) => {
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
          // console.log('平行坐标图数据: ', this.tcpInstances);
          // console.log('平行坐标图数据: ', this.udpInstances);
          // console.log('平行坐标图数据: ', this.otherInstances);
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
    getPara() {
      return this.axios.get('/api/getPara', {params: {table: 'dw_para_0406_mins'}}).then((res) => {
        res.data.forEach((item, index) => {
          this.paraData.push(Object.values(item));
          this.timeData.push(item.mins);
        });
      })
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
        {name: '包数', index: 6, text: ' 包数'},
        {name: '字节数', index: 7, text: ' 字节数'},
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
                margin: -50,
                length: 10
              },
              axisLabel: {
                  interval: 22,
                  formatter: function(value, index) {
                    var date = new Date(value);
                    var days = [(date.getMonth() + 1), date.getDate()];
                    var hours = [date.getHours(), date.getMinutes()];
                    if (hours[0].length === 1) {
                        hours[0] = `0${hours[0]}`;
                    }
                    if (hours[1] === 0) {
                        hours[1] = '00';
                    }
                    var texts = '';
                      texts = days.join('/') + ' ' + hours.join(':');
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
                silent: 'true',
                triggerEvent: 'true',
                nameLocation: 'end',
                nameGap: 20,
                interval: 50,
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
                smooth: true,
                data: this.tcpInstances
            },
            {
                name: '172.20',
                type: 'parallel',
                smooth: true,
                lineStyle: lineStyle,
                data: this.udpInstances
            },
            {
                name: '172.30',
                type: 'parallel',
                smooth: true,
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
