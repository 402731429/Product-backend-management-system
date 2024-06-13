<template>
  <el-card>
    <div style="display: flex">
      <img
        style="width: 100px; height: 100px; border-radius: 50%"
        :src="userStore.avatar"
        alt=""
      />
      <div>
        <h1 class="title">{{ getTime() + '好,' + userStore.username }}</h1>
        <p style="margin-left: 10px; font-style: italic; color: #999">
          {{ setting.title }}
        </p>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user'
import { getTime } from '@/utils/time'
import setting from '@/setting'

let userStore = useUserStore()
</script>

<style scoped>
.title {
  font-size: 20px;
  font-weight: bold;
  align-content: center;
  margin-top: 30px;
  margin-left: 10px;
  margin-bottom: 20px;
}
</style>
