<template>
  <div id="app">
    <header id="common-header">
      <div class="head-wrap">
        <div class="head-title">
          <span>Netflow网络数据监控可视化</span>
        </div>
        <ul class="menu">
          <li class="menu-item">
            <router-link :to="{ name: 'TestLayout'}"  active-class="activeItem">态势感知</router-link>
          </li>
          <li class="menu-item">
            <router-link :to="{ name: 'DetailPage'}" active-class="activeItem">详细配置</router-link>
          </li>
        </ul>
      </div>
    </header>
    <router-view/>
  </div>
</template>

<script>
import './assets/less/reset.less';
export default {
  name: 'App'
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* display: flex; */
  height: 100%;
  /* background: linear-gradient(45deg, rgba(208,228,247,1) 0%,rgba(115,177,231,1) 24%,rgba(10,119,213,1) 50%,rgba(83,159,225,1) 79%,rgba(135,188,234,1) 100%); */
  /* background-color: #131547; */
  /* background: url('./assets/img/bg.png') center; */
}
.head-wrap {
  text-align: left;
  padding-left: 20px;
  height: 72px;
  background-color: rgb(72, 79, 108);
  color: white;
}
.head-title {
  font-size: 30px;
  font-weight: 700;
  display: inline-block;
  line-height: 72px;
}
.menu {
  float: right;
  line-height: 72px;
}
.menu-item {
  float: left;
  color: white;
  font-size: 20px;
  width: 100px;
  margin: 0 15px;
}
a, a:hover, a:link {
  text-decoration: none;
  color: white;
}
.activeItem {
  background: pink;
}
</style>
