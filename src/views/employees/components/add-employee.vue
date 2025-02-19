<template>
  <el-dialog :visible="showDialog" title="新增员工" @close="btnCancel">
    <!-- 表单 -->
    <el-form ref="addEmployee" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" style="width:80%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" style="width:80%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" style="width:80%" placeholder="请选择入职时间" value-format="yyyy-MM-dd" />
      </el-form-item><el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" style="width:80%" placeholder="请选择"><el-option v-for="item in EmployeeEnum.hireType" :key="item.id" :label="item.value" :value="item.id" /></el-select>
      </el-form-item><el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" style="width:80%" placeholder="请输入工号" />
      </el-form-item>
      <!-- 部门id必需---不然校验不通过 -->
      <el-form-item label="部门id" prop="departmentId" hidden>
        <el-input v-model="formData.departmentId" style="width:80%" placeholder="请填写部门id" /></el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input v-model="formData.departmentName" style="width:80%" placeholder="请选择部门" @focus="getDepartments" />
        <!-- 放置 树形组件 -->
        <el-tree
          v-show="showTree"
          ref="tree"
          v-loading="loading"
          :data="treeData"
          :props="{label:'name'}"
          default-expand-all
          highlight-current
          @node-click="nodeClick"
        />
      </el-form-item><el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="formData.correctionTime" style="width:80%" placeholder="请选择转正时间" value-format="yyyy-MM-dd" />
      </el-form-item>
    </el-form>
    <div slot="footer" align="center">
      <el-button size="small" @click="btnCancel">取 消</el-button>
      <el-button size="small" type="primary" @click="btnOk">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getDepartments } from '@/api/departments'
import { transListToTreeData } from '@/utils'
import EmployeeEnum from '@/api/constant/employees'
import { addEmployee } from '@/api/employees'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 定义 表单数据
      EmployeeEnum,
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentId: '', // 员工部门ID---必填项
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      //   验证规则
      rules: {
        username: [{ required: true, message: '用户姓名不能为空', trigger: 'blur' }, { min: 1, max: 4, message: '用户姓名为1-4位', trigger: 'blur' }],
        mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' },
          // pattern正则表达式  如果满足，则校验通过
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
        ],
        formOfEmployment: [{ required: true, message: '聘用形式不能为空', trigger: 'blur' }],
        workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        departmentId: [{ required: true, message: '部门id不能为空', trigger: 'blur' }],
        departmentName: [{ required: true, message: '部门不能为空', trigger: 'change' }],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
      },
      treeData: [], // 接收 树形数组
      showTree: false,
      loading: false

    }
  },
  methods: {
    async getDepartments() {
      this.showTree = true
      if (this.treeData.length === 0) {
        this.loading = true
        const depts = await getDepartments()
        // depts是一个数组，需要转化为树形结构 才可以加入到数组中
        this.treeData = transListToTreeData(depts, 1)
        this.loading = false
      }
    },

    // 点击当前节点 给部门 赋当前点击值
    nodeClick(node) {
      console.log(node)
      this.formData.departmentName = node.name
      this.formData.departmentId = node.id// id必填项，提交数据需要
      this.showTree = false
    },
    async btnOk() {
      // 校验表单
      try {
        await this.$refs.addEmployee.validate()
        await addEmployee(this.formData)
        this.$message.success('新增员工成功')
        // 通知 父组件更新数据
        this.$parent.getEmployeeList()
        this.$emit('update:showDialog', false)
      } catch (err) {
        console.log(err)
      }
    },
    btnCancel() {
      // 清空表单
      this.formData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentId: '', // 员工部门ID---必填项
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }
      // 移除校验
      this.$refs.addEmployee.resetFields()
      this.$emit('update:showDialog', false)
    }
  }

}
</script>

<style>

</style>
