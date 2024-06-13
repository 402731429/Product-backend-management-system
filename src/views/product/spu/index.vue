<template>
  <div>
    <el-card><Category :scene="scene"></Category></el-card>
    <el-card>
      <div v-show="scene == 0">
        <el-button
          type="primary"
          icon="Plus"
          :disabled="categoryStore.c3ID ? false : true"
          @click="addSpu"
        >
          添加SPU
        </el-button>
        <el-table border stripe :data="records" style="margin: 10px 0px">
          <el-table-column
            label="序号"
            align="center"
            type="index"
          ></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column
            label="SPU描述"
            prop="description"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="SPU操作">
            <template #="{ row }">
              <el-button
                type="primary"
                icon="Plus"
                size="small"
                title="添加SKU"
                @click="addSku(row)"
              ></el-button>
              <el-button
                type="warning"
                icon="Edit"
                size="small"
                title="修改SPU"
                @click="updateSpu(row)"
              ></el-button>
              <el-button
                type="info"
                icon="View"
                size="small"
                title="查看SKU列表"
                @click="findSku(row)"
              ></el-button>
              <el-button
                type="danger"
                icon="Delete"
                size="small"
                title="删除SPU"
                @click="deleteSpu(row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="getHasSpu"
          @size-change="getHasSpu(1)"
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :page-sizes="[3, 5, 7, 9]"
          :background="true"
          layout="prev, pager, next, jumper, ->, sizes, total"
          :total="total"
        />
      </div>
      <spuForm
        ref="spu"
        v-show="scene == 1"
        @changeScene="changeScene"
      ></spuForm>
      <skuForm
        ref="sku"
        v-show="scene == 2"
        @changeScene="changeScene"
      ></skuForm>
      <el-dialog v-model="outerVisible" title="SKU列表" width="800">
        <el-table :data="skuDataArr" border>
          <el-table-column label="sku名字" prop="skuName"></el-table-column>
          <el-table-column label="sku价格" prop="price"></el-table-column>
          <el-table-column label="sku重量" prop="weight"></el-table-column>
          <el-table-column label="sku图片">
            <template #="{ row }">
              <img
                :src="row.skuDefaultImg"
                alt=""
                style="width: 100%; height: 100%"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import useCategoryStore from '@/store/modules/category'
import { reqDeleteSpu, reqHasSpu, reqSkuList } from '@/api/product/spu/index'
import {
  HasSpuResponseData,
  Records,
  SkuData,
  SkuInfoData,
  SpuData,
} from '@/api/product/spu/type'
import spuForm from './spuForm.vue'
import skuForm from './skuForm.vue'
import { ElMessage } from 'element-plus'

let categoryStore = useCategoryStore()
let scene = ref<number>(0)
let pageNo = ref<number>(1)
let pageSize = ref<number>(3)
let records = ref<Records>([])
let total = ref<number>(0)
let spu = ref<any>()
let sku = ref<any>()

watch(
  () => categoryStore.c3ID,
  () => {
    if (!categoryStore.c3ID) return
    getHasSpu()
  },
)

const getHasSpu = async (pager = 1) => {
  pageNo.value = pager
  let result: HasSpuResponseData = await reqHasSpu(
    pageNo.value,
    pageSize.value,
    categoryStore.c3ID,
  )
  if (result.code == 200) {
    records.value = result.data.records
    total.value = result.data.total
  }
}

const addSpu = () => {
  scene.value = 1
  spu.value.initAddSpu(categoryStore.c3ID)
}

const updateSpu = (row: SpuData) => {
  scene.value = 1
  spu.value.initHasSpuData(row)
}

const changeScene = (obj: any) => {
  scene.value = obj.num
  if (obj.params == 'update') {
    getHasSpu(pageNo.value)
  } else if (obj.params == 'add') {
    getHasSpu()
  }
}

const addSku = (row: SpuData) => {
  scene.value = 2
  sku.value.initSkuData(categoryStore.c1ID, categoryStore.c2ID, row)
}

let skuDataArr = ref<SkuData[]>([])
let outerVisible = ref<boolean>(false)

const findSku = async (row: SpuData) => {
  let result: SkuInfoData = await reqSkuList(row.id as number)
  if (result.code == 200) {
    outerVisible.value = true
    skuDataArr.value = result.data
  }
}

const deleteSpu = async (row: SpuData) => {
  let result = await reqDeleteSpu(row.id as number)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getHasSpu(pageNo.value)
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}

onBeforeUnmount(() => {
  categoryStore.$reset()
})
</script>

<style scoped></style>
