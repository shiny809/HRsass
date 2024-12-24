<template>
  <!-- 放置弹层组件 -->
  <el-dialog :title="formTitle" :visible="showDialog" @close="cancelBtn">
    <!-- 表单数据 -->
    <el-form ref="deptForm" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-10个字符" />
      </el-form-item>
      <el-form-item label="部门代码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-20个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="managerId">
        <!-- native 修饰符 可以找到原生元素的事件 -->
        <el-select v-model="formData.managerId" style="width:80%" placeholder="请选择" @focus="getEmployeeSimple">
          <!-- 循环选项 -->
          <el-option
            v-for="item in peoples"
            :key="item.id"
            :label="item.username"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="formData.introduce"
          style="width:80%"
          placeholder="1-300个字符"
          type="textarea"
          :rows="3"
          resize="none"
        />
      </el-form-item>
    </el-form>
    <!-- 确定和取消 -->
    <el-row
      slot="footer"
      type="flex"
      justify="center"
    >
      <el-col :span="6">
        <el-button type="primary" size="small" @click="cancelBtn">取消</el-button>
        <el-button type="primary" size="small" @click="submitBtn">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartments, addDepartment, getDepartDetail, editDepartment } from '@/api/departments'
import { getEmployeeSimple } from '@/api/employees'
export default {
  name: 'AddDept',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: null
    }

  },
  data() {
    // 自定义校验函数，校验名称和部门编码是否重复
    // 1.部门名称不能和同级别重复
    const checkNameRepeat = async(rule, value, callback) => {
      // const { depts } = await getDepartments()
      let isRepeat
      if (this.formData.id) {
        // 编辑规则---校验规则 除了我之外 同级部门下 不能有叫张三的
        isRepeat = this.depts.filter(item => item.id !== this.formData.id && item.pid === this.treeNode.pid).some(item => item.name === value)
      } else {
        isRepeat = this.depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)
      }

      isRepeat ? callback(new Error(`同级部门下已经有${value}的部门了`)) : callback()
    }
    const checkCodeRepeat = async(rule, value, callback) => {
      // const { depts } = await getDepartments()
      //  加一个value判断，可能有的部门没有code
      let isRepeat = false
      // 检查重复规则 需要支持两种 新增模式 / 编辑模式
      if (this.formData.id) {
        // 编辑规则
        // 编辑模式  因为编辑模式下 不能算自己
        isRepeat = this.depts.some(item => item.id !== this.formData.id && item.code === value && value)
      } else {
        // 增加子部门
        isRepeat = this.depts.some(item => item.code === value && value)
      }

      isRepeat ? callback(new Error(`组织架构中已经有部门使用${value}编码`)) : callback()
    }
    return {
      // 配置新增表单的基本校验规则
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        managerId: '', // 部门管理者
        introduce: ''// 部门介绍
      },
      // 校验规则
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 10, message: '部门名称要求在1-10个字符', trigger: 'blur' },
          { validator: checkNameRepeat, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 20, message: '部门编码要求在1-20个字符', trigger: 'blur' },
          { validator: checkCodeRepeat, trigger: 'blur' }
        ],
        managerId: [
          { required: true, message: '部门负责人不能为空', trigger: 'blur' }
        ],
        introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 300, message: '部门介绍要求在1-300个字符', trigger: 'blur' }]
      },
      depts: null,
      peoples: []

    }
  },
  computed: {
    formTitle() {
      return this.formData.id ? '编辑部门' : '增加子部门'
    }
  },
  async created() {
    this.depts = await getDepartments()
  },
  methods: {
    async getEmployeeSimple() {
      this.peoples = await getEmployeeSimple()
    },
    // 点击确定 验证表单通过，提交数据
    submitBtn() {
      this.$refs.deptForm.validate(async isOk => {
        if (isOk) {
        // 验证通过
          if (this.formData.id) { // 编辑部门
            await editDepartment(this.formData)
            this.$message.success(`修改 ${this.formData.name} 成功！`)
          } else { // 增加部门
            await addDepartment({ ...this.formData, pid: this.treeNode.id })
            this.$message.success(`添加 ${this.formData.name} 成功！`)
          }

          // 利用sync修饰符关闭新增弹层
          // 子组件 update:固定写法 (update:props名称, 值)
          this.$emit('update:showDialog', false)
          // 更新父级视图
          this.$emit('update-depart')
        }
      })
    },
    // 点击取消，关闭弹层
    cancelBtn() {
      // 关闭弹层
      this.$emit('update:showDialog', false)
      // 清除表单校验
      // 上面-确定，不需要单独清除，因为关闭弹窗，执行了dialog的close事件
      // 防止出现 bug，如果一开始点击编辑，初始赋值为编辑的值，每次重置会为编辑的值
      this.formData = {}
      // 重置数据  因为resetFields 只能重置 表单上的数据 非表单上的 比如 编辑中id 不能重置
      // 不仅重置值，也完成了重置表单验证信息
      this.$refs.deptForm.resetFields()
    },

    // 获取编辑部门详情
    async getDepartDetail(id) {
      // 不能传入 treeNode的id，prop是异步的，可能没结果
      // return await getDepartDetail(id)
      this.formData = await getDepartDetail(id)
    }
  }

}
</script>

<style>

</style>
