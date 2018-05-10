<template>
  <div class="layout-wrap">
    <div id="common-header">
      <div class="head-wrap">
        <h1 class="head-title">Netflow网络数据监控可视化</h1>
      </div>
    </div>
    <!-- <div id="common-sidebar-wrap">
      <div id="common-sidebar">
        这里是显示菜单筛选
      </div>
      <div id="common-sidebar-hide" class="sidebar-hide sidebar-hide" @click="showSidebar"><span></span></div>
    </div> -->
    <div id="common-container">
      <div id="mainChart-wrap" class="mainChart-wrap">
        这是主图表区域，高度不确定
        <div id="myChart" class="myChart"></div>
      </div>
      <div id="subChart-wrap" class="subChart-wrap">
        <div class="subChart firstChart">
          <div class="barChart" id="barChart">
            1111图表
          </div>
        </div>
        <div class="subChart secChart" id="secChart">
          <div class="lineChart">
            2222图表
          </div>
        </div>
        <div class="subChart thirdChart">
          <div class="radiusChart">
            3333图表
          </div>
        </div>
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
  },
  methods: {
    draw3DBar () {
    // 基于准备好的dom，初始化echarts实例
//     let myChart = this.$echarts.init(document.getElementById('myChart'));
//     var hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
//             '7a', '8a', '9a','10a','11a',
//             '12p', '1p', '2p', '3p', '4p', '5p',
//             '6p', '7p', '8p', '9p', '10p', '11p'];
//     var days = ['Saturday', 'Friday', 'Thursday',
//             'Wednesday', 'Tuesday', 'Monday', 'Sunday'];

//     var data = [[0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12], [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5], [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14], [4, 16, 12], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2], [5, 1, 1], [5, 2, 0], [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11], [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0], [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0], [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], [6, 22, 2], [6, 23, 6]];
//     var myOption = {
//         tooltip: {},
//         visualMap: {
//             max: 20,
//             inRange: {
//                 color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
//             }
//         },
//         xAxis3D: {
//             type: 'category',
//             data: hours
//         },
//         yAxis3D: {
//             type: 'category',
//             data: days
//         },
//         zAxis3D: {
//             type: 'value'
//         },
//         grid3D: {
//             boxWidth: 200,
//             boxDepth: 80,
//             light: {
//                 main: {
//                     intensity: 1.2
//                 },
//                 ambient: {
//                     intensity: 0.3
//                 }
//             }
//         },
//         series: [{
//             type: 'bar3D',
//             data: data.map(function (item) {
//                 return {
//                     value: [item[1], item[0], item[2]]
//                 }
//             }),
//             shading: 'color',

//             label: {
//                 show: false,
//                 textStyle: {
//                     fontSize: 16,
//                     borderWidth: 1
//                 }
//             },
//             itemStyle: {
//                 opacity: 0.4
//             },

//             emphasis: {
//                 label: {
//                     textStyle: {
//                         fontSize: 20,
//                         color: '#900'
//                     }
//                 },
//                 itemStyle: {
//                     color: '#900'
//                 }
//             }
//         }]
//     };
//     myChart.setOption(myOption);
// },
// drawLine () {
//     //到后台获取到的数据
//     var yAxisTotalcount = [10,12,13,14,8,6,7,9];
//     var yAxisSuccessPercent = [100,90,80,78,86,97,79,80];
//     var yAxisAvgtime = [11,21,23,14,25,16,17,18];
//     var xAxisTimeData = ['12','11','10','9','8','7','6','5'];

//     var option = {
//             title : {
//                 text: '数据统计'
//             },
//             tooltip : {
//                 trigger: 'axis',
//                 formatter: "{b}<br> 次数：{c}次",
//                 showDelay: 0,             // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
//             },
//             legend: {
//                 data:['总量','成功率','时间']//图例，后面关联的两个会隐藏
//             },
//             toolbox: {//右上角的工具栏，后面关联的两个会隐藏
//                 show : true,
//                 feature : {
//                     mark : {show: true},
//                     dataZoom : {show: true},
//                     magicType : {show: true, type: ['line', 'bar']},
//                     restore : {show: true},
//                     saveAsImage : {show: false}
//                 }
//             },
//             dataZoom : {//滑动条，联动关联
//                 backgroundColor: 'rgba(0,0,0,0)',
//                 dataBackgroundColor: 'rgba(0,0,0,0)',
//                 handleColor: 'rgba(70,130,180,0.8)',
//                 fillerColor: 'rgba(144,197,237,0.6)',
//                 handleSize: 7,
//                 show : false,//不显示，已经做关联，由最后一个图显示
//                 realtime: true,
//                 start : 0,
//                 end : 100
//             },
//             grid: {//直角坐标系
//                 x: 60,
//                 y: 45,
//                 x2:20,
//                 y2:25
//             },
//             xAxis : [//第一幅图x轴
//                 {
//                     type : 'category',
//                     boundaryGap : true,
//                     axisTick: {onGap:false},
//                     splitLine: {show:false},
//                     axisLabel:{
//                       show:true,
//                       rotate: 0,
//                       color: 'white'
//                     },
//                     data: xAxisTimeData
//                 }
//             ],
//             yAxis : [//第一幅图y轴
//                 {
//                     type : 'value',
//                     name : '次数',
//                     scale:true,
//                     axisLabel : {
//                         formatter: '{value} 次',
//                         color: 'white'
//                     },
//                     splitNumber: 5,
//                     splitArea : {show : true}
//                 }
//             ],
//             series : [
//                 {//第一幅图的数据
//                     name:'总量',
//                     type:'value',
//                     type:'line',
//                     data:yAxisTotalcount,
//                     markPoint : {
//                         data : [
//                             {type : 'max', name: '最大值'},
//                             {type : 'min', name: '最小值'}
//                         ]
//                     },
//                 },
//                 {//用于关联后面两幅图
//                     name:'成功率',
//                     type:'line',
//                     symbol: 'none',
//                     data:[]
//                 },
//                 {
//                     name:'时间',
//                     type:'bar',data:[]
//                 }

//             ]
//         };

//         var myChart = this.$echarts.init(document.getElementById('myChart'));
//         myChart.setOption(option);

//         var option2 = {
//             tooltip : {
//                 trigger: 'axis',
//                 formatter: "{b}<br> 成功率：{c}%",
//                 showDelay: 0             // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
//             },
//             legend: {
//                 y : -30,//隐藏,跟第一幅图关联了，所以不需要显示
//                 data:['总量','成功率','时间']
//             },
//             toolbox: {
//                 y : -30,//隐藏
//                 show : true,
//                 feature : {
//                     mark : {show: true},
//                     dataZoom : {show: true},
//                     dataView : {show: true, readOnly: false},
//                     magicType : {show: true, type: ['line', 'bar']},
//                     restore : {show: true},
//                     saveAsImage : {show: false}
//                 }
//             },
//             dataZoom : {
//                 backgroundColor: 'rgba(0,0,0,0)',
//                 dataBackgroundColor: 'rgba(0,0,0,0)',
//                 handleColor: 'rgba(70,130,180,0.8)',
//                 fillerColor: 'rgba(144,197,237,0.6)',
//                 handleSize: 7,
//                 show : false,
//                 realtime: true,
//                 start : 0,
//                 end : 100
//             },
//             grid: {
//                 x: 60,
//                 y:5,
//                 x2:20,
//                 y2:25
//             },
//             xAxis : [
//                 {
//                     type : 'category',
//                     boundaryGap : true,
//                     axisLabel:{show:false,rotate: 45},
//                     axisTick: {onGap:false},
//                     splitLine: {show:false},
//                     data : xAxisTimeData
//                 }
//             ],
//             yAxis : [
//                 {
//                     type : 'value',
//                     name : '成功率',
//                     scale:true,
//                     axisLabel : {
//                         formatter: '{value} %',
//                         color: 'white'
//                     },
//                     //boundaryGap: [0.05, 0.05],
//                     splitNumber: 4,
//                     splitArea : {show : true}
//                 }
//             ],
//             series : [
//                 {
//                     name:'成功率',
//                     type:'line',
//                     symbol: 'true',
//                     data:yAxisSuccessPercent,
//                     markLine : {
//                         symbol : 'none',
//                         itemStyle : {
//                             normal : {
//                                 color: '#1e90ff',
//                                 label : {
//                                     show:false
//                                 }
//                             }
//                         },
//                         data : [
//                             {type : 'average', name: '平均值'}
//                         ]
//                     }
//                 }
//             ]
//         };
//         // var myChart2 = this.$echarts.init(document.getElementById('barChart'));
//         // var myChart2 = echarts.init(document.getElementById('barChart'));
//         // myChart2.setOption(option2);

//         var option3 = {
//             tooltip : {
//                 trigger: 'axis',
//                 formatter: "{b}<br> 时间：{c}ms",
//                 showDelay: 0             // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
//             },
//             legend: {
//                 y : -30,
//                 data:['总量','成功率','时间']
//             },
//             toolbox: {
//                 y : -30,
//                 show : true,
//                 feature : {
//                     mark : {show: true},
//                     dataZoom : {show: true},
//                     dataView : {show: true, readOnly: false},
//                     magicType : {show: true, type: ['line', 'bar']},
//                     restore : {show: true},
//                     saveAsImage : {show: false}
//                 }
//             },
//             dataZoom : {
//                 //y:350,
//                 backgroundColor: 'rgba(0,0,0,0)',
//                 dataBackgroundColor: 'rgba(0,0,0,0)',
//                 handleColor: 'rgba(79,130,180,0.8)',
//                 fillerColor: 'rgba(144,197,237,0.6)',
//                 handleSize: 17,
//                 show : true,//显示
//                 realtime: true,
//                 start : 0,
//                 end : 100
//             },
//             grid: {
//                 x: 60,
//                 y: 5,
//                 x2: 20,
//                 y2: 120
//             },
//             xAxis : [
//                 {
//                     type : 'category',
//                     position:'bottom',
//                     boundaryGap : true,
//                     axisLabel: {rotate: 45,show:true,color: 'white'},
//                     axisTick: {onGap:false},
//                     splitLine: {show:false},
//                     data : xAxisTimeData
//                 }
//             ],
//             yAxis : [
//                 {
//                     type : 'value',
//                     name : '时间',
//                     scale:true,
//                     axisLabel : {
//                         formatter: '{value} ms',
//                         color: 'white'
//                     },
//                     //boundaryGap: [0.05, 0.05],
//                     splitNumber: 4,
//                     splitArea : {show : true}

//                 }
//             ],
//             series : [
//                 {
//                     name:'时间',
//                     type:'line',
//                     symbol: 'true',
//                     data:yAxisAvgtime,
//                     markPoint : {
//                         data : [
//                             {type : 'max', name: '最大值'},
//                             {type : 'min', name: '最小值'}
//                         ]
//                     },
//                     markLine : {
//                         symbol : 'none',
//                         itemStyle : {
//                             normal : {
//                                 color:'#1e90ff',
//                                 label : {
//                                     show:false
//                                 }
//                             }
//                         },
//                         data : [
//                             {type : 'average', name: '平均值'}
//                         ]
//                     }
//                 }
//             ]
//         };
        // var myChart3 = echarts.init(document.getElementById('secChart'));
        // var myChart3 = this.$echarts.init(document.getElementById('secChart'));
        // myChart3.setOption(option3);
        //三幅图关联
        // this.$echarts.connect([myChart, myChart2, myChart3]);
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
