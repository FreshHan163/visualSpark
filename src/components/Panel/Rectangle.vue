<template>
  <div class="rect" :style="{width: data.width || 100 + 'px'}">
    <img :src="data.leftIcon" class="fl" />
    <div class="rect-text fl">
        <p class="rect-title">{{data.title}}</p>
        <p class="rect-num">{{data.num}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Rectangle',
  props: {
      // width: Number,
      // height: Number,
      // leftIcon: String,
      // title: String,
      // num: Number
      data: Object
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
.rect {
    float: left;
    position: relative;
    height: 110px;
    .rect-text {
      font-size: 13px;
      P {
        margin: 0 0 10px;
      }
      .rect-title {
        color: white;
      }
      .rect-num {
        font-weight: 600;
        font-size: 28px;
        color: #ffff43;
      }
    }
}
</style>
