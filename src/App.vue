<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

let $router = useRouter()

onMounted(() => {
  $router.push('/login')
})
</script>

<style scoped lang="scss"></style>
