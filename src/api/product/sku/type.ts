export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface SkuData {
  category3Id: string | number
  spuId: string | number
  tmId: string | number
  skuName: string
  price: string | number
  weight: string | number
  skuDesc: string
  skuAttrValueList: AttrValue[]
  skuSaleAttrValueList: SaleAttrValue[]
  skuDefaultImg: string
  id?: number
  isSale?: number
  skuImageList?: ImgValue[]
}

export interface ImgValue {
  id: number
  imgUrl: string
}

export interface AttrValue {
  attrId: number | string
  valueId: number | string
  attrName?: string
}

export interface SaleAttrValue {
  saleAttrId: number | string
  saleAttrValueId: number | string
  saleAttrValueName?: string
}

export interface SkuResponseData extends ResponseData {
  data: {
    records: SkuData[]
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
}
