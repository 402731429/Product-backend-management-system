export interface categoryObject {
  code: number
  data: categoryData[]
  message: string
  ok: boolean
}

export interface categoryData {
  id: number | string
  createTime: string
  updateTime: string
  name: string
  category1Id?: number
  category2Id?: number
}

export interface attrValue {
  id?: number
  valueName: string
  attrId?: number
  flag?: boolean
}

export type attrValueList = attrValue[]

export interface Attr {
  id?: number
  attrName: string
  categoryId: number | string
  categoryLevel: number
  attrValueList: attrValueList
  attrIdAndValueId?: number | string
}

export type attrList = Attr[]

export interface attrResponseData {
  data: Attr[]
  code: number
  message: string
  ok: boolean
}
