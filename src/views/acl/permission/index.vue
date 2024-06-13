<template>
  <el-table
    :data="allPermission"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    border
    default-expand-all
  >
    <el-table-column prop="name" label="名称" sortable />
    <el-table-column prop="code" label="权限值" sortable />
    <el-table-column prop="updateTime" label="修改时间" sortable />
    <el-table-column label="修改" sortable>
      <template #="{ row }">
        <el-button
          size="small"
          type="primary"
          :disabled="row.level == 4 ? true : false"
          @click="addPermission(row)"
          v-has="`btn.Permission.add`"
        >
          {{ row.level == 3 ? '添加功能' : '添加菜单' }}
        </el-button>
        <el-button
          size="small"
          type="primary"
          :disabled="row.level == 1 ? true : false"
          @click="updatePermission(row)"
          v-has="`btn.Permission.update`"
        >
          编辑
        </el-button>
        <el-popconfirm
          :title="`你确定要删除${row.name}吗?`"
          @confirm="deletePermission(row.id)"
          width="260px"
          v-has="`btn.Permission.remove`"
        >
          <template #reference>
            <el-button
              size="small"
              type="primary"
              :disabled="row.level == 1 ? true : false"
            >
              删除
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
    v-model="dialogVisible"
    :title="menuData.id ? '更新菜单' : '添加菜单'"
    width="460px"
  >
    <span>
      <el-form label-width="100px">
        <el-form-item label="名称">
          <el-input placeholder="请填写名称" v-model="menuData.name"></el-input>
        </el-form-item>
        <el-form-item label="权限值">
          <el-input placeholder="请填权限值" v-model="menuData.code"></el-input>
        </el-form-item>
      </el-form>
    </span>
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="save">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {
  reqAddOrPermission,
  reqAllPermission,
  reqDeletePermission,
} from '@/api/acl/menu/index'
import { Permission, PermissionList, MenuParams } from '@/api/acl/menu/type'
import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'

let allPermission = ref<PermissionList>([])
let dialogVisible = ref<boolean>(false)
let menuData = ref<MenuParams>({
  code: '',
  name: '',
  level: 0,
  pid: 0,
})

onMounted(() => {
  getHasPermission()
})

const getHasPermission = async () => {
  let result = await reqAllPermission()
  if (result.code == 200) {
    allPermission.value = result.data
  }
}

const addPermission = (row: Permission) => {
  Object.assign(menuData.value, {
    id: 0,
    code: '',
    name: '',
    level: 0,
    pid: 0,
  })
  dialogVisible.value = true
  menuData.value.level = row.level + 1
  menuData.value.pid = row.id
  console.log(menuData.value.level + ' ' + row.level)
}

const updatePermission = (row: Permission) => {
  dialogVisible.value = true
  Object.assign(menuData.value, row)
}

const save = async () => {
  let result = await reqAddOrPermission(menuData.value)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: menuData.value.id ? '更新成功' : '添加成功',
    })
    dialogVisible.value = false
    getHasPermission()
  }
}

const deletePermission = async (id: number) => {
  let result = await reqDeletePermission(id)
  if (result.code == 200) {
    ElMessage({ type: 'success', message: '删除成功' })
    getHasPermission()
  }
}
</script>

<style scoped></style>
