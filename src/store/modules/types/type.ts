import type { RouteRecordRaw } from 'vue-router'
import { categoryData } from '@/api/product/attr/type'
//小仓库state中ts类型
export interface userState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  username: string
  avatar: string
  buttons: string[]
}

export interface categoryState {
  c1Arr: categoryData[]
  c1ID: string | number
  c2Arr: categoryData[]
  c2ID: string | number
  c3Arr: categoryData[]
  c3ID: string | number
}
