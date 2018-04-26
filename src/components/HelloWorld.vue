<template>
  <div class="layout-wrap">
    <div id="common-header">
      <div data-v-4a3222c1="" class="head-wrap"></div>
    </div>
    <div id="common-sidebar-wrap">
      <div id="common-sidebar"  v-if="sidebarTag">
        这里是显示菜单筛选
      </div>
      <div id="common-sidebar-hide" class="sidebar-hide sidebar-hide" @click="showSidebar"><span></span></div>
    </div>
    <div id="common-container">
      <div id="mainChart-wrap" class="mainChart-wrap">
        显示大图表
      </div>
      <div id="subChart-wrap" class="subChart-wrap">
        <div class="subChart firstChart">
          <div class="barChart">
            1111图表
          </div>
        </div>
        <div class="subChart secChart">
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
      <!-- <Row>
        <Col span="16">
          <div id="mainChart-wrap" class="mainChart-wrap">
            显示大图表
          </div>
        </Col>
        <Col span="8">
          <div id="subChart-wrap" class="subChart-wrap">
            <div class="subChart firstChart">
              <div class="barChart">
                1111图表
              </div>
            </div>
            <div class="subChart secChart">
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
        </Col>
      </Row> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'hello',
      isCollapsed: true,
      sidebarTag: true
    };
  },
  methods: {
    showSidebar () {
      var sideDom = document.getElementById('common-sidebar-wrap');
      var switchDom = document.getElementById('common-sidebar-hide');
      var contentDom = document.getElementById('common-container');
      if (this.sidebarTag) {
        this.sidebarTag = false;
        sideDom.style.width = switchDom.offsetWidth + 'px';
        contentDom.style.marginLeft = '20px';
      } else {
        this.sidebarTag = true;
        sideDom.style.width = '217px';
        contentDom.style.marginLeft = '220px';
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.head-wrap {
  height: 72px;
}
#common-sidebar-wrap {
    position: fixed;
    left: 0;
    top: 72px;
    bottom: 0;
    z-index: 1050;
    width: 217px;
    background: #fff;
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
  margin: 20px 20px 20px 220px;
  background-color: #fff;
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
.subChart-wrap {
  float: right;
  width: 300px;
  border-left: 1px solid blue;
}
.subChart {
  width: 300px;
  width: 100%;
  margin-top: 100%;
  height: 0;
  overflow: hidden;
  border-bottom: 1px solid blue;
}
</style>
