import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Layout from '@/layout'

export const constantRoutes = [{
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{
      path: '/redirect/:path(.*)',
      component: () => import('@/views/redirect/index')
    }]
  }, {
    path: '/login',
    component: () => import('@/views/user/login'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/user/register'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/403',
    component: () => import('@/views/error/403'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: 'Dashboard',
        icon: 'dashboard'
      }
    }]
  },
  {
    path: '/common',
    component: Layout,
    name: 'common',
    meta: {
      title: '基础功能',
      icon: 'el-icon-eleme'
    },
    children: [{
      path: 'params/:id',
      name: 'params',
      component: () => import('@/views/common/params'),
      meta: {
        title: 'params传参',
        icon: 'table'
      }
    },{
      path: 'query',
      name: 'query',
      component: () => import('@/views/common/query'),
      meta: {
        title: 'query',
        icon: 'table'
      }
    },{
      path: 'table',
      name: 'table',
      component: () => import('@/views/common/table'),
      meta: {
        title: '表格表单',
        icon: 'table'
      }
    }, {
      path: 'upload',
      name: 'upload',
      component: () => import('@/views/common/upload'),
      meta: {
        title: '上传文件、图片',
        icon: 'upload'
      }
    },{
      path: 'exportSelectRow',
      name: 'exportSelectRow',
      component: () => import('@/views/common/exportSelectRow'),
      meta: {
        title: '表格导出选定行',
        icon: 'exportSelectRow'
      }
    }]
  },
  {
    path: '/component',
    component: Layout,
    redirect: '/component/ring',
    name: 'component',
    meta: {
      title: '组件',
      icon: 'el-icon-s-help'
    },
    children: [{
        path: 'ring',
        name: 'ring',
        component: () => import('@/views/component/ring'),
        meta: {
          title: '圆环',
          icon: 'ring'
        }
      }, {
        path: 'selectDrag',
        name: 'selectDrag',
        component: () => import('@/views/component/selectDrag'),
        meta: {
          title: 'select拖拽排序',
          icon: 'selectDrag'
        }
      },
      {
        path: 'count',
        name: 'count',
        component: () => import('@/views/component/count'),
        meta: {
          title: '数字滚动',
          icon: 'count'
        }
      },
      {
        path: 'backToTop',
        name: 'backToTop',
        component: () => import('@/views/component/backToTop'),
        meta: {
          title: '回到顶部',
          icon: 'backToTop'
        }
      }
    ]
  },
  {
    path: '/plug',
    component: Layout,
    redirect: '/plug/i18n',
    name: 'plug',
    meta: {
      title: '插件',
      icon: 'el-icon-s-help'
    },
    children: [{
        path: 'i18n',
        name: 'I18n',
        component: () => import('@/views/plug/i18n'),
        meta: {
          title: '国际化',
          icon: 'earth'
        }
      },
      {
        path: 'drag',
        name: 'drag',
        component: () => import('@/views/plug/drag'),
        meta: {
          title: '拖拽排序',
          icon: 'drag'
        }
      },
    ]
  },
  {
    path: '/globalMethod',
    component: Layout,
    redirect: '/globalMethod/i18n',
    name: 'globalMethod',
    meta: {
      title: '全局方法',
      icon: 'el-icon-s-help'
    },
    children: [{
      path: 'input',
      name: 'input',
      component: () => import('@/views/globalMethod/input'),
      meta: {
        title: '全局指令处理输入',
        icon: 'input'
      }
    }, {
      path: 'filter',
      name: 'filter',
      component: () => import('@/views/globalMethod/filter'),
      meta: {
        title: 'filter',
        icon: 'filter'
      }
    }, {
      path: 'copy',
      name: 'copy',
      component: () => import('@/views/globalMethod/copy'),
      meta: {
        title: '复制',
        icon: 'copy'
      }
    }, ]
  },
  {
    path: '/chart',
    component: Layout,
    redirect: '/chart/line',
    name: 'chart',
    meta: {
      title: 'E-charts',
      icon: 'chart'
    },
    children: [{
        path: 'line',
        name: 'line',
        component: () => import('@/views/chart/line'),
        meta: {
          title: '折线图',
          icon: 'line'
        }
      },
      {
        path: 'bar',
        name: 'bar',
        component: () => import('@/views/chart/bar'),
        meta: {
          title: '柱状图',
          icon: 'bar'
        }
      },
      {
        path: 'pie',
        name: 'pie',
        component: () => import('@/views/chart/pie'),
        meta: {
          title: '饼图+富文本',
          icon: 'pie'
        }
      },
      {
        path: 'map',
        name: 'map',
        component: () => import('@/views/chart/map'),
        meta: {
          title: '地图',
          icon: 'map'
        }
      },
      {
        path: 'radar',
        name: 'radar',
        component: () => import('@/views/chart/radar'),
        meta: {
          title: '雷达图',
          icon: 'radar'
        }
      },
      {
        path: 'heatMap',
        name: 'heatMap',
        component: () => import('@/views/chart/heatMap'),
        meta: {
          title: '热力图',
          icon: 'heatMap'
        }
      },
      {
        path: 'tree',
        name: 'tree',
        component: () => import('@/views/chart/tree'),
        meta: {
          title: '树图',
          icon: 'tree'
        }
      },
      {
        path: 'funnel',
        name: 'funnel',
        component: () => import('@/views/chart/funnel'),
        meta: {
          title: '漏斗图',
          icon: 'funnel'
        }
      },
      {
        path: 'gauge',
        name: 'gauge',
        component: () => import('@/views/chart/gauge'),
        meta: {
          title: '仪表盘',
          icon: 'gauge'
        }
      },
      {
        path: 'pictorialBar',
        name: 'pictorialBar',
        component: () => import('@/views/chart/pictorialBar'),
        meta: {
          title: '象形柱图',
          icon: 'pictorialBar'
        }
      },
      {
        path: 'calendar',
        name: 'calendar',
        component: () => import('@/views/chart/calendar'),
        meta: {
          title: '日历坐标系',
          icon: 'calendar'
        }
      },
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router