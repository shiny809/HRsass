<template>
  <div>
    <el-upload
      list-type="picture-card"
      action="#"
      :limit="1"
      :on-preview="preview"
      :file-list="fileList"
      :class="{disabled:fileComputed}"
      :on-remove="handleRemove"
      :on-change="fileChange"
      :before-upload="beforeUpload"
      :http-request="upload"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress v-if="showPercent" :percentage="percent" style="width:180px" />
    <el-dialog :visible.sync="showDialog" title="图片预览">
      <img :src="imgUrl" alt="" width="100%">
    </el-dialog>
  </div>

</template>

<script>
import COS from 'cos-js-sdk-v5'// 引入腾讯云 cos包
// 实例化上传 sdk
const cos = new COS({
  SecretId: 'AKIDpWuDMJBxY1JUXRBmEat472mLkz2sY5Sh', // 身份识别ID
  SecretKey: 'DICzhEfy671udCeyBEB1lNq8FD1hHtO0'// 身份识别秘钥
})
export default {
  data() {
    return {
      // fileList: [{ url: 'https://p0.ssl.qhimgs1.com/sdr/400__/t01a5825c8958034fca.jpg' }, { url: 'https://p0.ssl.qhimgs1.com/t01ac8aa82d12b0900a.jpg' }, { url: 'https://p0.ssl.qhimgs1.com/sdr/400__/t01a57000b9b7d26c0e.jpg' }, { url: 'https://p2.ssl.qhimgs1.com/sdr/400__/t01ae26add6e626af0c.jpg' }], // 上传的文件列表
      fileList: [],
      showDialog: false,
      imgUrl: '',
      currentFileUid: null, // 当前上传的文件Uid

      percent: 0, // 当前百分比
      showPercent: false
    }
  },
  computed: {
    // 为true 就不应该显示＋号上传
    fileComputed() {
      return this.fileList.length === 1
    }
  },
  methods: {
    // 一、点击预览事件
    preview(file) {
      console.log(file)
      this.imgUrl = file.url
      this.showDialog = true
    },
    // 删除文件列表
    handleRemove(file, fileList) {
      // file:删除的文件
      // fileList:删除后的文件列表
      // console.log(file, fileList)
      // this.fileList = this.fileList.filter(item => item.uid !== file.uid)
      this.fileList = fileList
    },
    // 二、添加文件时，钩子会执行多次
    // 文件状态改变时的钩子,❀添加文件❀、上传成功和❀❀❀上传失败❀❀❀时都会被调用
    fileChange(file, fileList) {
      // file： 当前文件 fileList---当前文件列表，但是没有被赋值
      // console.log(file, fileList)
      console.log(fileList)
      // this.fileList.push(file) 会 push两次
      // if (!this.fileList.some(item => item.uid === file.uid)) {
      //   this.fileList.push(file) // 会 push两次
      //   // console.log(this.fileList)
      //   console.log('添加了')
      // }

      // fileList因为fileList参数是当前传进来的最新参数 我们只需要将其转化成数组即可 需要转化成一个新的数组
      this.fileList = fileList.map(item => item)
      // 为什么暂时不成功？？？ 因为还没有上传，所以第二次进来的数据一定是空的
      // 如果上传成功，第一次和第二次 fileList 的长度均为1
    },
    // 三、上传前检查
    beforeUpload(file) {
      console.log(file)

      // 1.检查文件类型
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.some(item => item === file.type)) {
        this.$message.error('上传的图片只能是 JPG、GIF、BMP、PNG 格式！')
        // 不存在，上传终止
        return false
      }
      // 2.检查文件大小 5M 1M = 1024kb 1kb = 1024B
      const maxSize = 3 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('上传的图片大小不能大于3M')
        return false
      }
      this.showPercent = true// 确定要上传
      this.currentFileUid = file.uid
      return true // 最后一定要return true
    },
    upload(params) {
      // 自定义上传动作 有个参数 有个file对象，是我们需要上传到腾讯云服务器的内容
      console.log('params是啥？', params)
      // 简单上传对象-基础上传-适用小文件上传
      if (params.file) {
        cos.putObject({
          Bucket: 'shiny-1332492797', // 存储桶
          Region: 'ap-chengdu', // 存储桶所在地域，
          Key: params.file.name, // 文件名，存储在桶里的对象键（例如1.jpg )
          Body: params.file, // 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象
          StorageClass: 'STANDARD',
          onProgress: (data) => {
          // console.log(data)
            this.percent = data.percent * 100
          }
        }, (err, data) => {
          console.log(err || data)
          // 处理返回的数据
          if (!err && data.statusCode === 200) {
          // 获取成功的返回地址,将fileList 中的地址 变成现在上传成功的 地址---上传后的地址 回写 到fileList
            this.fileList = this.fileList.map(item => {
              if (item.uid === this.currentFileUid) {
                return { url: 'http://' + data.Location, upload: true }
              // upload为true，表示图片上传完毕，为后期应用的时候做标记
              }
              return item
            })
          }
          setTimeout(() => {
          // 完成时 隐藏进度条
            this.showPercent = false
          // this.percent = 0 //v-if,这一步可以不用写
          }, 2000)
        })
      }
    }
  }

}
</script>

<style lang="scss">
.disabled .el-upload{
  display: none;
}
</style>
