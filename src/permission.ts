import router from '@/router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import pinia from '@/store/index'
import useUserStore from './store/modules/user'
import setting from './setting'

nprogress.configure({ showSpinner: false })

const userStore = useUserStore(pinia)

router.beforeEach(async (to, _from, next) => {
  document.title = to.meta.title + ` | ${setting.title}`
  nprogress.start()
  const token = userStore.token
  const username = userStore.username
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (username) {
        next()
      } else {
        try {
          await userStore.userInfo()
          next({ ...to })
        } catch (error) {
          await userStore.logout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})
// 全局后置守卫

router.afterEach(() => {
  nprogress.done()
})
