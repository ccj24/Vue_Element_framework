import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' 
import 'nprogress/nprogress.css' 
import { getToken } from '@/utils/auth' 
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false })
const whiteList = ['/login','/register'] // 白名单

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)

  const hasToken = getToken()
  if (hasToken) {// 已登录
    if (to.path === '/login') {// 访问登录页
      next({ path: '/' })
      NProgress.done()
    } else {// 不访问登录页
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {// 存在用户名
        next()
      } else {// 不存在用户名
        try {
          await store.dispatch('user/getInfo')
          next()
        } catch (error) {
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {// 未登录
    if (whiteList.indexOf(to.path) !== -1) {// 在白名单中，直接跳转
      next()
    } else {// 不在白名单中，跳转到登录页
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
