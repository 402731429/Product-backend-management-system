export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface SpuData {
  id?: number
  spuName: string
  description: string
  category3Id: number | string
  tmId: number | string
  spuSaleAttrList: null | SaleAttr[]
  spuImageList: null | SpuImg[]
}

export type Records = SpuData[]

export interface HasSpuResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}

export interface Trademark {
  id: number
  tmName: string
  logoUrl: string
}

export interface AllTrademark extends ResponseData {
  data: Trademark[]
}

export type SpuImg = any

export interface SpuHasImg extends ResponseData {
  data: SpuImg[]
}

export interface SaleAttrValue {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrValueName: string
  saleAttrName?: string
  isChecked?: null
}

export type spuSaleAttrValueList = SaleAttrValue[]

export interface SaleAttr {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrName: string
  spuSaleAttrValueList: spuSaleAttrValueList
  inputVisible?: boolean | null
  saleIdAndValueId?: number | string
}

export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttr[]
}

export interface HasSaleAttr {
  id: number
  name: string
}

export interface HasSaleAttrResponseDate extends ResponseData {
  data: HasSaleAttr[]
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
}

export interface AttrValue {
  attrId: number | string
  valueId: number | string
}

export interface SaleAttrValue {
  saleAttrId: number | string
  saleAttrValueId: number | string
}

export interface SkuInfoData extends ResponseData {
  data: SkuData[]
}
