<template>
  <el-card style="height: 80px">
    <el-form :inline="true" class="form">
      <el-form-item label="用户名:">
        <el-input v-model="keyword" placeholder="请输入用户名"></el-input>
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
    <el-button type="primary" @click="addUser" v-has="`btn.User.add`">
      添加
    </el-button>
    <el-button type="danger" @click="batchDelete">批量删除</el-button>
    <el-table
      @selection-change="selectionChange"
      border
      style="margin-top: 10px"
      :data="user"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column type="index" label="#" align="center"></el-table-column>
      <el-table-column label="id" prop="id" align="center"></el-table-column>
      <el-table-column
        label="用户名字"
        prop="username"
        align="center"
      ></el-table-column>
      <el-table-column
        label="用户名称"
        prop="name"
        align="center"
      ></el-table-column>
      <el-table-column
        label="用户角色"
        prop="roleName"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        label="创建时间"
        prop="createTime"
        show-overflow-tooltip
        align="center"
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
            @click="setRole(row)"
            v-has="`btn.User.assign`"
          >
            分配角色
          </el-button>
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="updateUser(row)"
            v-has="`btn.User.update`"
          >
            编辑
          </el-button>
          <el-popconfirm
            :title="`你确定要删除${row.username}`"
            @confirm="deleteUser(row.id)"
            v-has="`btn.User.remove`"
          >
            <template #reference>
              <el-button type="primary" size="small" icon="Delete">
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin: 10px 0px"
      @current-change="getHasUser(pageNo)"
      @size-change="handler"
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[5, 7, 9, 11]"
      :background="true"
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total"
    />
  </el-card>
  <!-- 用户添加修改的抽屉 -->
  <el-drawer v-model="drawer_addOrupdateUser">
    <template #header>
      <h4>{{ userParams.id ? '更新用户' : '添加用户' }}</h4>
    </template>
    <template #default>
      <el-form
        :rules="rules"
        label-width="100px"
        :model="userParams"
        ref="formRef"
      >
        <el-form-item label="用户姓名" prop="username">
          <el-input
            v-model="userParams.username"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="name">
          <el-input
            v-model="userParams.name"
            placeholder="请输入昵称"
          ></el-input>
        </el-form-item>
        <el-form-item v-show="!userParams.id" label="用户密码" prop="password">
          <el-input
            v-model="userParams.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button type="primary" @click="submitUserForm">提交</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </template>
  </el-drawer>
  <!-- 用户权限分配的抽屉 -->
  <el-drawer v-model="drawer_setRole">
    <template #header>
      <h4>分配角色用户</h4>
    </template>
    <template #default>
      <el-form>
        <el-form-item label="用户姓名">
          <el-input v-model="userParams.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="角色列表">
          <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
          >
            Check all
          </el-checkbox>
          <el-checkbox-group
            v-model="userRole"
            @change="handleCheckedRoleChange"
          >
            <el-checkbox
              v-for="(role, index) in allRole"
              :key="index"
              :label="role"
            >
              {{ role.roleName }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button type="primary" @click="submitRoleForm">提交</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import {
  reqUserInfo,
  reqAddOrUpdateUser,
  reqAllRole,
  reqSetRole,
  reqDeleteUser,
  reqSelectUser,
} from '@/api/acl/user/index'
import {
  User,
  AllRoleResponseData,
  AllRole,
  SetRoleData,
} from '@/api/acl/user/type'
import { ElMessage } from 'element-plus'
import useLayoutSettingStore from '@/store/modules/setting'

let pageNo = ref<number>(1)
let pageSize = ref<number>(5)
let total = ref<number>(0)
let user = ref<User[]>([])
let drawer_addOrupdateUser = ref<boolean>(false)
let userParams = ref<User>({
  username: '',
  name: '',
  password: '',
})
let formRef = ref<any>()
let drawer_setRole = ref<boolean>(false)
let keyword = ref<string>('')
let settingStore = useLayoutSettingStore()

onMounted(() => {
  getHasUser()
})

const getHasUser = async (pager = 1) => {
  pageNo.value = pager
  let result = await reqUserInfo(pageNo.value, pageSize.value, keyword.value)
  if (result.code == 200) {
    user.value = result.data.records
    total.value = result.data.total
  }
}

const handler = async () => {
  getHasUser()
}

const addUser = () => {
  clearUserParams()
  drawer_addOrupdateUser.value = true
  nextTick(() => {
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('name')
    formRef.value.clearValidate('password')
  })
}
const updateUser = (row: User) => {
  drawer_addOrupdateUser.value = true
  Object.assign(userParams.value, row)
  nextTick(() => {
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('name')
  })
}

const submitUserForm = async () => {
  await formRef.value.validate()
  let result = await reqAddOrUpdateUser(userParams.value)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: userParams.value.id ? '修改成功' : '添加成功',
    })
    drawer_addOrupdateUser.value = false
    //getHasUser(userParams.value.id ? pageNo.value : 1)
    window.location.reload()
  } else {
    ElMessage({
      type: 'error',
      message: userParams.value.id ? '修改失败' : '添加失败',
    })
  }
}

