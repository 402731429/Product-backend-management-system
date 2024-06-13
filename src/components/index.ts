import { App } from 'vue'
import SvgIcon from './SvgIcon/index.vue'
import Category from './Category/index.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const allComponent: any = { SvgIcon, Category }

export default {
  //固定为install
  install(app: App) {
    Object.keys(allComponent).forEach((key) => {
      app.component(key, allComponent[key])
    })
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
