<template>
  <div class="employees-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <!-- 左侧显示总记录数 -->
        <!-- <span slot="before">共16条记录</span> -->
        <template v-slot:before>
          <span slot="before">共 {{ page.total }} 条记录</span>
        </template>
        <!-- 右侧显示按钮 Excel 导入 Excel 导出 新增员工 -->
        <template v-slot:after>
          <el-button size="small" type="warning" @click="showExcelDialog=true">excel 导入</el-button>
          <el-button size="small" type="danger" @click="exportEmployee">excel 导出</el-button>
          <el-button size="small" type="primary" icon="el-icon-plus" @click="showDialog=true">
            新增员工</el-button>
        </template>
      </page-tools>
      <!-- 员工列表 分页-->
      <el-card>
        <el-table v-loading="loading" border="" :data="list">
          <el-table-column label="序号" sortable="" type="index" width="60" align="center" />
          <el-table-column label="姓名" align="center" sortable="" prop="username" />
          <el-table-column label="工号" align="center" sortable="" prop="workNumber" />
          <el-table-column label="聘用形式" align="center" sortable="" prop="formOfEmployment" :formatter="formatEmployment" />
          <el-table-column label="部门" align="center" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" align="center" sortable="">
            <!-- 作用域 插槽 -->
            <template v-slot="{ row }">
              {{ row.timeOfEntry |formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" align="center" sortable="" prop="enableState">
            <template v-slot="{row}">
              <el-switch :value="row.enableState===1?true:false" />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="260" align="center">
            <!-- 作用域 插槽 -->
            <template slot-scope="{ row }">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="delEmployee(row.id)"> 删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height:60px">
          <el-pagination
            background
            layout="prev, pager, next"
            :current-page="page.page"
            :page-size="page.pagesize"
            :total="page.total"
            @current-change="pageChange"
          />
        </el-row>
      </el-card>
      <!-- 增加员工 表单弹层 -->
      <!-- sync 是子组件 改变 父组件的 语法糖 -->
      <add-employee :show-dialog.sync="showDialog" />
      <!-- excel导入弹层 -->
      <import-excel :show-excel-dialog.sync="showExcelDialog" />
    </div>
  </div>
</template>

<script>
import { getEmployeeList, delEmployee, exportEmployee } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'// 引入员工枚举项
import AddEmployee from './components/add-employee.vue'
import ImportExcel from './components/import-excel.vue'
import FileSaver from 'file-saver'
export default {
  components: {
    AddEmployee,
    ImportExcel
  },
  data() {
    return {
      list: [], // 接收员工列表
      page: {
        page: 1,
        pagesize: 8,
        // departmentId: 6,
        total: 0
      },
      loading: false, // 显示遮罩层
      showDialog: false,

      showExcelDialog: false// 控制excel弹层显示
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    async getEmployeeList() {
      this.loading = true
      const { total, rows } = await getEmployeeList(this.page)
      console.log(rows)

      this.page.total = total
      this.list = rows
      // 手动添加 enableState 属性 --- 账户状态
      this.list.forEach(item => {
        item.enableState = 1
      })
      this.loading = false
    },
    pageChange(newPage) {
      this.page.page = newPage
      this.getEmployeeList()
    },
    // 格式化 聘用形式
    formatEmployment(row, column, cellValue, index) {
      const obj = EmployeeEnum.hireType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
    },

    // 删除员工
    async delEmployee(id) {
      try {
        console.log('点击了删除')
        await this.$confirm('确定删除该员工吗？')
        await delEmployee(id)
        // 判断是否删除本页最后一个数据---防止页码出错
        if (this.list.length === 1 && this.page.page > 1) this.page.page--
        this.getEmployeeList()
        this.$message.success('删除成功！')
      } catch (err) {
        console.log(err)
      }
    },

    // 导出 员工excel
    async exportEmployee() {
      const result = await exportEmployee()
      // 使用npm包 直接将blob数据 下载为本地文件
      FileSaver.saveAs(result, '导出-员工信息表.xlsx')
      this.$message.success('导出成功！请在下载处查看')
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .totalPage {
font-size: 15px;
font-weight: normal;
color:#666;
margin-right: 20px;
  }
}
</style>