const cancel = () => {
  drawer_addOrupdateUser.value = false
  drawer_setRole.value = false
}

const clearUserParams = () => {
  Object.assign(userParams.value, {
    id: 0,
    name: '',
    username: '',
    password: '',
  })
}

const validatorUsername = (_rule: any, value: any, callback: any) => {
  if (value.trim().length >= 5) {
    callback()
  } else {
    callback(new Error('用户名至少为5位'))
  }
}
const validatorName = (_rule: any, value: any, callback: any) => {
  if (value.trim().length >= 5) {
    callback()
  } else {
    callback(new Error('用户昵称至少为5位'))
  }
}
const validatorPassword = (_rule: any, value: any, callback: any) => {
  if (value.trim().length >= 6) {
    callback()
  } else {
    callback(new Error('密码至少为6位'))
  }
}
const rules = {
  username: [{ required: true, trigger: 'blur', validator: validatorUsername }],
  name: [{ required: true, trigger: 'blur', validator: validatorName }],
  password: [{ required: true, trigger: 'blur', validator: validatorPassword }],
}

const checkAll = ref<boolean>(false)
const isIndeterminate = ref<boolean>(true)
const userRole = ref<AllRole>([])
const allRole = ref<AllRole>([])

const setRole = async (row: User) => {
  Object.assign(userParams.value, row)
  let result: AllRoleResponseData = await reqAllRole(
    userParams.value.id as number,
  )
  if (result.code == 200) {
    drawer_setRole.value = true
    allRole.value = result.data.allRolesList
    userRole.value = result.data.assignRoles
  }
}
const handleCheckAllChange = (val: any) => {
  userRole.value = val ? allRole : []
  isIndeterminate.value = false
}
const handleCheckedRoleChange = (value: any) => {
  console.log(value)
  const checkedCount = value.length
  checkAll.value = checkedCount === allRole.value.length
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < allRole.value.length
}

const submitRoleForm = async () => {
  let data: SetRoleData = {
    userId: userParams.value.id as number,
    roleIdList: userRole.value.map((item: any) => item.id),
  }
  let result = await reqSetRole(data)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '修改成功',
    })
    drawer_setRole.value = false
  } else {
    ElMessage({
      type: 'error',
      message: '修改失败',
    })
  }
}

const deleteUser = async (userId: number) => {
  let result = await reqDeleteUser(userId)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getHasUser(pageNo.value)
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}

let selectIdArr = ref<User[]>([])
const selectionChange = (value: any) => {
  selectIdArr.value = value
}

const batchDelete = async () => {
  let data = selectIdArr.value.map((item) => item.id as number)
  let result = await reqSelectUser(data)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getHasUser()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}

const search = () => {
  getHasUser()
  keyword.value = ''
}
const reset = () => {
  settingStore.refresh = !settingStore.refresh
}
</script>

<style scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
