<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
div, span {
  box-sizing: border-box;
}
.canvas {
  width: 800px;
  height: 500px;
}
</style>
<template>
  <div class="layout-wrap">
    <div id="canvas" class="canvas"></div>
  </div>
</template>

<script>
import '../assets/less/reset.less';
import TestTime from './testTime.vue';
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'hello',
      data: [
          [1, 2],
          [2, 1],
          [2, 4],
          [1, 3],
          [2, 2],
          [3, 1],
          [1, 1],

          [7, 3],
          [8, 2],
          [6, 4],
          [7, 4],
          [8, 1],
          [9, 2],

          [10, 8],
          [9, 10],
          [7, 8],
          [7, 9],
          [8, 11],
          [9, 9],
      ]
    };
  },
  components: {
    TestTime
  },
  created () {
  },
  mounted () {
    this.setup();
  },
  methods: {
    // 初始化
    setup() {
      let canvas = document.getElementById('canvas');
      let ctx = canvas.getContext('2d');

      let dataExtremes = this.getDataExtremes(this.data);
      let dataRange = this.getDataRanges(dataExtremes);
      // means = initMeans(3);

      // makeAssignments();
      // this.draw();

      // setTimeout(this.run(), drawDelay);
    },
    // 检查是否已经停止移动
    run() {
      var moved = moveMeans();
      this.draw();
      if (moved)
      {
        setTimeout(this.run(), drawDelay);
      }
    },
    getDataRanges(extremes) {
      var ranges = [];
      for (var dimension in extremes)
      {
        ranges[dimension] = extremes[dimension].max - extremes[dimension].min;
      }
      return ranges;
    },
    getDataExtremes(points) {
        var extremes = [];

        for (var i in data)
        {
            var point = data[i];

            for (var dimension in point)
            {
                if ( ! extremes[dimension] )
                {
                    extremes[dimension] = {min: 1000, max: 0};
                }

                if (point[dimension] < extremes[dimension].min)
                {
                    extremes[dimension].min = point[dimension];
                }

                if (point[dimension] > extremes[dimension].max)
                {
                    extremes[dimension].max = point[dimension];
                }
            }
        }

        return extremes;
    }
  }
};
</script>
