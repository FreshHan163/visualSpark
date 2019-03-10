<template>
  <div class="home-page">
    <!-- <div class="total-info">
      <div class="info-ips fl">
        <rectangle v-for="(item, index) in ipsData"
          :key="index" :data="item"/>
      </div>
      <div class="info-bb fl">IPS</div>
      <div class="info-cpu fl">CPU</div>
    </div> -->
    <div class="control">
      <Collapse simple>
        <Panel name="1">
          自定义配置
          <div slot="content">
            <Control @chooseLegend="chooseLegend"/>
          </div>
        </Panel>
      </Collapse>
    </div>
    <div class="home-body">
      <!-- <div class="left">
        <panel :width="400" :height="400" titleIcon="ddd">
          <span slot="header">panel 顶部</span>
        </panel>
        <panel :width="400" :height="400" titleIcon="ddd">
          <span slot="header">panel 顶部</span>
        </panel>
      </div> -->
      <div class="middle">
        <chart-panel :width="1200" :height="500" :titleIcon="threeIcon">
          <span slot="header">实时流量图</span>
          <div slot="body">
            <ThreeBar :legend="threeLegendData" :changeLegendFlag="changeLegendFlag"/>
          </div>
        </chart-panel>
        <chart-panel :width="1200" :height="500" :titleIcon="parallelIcon">
          <span slot="header">平行坐标图</span>
          <div slot="body">
            <Parallel :legend="paraLegendData" :changeLegendFlag="changeLegendFlag"/>
          </div>
        </chart-panel>
      </div>
      <!-- <div class="right">
        <chart-panel :width="200" :height="400" titleIcon="ddd">
          <span slot="header">panel 顶部</span>
        </chart-panel>
      </div> -->
    </div>
  </div>
</template>

<script>
import ChartPanel from '@/components/Panel'
import Rectangle from '@/components/Panel/Rectangle'
import ThreeBar from '@/components/GlobalChart/threeBar'
import Parallel from '@/components/GlobalChart/ParallelChart'
import Control from '@/components/GlobalChart/Control'

export default {
  name: 'HomePage',
  data () {
    return {
      legendData: [],
      threeLegendData: [],
      paraLegendData: [],
      changeLegendFlag: false,
      controlNumber: '1',
      ipsData: [
        {
          leftIcon: '',
          title: 'ips告警日志',
          num: '111'
        },
        {
          leftIcon: '',
          title: 'ips告警日志',
          num: '222'
        },{
          leftIcon: '',
          title: 'ips告警日志',
          num: '333'
        }
      ],
      threeIcon: require('../../assets/img/three-color.png'),
      parallelIcon: require('../../assets/img/parallel.png'),
    };
  },
  components: {
    ChartPanel,
    Rectangle,
    ThreeBar,
    Parallel,
    Control
  },
  mounted () {
  },
  methods: {
    chooseLegend(legendData) {
      console.log('首页--处理数据', legendData);
      let threeLegend = [],
          parallelLegend = [];
      legendData.map((item) => {
        switch(item) {
          case '1':
            threeLegend.push('0-40');
            parallelLegend.push('0.0-0.2');
            break;
          case '2':
            threeLegend.push('40-80');
            parallelLegend.push('0.2-0.4');
            break;
          case '3':
            threeLegend.push('80-120');
            parallelLegend.push('0.4-0.6');
            break;
          case '4':
            threeLegend.push('120-160');
            parallelLegend.push('0.6-0.8');
            break;
          case '5':
            threeLegend.push('160-200');
            parallelLegend.push('0.8-1.0');
            break;
          default:
            break;
        }
      });
      this.threeLegendData = threeLegend;
      this.paraLegendData = parallelLegend;
      this.changeLegendFlag = true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.home-page {
  background: #001832;
  position: relative;
  top: 80px;
  padding-top: 20px;
  .total-info {
    width: calc(100% - 60px);
    margin: 40px 0 20px 20px;
    height: 110px;

    div[class^="info-"] {
      width: 30%;
      height: 100%;
      background-color: #034c6a;
    }
    .info-ips {
      margin-right: 20px;
    }
    .info-bb {
      margin-right: 20px;
    }
  }
  .control {
    position: fixed;
    top: 60px;
    z-index: 999;
    background-color: #404973;
    opacity: 0.8;
    line-height: 35px;
    font-size: 14px;
    color: #fff;
    right: 60px;
    padding: 5px 20px;
    cursor: pointer;
    border-radius: 4px;
  }
  .home-body {
    display: flex;
    flex: 1;
    .left, .middle, .right {
      display: flex;
      flex-direction: column;
      padding: 20px;
    }
    .left, .right {
      flex: 0 0 25%;
    }
    .middle {
      flex: 1;
      padding-bottom: 100px;
    }
  }
  .ivu-select-dropdown {
    color: black;
  }
  .ivu-collapse {
    background: none !important;
    border: none;
  }
  .ivu-collapse>.ivu-collapse-item>.ivu-collapse-header {
    color: white;
  }
  .ivu-collapse-content {
    color: white;
    background: none !important;
  }
}
</style>
