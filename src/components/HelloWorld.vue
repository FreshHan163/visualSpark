<template>
  <div class="layout">
    <Layout>
      <Sider breakpoint="md" collapsible :collapsed-width="0" v-model="isCollapsed">ffff</Sider>
      <Layout>
        <Content>
          <div class="mainChart">
            主标题
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.mainChart {
  float: left;
  width: 75%;
  height: 800px;
}
.subChart {
  float: right;
  width: 20%;
  border-left: 1px solid blue;
}
.card {
  width: 100%;
  padding-top: 100%;
  height: 0;
  border-bottom: 1px solid blue;
}
</style>
