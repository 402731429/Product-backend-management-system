import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user/index'
import {
  LoginFormData,
  LoginResponseData,
  userInfoResponseData,
} from '@/api/user/type'
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
import { constantRoute, asyncRoute, anyRoute } from '@/router/routes'
import type { userState } from './types/type'
import router from '@/router'
//@ts-ignore
import cloneDeep from 'lodash/cloneDeep'

function filterAsyncRoute(asyncRoute: any, Route: any) {
  return asyncRoute.filter((item: any) => {
    if (Route.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, Route)
      }
      return true
    }
  })
}

const useUserStore = defineStore('User', {
  state: (): userState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute,
      username: '',
      avatar: '',
      buttons: [],
    }
  },

  actions: {
    //用户登录表单提交
    async userLogin(data: LoginFormData) {
      const result: LoginResponseData = await reqLogin(data)
      if (result.code == 200) {
        this.token = result.data as string
        SET_TOKEN(result.data as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //用户信息
    async userInfo() {
      const result: userInfoResponseData = await reqUserInfo()
      if (result.code === 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        this.buttons = result.data.buttons
        console.log(result.data.buttons)
        const userAsyncRoute = filterAsyncRoute(
          cloneDeep(asyncRoute),
          result.data.routes,
        )
        ;(this.menuRoutes = [...constantRoute, ...userAsyncRoute, ...anyRoute]),
          [...userAsyncRoute, ...anyRoute].forEach((route: any) => {
            router.addRoute(route)
          })
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //退出登录
    async logout() {
      const result: any = await reqLogout()
      if (result.code == 200) {
        this.username = ''
        this.avatar = ''
        this.token = ''
        this.menuRoutes = []
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(result.message)
      }
    },
  },

  getters: {},
})

export default useUserStore
