import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Layout from '@/components/testLayout'
import GuideChart from '@/components/GuideChart'
import FlexChart from '@/components/FlexChart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/layout',
      name: 'TestLayout',
      component: Layout
    },
    {
      path: '/guide',
      name: 'GuideChart',
      component: GuideChart
    },
    {
      path: '/flex',
      name: 'FlexChart',
      component: FlexChart
    }
  ]
})
