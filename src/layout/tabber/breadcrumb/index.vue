<template>
  <el-icon :size="20" style="margin-right: 10px" @click="changeMenu">
    <component :is="layoutSettingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <el-breadcrumb separator=">">
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.path"
    >
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span style="margin: 5px">{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting'
import { useRoute } from 'vue-router'

let layoutSettingStore = useLayoutSettingStore()
let $route = useRoute()
const changeMenu = () => {
  layoutSettingStore.fold = !layoutSettingStore.fold
}
</script>

<style scoped></style>
