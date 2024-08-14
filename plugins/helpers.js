import { isLogin } from '../utils/helpers'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      helpers: {
        isLogin
      }
    }
  }
})