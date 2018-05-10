<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
</style>
<template>
  <div class="layout-wrap">
    测试子组件
    <slot name="content"></slot>
  </div>
</template>

<script>
export default {
  name: 'TestTime',
  data () {
    return {
      msg: 'hello',
    };
  },
  beforeCreate () {
    console.log('子组件_____beforeCreate');
  },
  created () {
    console.log('子组件_____created');
  },
  beforeMount () {
    console.log('子组件_____beforeMount');
  },
  mounted () {
    console.log('子组件_____mounted');
    // this.drawLine();
    // this.draw3DBar();
  },
  beforeDestroy () {
    console.log('子组件_____beforeDestroy');
  },
  destroyed () {
    console.log('子组件_____destroyed');
  },
  methods: {
  }
};
</script>
