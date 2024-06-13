<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input
        placeholder="请输入spu名称"
        v-model="spuParams.spuName"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select v-model="spuParams.tmId">
        <el-option
          v-for="item in allTrademark"
          :key="item.id"
          :label="item.tmName"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input
        type="textarea"
        placeholder="请输入描述"
        v-model="spuParams.description"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU照片">
      <el-upload
        v-model:file-list="imgList"
        action="http://sph-api.atguigu.cn/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select
        style="width: 240px"
        :placeholder="
          unSelectSaleAttr.length > 0
            ? `还剩${unSelectSaleAttr.length}个没选`
            : `无`
        "
        v-model="saleAttrIdAttrName"
      >
        <el-option
          v-for="item in unSelectSaleAttr"
          :key="item.id"
          :label="item.name"
          :value="`${item.id}:${item.name}`"
        ></el-option>
      </el-select>
      <el-button
        icon="Plus"
        type="primary"
        size="default"
        style="margin-left: 10px"
        :disabled="saleAttrIdAttrName ? false : true"
        @click="addAttr"
      >
        添加SPU属性
      </el-button>
      <el-table border style="margin: 10px 0px" :data="saleAttr">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column
          label="销售属性名称"
          width="120px"
          prop="saleAttrName"
        ></el-table-column>
        <el-table-column label="销售属性值">
          <template #="{ row }">
            <el-tag
              style="margin: 0px 5px"
              v-for="(item, index) in row.spuSaleAttrValueList"
              :key="item.id"
              closable
              @close="row.spuSaleAttrValueList.splice(index, 1)"
            >
              {{ item.saleAttrValueName }}
            </el-tag>
            <el-input
              v-if="row.inputVisible"
              style="width: 80px"
              ref="InputRef"
              v-model="inputTagValue"
              class="w-20"
              size="small"
              @keyup.enter="handleInputConfirm(row)"
              @blur="handleInputConfirm(row)"
            />
            <el-button
              v-else
              type="primary"
              icon="Plus"
              size="small"
              @click="showInput(row)"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100px">
          <template #="{ $index }">
            <el-button
              type="danger"
              icon="delete"
              size="small"
              @click="saleAttr.splice($index, 1)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button
        :disabled="saleAttr.length > 0 ? false : true"
        type="primary"
        size="default"
        @click="save"
      >
        保存
      </el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import {
  SpuData,
  AllTrademark,
  SpuHasImg,
  SaleAttrResponseData,
  HasSaleAttrResponseDate,
  SpuImg,
  SaleAttr,
  HasSaleAttr,
  SaleAttrValue,
} from '@/api/product/spu/type'
import {
  reqSpuHasSaleAttr,
  reqAllTrademark,
  reqSpuImageList,
  reqAllSaleAttr,
  reqAddOrUpdateSpu,
} from '@/api/product/spu/index'
import { TradeMark } from '@/api/product/tradeMark/type'
import { computed, nextTick, ref } from 'vue'
import { ElInput, ElMessage, type UploadProps } from 'element-plus'

let $emit = defineEmits(['changeScene'])

const cancel = () => {
  clearData()
  $emit('changeScene', { num: 0, params: 'update' })
}

let allTrademark = ref<TradeMark[]>([])
let imgList = ref<SpuImg[]>([])
let saleAttr = ref<SaleAttr[]>([])
let allSaleAttr = ref<HasSaleAttr[]>([])
let spuParams = ref<SpuData>({
  spuName: '',
  description: '',
  category3Id: '',
  tmId: '',
  spuImageList: [],
  spuSaleAttrList: [],
})
const dialogImageUrl = ref<string>('')
const dialogVisible = ref<boolean>(false)
let inputTagValue = ref<string>('')
let saleAttrIdAttrName = ref<string>('')
let InputRef = ref<InstanceType<typeof ElInput>>()

const initHasSpuData = async (row: SpuData) => {
  spuParams.value = row
  let result_allTrademark: AllTrademark = await reqAllTrademark()
  let result_imageList: SpuHasImg = await reqSpuImageList(row.id as number)
  let result_saleAttr: SaleAttrResponseData = await reqSpuHasSaleAttr(
    row.id as number,
  )
  let result_allSaleAttr: HasSaleAttrResponseDate = await reqAllSaleAttr()
  allTrademark.value = result_allTrademark.data
  imgList.value = result_imageList.data.map((item) => {
    return {
      name: item.imgName,
      url: item.imgUrl,
    }
  })
  saleAttr.value = result_saleAttr.data
  allSaleAttr.value = result_allSaleAttr.data
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handleInputConfirm = (row: SaleAttr) => {
  if (inputTagValue.value) {
    const { baseSaleAttrId } = row
    let newSaleAttr: SaleAttrValue = {
      baseSaleAttrId,
      saleAttrValueName: inputTagValue.value,
      saleAttrId: '',
      saleAttrValueId: '',
    }
    let repeat = row.spuSaleAttrValueList.find((item) => {
      return inputTagValue.value == item.saleAttrValueName
    })
    if (repeat) {
      ElMessage({
        type: 'error',
        message: '属性值不能重复',
      })
      return
    }
    row.spuSaleAttrValueList.push(newSaleAttr)
  }
  row.inputVisible = false
  inputTagValue.value = ''
}

let unSelectSaleAttr = computed(() => {
  let unSelectArr = allSaleAttr.value.filter((item) => {
    return saleAttr.value.every((item1) => {
      return item.name != item1.saleAttrName
    })
  })
  return unSelectArr
})

const addAttr = () => {
  let [baseSaleAttrId, saleAttrName] = saleAttrIdAttrName.value.split(':')
  let newSaleAttr: SaleAttr = {
    saleAttrName,
    baseSaleAttrId,
    spuSaleAttrValueList: [],
  }
  saleAttr.value.push(newSaleAttr)
  saleAttrIdAttrName.value = ''
}

const showInput = (row: SaleAttr) => {
  row.inputVisible = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}

const save = async () => {
  spuParams.value.spuImageList = imgList.value.map((item: any) => {
    return {
      imgName: item.name,
      imgUrl: (item.response && item.response.data) || item.url,
    }
  })
  spuParams.value.spuSaleAttrList = saleAttr.value
  let result = await reqAddOrUpdateSpu(spuParams.value)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: spuParams.value.id ? '更新成功' : '添加成功',
    })
    clearData()
    $emit('changeScene', {
      num: 0,
      params: spuParams.value.id ? 'add' : 'update',
    })
  } else {
    ElMessage({
      type: 'error',
      message: spuParams.value.id ? '更新失败' : '添加失败',
    })
  }
}

const clearData = () => {
  Object.assign(spuParams.value, {
    id: '',
    spuName: '',
    description: '',
    category3Id: '',
    tmId: '',
    spuImageList: [],
    spuSaleAttrList: [],
  })
  imgList.value = []
  saleAttr.value = []
  saleAttrIdAttrName.value = ''
}

const initAddSpu = async (c3Id: number | string) => {
  spuParams.value.category3Id = c3Id
  let result_allTrademark: AllTrademark = await reqAllTrademark()
  let result_allSaleAttr: HasSaleAttrResponseDate = await reqAllSaleAttr()
  allTrademark.value = result_allTrademark.data
  allSaleAttr.value = result_allSaleAttr.data
}

defineExpose({ initHasSpuData, initAddSpu })
</script>

<style scoped></style>
