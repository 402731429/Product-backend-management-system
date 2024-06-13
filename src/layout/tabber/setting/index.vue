<template>
  <el-button @click="changeFresh" icon="Refresh" circle />
  <el-button @click="fullScreen" icon="FullScreen" circle />
  <el-popover placement="bottom" title="主题设置" :width="200" trigger="hover">
    <template #reference>
      <el-button icon="Setting" circle />
    </template>
    <el-form>
      <el-form-item label="主题颜色">
        <el-color-picker
          v-model="color"
          show-alpha
          :predefine="predefineColors"
          :teleported="false"
          @change="changeColor"
        />
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch
          v-model="dark"
          active-icon="MoonNight"
          inactive-icon="Sunny"
          inline-prompt
          @change="changeStyle"
        />
      </el-form-item>
    </el-form>
  </el-popover>
  <img
    :src="userStore.avatar"
    style="width: 30px; height: 30px; margin: 0px 10px; border-radius: 50%"
  />
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { ref } from 'vue'

let userStore = useUserStore()
let layoutSettingStore = useLayoutSettingStore()
let $router = useRouter()
const dark = ref(false)

const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])

const changeFresh = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}
const fullScreen = () => {
  let full = document.fullscreenElement
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
const logout = async () => {
  try {
    await userStore.logout()
    $router.push({ path: '/login' })
    ElNotification({
      type: 'success',
      message: '退出成功',
    })
  } catch (error) {
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}

const changeStyle = () => {
  let html = document.documentElement
  dark.value ? (html.className = 'dark') : (html.className = '')
}

const changeColor = () => {
  let html = document.documentElement
  html.style.setProperty('--el-color-primary', color.value)
}
</script>

<style scoped></style>
