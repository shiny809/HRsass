<template>
  <el-dialog :visible="showApplyDialog" title="申请" @close="btnCancel">
    <el-form ref="myForm" label-width="120px" :model="ruleForm" :rules="rules">
      <el-form-item label="申请类型" prop="processName">
        <!-- 申请类型 -->
        <el-select
          v-model="ruleForm.processName"
          placeholder="请选择"
          @change="nameChange"
        >
          <el-option v-for="item in options" :key="item.value" :value="item.value" />
        </el-select>
      </el-form-item>

      <!-- 根据申请类型选择 显示内容 -->

      <!-- 1.加班申请 -->
      <div v-if="showOverTime">
        <!-- 开始加班时间 -->
        <el-form-item label="加班开始时间" prop="start_time">
          <el-date-picker v-model="ruleForm.start_time" type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" style="width:60%" />
        </el-form-item>
        <!-- 结束加班时间 -->
        <el-form-item label="加班结束时间" prop="end_time">
          <el-date-picker v-model="ruleForm.end_time" type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" style="width:60%" />
        </el-form-item>
        <!-- 补偿方式 -->
        <el-form-item label="补偿方式">
          <span>调休</span>
        </el-form-item>
        <!-- 加班原因 -->
        <el-form-item label="加班原因" prop="reason">
          <el-input v-model="ruleForm.reason" type="textarea" :autosize="{ minRows: 3, maxRows: 8}" style="width: 70%;" resize="none" />
        </el-form-item>
      </div>
      <!-- 2.离职申请 -->
      <div v-else>
        <!-- 日期选择 -->
        <el-form-item label="期望离职时间" prop="exceptTime">
          <el-date-picker v-model="ruleForm.exceptTime" type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" style="width:60%" />
        </el-form-item>
        <!-- 离职原因 -->
        <el-form-item label="离职原因" prop="reason">
          <el-input v-model="ruleForm.reason" type="textarea" :autosize="{ minRows: 3, maxRows: 8}" style="width: 60%;" resize="none" />
        </el-form-item>
      </div>
    </el-form>

    <!-- 确定取消按钮 -->
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnOk">确定</el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
// import { applyDimission, applyOvertime, apply } from '@/api/approvals'
import { apply } from '@/api/approvals'
export default {
  name: 'WorkApply',
  props: {
    showApplyDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      options: [
        { value: '加班' },
        { value: '离职' }
      ],
      showOverTime: true,

      // 表单数据
      ruleForm: {
        userId: this.$store.getters.userId, // 申请人id
        username: this.$store.getters.name, // 申请人名字
        // timeOfEntry:''//入职时间
        // 根据申请类型 决定其值 离职-process_dimission，加班-process_overtime
        processKey: 'process_overtime', // 特点审批
        processName: '加班',

        // 离职
        exceptTime: '',
        reason: '',

        // 加班
        start_time: '',
        end_time: ''

      },
      rules: {
        processName: [{ required: true, message: '申请类型不能为空', trigger: 'blur' }],
        exceptTime: [{ required: true, message: '离职时间不能为空' }],
        reason: [{ required: true, message: '离职原因不能为空', trigger: 'blur' }],

        // 加班
        start_time: [{ required: true, message: '加班开始时间不能为空' }],
        end_time: [{ required: true, message: '加班结束时间不能为空' }]
      }

    }
  },
  computed: {
    // 不仅切换 显示内容，还要清空校验
    // showOverTime() {
    //   if (this.ruleForm.processName === '加班') { return true }
    //   return false
    // }
  },
  methods: {
    nameChange(val) {
      console.log(val)
      if (val === '离职') {
        this.showOverTime = false
        this.ruleForm.processKey = 'process_dimission'
      } else {
        this.showOverTime = true
        this.ruleForm.processKey = 'process_overtime'
      }
      // 对整个表单进行重置
      this.$refs.myForm.clearValidate()
      this.ruleForm = {
        userId: this.$store.getters.userId, // 申请人id
        username: this.$store.getters.name, // 申请人名字
        // timeOfEntry:''//入职时间
        // 根据申请类型 决定其值 离职-process_dimission，加班-process_overtime
        processKey: val === '加班' ? 'process_overtime' : 'process_dimission', // 特定审批
        processName: val,

        // 离职
        exceptTime: '',
        reason: '',

        // 加班
        start_time: '',
        end_time: ''

      }
    },

    // 提交申请
    async btnOk() {
      try {
        // const applyName = this.ruleForm.processName
        // if (applyName === '加班') {
        //   await applyOvertime(this.ruleForm)
        // } else {
        //   await applyDimission(this.ruleForm)
        // }
        await this.$refs.myForm.validate()
        await apply(this.ruleForm)
        this.$message.success('提交申请成功！')
        this.$emit('update:showApplyDialog', false)
      } catch (err) {
        console.log(err)
      }
    },
    // 取消按钮
    btnCancel() {
      this.$emit('update:showApplyDialog', false)
      // 清除表单--防止闪烁
      setTimeout(() => {
        this.showOverTime = true
        this.$refs.myForm.resetFields()
      }, 500)
    }
  }

}
</script>

<style>

</style>
