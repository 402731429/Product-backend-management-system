import { defineStore } from 'pinia'
import {
  reqGetCategory1,
  reqGetCategory2,
  reqGetCategory3,
} from '@/api/product/attr/index'
import { categoryState } from './types/type'

const useCategoryStore = defineStore('categoryStore', {
  state: (): categoryState => {
    return {
      c1Arr: [],
      c1ID: '',
      c2Arr: [],
      c2ID: '',
      c3Arr: [],
      c3ID: '',
    }
  },
  actions: {
    async getC1Arr() {
      const result = await reqGetCategory1()
      if (result.code == 200) {
        this.c1Arr = result.data
      } else {
        return Promise.reject(new Error('服务器无法获取数据'))
      }
    },
    async getC2Arr() {
      const result = await reqGetCategory2(this.c1ID)
      if (result.code == 200) {
        this.c2Arr = result.data
      } else {
        return Promise.reject(new Error('服务器无法获取数据'))
      }
    },
    async getC3Arr() {
      const result = await reqGetCategory3(this.c2ID)
      if (result.code == 200) {
        this.c3Arr = result.data
      } else {
        return Promise.reject(new Error('服务器无法获取数据'))
      }
    },
  },
  getters: {},
})

export default useCategoryStore
