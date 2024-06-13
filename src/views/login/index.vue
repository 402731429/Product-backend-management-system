<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xp="0"></el-col>
      <el-col :span="12" :xp="24">
        <el-form
          class="login-form"
          :model="loginForm"
          :rules="rules"
          ref="loginForms"
        >
          <h1>HELLO</h1>
          <h2>欢迎来到鬼屋甄选</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="login_btn"
              :loading="loading"
              type="primary"
              size="default"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import useUserStore from '@/store/modules/user'
import { ElNotification } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { getTime } from '@/utils/time'

let useStore = useUserStore()
let $router = useRouter()
let $route = useRoute()

let loginForms = ref()
let loading = ref(false)
let loginForm = reactive({
  username: 'admin',
  password: '111111',
})

//账号自定义规则
const validatorUsername = (_rules: any, value: any, callback: any) => {
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('账号长度至少为五位'))
  }
}
const validatorPassword = (_rules: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('账号长度至少为六位'))
  }
}

const rules = {
  username: [
    {
      validator: validatorUsername,
      trigger: 'change',
    },
  ],
  password: [
    {
      validator: validatorPassword,
      trigger: 'change',
    },
  ],
}

const login = async () => {
  //表单提交
  await loginForms.value.validate()
  loading.value = true
  try {
    await useStore.userLogin(loginForm)
    let redirect: any = $route.query.redirect
    $router.push({ path: redirect || '/' })
    ElNotification({
      type: 'success',
      message: '登录成功',
      title: `Hi, ${getTime()}好`,
    })
    loading.value = false
  } catch (error) {
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
  .login-form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;
    h1 {
      font-size: 40px;
      color: white;
    }
    h2 {
      font-size: 20px;
      color: white;
      margin: 20px 0px;
    }
    .login_btn {
      width: 100%;
      height: 40px;
      font-size: 18px;
    }
  }
}
</style>
