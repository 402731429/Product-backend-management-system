<template>
  <el-card style="height: 80px">
    <el-form :inline="true" class="form">
      <el-form-item label="角色名称">
        <el-input v-model="keyword" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :disabled="keyword ? false : true"
          @click="search"
        >
          搜索
        </el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0px">
    <el-button
      type="primary"
      @click="addRole"
      icon="Plus"
      v-has="`btn.Role.add`"
    >
      添加角色
    </el-button>
    <el-table border style="margin-top: 10px" :data="allRole">
      <el-table-column
        type="index"
        label="#"
        align="center"
        width="180px"
      ></el-table-column>
      <el-table-column
        label="id"
        prop="id"
        align="center"
        width="180px"
      ></el-table-column>
      <el-table-column
        label="角色名称"
        prop="roleName"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="创建时间"
        prop="createTime"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="更新时间"
        prop="updateTime"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column label="操作" width="280px" align="center">
        <template #="{ row }">
          <el-button
            type="primary"
            size="small"
            icon="User"
            @click="setPermission(row)"
            v-has="`btn.Role.assign`"
          >
            分配权限
          </el-button>
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="updateRole(row)"
            v-has="`btn.Role.update`"
          >
            编辑
          </el-button>
          <el-popconfirm
            width="260px"
            :title="`你确定要删除${row.roleName}`"
            @confirm="deleteRole(row.id)"
          >
            <template #reference>
              <el-button
                type="primary"
                size="small"
                icon="Delete"
                v-has="`btn.Role.remove`"
              >
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin: 10px 0px"
      @current-change="getHasRole(pageNo)"
      @size-change="handler"
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[5, 7, 9, 11]"
      :background="true"
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total"
    />
  </el-card>
  <el-dialog
    v-model="dialogVisite"
    :title="roleParams.id ? '更新角色' : '添加角色'"
  >
    <el-form ref="formRef" :model="roleParams" :rules="rules">
      <el-form-item label="职位名称" prop="roleName">
        <el-input
          placeholder="请你输入职位名称"
          v-model="roleParams.roleName"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">提交</el-button>
      </span>
    </template>
  </el-dialog>
  <el-drawer v-model="drawer">
    <template #header>
      <h4>分配权限</h4>
    </template>
    <template #default>
      <el-tree
        ref="tree"
        :data="allMenuList"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="selectMenuList"
        :props="defaultProps"
      />
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="drawer = false">取消</el-button>
        <el-button type="primary" @click="confirmPermission">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import useLayoutSettingStore from '@/store/modules/setting'
import {
  reqAllRole,
  reqAddOrUpdateRole,
  reqAllMenuList,
  reqSetPermission,
  reqRemoveRole,
} from '@/api/acl/role/index'
import { MenuList, Records, RoleData } from '@/api/acl/role/type'
import { ElMessage } from 'element-plus'

let pageNo = ref<number>(1)
let pageSize = ref<number>(5)
let total = ref<number>(0)
let settingStore = useLayoutSettingStore()
let keyword = ref<string>('')
let allRole = ref<Records>()
let dialogVisite = ref<boolean>(false)
let roleParams = ref<RoleData>({
  id: 0,
  roleName: '',
})
let formRef = ref<any>()
let drawer = ref<boolean>(false)

const reset = () => {
  settingStore.refresh = !settingStore.refresh
}

onMounted(() => {
  getHasRole()
})

const getHasRole = async (pager = 1) => {
  pageNo.value = pager
  let result = await reqAllRole(pageNo.value, pageSize.value, keyword.value)
  if (result.code == 200) {
    allRole.value = result.data.records
    total.value = result.data.total
  }
}

const handler = () => {
  getHasRole()
}

const search = () => {
  getHasRole()
  keyword.value = ''
}

const addRole = async () => {
  Object.assign(roleParams.value, {
    id: 0,
    roleName: '',
  })
  dialogVisite.value = true
  nextTick(() => {
    formRef.value.clearValidate('roleName')
  })
}

const confirm = async () => {
  await formRef.value.validate()
  let result = await reqAddOrUpdateRole(roleParams.value)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: roleParams.value.id ? '更新成功' : '添加成功',
    })
    dialogVisite.value = false
    getHasRole()
  } else {
    ElMessage({
      type: 'error',
      message: roleParams.value.id ? '更新失败' : '添加失败',
    })
  }
}

const updateRole = async (row: RoleData) => {
  dialogVisite.value = true
  Object.assign(roleParams.value, row)
  formRef.value.clearValidate('roleName')
}

const roleNameValidator = (_rule: any, value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('职位名称至少两位'))
  }
}
const rules = {
  roleName: [{ required: true, trigger: 'blur', validator: roleNameValidator }],
}

const cancel = () => {
  dialogVisite.value = false
}

const defaultProps = {
  children: 'children',
  label: 'name',
}
let allMenuList = ref<MenuList>([])
let selectMenuList = ref<number[]>([])
const setPermission = async (row: RoleData) => {
  roleParams.value = row
  let result = await reqAllMenuList(row.id as number)
  if (result.code == 200) {
    drawer.value = true
    allMenuList.value = result.data
    selectMenuList.value = filterSelectArr(allMenuList.value, [])
  }
}

const filterSelectArr = (allMenuList: MenuList, initArr: any) => {
  allMenuList.forEach((item) => {
    if (item.level == 4 && item.select) {
      initArr.push(item.id)
    }
    if (item.children && item.children.length > 0) {
      filterSelectArr(item.children, initArr)
    }
  })
  return initArr
}

let tree = ref<any>()
const confirmPermission = async () => {
  let arr = tree.value.getCheckedKeys()
  let arr1 = tree.value.getHalfCheckedKeys()
  let result = await reqSetPermission(
    roleParams.value.id as number,
    arr.concat(arr1),
  )
  if (result.code == 200) {
    drawer.value = false
    ElMessage({
      type: 'success',
      message: '修改成功',
    })
    window.location.reload()
  } else {
    ElMessage({
      type: 'error',
      message: '修改失败',
    })
  }
}

const deleteRole = async (id: number) => {
  let result = await reqRemoveRole(id)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getHasRole(pageNo.value)
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
</script>

<style scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
