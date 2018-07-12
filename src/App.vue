<template>
  <div id="app">
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
</style>
