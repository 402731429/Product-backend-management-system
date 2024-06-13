<template>
  <div class="tabber">
    <div class="tabber_left">
      <breadcrumb></breadcrumb>
    </div>
    <div class="tabber_right">
      <setting></setting>
    </div>
  </div>
</template>

<script setup lang="ts">
import breadcrumb from './breadcrumb/index.vue'
import setting from './setting/index.vue'
</script>
<script lang="ts">
export default {
  name: 'Tabber',
}
</script>

<style scoped lang="scss">
.tabber {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  .tabber_left {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }
  .tabber_right {
    display: flex;
    align-items: center;
    padding-right: 10px;
  }
}
</style>
