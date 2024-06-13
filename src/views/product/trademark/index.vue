<template>
  <el-card class="box-card">
    <el-button
      type="primary"
      size="default"
      icon="Plus"
      @click="addTradeMark"
      v-has="`btn.Trademark.add`"
    >
      添加品牌
    </el-button>
    <el-table style="margin: 10px 0px" :border="true" :data="tradeMarkArr">
      <el-table-column label="序号" width="80px" align="center" type="index" />
      <el-table-column label="品牌名称">
        <template #="{ row }">
          {{ row.tmName }}
        </template>
      </el-table-column>
      <el-table-column label="品牌LOGO">
        <template #="{ row }">
          <img
            :src="row.logoUrl"
            alt="没图"
            style="width: 100px; height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template #="{ row }">
          <el-button
            icon="Edit"
            size="small"
            type="warning"
            @click="updateTradeMark(row)"
          ></el-button>
          <el-popconfirm
            @confirm="confirmEvent(row)"
            :title="`确定要删除吗${row.tmName}?`"
            width="250px"
            icon="delete"
          >
            <template #reference>
              <el-button icon="Delete" size="small" type="danger"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="changeSize"
      @current-change="getHasTrademark"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[3, 5, 7, 9, 11]"
      :background="true"
      layout="prev, pager, next, jumper, ->, total, sizes"
      :total="total"
    />
  </el-card>
  <!-- 对话弹窗 -->
  <el-dialog
    v-model="dialogFormVIsible"
    :title="trademarkParams.id ? '修改品牌' : '添加品牌'"
  >
    <!-- 表单校验 :model绑定数据 :rules制定规则 -->
    <el-form
      style="width: 80%"
      :model="trademarkParams"
      :rules="rules"
      ref="formRef"
    >
      <el-form-item label="品牌名称" label-width="100px" prop="tmName">
        <el-input
          v-model="trademarkParams.tmName"
          placeholder="请输入品牌的名称"
        />
      </el-form-item>
      <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
        <el-upload
          class="avatar-uploader"
          action="http://sph-api.atguigu.cn/admin/product/fileUpload"
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess"
          :show-file-list="false"
        >
          <img
            v-if="trademarkParams.logoUrl"
            :src="trademarkParams.logoUrl"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <!-- 在dialog中使用footer插槽 -->
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, watch } from 'vue'
import {
  reqHasTrademark,
  reqAddOrUpdateTradeMark,
  reqDeleteTradeMark,
} from '@/api/product/tradeMark/index'
import {
  Records,
  TradeMarkResponseData,
  TradeMark,
} from '@/api/product/tradeMark/type'
import { UploadProps, ElMessage } from 'element-plus'

let currentPage = ref<number>(1)
let pageSize = ref<number>(3)
let total = ref<number>(0)
let tradeMarkArr = ref<Records>([])
let dialogFormVIsible = ref<boolean>(false)
let trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
  id: 0,
})
let formRef = ref()

const getHasTrademark = async (pager = 1) => {
  currentPage.value = pager
  let result: TradeMarkResponseData = await reqHasTrademark(
    currentPage.value,
    pageSize.value,
  )
  if (result.code == 200) {
    total.value = result.data.total
    tradeMarkArr.value = result.data.records
  }
}

onMounted(() => {
  getHasTrademark()
})

const changeSize = () => {
  getHasTrademark()
}

const cancel = () => {
  dialogFormVIsible.value = false
}

const confirm = async () => {
  await formRef.value.validate()
  let result = await reqAddOrUpdateTradeMark(trademarkParams)
  if (result.code == 200) {
    dialogFormVIsible.value = false
    ElMessage({
      type: 'success',
      message: '操作成功',
    })
    getHasTrademark(trademarkParams.id ? currentPage.value : 1)
  } else {
    ElMessage({
      type: 'error',
      message: '操作失败',
    })
    dialogFormVIsible.value = false
  }
}

const addTradeMark = () => {
  dialogFormVIsible.value = true
  trademarkParams.id = 0
  trademarkParams.logoUrl = ''
  trademarkParams.tmName = ''
}

const updateTradeMark = (row: TradeMark) => {
  Object.assign(trademarkParams, row)
  dialogFormVIsible.value = true
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/jepg' ||
    rawFile.type == 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '文件大小要小于4M',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '文件必须为PNG|JPG|GIF类型',
    })
    return false
  }
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  trademarkParams.logoUrl = response.data
  formRef.value.clearValidate('logoUrl')
}

const validatorName = (value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('请输入大于等于2位'))
  }
}

const validatorLogoUrl = (value: any, callback: any) => {
  if (value) {
    callback()
  } else {
    callback('请选择文件')
  }
}

const rules = {
  tmName: [{ required: true, trigger: 'blur', validator: validatorName }],
  logoUrl: [{ required: true, validator: validatorLogoUrl }],
}

watch(dialogFormVIsible, (newValue) => {
  if (!newValue) {
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('logoUrl')
  }
})

const confirmEvent = async (row: any) => {
  let result = await reqDeleteTradeMark(row.id)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getHasTrademark(
      tradeMarkArr.value.length > 1 ? currentPage.value : currentPage.value - 1,
    )
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
