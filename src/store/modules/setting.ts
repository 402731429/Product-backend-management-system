import { defineStore } from 'pinia'

const useLayoutSettingStore = defineStore('settingStore', {
  state: () => {
    return {
      fold: false,
      refresh: false,
    }
  },
})

export default useLayoutSettingStore
