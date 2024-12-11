/* 管理所有自定义指令文件 */
// 图片出错指令
export const imagerror = {
  // 指令对象，会在当前dom元素插入到节点之后执行
  inserted(dom, options) {
    // dom 当前指令作用对象
    // options 指令中的变量的解释，其中有一个值 value

    dom.src = dom.src || options.value// 初始化如果 有值赋值，没有则默认值
    // 当图片 有地址 但未加载成功，会报错，会触发图片的一个事件 => onerror 事件  但如果是 null 则不触发，上面的代码需要加上
    dom.onerror = function() {
      console.log(options)
      dom.src = options.value// 这里不能写死
    }
  },

  // 该函数 同inserted 一样，也是一个钩子函数
  // 双重保险，只要没图片 或者 图片加载失败，都会执行
  // 因为组件初始化 一旦更新就不会再次进入inderted，此时进入 componentUpdated函数
  componentUpdated(dom, options) {
    // 该钩子函数会在 当前指令作用的组件 更新完毕后执行
    // inserted 只执行一次---类似 下面不会触发 error---似乎 img.src = ''会触发
    // created () {
    //   img.src = null
    // }
    dom.src = dom.src || options.value
  }

}
// 总结：三种情况考虑
/*
  ① src = "" 默认有值不为空，但会触发error事件
  ② :src = null 不会触发错误事件，需要升级，需要钩子函数 componentUpdated()再次触发事件
  ③ 图片地址出错
*/
