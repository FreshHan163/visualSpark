<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .layout-wrap {
    height: 100%;
    color: white;
    .pie-chart {
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
    <div class="pie-chart" ref="pieChart" style="width: 400px;height: 400px;"></div>
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
    };
  },
  created () {
    // this.getPieData();
  },
  methods: {
    getPieData() {
      this.axios.get('/api/getPiePort').then((res) => {
        console.log(res.body);
        res.body.forEach(item => {
          switch(item.destPort) {
            case 21:
              item.destPortType = 'FTP';
              break;
            case 23:
              item.destPortType = 'Telnet';
              break;
            case 25:
              item.destPortType = 'SMTP';
              break;
            case 53:
              item.destPortType = 'DNS';
              break;
            case 80:
              item.destPortType = 'HTTP';
              break;
            case 109:
              item.destPortType = 'POP2';
              break;
            case 110:
              item.destPortType = 'POP3';
              break;
            case 111:
              item.destPortType = 'RPC';
              break;
            case 143:
              item.destPortType = 'IMAP';
              break;
            case 161:
              item.destPortType = 'SNMP';
              break;
            default:
              item.destPortType = 'others';
              break;
          }
        });
        this.instances = res.body;
      }).then(() => {
        this.drawPie();
      });
    },
    drawPie () {
      let pieChart = echarts.init(this.$refs.pieChart);
      let instances = this.instances;
      console.log('pie data is', instances);
      let pieData = [];
      // 对数据进行处理，分为x轴、y轴
      let pieOption = {
        // backgroundColor: '#2c343c',

        title: {
            text: '目的端口分布图',
            left: 'center',
            top: 20,
            textStyle: {
                color: '#ccc'
            }
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b}: ({d}%)"
        },

        visualMap: {
            show: true,
            min: 340000,
            max: 520000,
            inRange: {
                color: ['yellow','blue'],
            }
        },
        dataset: {
          dimensions: ['destPort', 'destPortType', 'srcBytes'],
          source: instances
        },
        series : [
            {
                name:'端口流量分布',
                color: 'white',
                type:'pie',
                radius : '55%',
                center: ['50%', '50%'],
                // roseType: 'radius',
                label: {
                    normal: {
                      position: 'left',
                      distance: 3,
                      formatter: '{b}: ({d}%)',
                        textStyle: {
                            color: 'rgba(0, 0, 0, 0.8)'
                        }
                    }
                },
                encode: {
                  itemName: 'destPortType',
                  value: 'srcBytes'
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: 'rgba(0, 0, 0, 0.8)'
                        },
                        smooth: 0.2,
                        length: 5,
                        length2: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'red',
                        shadowBlur: 200,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },

                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }
        ]
    };
      pieChart.setOption(pieOption);

    }
  }
};
</script>
