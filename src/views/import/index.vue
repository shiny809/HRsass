<template>
  <div class="import-container">
    <upload-excel
      ref="uploadExcel"
      :on-success="success"
      :blob.sync="blob"
    />
  </div>

</template>

<script>
import { importEmployee } from '@/api/employees'
export default {
  data() {
    return {
      blob: null
    }
  },
  methods: {
    async  success({ header, results }) {
      // 批量上传 数据 --- xlsx表格
    //   header和results 是中文---转化为新增员工的属性
      //    一、老接口 /batch 方法
      // const userRelations = {
      //   '入职日期': 'timeOfEntry',
      //   '手机号': 'mobile',
      //   '姓名': 'username',
      //   '转正日期': 'correctionTime',
      //   '工号': 'workNumber'
      // }
      //   var arr = []
      //   results.forEach(item => {
      //     var userInfo = {}
      //     Object.keys(item).forEach(key => {
      //       // key 是中文，转化key是英文
      //       userInfo[userRelations[key]] = item[key]
      //     })
      //     arr.push(userInfo)
      //   })
      //   console.log(arr)

      //   使用map方法
      // const newArr = results.map(item => {
      //   var userInfo = {}
      //   Object.keys(item).forEach(key => {
      //     userInfo[userRelations[key]] = item[key]// 将原来的中文值 赋值给英文
      //   })
      //   return userInfo
      // })
      // console.log(newArr)
      // await importEmployee(newArr)

      //   二、新接口方法-/import
      //   如果接口要求 Content-Type 是 multipart/form-data
      //   则必须 传递 formData对象

      const input = this.$refs.uploadExcel.$refs['excel-upload-input']
      input.dispatchEvent(new MouseEvent('click'))
      //   this.$refs.uploadExcel.handleClk()
      console.log('执行啦')
      console.log(this.blob)
      const formData = new FormData()
      formData.append('file', this.blob)
      await importEmployee(formData)

      this.$message.success('导入excel表格成功')
      this.$router.back()
    }

  }

}
</script>

<style lang='scss' scoped>
.import-container {
    margin-top: 200px;
}

</style>
