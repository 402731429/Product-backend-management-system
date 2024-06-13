import { createApp } from 'vue'
import App from '@/App.vue'

//element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-expect-error
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

//icon
import 'virtual:svg-icons-register'

//全局组件
import allcomponent from './components/index'

//scss
import '@/style/index.scss'

//仓库引入
import pinia from './store'

//路由
import router from './router/index'

//全局路由
import './permission'

//暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'

import { isHasButton } from '@/directive/has'

const app = createApp(App)

app.use(ElementPlus, { locale: zhCn })
app.use(allcomponent)
app.use(pinia)
app.use(router)
isHasButton(app)

app.mount('#app')
