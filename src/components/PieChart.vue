<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .layout-wrap {
    height: 100%;
    color: white;
    .pie-chart {
      border: 1px solid blueviolet;
      margin: 0 auto;
    }
  }
</style>
<template>
  <div class="layout-wrap">
    <h1>饼图展示</h1>
    <div class="pie-chart" id="pieChart" style="width: 500px;height: 600px;"></div>
  </div>
</template>

<script>
export default {
  name: 'PieChart',
  data () {
    return {
      msg: 'hello',
    };
  },
  created () {
    console.log('子组件_____created');
  },
  mounted () {
    console.log('子组件_____mounted');
    this.drawPie();
  },
  methods: {
    drawPie () {
      let pieChart = this.$echarts.init(document.getElementById('pieChart'));
      let pieOption = {
        backgroundColor: '#2c343c',

        title: {
            text: '饼图分布',
            left: 'center',
            top: 20,
            textStyle: {
                color: '#ccc'
            }
        },

        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
                colorLightness: [0, 1]
            }
        },
        series : [
            {
                name:'访问来源',
                color: 'white',
                type:'pie',
                radius : '55%',
                center: ['50%', '50%'],
                data:[
                    {value:335, name:'直接访问'},
                    {value:310, name:'邮件营销'},
                    {value:274, name:'联盟广告'},
                    {value:235, name:'视频广告'},
                    {value:400, name:'搜索引擎'}
                ].sort(function (a, b) { return a.value - b.value; }),
                roseType: 'radius',
                label: {
                    normal: {
                        textStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#c23531',
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
