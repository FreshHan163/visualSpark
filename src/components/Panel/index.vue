<template>
  <div class="panel" :style="{width: width + 'px', height: height + 'px'}">
    <!-- 左上边框 -->
    <div class="t_line_panel">
        <i class="t_l_line"></i>
        <i class="l_t_line"></i>
    </div>
    <!-- 右上边框 -->
    <div class="t_line_panel">
        <i class="t_r_line"></i>
        <i class="r_t_line"></i>
    </div>
    <!-- 左下边框 -->
    <div class="t_line_panel">
        <i class="l_b_line"></i>
        <i class="b_l_line"></i>
    </div>
    <!-- 右下边框 -->
    <div class="t_line_panel">
        <i class="r_b_line"></i>
        <i class="b_r_line"></i>
    </div>
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
    border: 1px solid #2C58A6;
    box-shadow: 0 0 10px #2C58A6;
    .t_line_panel {
        position: absolute;
        width: 100%;
        height: 100%;
        i {
            background-color: #4788fb;
            box-shadow: 0 0 10px #4788fb;
            position: absolute;
        }
        .t_l_line {
            height: 5px;
            width: 26px;
            left: -3px;
            top: -3px;
        }
        .l_t_line {
            height: 24px;
            width: 5px;
            left: -3px;
            top: -3px;
        }
        .t_r_line {
            height: 5px;
            width: 26px;
            right: -3px;
            top: -3px;
        }
        .r_t_line {
            height: 24px;
            width: 5px;
            right: -3px;
            top: -3px;
        }
        .l_b_line {
            height: 26px;
            width: 5px;
            left: -3px;
            bottom: -3px;
        }
        .b_l_line {
            height: 5px;
            width: 26px;
            bottom: -3px;
            left: -3px;
        }
        .r_b_line {
            height: 24px;
            width: 5px;
            right: -3px;
            bottom: -3px;
        }
        .b_r_line {
            height: 5px;
            width: 26px;
            right: -3px;
            bottom: -3px;
        }
    }
    .panel_header {
        position: absolute;
        top: -17px;
        left: 50%;
        width: 180px;
        height: 35px;
        line-height: 33px;
        background-color: #2C58A6;
        border-radius: 18px;
        margin-left: -90px;
        color: #fff;
        font-size: 14px;
        font-weight: 600;
        padding-left: 45px;
        z-index: 10;
    }
}
// .panel {
//     position: relative;
//     width: 100%;
//     height: 280px;
//     margin-bottom: 50px;
//     border: 1px solid #034c6a;
//     box-shadow: -10px 0px 15px #034c6a inset,
//         0px -10px 15px #034c6a inset,
//         10px 0px 15px #034c6a inset,
//         0px 10px 15px #034c6a inset;
//     .panel_header {
//         position: absolute;
//         top: -17px;
//         left: 50%;
//         width: 180px;
//         height: 35px;
//         line-height: 33px;
//         background-color: #034c6a;
//         border-radius: 18px;
//         margin-left: -90px;
//         color: #fff;
//         font-size: 14px;
//         font-weight: 600;
//         padding-left: 45px;
//         z-index: 10;
//         img {
//             position: absolute;
//             top: 8px;
//             left: 20px;
//         }
//     }
//     .panel_body {
//         width: 100%;
//         height: 280px;
//         -webkit-tap-highlight-color: transparent;
//         user-select: none;
//         position: relative;
//     }
// }
</style>
