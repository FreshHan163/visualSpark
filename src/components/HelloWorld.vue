<template>
  <div class="layout">
    <Layout>
      <Sider collapsible :collapsed-width="0" v-model="isCollapsed">
				<div class="sidebar">
					这里是折叠显示的地方
				</div>
			</Sider>
      <Layout>
        <Content>
          <div class="mainChart">
            主标题
            <div id="myChart" style="width:500px; height:600px; margin: 0 50px;"></div>
          </div>
          <div class="subChart">
            <div class="card">
              子图表1
            </div>
            <div class="card">
              子图表2
            </div>
            <div class="card">
              子图表3
							引入less
							reset.css
							布局选择方法--自适应布局
							@media方法设置宽度随屏幕变化
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'hello',
      isCollapsed: true
    }
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: {text: '在Vue中使用echarts'},
        tooltip: {},
        xAxis: {
          data: ['衬衫', '连衣裙', '上衣', '短裙', '裤子', '鞋子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.layout{
    border: 1px solid #d7dde4;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
		background: #00113F !important;
}
.sidebar {
	color: white;
}
.mainChart {
  float: left;
  width: 75%;
  height: 800px;
}
.subChart {
  float: right;
  width: 25%;
  border-left: 1px solid blue;
	/*padding-top: 20px;*/
}
.card {
  width: 100%;
  border-bottom: 1px solid blue;
	background-color: #00113F;
}
.card::after {
	content: '';
	display: block;
	padding-top: 100%;
}
</style>
