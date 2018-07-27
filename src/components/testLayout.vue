<style lang="less">
.layout-wrap {
  overflow: auto;
}
#nav {
  width: 80px;
  float: left;
  background-color: #333434;
  padding-top: 15px;
  .main-nav {
    width: inherit;
    background-color: #333434;
    ul {
      li {
        a {
          color: #9f9f9f;
          font-size: 12px;
          text-align: center;
          padding: 10px 5px;
          width: 100%;
          span {
            display: block;
            width: auto;
            padding: 2px 4px;
          }
        }
      }
      .active {
        border-left: 1px solid #49bd80;
        color: white;
      }
    }
  }
}
#main {
  overflow: auto;
  margin-left: 0;
  // border: 1px solid red;
  .main-chart {
    background-color: #333;
    // background-color: rgb(11, 41, 93);
    .chart-content {
      // height: 300px;
      // width: 1000px;
      // border: 1px solid palegreen;
    }
  }
}
</style>
<template>
  <div class="layout-wrap">
    <main id="main">
      <div class="main">
        <div class="main-chart" id="main-chart">
          <three-bar-chart class="chart-content"></three-bar-chart>
          <parallel-chart></parallel-chart>
        </div>
      </div>
    </main>
    <footer>
    </footer>
  </div>
</template>

<script>
import '../assets/less/reset.less';
import '../assets/icons/iconfont.css';
import echarts from 'echarts';
import threeBarChart from './threeBar';
// import threeBarChart from './three';
import DetailPage from './DetailPage';
import ParallelChart from './ParallelChart';

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'hello',
      activeLink: true,
      chart: 1
      // isCollapsed: true,
      // sidebarTag: true
    };
  },
  mounted () {
    this.setHeight();
    // this.testParentAjax();
  },
  components: {
    threeBarChart,
    DetailPage,
    ParallelChart
  },
  methods: {
    showConifg(){
      console.log('这是配置面板');
    },
    changeChart(val) {
      this.chart = val;
    },
    testParentAjax() {
      this.$http.get('/api/getPiePort').then((res) => {
        console.log(res.body);
        this.instances = res.body;
      }).then(() => {
        // this.drawPie();
      });
    },
    setHeight() {
      let h = document.documentElement.clientHeight,
          w = document.documentElement.clientWidth;
      let chartDom = document.getElementById('main-chart');
      let navDom = document.getElementById('nav');
      console.log('当前浏览器高度', h);
      console.log('当前浏览器宽度', w);
      navDom.style.height = h - 75 + 'px';
      chartDom.style.height = h - 75 + 'px';
      chartDom.style.width = w - 80 + 'px';
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.head-title {
  font-size: 30px;
  font-weight: 700;
}
.head-wrap {
  height: 72px;
  text-align: left;
  padding-left: 20px;
  line-height: 72px;
  background-color: black;
  color: white;
}
.menu {
  display: inline-block
}
.menu-item {
  float: left;
  color: white;
  font-size: 16px;
  background-color: blue;
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
