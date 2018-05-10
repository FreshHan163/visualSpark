<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
html,body {
  height: 100%;
  // overflow: hidden;
  background: black;
  min-height: 927px;
}
.layout-wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
  .main-header {
    height: 69px;
    min-height: 69px;
    box-shadow: 0 1px 1px black;
    border-bottom: 5px solid #343436;
    .head-wrap {
      text-align: center;
      padding-left: 20px;
      line-height: 69px;
      .head-title {
        font-size: 30px;
        font-weight: 700;
        color: white;
      }
    }
  }
  .common-container {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: white;
    font-weight: 700;
    margin-bottom: 10px;
    .macro-page {
      .gauge-wrap {
        // border: 1px solid red;
        // margin: 0 auto;
        flex: 1;
        .gauge-chart {
          margin: 0 auto;
        }
      }
      .line-wrap {
        flex: 1 0 50%;
        margin: 0 150px;
        // box-shadow: 1px 2px 10px 5px inset rgba(79,133,187, 0.5),
        //             -1px -2px 10px 5px inset rgba(79,133,187, 0.5);
        box-shadow: 0 0 6px 4px inset hsla(210, 100%, 63%, 0.5);
        // box-shadow: rgba(0, 100, 0, 0.05) 0px 0px 1px, rgba(0, 100, 0, 0.05) 3px 3px 3px, rgba(0, 100, 0, 0.05) 8px 9px 6px, rgba(0, 100, 0, 0.05) 16px 17px 10px, rgba(0, 100, 0, 0.05) 27px 29px 15px, rgba(0, 100, 0, 0.05) 42px 44px 21px;

        border-radius: 5px;
        // border: 1px solid green;
        .line-chart {
          margin: 0 auto;
        }
      }
    }
  }
}
</style>
<template>
  <div class="layout-wrap">
    <header class="main-header">
      <div class="head-wrap">
        <h1 class="head-title">Netflow网络数据监控可视化</h1>
      </div>
    </header>
    <div class="common-container">
      <div class="macro-page" v-if="!isShowDetail">
        <div class="gauge-wrap">
          <div id="gaugeChart" class="gauge-chart" style="width: 500px; height: 400px;">
            这里是导航盘图表
          </div>
        </div>
        <div class="line-wrap">
          <div id="lineChart" class="line-chart" style="width: 1000px; height: 400px;">
            折线图表
          </div>
        </div>
      </div>
      <div class="detail-page" v-else>
        <detail-page></detail-page>
        <!-- 这里是展示详情的页面{{ detailData }} -->
        <!-- <Button type="primary" @click="returnMacro">返回</Button> -->
      </div>
    </div>
  </div>
</template>

