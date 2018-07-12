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
  created() {

  },

  methods: {
  }
};
</script>
