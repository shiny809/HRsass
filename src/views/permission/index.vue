<template>
  <div class="permission-container">
    <div class="app-container">
      <!-- 靠右的按钮 -->
      <page-tools>
        <el-button
          slot="after"
          icon="el-icon-edit"
          size="medium"
          type="primary"
          @click="addPermission(1,0) "
        >添加菜单</el-button>
      </page-tools>
      <!-- 表格 -->
      <el-table
        border=""
        :data="list"
        row-key="id"
      >
        <el-table-column label="菜单名称" prop="name" />
        <el-table-column label="权限标志" align="center" prop="code" />
        <el-table-column label="描述" align="center" prop="description" />
        <el-table-column label="操作" align="center">
          <template v-slot="{row}">
            <el-button v-if="row.type===1?true:false" type="text" @click="addPermission(2,row.id)">{{ $t('table.add') }}</el-button>
            <el-button type="text" @click="editPermission(row.id)">{{ $t('table.edit') }}</el-button>
            <el-button type="text" @click="delPermission(row.id)">{{ $t('table.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 新增、编辑弹层 -->
    <el-dialog :title="formData.id?'编辑权限':'新增权限'" :visible.sync="showDialog" @close="btnCancel">
      <el-form ref="perForm" label-width="120px" :model="formData" :rules="rules">
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="formData.name" style="width:90%" />
        </el-form-item>
        <el-form-item label="权限标志" prop="code">
          <el-input v-model="formData.code" style="width:90%" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="formData.description" style="width:90%" />
        </el-form-item>
        <el-form-item label="操作">
          <el-switch
            v-model="formData.enVisible"
            active-value="1"
            inactive-value="0"
            style="width:90%"
          />
        </el-form-item>
      </el-form>
      <!-- 底部确定与取消 -->
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button type="primary" size="small" @click="btnOk ">{{ $t('table.confirm') }}</el-button>
          <el-button size="small" @click="btnCancel">{{ $t('table.cancel') }}</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getPermissionList, addPermission, delPermission, updatePermission, getPermissionDetail } from '@/api/permission'
import { transListToTreeData } from '@/utils'
export default {
  data() {
    return {
      list: [],
      showDialog: false,
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      },
      rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList() {
      // 将数组转化为 带 children的树形结构
      this.list = transListToTreeData(await getPermissionList(), 0)
    },
    // 删除权限
    delPermission(id) {
      this.$confirm('确认删除该权限点吗？')
        .then(async() => {
          return await delPermission(id)
        })
        .then(() => {
          this.$message.success('删除成功！')
          // 重新更新数据
          this.getPermissionList()
        })
    },
    // 添加权限
    // 根据 参数不同值，决定添加的是访问权(1) 还是按钮操作权(0)
    // pid 表示当前数据的父节点的标志
    addPermission(type, pid) {
      this.showDialog = true
      this.formData.type = type
      this.formData.pid = pid
    },
    btnOk() {
      this.$refs.perForm.validate().then(() => {
        if (this.formData.id) {
        // 编辑
          return updatePermission(this.formData)
        }
        // 校验成功
        return addPermission(this.formData)
      }).then(() => { // 校验成功
        if (this.formData.id) {
        // 编辑
          this.$message.success('修改成功！')
        } else {
          this.$message.success('新增成功！')
        }
        this.getPermissionList()
        this.showDialog = false
        // this.formData = {}//此时不用，上面调用会重新渲染，重置数据
      })
    },
    btnCancel() {
      this.showDialog = false
      // 防止 弹窗标题 闪现，设置延迟清除
      setTimeout(() => {
      // 重置数据
        this.formData = {
          name: '', // 名称
          code: '', // 标识
          description: '', // 描述
          type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
          pid: '', // 因为做的是树 需要知道添加到哪个节点下了
          enVisible: '0' // 开启
        }
        // 移除校验
        this.$refs.perForm.resetFields()
      }, 1000)
    },
    // 编辑权限
    async editPermission(id) {
      this.formData = await getPermissionDetail(id)
      this.showDialog = true
    }
  }
}
</script>

<style>
.el-table th.el-table_1_column_1 {
  /* 单独设置居中 */
  text-align: center;
}

</style>
