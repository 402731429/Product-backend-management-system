<template>
  <el-card>
    <el-table border :data="skuArr">
      <el-table-column
        label="序号"
        type="index"
        width="100px"
        align="center"
      ></el-table-column>
      <el-table-column
        label="名称"
        show-overflow-tooltip
        width="180px"
        prop="skuName"
      ></el-table-column>
      <el-table-column
        label="描述"
        show-overflow-tooltip
        width="180px"
        prop="skuDesc"
      ></el-table-column>
      <el-table-column label="图片" width="180px">
        <template #="{ row }">
          <img
            :src="row.skuDefaultImg"
            alt=""
            style="width: 100px; height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="重量"
        width="180px"
        prop="weight"
      ></el-table-column>
      <el-table-column
        label="价格"
        width="180px"
        prop="price"
      ></el-table-column>
      <el-table-column label="操作" width="350px" fixed="right">
        <template #="{ row }">
          <el-button
            :type="row.isSale == 1 ? 'info' : 'success'"
            size="small"
            :icon="row.isSale == 1 ? 'bottom' : 'Top'"
            @click="updateSale(row)"
          ></el-button>
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="updateSku"
          ></el-button>
          <el-button
            type="info"
            size="small"
            icon="InfoFilled"
            title="详情"
            @click="showSkuDetail(row)"
          ></el-button>
          <el-popconfirm
            :title="`你确定要删除${row.skuName}吗？`"
            width="200px"
            @confirm="removeSku(row)"
          >
            <template #reference>
              <el-button type="danger" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin: 10px 0px"
      @current-change="getHasSku"
      @size-change="handler"
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[3, 5, 7, 9]"
      :background="true"
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total"
    />
  </el-card>
  <el-drawer v-model="drawer">
    <template #header>
      <h4>查看商品详情</h4>
    </template>
    <template #default>
      <el-row style="margin: 10px 0px">
        <el-col :span="6">名称</el-col>
        <el-col :span="18">{{ skuParams.skuName }}</el-col>
      </el-row>
      <el-row style="margin: 10px 0px">
        <el-col :span="6">描述</el-col>
        <el-col :span="18">{{ skuParams.skuDesc }}</el-col>
      </el-row>
      <el-row style="margin: 10px 0px">
        <el-col :span="6">价格</el-col>
        <el-col :span="18">{{ skuParams.price }}</el-col>
      </el-row>
      <el-row style="margin: 10px 0px">
        <el-col :span="6">平台属性</el-col>
        <el-col :span="18">
          <el-tag
            style="margin: 0px 5px"
            v-for="(item, index) in skuParams.skuAttrValueList"
            :key="index"
          >
            {{ item.attrName }}
          </el-tag>
        </el-col>
      </el-row>
      <el-row style="margin: 10px 0px">
        <el-col :span="6">销售属性</el-col>
        <el-col :span="18">
          <el-tag
            style="margin: 0px 5px"
            v-for="(item, index) in skuParams.skuSaleAttrValueList"
            :key="index"
          >
            {{ item.saleAttrValueName }}
          </el-tag>
        </el-col>
      </el-row>
      <el-row style="margin: 10px 0px">
        <el-col :span="6">图片</el-col>
        <el-col :span="18">
          <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item
              v-for="item in skuParams.skuImageList"
              :key="item.id"
            >
              <img
                :src="item.imgUrl"
                alt=""
                style="width: 100%; height: 100%"
              />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  reqSkuList,
  reqCancelSale,
  reqSaleSku,
  reqSkuInfo,
  reqRemoveSku,
} from '@/api/product/sku/index'
import { SkuData } from '@/api/product/sku/type'
import { ElMessage } from 'element-plus'

let pageNo = ref<number>(1)
let pageSize = ref<number>(10)
let total = ref<number>(0)
let skuArr = ref<SkuData[]>([])
let drawer = ref<boolean>(false)
let skuParams = ref<SkuData>({
  skuName: '',
  skuDesc: '',
  price: 0,
  skuAttrValueList: [],
  skuSaleAttrValueList: [],
  skuImageList: [],
  category3Id: '',
  spuId: '',
  tmId: '',
  weight: '',
  skuDefaultImg: '',
})

onMounted(() => {
  getHasSku()
})

const getHasSku = async (pager = 1) => {
  pageNo.value = pager
  let result = await reqSkuList(pageNo.value, pageSize.value)
  if (result.code == 200) {
    total.value = result.data.total
    skuArr.value = result.data.records
  }
}

const handler = () => {
  getHasSku()
}

const updateSale = async (row: SkuData) => {
  if (row.isSale == 1) {
    await reqCancelSale(row.id as number)
    ElMessage({
      type: 'info',
      message: '下架成功',
    })
    getHasSku(pageNo.value)
  } else {
    await reqSaleSku(row.id as number)
    ElMessage({
      type: 'success',
      message: '上架成功',
    })
    getHasSku(pageNo.value)
  }
}

const updateSku = () => {
  ElMessage({
    type: 'success',
    message: '程序员在努力开发中~',
  })
}

const showSkuDetail = async (row: SkuData) => {
  drawer.value = true
  let result = await reqSkuInfo(row.id as number)
  skuParams.value.skuName = result.data.skuName
  skuParams.value.skuDesc = result.data.skuDesc
  skuParams.value.price = result.data.price as number
  skuParams.value.skuAttrValueList = result.data.skuAttrValueList
  skuParams.value.skuSaleAttrValueList = result.data.skuSaleAttrValueList
  skuParams.value.skuImageList = result.data.skuImageList
}

const removeSku = async (row: SkuData) => {
  let result = await reqRemoveSku(row.id as number)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getHasSku(pageNo.value)
  } else {
    ElMessage({
      type: 'error',
      message: '系统数据不能删除',
    })
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
