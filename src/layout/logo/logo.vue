<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo" alt="" />
    <h1>{{ setting.title }}</h1>
  </div>
</template>

<script setup lang="ts" name="Logo">
import setting from '@/setting'
</script>
<script lang="ts">
export default {
  name: 'Logo',
}
</script>

<style scoped lang="scss">
.logo {
  height: $base-menu-logo-height;
  width: 100%;
  color: white;
  display: flex;
  align-items: center;
  img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
  h1 {
    font-size: $base-logo-title-fontSize;
    font-weight: bold;
    white-space: nowrap;
  }
}
</style>
