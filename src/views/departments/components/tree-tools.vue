<template>
  <el-row type="flex" justify="space-between" align="middle" style="height: 40px;width:100%">
    <el-col>
      <!-- 左侧内容 -->
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="8">
      <!-- 右侧内容 -->
      <el-row type="flex" justify="space-between">
        <el-col>{{ treeNode.managerName }}</el-col>
        <el-col>
          <!-- 放置下拉菜单 -->
          <el-dropdown @command="operateDepts">
            <!-- 内容 -->
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartment } from '@/api/department'
export default {
  props: {
    // 定义传入的属性
    treeNode: {
      required: true,
      type: Object
    },
    isRoot: {
      type: Boolean,
      default: false
    },
    showDialog: {
      type: Boolean,
      default: false
    }

  },
  methods: {
    operateDepts(type) {
      // 点击菜单项事件 是哪一类
      if (type === 'add') {
        // 父组件 显示弹层,传递点击部门 值
        this.$emit('addDepts', this.treeNode)
      } else if (type === 'edit') {
        // 获取点击的数据,传递给父组件，自动渲染到表格
        this.$emit('editDepts', this.treeNode)
      } else {
        // 删除操作---删除前提示
        this.$confirm(`您确定要删除${this.treeNode.name}组织吗？`).then(() => {
          return delDepartment(this.treeNode.id)
        })
          .then(() => {
          // 只需要等到成功的时候 调用接口删除了 通知前端 数据改变
            this.$emit('update-depart')
            this.$message.success(`删除${this.treeNode.name}成功！`)
          })
      }
    }

  }

}
</script>

<style>

</style>
