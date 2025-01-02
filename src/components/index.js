// 负责全局自定义组件的注册
import PageTools from './PageTools'
import UploadExcel from './UploadExcel'
import ImageUpload from './ImageUpload'
import Print from 'vue-print-nb'
import ScreenFull from './ScreenFull'
const components = {
  PageTools,
  UploadExcel,
  ImageUpload,
  ScreenFull
}
export default {
  // install(Vue) {
  //   // 完成组件的注册
  //   Vue.component('PageTools', PageTools)
  //   Vue.component('UploadExcel', UploadExcel)
  //   Vue.component('ImageUpload', ImageUpload)
  // }
  install(Vue) {
    Object.keys(components).forEach(item => {
      Vue.component(item, components[item])
    })
    // 注册打印组件
    Vue.use(Print)
  }
}
