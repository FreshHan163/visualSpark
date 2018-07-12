import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Layout from '@/components/testLayout'
import GuideChart from '@/components/GuideChart'
import FlexChart from '@/components/FlexChart'
import DetailPage from '@/components/DetailPage'
import CampusChart from '@/components/CampusChart'
import HeatmapChart from '@/components/HeatmapChart'
import PieChart from '@/components/PieChart'
import ExpressPart from '@/components/ExpressPart'
import SunChart from '@/components/SunburstChart'

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
    },
    {
      path: '/detail',
      name: 'DetailPage',
      component: DetailPage
    },
    {
      path: '/campus',
      name: 'CampusChart',
      component: CampusChart
    },
    {
      path: '/heatmap',
      name: 'HeatmapChart',
      component: HeatmapChart
    },
    {
      path: '/pie',
      name: 'PieChart',
      component: PieChart
    },
    {
      path: '/express',
      name: 'ExpressPart',
      component: ExpressPart
    },
    {
      path: '/sun',
      name: 'SunChart',
      component: SunChart
    },
  ]
})
