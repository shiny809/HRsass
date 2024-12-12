<template>
  <el-dialog title="分配角色" :visible="showRoleDialog" @close="btnCancel">
    <!-- 多选框组 -->
    <el-checkbox-group v-model="roleIds">
      <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox></el-checkbox-group>
    <!-- 定义 footer 插槽 -->
    <el-row slot="footer" justify="center" type="flex">
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnOk">确定</el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/setting'
import { getUserDetailById } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    },
    userId: {
      type: Number,
      default: null
    //   required: true// 要求必须传值
    }
  },
  data() {
    return {
      roleIds: [], // 负责存储 当前用户所拥有的角色id
      roleList: []// 存储所有角色列表
    }
  },
  created() {
    // 获取所有角色
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { rows } = await getRoleList()// ，默认10 条数据
      this.roleList = rows
    },
    async getUserDetailById(id) {
      // 不能直接用 this.userId,因为props传值是异步的
      const { roleIds } = await getUserDetailById(id)
      this.roleIds = roleIds
    },
    btnCancel() {
      this.$emit('update:showRoleDialog', false)
      this.roleIds = []// 列表清零
    },
    async btnOk() {
      await assignRoles({ id: this.userId, roleIds: this.roleIds })
      this.$emit('update:showRoleDialog', false)
      this.$message.success('分配角色成功！')
    }
  }

}
</script>

<style>

</style>
