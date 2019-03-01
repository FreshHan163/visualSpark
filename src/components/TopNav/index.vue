<template>
  <div class="top-nav">
    <div class="bg_header">
        <div class="head-title title">
            <span>Netflow网络数据监控可视化</span>
        </div>
    </div>
    <!-- <ul class="head-menu">
        <li class="menu-item nav-title">
            <router-link :to="{ name: 'HomePage'}"  active-class="nav-active-item">数据概览</router-link>
        </li>
        <li class="menu-item nav-title">
            <router-link :to="{ name: 'DetailPage'}"  active-class="nav-active-item">详细配置</router-link>
        </li>
        <li class="menu-item nav-title">
            <router-link :to="{ name: 'DetailPage'}" active-class="nav-active-item">个人中心</router-link>
        </li>
    </ul> -->
    <!-- <div class="head-time nav-title">
        <span>{{time}}</span>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'TopNav',
  data () {
    return {
      time: new Date().toLocaleString()
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
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 80px;
    line-height: 80px;
    background: #030829;
    padding: 0 20px;
    .bg_header {
        width: 100%;
        height: 80px;
        background: url(../../assets/img/title.png) no-repeat;
        background-size: 100% 100%;
    }
    .head-title {
        width: 100%;
        height: 100%;
        text-align: center;
        font-size: 2.5em;
        line-height: 80px;
    }
    .head-title, .head-menu, .menu-item {
        float: left;
        color: white;
    }
    .head-menu {
        margin-left: 50px;
    }
    .head-time {
        float: right;
        color: white;
    }
    .menu-item {
        margin-right: 40px;
        a {
            color: white;
            height: 80px;
            display: inline-block;
            padding: 0 10px 0 30px;
        }
        a:active, a:hover {
            // border-bottom: 4px solid #4b8df8;
        }
        .nav-active-item {
            border-bottom: 4px solid #4b8df8;
        }
    }
}
</style>
