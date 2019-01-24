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
      text-align: left;
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
    justify-content: space-between;
    flex-wrap: nowrap;
    .mainChart-wrap {
      flex: 1 0 70%;
      background-color: #3EA0D5;
    }
    .subChart-wrap {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      .subChart {
        flex: 1;
        min-width: 300px;
        min-height: 300px;
        box-shadow: 1px 2px 5px blue;
      }
    }
  }
  .control-wrap {
    position: fixed;
    top: 69px;
    left: 0;
    right: 0;
    z-index: 101;
    // background-color: black;
    // opacity: 0.3;
    .control-panel {
      float: right;
      width: 245px;
      margin-right: 15px;
      .ivu-collapse {
        background-color: black;
        .ivu-collapse-content {
          color: white;
          background-color: #fff;
        }
        .ivu-collapse-item > .ivu-collapse-header {
          color: white;
        }
      }
    }
  }
}
</style>
<template>
  <div class="layout-wrap">
    <header class="main-header" id="main-header">
      <div class="head-wrap">
        <h1 class="head-title">Netflow网络数据监控可视化</h1>
        <test-time>
          <p slot="content">这里是测试子组件</p>
        </test-time>
      </div>
    </header>
    <div id="common-container" class="common-container">
      <div id="mainChart-wrap" class="mainChart-wrap">
        这是主图表区域，高度不确定111
        <div id="myChart" class="myChart"></div>
      </div>
      <div id="subChart-wrap" class="subChart-wrap">
        <div class="subChart firstChart">
          <div class="barChart" id="barChart">
            1111图表
          </div>
        </div>
        <div class="subChart secChart">
          <div class="lineChart" id="lineChart">
            2222图表
          </div>
        </div>
      </div>
    </div>
    <div class="control-wrap">
      <div class="control-panel">
        <Collapse accordion v-model="value1">
          <Panel name="1">
            OpenControls
            <div slot="content">
              <Collapse v-model="value2">
                <Panel name="1-1">
                  Iphone1111
                  <p slot="content">Iphone,是苹果公司。</p>
                </Panel>
                <Panel name="1-2">
                  Iphone22222
                  <p slot="content">Iphone,是苹果公司。</p>
                </Panel>
              </Collapse>
            </div>
          </Panel>
        </Collapse>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../assets/less/reset.less';
import TestTime from './testTime.vue';
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'hello',
      isCollapsed: true,
      sidebarTag: true,
      value1: 'testValue1',
      value2: 'testValue2'
    };
  },
  components: {
    TestTime
  },
  created () {
    console.log('created');
    this.testMethod();
  },
  methods: {
    testMethod() {
      var x = [{hours: '04:00'}, {hours: '05:00'}, {hours: '06:00'}, {hours: '07:00'}];
      let data = [];
      x.forEach((item) => {
        console.log(Object.values(item));
        data = data.concat(Object.values(item));
        console.log(data);
      });
      var arr1 = ['04:00'];
      var arr2 = ['05:00'];
      console.log(arr1.concat(arr2));
    }
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: {text: '在Vue中使用echarts'},
        tooltip: {},
        xAxis: {
          data: ['衬衫', '连衣裙', '上衣', '短裙', '裤子', '鞋子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      })
    }
  }
};
</script>
