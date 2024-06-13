<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="sku名称">
        <el-input placeholder="sku名称" v-model="skuParams.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input
          v-model="skuParams.price"
          placeholder="价格(元)"
          type="number"
        ></el-input>
      </el-form-item>
      <el-form-item label="重量(g)">
        <el-input
          v-model="skuParams.weight"
          placeholder="重量(g)"
          type="number"
        ></el-input>
      </el-form-item>
      <el-form-item label="sku描述">
        <el-input
          v-model="skuParams.skuDesc"
          placeholder="sku描述"
          type="text"
        ></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form inline>
          <el-form-item
            v-for="item in attrArr"
            :label="item.attrName"
            :key="item.id"
          >
            <el-select
              placeholder="请选择"
              style="width: 240px"
              v-model="item.attrIdAndValueId"
            >
              <el-option
                v-for="attrValue in item.attrValueList"
                :key="attrValue.id"
                :label="attrValue.valueName"
                :value="`${item.id}:${attrValue.id}`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form inline>
          <el-form-item
            v-for="item in saleArr"
            :key="item.id"
            :label="item.saleAttrName"
          >
            <el-select
              placeholder="请选择"
              style="width: 240px"
              v-model="item.saleIdAndValueId"
            >
              <el-option
                v-for="saleAttrValue in item.spuSaleAttrValueList"
                :key="saleAttrValue.id"
                :label="saleAttrValue.saleAttrValueName"
                :value="`${item.id}:${saleAttrValue.id}`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片名称">
        <el-table border :data="imgArr" ref="table">
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="图片">
            <template #="{ row }">
              <img :src="row.imgUrl" alt="" />
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName"></el-table-column>
          <el-table-column label="操作">
            <template #="{ row }">
              <el-button type="primary" @click="handler(row)">
                设置默认
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reqAttr } from '@/api/product/attr/index'
import {
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAddSku,
} from '@/api/product/spu/index'
import { SaleAttr, SpuData, SpuImg, SkuData } from '@/api/product/spu/type'
import { Attr } from '@/api/product/attr/type'
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'

let $emit = defineEmits(['changeScene'])
let attrArr = ref<Attr[]>([])
let saleArr = ref<SaleAttr[]>([])
let imgArr = ref<SpuImg[]>([])
let skuParams = reactive<SkuData>({
  category3Id: '',
  spuId: '',
  tmId: '',
  skuName: '',
  price: '',
  weight: '',
  skuDesc: '',
  skuAttrValueList: [],
  skuSaleAttrValueList: [],
  skuDefaultImg: '',
})

const cancel = () => {
  clear()
  $emit('changeScene', { num: 0, params: '' })
}

const initSkuData = async (
  c1Id: number | string,
  c2Id: number | string,
  spu: SpuData,
) => {
  skuParams.category3Id = spu.category3Id
  skuParams.spuId = spu.id as number
  skuParams.tmId = spu.tmId
  let result_attr = await reqAttr(c1Id, c2Id, spu.category3Id)
  let result_imgList = await reqSpuImageList(spu.id as number)
  let result_saleAttr = await reqSpuHasSaleAttr(spu.id as number)
  attrArr.value = result_attr.data
  imgArr.value = result_imgList.data
  saleArr.value = result_saleAttr.data
}

let table = ref<any>()

const handler = (row: any) => {
  imgArr.value.forEach((item) => {
    table.value.toggleRowSelection(item, false)
  })
  table.value.toggleRowSelection(row, true)
  skuParams.skuDefaultImg = row.imgUrl
}

const save = async () => {
  skuParams.skuAttrValueList = attrArr.value.reduce((prev: any, next: any) => {
    if (next.attrIdAndValueId) {
      let [attrId, valueId] = next.attrIdAndValueId.split(':')
      prev.push({
        attrId,
        valueId,
      })
    }
    return prev
  }, [])
  skuParams.skuSaleAttrValueList = saleArr.value.reduce(
    (prev: any, next: any) => {
      if (next.saleIdAndValueId) {
        let [saleId, saleAttrValueId] = next.saleIdAndValueId.split(':')
        prev.push({
          saleId,
          saleAttrValueId,
        })
      }
      return prev
    },
    [],
  )
  let result = await reqAddSku(skuParams)
  console.log(result)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '添加成功',
    })
    clear()
    $emit('changeScene', { num: 0, params: '' })
  } else {
    ElMessage({
      type: 'error',
      message: '添加失败',
    })
  }
}

const clear = () => {
  Object.assign(skuParams, {
    category3Id: '',
    spuId: '',
    tmId: '',
    skuName: '',
    price: '',
    weight: '',
    skuDesc: '',
    skuAttrValueList: [],
    skuSaleAttrValueList: [],
    skuDefaultImg: '',
  })
}

defineExpose({ initSkuData })
</script>

<style scoped></style>
