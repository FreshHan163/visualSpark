// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import echarts from 'echarts'
<<<<<<< HEAD
=======
import 'echarts-gl'
>>>>>>> 32ab0c04a17eae2e0cbd0c46d6431b7df95eaded

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.use(iView)
<<<<<<< HEAD
Vue.prototype.$echarts = echarts
=======
Vue.use(VueResource)
>>>>>>> 32ab0c04a17eae2e0cbd0c46d6431b7df95eaded
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
