<template>
  <div class="layout-wrap">
    <div id="common-header">
      <div class="head-wrap">
        <h1 class="head-title">Netflow网络数据监控可视化</h1>
      </div>
    </div>
    <div id="common-container">
      <div id="mainChart-wrap" class="mainChart-wrap">
        <div id="myChart" class="myChart"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'hello'
      // isCollapsed: true,
      // sidebarTag: true
    };
  },
  mounted () {
    this.drawGuide();
  },
  methods: {
    drawGuide () {
      let myChart = this.$echarts.init(document.getElementById('myChart'));
      let option = {
        backgroundColor: '#1b1b1b',
        tooltip : {
            formatter: "{a} <br/>{c} {b}"
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        series : [
            {
                name:'速度',
                type:'gauge',
                min:0,
                max:220,
                splitNumber:11,
                radius: '50%',
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: [[0.09, 'lime'],[0.82, '#1e90ff'],[1, '#ff4500']],
                        width: 3,
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                axisLabel: {            // 坐标轴小标记
                    textStyle: {       // 属性lineStyle控制线条样式
                        fontWeight: 'bolder',
                        color: '#fff',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                axisTick: {            // 坐标轴小标记
                    length :15,        // 属性length控制线长
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: 'auto',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                splitLine: {           // 分隔线
                    length :25,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        width:3,
                        color: '#fff',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                pointer: {           // 分隔线
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 5
                },
                title : {
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bolder',
                        fontSize: 20,
                        fontStyle: 'italic',
                        color: '#fff',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                detail : {
                    backgroundColor: 'rgba(30,144,255,0.8)',
                    borderWidth: 1,
                    borderColor: '#fff',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 5,
                    offsetCenter: [0, '50%'],       // x, y，单位px
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bolder',
                        color: '#fff'
                    }
                },
                data:[{value: 230, name: '端口'}]
            }
        ]
    };

      // setInterval(function (){
      //     option.series[0].data[0].value = (Math.random()*100).toFixed(2) - 0;
      //     myChart.setOption(option);
      // },2000);
      myChart.setOption(option);

    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.layout-wrap {
  background: black;
}
.head-title {
  font-size: 30px;
  font-weight: 700;
  color: white;
}
.head-wrap {
  height: 72px;
  text-align: left;
  padding-left: 20px;
  line-height: 72px;
}
#common-sidebar-wrap {
    position: fixed;
    left: 0;
    top: 72px;
    bottom: 0;
    z-index: 1050;
    width: 217px;
    /* background: #fff; */
    overflow: hidden;
    transition: width .2s;
    -moz-transition: width .2s;
    -webkit-transition: width .2s;
    -o-transition: width .2s;
    font-family: Microsoft YaHei,Arial!important;
    box-shadow: 0 0 5px rgb(155, 153, 153);
}
#common-sidebar {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
    border-right: 1px solid #e7e8ea;
    overflow: hidden;
    width: 217px;
    box-sizing: border-box;
}
.sidebar-hide {
    position: absolute;
    right: 1px;
    top: 50%;
    margin-top: -32px;
    width: 17px;
    height: 64px;
    background-color: rgba(186, 183, 189, 0.444);
    border: 1px solid #e7e8ea;
    border-left: 0;
    cursor: pointer;
    border-radius: 5px;
}
.sidebar-hide span {
    display: block;
    margin: 28px auto 0;
    width: 5px;
    height: 9px;
    background: rgba(101, 99, 102, 0.5);
    border-radius: 2px;
}
#common-container {
  min-height: 871px;
  margin: 0 20px 20px 220px;
  padding: 20px 0 0 0;
  /* background-color: #fff; */
}
.common-container-animation {
  transition: margin .2s;
  -moz-transition: margin .2s;
  -webkit-transition: margin .2s;
  -o-transition: margin .2s;
}
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.mainChart-wrap {
  float: left;
  width: 75%;
}
.myChart {
  width: 800px;
  height: 800px;
  /* background-color: rgb(70, 70, 218); */
}
.subChart-wrap {
  float: right;
  width: 25%;
  border-left: 1px solid blue;
}
.subChart {
  /* width: 100%; */
  /* margin-top: 100%; */
  /* overflow: hidden; */
  border-bottom: 1px solid blue;
  height: auto;
}
.lineChart, .radiusChart, .barChart {
  width: 100%;
  height: 280px;
}
</style>