<script>
import '../assets/less/reset.less';
import DetailPage from './DetailPage';

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'hello',
      isCollapsed: true,
      sidebarTag: true,
      isShowDetail: false,
      detailData: ''
    };
  },
  mounted () {
    this.drawLine();
    // this.drawGuide();
    // this.draw3DBar();
  },
  components: {
    DetailPage
  },
  methods: {
    returnMacro () {
      this.isShowDetail = false;
      setTimeout( () => {
        this.drawLine();
      }, 0);
    },
    drawGuide () {
      let gaugeChart = this.$echarts.init(document.getElementById('gaugeChart'));
      let gaugeOption = {
        // backgroundColor: '#1b1b1b',
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
                data:[{value: 40, name: '端口'}]
            },
            {
                name:'转速',
                type:'gauge',
                center : ['20%', '55%'],    // 默认全局居中
                radius : '30%',
                min:0,
                max:7,
                endAngle:45,
                splitNumber:7,
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: [[0.29, 'lime'],[0.86, '#1e90ff'],[1, '#ff4500']],
                        width: 2,
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
                    length :12,        // 属性length控制线长
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: 'auto',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                splitLine: {           // 分隔线
                    length :20,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        width:3,
                        color: '#fff',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                pointer: {
                    width:5,
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 5
                },
                title : {
                    offsetCenter: [0, '-30%'],       // x, y，单位px
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bolder',
                        fontStyle: 'italic',
                        color: '#fff',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                detail : {
                    //backgroundColor: 'rgba(30,144,255,0.8)',
                  // borderWidth: 1,
                    borderColor: '#fff',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 5,
                    width: 80,
                    height:30,
                    offsetCenter: [25, '20%'],       // x, y，单位px
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bolder',
                        color: '#fff'
                    }
                },
                data:[{value: 1.5, name: 'IP'}]
            },
            {
                name:'转速111',
                type:'gauge',
                center : ['80%', '55%'],    // 默认全局居中
                radius : '30%',
                min:0,
                max:7,
                startAngle: 135,
                endAngle: -45,
                splitNumber: 7,
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: [[0.29, 'lime'],[0.86, '#1e90ff'],[1, '#ff4500']],
                        width: 2,
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
                    length :12,        // 属性length控制线长
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: 'auto',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                splitLine: {           // 分隔线
                    length :20,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        width:3,
                        color: '#fff',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                pointer: {
                    width:5,
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 5
                },
                title : {
                    offsetCenter: [0, '-30%'],       // x, y，单位px
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bolder',
                        fontStyle: 'italic',
                        color: '#fff',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                detail : {
                    //backgroundColor: 'rgba(30,144,255,0.8)',
                  // borderWidth: 1,
                    borderColor: '#fff',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 5,
                    width: 80,
                    height:30,
                    offsetCenter: [25, '20%'],       // x, y，单位px
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bolder',
                        color: '#fff'
                    }
                },
                data:[{value: 1.5, name: 'IP1'}]
            }
        ]
      };

      setInterval(function (){
          option.series[0].data[0].value = (Math.random()*100).toFixed(2) - 0;
          option.series[1].data[0].value = (Math.random()*7).toFixed(2) - 0;
          option.series[2].data[0].value = (Math.random()*2).toFixed(2) - 0;
          gaugeChart.setOption(option);
      },2000);
      gaugeChart.setOption(option);
    },
    drawLine () {
            let gaugeChart = this.$echarts.init(document.getElementById('gaugeChart'));
      let gaugeOption = {
        // backgroundColor: '#1b1b1b',
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
                data:[{value: 40, name: '端口'}]
            },
            {
                name:'转速',
                type:'gauge',
                center : ['20%', '55%'],    // 默认全局居中
                radius : '30%',
                min:0,
                max:10,
                endAngle:45,
                splitNumber:5,
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: [[0.29, 'lime'],[0.86, '#1e90ff'],[1, '#ff4500']],
                        width: 2,
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
                    length :12,        // 属性length控制线长
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: 'auto',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                splitLine: {           // 分隔线
                    length :20,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        width:3,
                        color: '#fff',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                pointer: {
                    width:5,
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 5
                },
                title : {
                    offsetCenter: [0, '-30%'],       // x, y，单位px
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bolder',
                        fontStyle: 'italic',
                        color: '#fff',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                detail : {
                    //backgroundColor: 'rgba(30,144,255,0.8)',
                  // borderWidth: 1,
                    borderColor: '#fff',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 5,
                    width: 80,
                    height:30,
                    offsetCenter: [25, '20%'],       // x, y，单位px
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bolder',
                        color: '#fff'
                    }
                },
                data:[{value: 1.5, name: 'IP'}]
            },
            {
                name:'转速111',
                type:'gauge',
                center : ['80%', '55%'],    // 默认全局居中
                radius : '30%',
                min:0,
                max: 10,
                startAngle: 135,
                endAngle: -45,
                splitNumber: 5,
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: [[0.29, 'lime'],[0.86, '#1e90ff'],[1, '#ff4500']],
                        width: 2,
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
                    length :12,        // 属性length控制线长
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: 'auto',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                splitLine: {           // 分隔线
                    length :20,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        width:3,
                        color: '#fff',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                pointer: {
                    width:5,
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 5
                },
                title : {
                    offsetCenter: [0, '-30%'],       // x, y，单位px
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bolder',
                        fontStyle: 'italic',
                        color: '#fff',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                detail : {
                    //backgroundColor: 'rgba(30,144,255,0.8)',
                  // borderWidth: 1,
                    borderColor: '#fff',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 5,
                    width: 80,
                    height:30,
                    offsetCenter: [25, '20%'],       // x, y，单位px
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bolder',
                        color: '#fff'
                    }
                },
                data:[{value: 1.5, name: 'IP1'}]
            }
        ]
      };
      // setInterval(function (){
      //     option.series[0].data[0].value = (Math.random()*100).toFixed(2) - 0;
      //     option.series[1].data[0].value = (Math.random()*7).toFixed(2) - 0;
      //     option.series[2].data[0].value = (Math.random()*2).toFixed(2) - 0;
      //     gaugeChart.setOption(option);
      // },2000);
      gaugeChart.setOption(gaugeOption);

      let lineChart = this.$echarts.init(document.getElementById('lineChart'));
      function randomData() {
          now = new Date(+now + oneDay);
          value = value + Math.random() * 21 - 10;
          return {
              name: now.toString(),
              value: [
                  [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-'),
                  Math.round(value)
              ]
          }
      }

      var data = [];
      var now = +new Date(1997, 9, 3);
      var oneDay = 24 * 3600 * 1000;
      var value = Math.random() * 200;
      for (var i = 0; i < 1000; i++) {
          data.push(randomData());
      }

      let lineOption = {
          title: {
              text: '整体流量图',
              left: 'center',
              textStyle: {
                color: 'white',
                fontSize: '20',
              },
              top: '5%'
          },
          tooltip: {
              show: true,
              trigger: 'axis',
              formatter: function (params) {
                  params = params[0];
                  var date = new Date(params.name);
                  return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
              },
              axisPointer: {
                  animation: false
              }
          },
          grid: {
            // left: '5%',
            bottom: '15%',
            top: '10%'
          },
          dataZoom: [
            {
              type: 'inside',
              start: 0,
              end: 100
            },
            {
             type: 'slider',
              height: 8,
              bottom: 20,
              xAxisIndex: [0],
              borderColor: 'transparent',
              // backgroundColor: '#e2e2e2',
              backgroundColor: 'hsla(210, 100%, 63%, 0.3)',
              handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', // jshint ignore:line
              handleSize: 15,
              handleStyle: {
                  shadowBlur: 6,
                  shadowOffsetX: 1,
                  shadowOffsetY: 2,
                  shadowColor: '#aaa'
              }
            // {
            //   type: 'slider',
            //   show: true,
            //   xAxisIndex: [0],
            //   start: 0,
            //   end: 100,
            //   height: '15',
            //   bottom: '0%',
            //   backgroundColor: 'hsla(210, 100%, 63%, 0.3)',
            //   borderColor: 'rgba(255, 255, 255, 0.5)',
            //   handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            //   handleSize: '70%',
            //   handleStyle: {
            //       color: '#fff',
            //       shadowBlur: 3,
            //       shadowColor: 'rgba(0, 0, 0, 0.5)',
            //       shadowOffsetX: 2,
            //       shadowOffsetY: 2
            //   }
            }
          ],
          xAxis: {
              type: 'time',
              splitLine: {
                  show: false
              },
              axisLine: {
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.5)'
                }
              }
          },
          yAxis: {
              type: 'value',
              boundaryGap: [0, '100%'],
              splitLine: {
                  show: false
              },
              axisLine: {
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.5)'
                }
              }
          },
          series: [{
              name: '模拟数据',
              type: 'line',
              showSymbol: false,
              hoverAnimation: false,
              lineStyle: {
                color: 'blue'
              },
              data: data
          }]
      };
      lineChart.setOption(lineOption);

      // 设置初始仪表盘的值为曲线的最后一个值
      gaugeOption.series[0].data[0].value = data[data.length -1].value[1];
      gaugeOption.series[1].data[0].value = data[data.length -1].value[1] / 100;
      gaugeOption.series[2].data[0].value = data[data.length -1].value[1] / 100;
      console.log(gaugeOption);
      gaugeChart.setOption(gaugeOption);

      lineChart.on('mousemove', (params) => {
        gaugeOption.series[0].data[0].value = params.data.value[1];
        gaugeOption.series[1].data[0].value = params.data.value[1] / 100;
        gaugeOption.series[2].data[0].value = params.data.value[1] / 100;
        gaugeChart.setOption(gaugeOption);
      });
      lineChart.on('click', (params) => {
        this.isShowDetail = true;
        this.detailData = params.data.value[1];
        // alert(params.data.value[1]);
      });
      // 下面代码实现实时的曲线刷新，每隔1s刷新一次
      // setInterval(function () {
      //     for (var i = 0; i < 5; i++) {
      //         data.shift();
      //         data.push(randomData());
      //     }
      //     lineChart.setOption({
      //         series: [{
      //           type: 'line',
      //             data: data
      //         }]
      //     });
      // }, 1000);
    }
  }
};
</script>
