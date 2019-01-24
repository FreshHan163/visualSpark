<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
</style>
<template>
  <div class="home-page">
    <h1>如何调用panel</h1>
    <panel :width="400" :height="400" titleIcon="ddd">
      <span slot="header">panel 顶部</span>
    </panel>
  </div>
</template>

<script>
import Panel from '@/components/Panel'

export default {
  name: 'HomePage',
  data () {
    return {
      msg: 'hello',
    };
  },
  components: {
    Panel
  },
  mounted () {
  },
  methods: {
  }
};
</script>
