<template>
  <div class="panel" :style="{width: width + 'px', height: height + 'px'}">
    <div class="panel_header">
        <img :src="titleIcon" />
        <slot name="header"></slot>
    </div>
    <div class="panel_body">
        <slot name="body"></slot>
    </div>
    <div class="panel_footer">
        <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Panel',
  props: {
      width: Number,
      height: Number,
      titleIcon: String
  },
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
.panel {
    position: relative;
    width: 100%;
    height: 280px;
    margin-bottom: 50px;
    border: 1px solid #034c6a;
    box-shadow: -10px 0px 15px #034c6a inset,
        0px -10px 15px #034c6a inset,
        10px 0px 15px #034c6a inset,
        0px 10px 15px #034c6a inset;
    .panel_header {
        position: absolute;
        top: -17px;
        left: 50%;
        width: 180px;
        height: 35px;
        line-height: 33px;
        background-color: #034c6a;
        border-radius: 18px;
        margin-left: -90px;
        color: #fff;
        font-size: 14px;
        font-weight: 600;
        padding-left: 45px;
        z-index: 10;
        img {
            position: absolute;
            top: 8px;
            left: 20px;
        }
    }
    .panel_body {
        width: 100%;
        height: 280px;
        -webkit-tap-highlight-color: transparent;
        user-select: none;
        position: relative;
    }
}
</style>
