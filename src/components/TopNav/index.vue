<template>
  <div class="top-nav">
    <header>
      <div class="head-wrap">
        <div class="head-title">
          <span>Netflow网络数据监控可视化</span>
        </div>
        <ul class="head-menu">
          <li class="menu-item">
            <router-link :to="{ name: 'TestLayout'}"  active-class="activeItem">态势感知</router-link>
          </li>
          <li class="menu-item">
            <router-link :to="{ name: 'DetailPage'}" active-class="activeItem">详细配置</router-link>
          </li>
        </ul>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'TopNav',
  data () {
    return {
      msg: 'hello',
    };
  },
  mounted () {
  },
  methods: {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
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
