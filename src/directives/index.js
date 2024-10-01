/* 管理所有自定义指令文件 */

// 图片出错指令
export const imagerror = {
  // 指令对象，会在当前dom元素插入到节点之后执行
  inserted(dom, options) {
    // dom 当前指令作用对象
    // options 指令中的变量，其中有一个值 value

    // 当图片 有地址 但未加载成功，会报错，会触发图片的一个事件 => onerror 事件
    dom.onerror = function() {
      console.log(options)
      dom.src = options.value// 这里不能写死
    }
  }

}
