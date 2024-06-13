<template>
  <div>
    <el-card>
      <Category :scene="scene"></Category>
    </el-card>
    <el-card style="margin: 10px 0px; width: 100%">
      <div v-show="scene == 0">
        <el-button
          type="primary"
          icon="Plus"
          @click="addAttr"
          :disabled="categoryStore.c3ID ? false : true"
        >
          添加平台属性
        </el-button>
        <el-table style="margin: 10px 0px" stripe border :data="attr">
          <el-table-column
            label="序号"
            width="100"
            align="center"
            type="index"
          ></el-table-column>
          <el-table-column
            label="属性名称"
            width="160"
            prop="attrName"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row }">
              <el-tag
                style="margin: 5px"
                v-for="item in row.attrValueList"
                :key="item.id"
              >
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="160">
            <template #="{ row }">
              <el-button
                icon="Edit"
                size="small"
                type="warning"
                @click="updateAttr(row)"
              ></el-button>
              <el-popconfirm
                :title="`确定要删除${row.attrName}吗?`"
                width="250px"
                icon="delete"
                @confirm="deleteAttr(row)"
              >
                <template #reference>
                  <el-button
                    icon="Delete"
                    size="small"
                    type="danger"
                  ></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加页面 -->
      <div v-show="scene == 1">
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input
              placeholder="请输入属性的名字"
              v-model="attrParams.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="Plus"
          :disabled="attrParams.attrName ? false : true"
          @click="addAttrValue"
        >
          添加属性值
        </el-button>
        <el-button @click="cancelValue">取消</el-button>
        <el-table
          border
          style="margin: 10px 0px"
          :data="attrParams.attrValueList"
        >
          <el-table-column
            label="序号"
            width="100"
            type="index"
            align="center"
          ></el-table-column>
          <el-table-column label="属性值" width="">
            <template #="{ row, $index }">
              <el-input
                placeholder="请输入属性值"
                v-model="row.valueName"
                size="small"
                v-if="row.flag"
                @blur="toLookOrEdit(row, $index)"
                :ref="(vc: any) => (inputArr[$index] = vc)"
              ></el-input>
              <div @click="toLookOrEdit(row, $index)" v-else>
                {{ row.valueName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作" width="">
            <template #="{ $index }">
              <el-popconfirm
                title="确定要删除吗?"
                width="250px"
                icon="delete"
                @confirm="deleteAttrValue($index)"
              >
                <template #reference>
                  <el-button
                    icon="Delete"
                    size="small"
                    type="danger"
                  ></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          @click="save"
          :disabled="attrParams.attrValueList.length != 0 ? false : true"
        >
          保存
        </el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { Attr, attrValue, attrList } from '@/api/product/attr/type'
import useCategoryStore from '@/store/modules/category'
import { ref, reactive, nextTick, onBeforeUnmount, watch } from 'vue'
import {
  reqAddOrUpdateAttr,
  reqAttr,
  reqDeleteAttr,
} from '@/api/product/attr/index'
import { ElMessage } from 'element-plus'

let categoryStore = useCategoryStore()
let scene = ref<number>(0)
let attrParams = reactive<Attr>({
  attrName: '',
  attrValueList: [],
  categoryId: '',
  categoryLevel: 3,
})
let inputArr = ref<any>([])
let attr = ref<attrList>([])

const getAttr = async () => {
  const result = await reqAttr(
    categoryStore.c1ID,
    categoryStore.c2ID,
    categoryStore.c3ID,
  )
  if (result.code == 200) {
    attr.value = result.data
  } else {
    return Promise.reject(new Error('服务器无法获取数据'))
  }
}

watch(
  () => categoryStore.c3ID,
  () => {
    attr.value = []
    if (!categoryStore.c3ID) return
    getAttr()
  },
)

const addAttr = () => {
  scene.value = 1
}

const updateAttr = (row: Attr) => {
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
  scene.value = 1
}

const addAttrValue = () => {
  attrParams.attrValueList.push({
    valueName: '',
    flag: true,
  })
  nextTick(() => {
    inputArr.value[inputArr.value.length - 1].focus()
  })
}

const deleteAttr = async (row: Attr) => {
  let result = await reqDeleteAttr(row.id as number)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getAttr()
  } else {
    ElMessage({
      type: 'success',
      message: '删除失败',
    })
  }
}

const cancelValue = () => {
  attrParams.attrValueList = []
}

const cancel = () => {
  Object.assign(attrParams, {
    attrName: '',
    attrValueList: [],
    categoryId: '',
    categoryLevel: 3,
  })
  scene.value = 0
}

const deleteAttrValue = ($index: number) => {
  attrParams.attrValueList.splice($index, 1)
}

const save = async () => {
  attrParams.categoryId = categoryStore.c3ID
  let result = await reqAddOrUpdateAttr(attrParams)
  if (result.code == 200) {
    scene.value = 0
    Object.assign(attrParams, {
      attrName: '',
      attrValueList: [],
      categoryId: '',
      categoryLevel: 3,
    })
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功',
    })
    getAttr()
  } else {
    return Promise.reject(new Error('添加失败'))
  }
}

const toLookOrEdit = (row: attrValue, $index: number) => {
  if (!row.valueName) {
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不为空',
    })
    return
  }
  let repeat = attrParams.attrValueList.find((item) => {
    if (row != item) {
      return item.valueName === row.valueName
    }
  })
  if (repeat) {
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能重复',
    })
    return
  }
  row.flag = !row.flag

  if (row.flag) {
    nextTick(() => {
      inputArr.value[$index].focus()
    })
  }
}

onBeforeUnmount(() => {
  categoryStore.$reset()
})
</script>

<style scoped></style>
