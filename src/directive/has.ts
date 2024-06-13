import useUserStore from '@/store/modules/user'

const userStore = useUserStore()

export const isHasButton = (app: any) => {
  app.directive('has', {
    mounted(el: any, option: any) {
      if (!userStore.buttons.includes(option.value)) {
        el.parentNode.removeChild(el)
      }
    },
  })
}
