import request from '@/utils/request'
import { TradeMarkResponseData, TradeMark } from './type'
enum API {
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  UPDATERADEMARK_URL = '/admin/product/baseTrademark/update',
  DELETE_URL = '/admin/product/baseTrademark/remove/',
}

export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TradeMarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`,
  )

export const reqAddOrUpdateTradeMark = (data: TradeMark) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATERADEMARK_URL, data)
  } else {
    return request.post<any, any>(API.ADDTRADEMARK_URL, data)
  }
}

export const reqDeleteTradeMark = (id: number) =>
  request.delete<any, any>(API.DELETE_URL + id)
