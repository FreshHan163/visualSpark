<template>
  <div class="top-nav">
    <div class="head-title title">
        <span>Netflow网络数据监控可视化</span>
    </div>
    <ul class="head-menu">
        <li class="menu-item nav-title">
        <router-link :to="{ name: 'TestLayout'}"  active-class="activeItem">态势感知</router-link>
        </li>
        <li class="menu-item nav-title">
        <router-link :to="{ name: 'DetailPage'}" active-class="activeItem">详细配置</router-link>
        </li>
    </ul>
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
.top-nav {
    width: 100%;
    height: 80px;
    line-height: 80px;
    background: #030829;
    padding: 0 20px;
    .head-title, .head-menu, .menu-item {
        float: left;
        color: white;
    }
    .head-menu {
        margin-left: 50px;
    }
    .menu-item {
        display: inline-block;
        height: 80px;
        margin-right: 20px;
        padding: 0 10px;
        border-bottom: 4px solid #4b8df8;
        a {
            color: white;
        }
    }
}
</style>
