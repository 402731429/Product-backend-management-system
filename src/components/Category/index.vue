<template>
  <div>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select
          style="width: 240px"
          v-model="categoryStore.c1ID"
          @change="handler_1"
          :disabled="scene"
        >
          <el-option
            v-for="c1 in categoryStore.c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          style="width: 240px"
          v-model="categoryStore.c2ID"
          @change="handler_2"
          :disabled="scene"
        >
          <el-option
            v-for="c2 in categoryStore.c2Arr"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          style="width: 240px"
          v-model="categoryStore.c3ID"
          :disabled="scene"
        >
          <el-option
            v-for="c3 in categoryStore.c3Arr"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import useCategoryStore from '@/store/modules/category'

defineProps(['scene'])

let categoryStore = useCategoryStore()

onMounted(() => {
  getC1Arr()
})

const getC1Arr = async () => {
  categoryStore.getC1Arr()
}

const handler_1 = () => {
  categoryStore.c2ID = ''
  categoryStore.c3ID = ''
  categoryStore.c2Arr = []
  categoryStore.c3Arr = []
  categoryStore.getC2Arr()
}

const handler_2 = () => {
  categoryStore.c3ID = ''
  categoryStore.c3Arr = []
  categoryStore.getC3Arr()
}
</script>

<style scoped></style>
