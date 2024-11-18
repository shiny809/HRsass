<template>
  <el-dialog
    width="500px"
    title="员工导入"
    :visible="showExcelDialog"
    @close="$emit('update:showExcelDialog', false)"
  >
    <el-row type="flex" justify="center">
      <div class="upload-excel">
        <input
          ref="excel-upload-input"
          class="excel-upload-input"
          type="file"
          accept=".xlsx, .xls"
          @change="uploadChange"
        >
        <div class="drop">
          <i class="el-icon-upload" />
          <el-button type="text" @click="getTemplate">下载导入模板</el-button>
          <span>将文件拖到此处或
            <el-button type="text" @click="handleUpload">点击上传</el-button>
          </span>
        </div>
      </div>
    </el-row>
    <el-row type="flex" justify="end">
      <!-- update:props属性名，值 直接修改 .sync修饰符的属性值 -->
      <el-button size="mini" type="primary" @click="$emit('update:showExcelDialog', false)">取消</el-button>
    </el-row>
  </el-dialog>
</template>
<script>
import { getExportTemplate, importExcel } from '@/api/employees'
import FileSaver from 'file-saver'

export default {
  props: {
    showExcelDialog: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    async getTemplate() {
      const data = await getExportTemplate()
      console.log(data) // 使用npm包,直接将文件下载到本地 file-saver
      //   FileSaver.saveAs(blob对象，文件名称)
      FileSaver.saveAs(data, '员工信息导入模板.xlsx')
    },
    handleUpload() {
      this.$refs['excel-upload-input'].click()
    },
    async uploadChange(e) {
      // console.log(e.target)
      const files = e.target.files
      if (files.length > 0) {
        const formatDate = new FormData()
        formatDate.append('file', files[0])
        try {
          await importExcel(formatDate)
          this.$message.success('导入excel文件成功')
          this.$emit('update:showExcelDialog', false)
          // 更新列表
          this.$parent.getEmployeeList()
        } catch (err) {
          console.log(err)
        } finally {
          this.$refs['excel-upload-input'].value = ''
        }
      }
    }

  }
}
</script>

<style scoped lang="scss">
    .upload-excel {
      display: flex;
      justify-content: center;
      margin: 20px;
      width: 360px;
      height: 180px;
      align-items: center;
      color: #697086;
      .excel-upload-input {
        display: none;
        z-index: -9999;
      }
      .btn-upload,
      .drop {
        border: 1px dashed #dcdfe6;
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 160px;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .drop {
        line-height: 40px;
        color: #bbb;
        i {
          font-size: 60px;
          display: block;
          color: #c0c4cc;
        }
      }
    }
</style>
