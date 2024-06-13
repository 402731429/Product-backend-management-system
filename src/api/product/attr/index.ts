import request from '@/utils/request'
import { categoryObject, attrResponseData, Attr } from './type'

enum API {
  CATEGORY1_URL = '/admin/product/getCategory1',
  CATEGORY2_URL = '/admin/product/getCategory2/',
  CATEGORY3_URL = '/admin/product/getCategory3/',
  ATTR_URL = '/admin/product/attrInfoList/',
  ADDORUPDATEATTR_URL = '/admin/product/saveAttrInfo',
  DELETEATTR_URL = '/admin/product/deleteAttr/',
}

export const reqGetCategory1 = () => request.get<any, any>(API.CATEGORY1_URL)
export const reqGetCategory2 = (data: number | string) =>
  request.get<any, categoryObject>(API.CATEGORY2_URL + `${data}`)
export const reqGetCategory3 = (data: number | string) =>
  request.get<any, categoryObject>(API.CATEGORY3_URL + `${data}`)
export const reqAttr = (
  c1Id: number | string,
  c2Id: number | string,
  c3Id: number | string,
) =>
  request.get<any, attrResponseData>(API.ATTR_URL + `${c1Id}/${c2Id}/${c3Id}`)
export const reqAddOrUpdateAttr = (data: Attr) =>
  request.post<any, any>(API.ADDORUPDATEATTR_URL, data)
export const reqDeleteAttr = (id: number) =>
  request.delete<any, any>(API.DELETEATTR_URL + `${id}`)
