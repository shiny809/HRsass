<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 内容 -->
      <el-card>
        <el-tabs>
          <el-tab-pane label="角色管理">
            <!-- 左侧内容 -->
            <el-row style="height:60px">
              <el-button icon="el-icon-plus" type="primary" size="small" @click="showDialog=true,title='新增部门'">新增角色</el-button>
            </el-row>
            <el-table border="" :data="list" align="center">
              <el-table-column label="序号" width="120" type="index" />
              <el-table-column label="名称" width="240" prop="name" align="center" />
              <el-table-column label="描述" prop="description" align="center" />
              <el-table-column label="操作" align="center">
                <!-- 作用域 插槽 -->
                <template slot-scope="{row}">
                  <el-button size="small" type="success" @click="assignPerm(row.id)">分配权限</el-button>
                  <el-button size="small" type="primary" @click="editRole(row.id)">编辑</el-button>
                  <el-button size="small" type="danger" @click="deleteRole(row.id)">删除</el-button>
                </template> </el-table-column>

            </el-table>
            <!-- 分页组件 -->
            <el-row type="flex" justify="center" align="middle" style="height:60px">
              <el-pagination
                background
                layout="slot,prev, pager, next"
                :current-page="page.page"
                :page-size="page.pagesize"
                :total="page.total"
                @current-change="pageChange"
              >
                <span slot class="totalPage">共{{ page.total }}条</span>
              </el-pagination>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <!-- 右边内容 -->
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              show-icon
              :closable="false"
              type="info"
            />
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="公司名称">
                <el-input v-model="formData.name" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="formData.companyAddress" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="电话">
                <el-input v-model="formData.companyPhone" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="formData.mailbox" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="formData.remarks" type="textarea" :rows="3" disabled style="width:400px" resize="none" />
              </el-form-item>

            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>

      <!-- 角色修改 弹层 -->
      <el-dialog :title="title" :visible="showDialog" @close="btnCancel">
        <el-form ref="roleForm" label-width="120px" :model="roleForm" :rules="rules">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="roleForm.name" />
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input v-model="roleForm.description" />
          </el-form-item>
        </el-form>
        <!-- footer 插槽 -->
        <div slot="footer" align="center">
          <el-button size="small" @click="btnCancel">取 消</el-button>
          <el-button size="small" type="primary" @click="btnOk">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 权限分配 弹层 -->
      <!-- :default-checked-keys="selectCheck" 不能双向选择，换一个方法 -->
      <el-dialog title="权限分配" :visible.sync="showPerDialog" @close="btnPermCancel">
        <!-- 权限是 一颗树 -->
        <el-tree
          ref="permTree"
          :data="permData"
          :props="defaultProps"
          show-checkbox
          :check-strictly="true"
          node-key="id"
          :default-checked-keys="selectCheck"
        />
        <!-- check-strictly true---不关联。false---互相关联 -->
        <el-row slot="footer" type="flex" justify="center">
          <el-button size="small" @click="btnPermCancel">取 消</el-button>
          <el-button type="primary" size="small" @click="btnPermOk">确 定</el-button>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getCompanyInfo, getRoleList, getRoleDetail, deleteRole, updateRole, addRole, assignPerm } from '@/api/setting'
import { getPermissionList } from '@/api/permission'
import { transListToTreeData } from '@/utils'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      list: [], // 承接数组
      page: {
        // 放置页码及相关数据
        page: 1,
        pagesize: 5,
        total: 0// 记录总数
      },
      formData: {
        // 公司信息

      },
      // 控制弹层
      showDialog: false,
      roleForm: {
        name: '',
        description: '',
        state: 1
      },
      rules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
      },
      title: '',
      showPerDialog: false, // 权限分配弹层
      permData: null,
      defaultProps: {
        label: 'name'
      }, // 定义显示字段名称，子属性的名称
      roleId: null, // 记录当前点击的id
      selectCheck: []// 记录当前权限点标志
    }
  },
  computed: {
    ...mapGetters(['companyId'])

  },
  created() {
    this.getRoleList()
    this.getCompanyInfo()
  },

  methods: {
    async getRoleList() {
      const { total, rows } = await getRoleList(this.page)
      this.page.total = total
      this.list = rows
    },
    async getCompanyInfo() {
      this.formData = await getCompanyInfo(this.companyId)
      console.log(this.formData)
    },
    pageChange(currentPage) {
      // 当前page赋值给page
      this.page.page = currentPage
      this.getRoleList(this.page)
    },
    deleteRole(id) {
      try {
        this.$confirm('您确定要删除该角色吗？').then(async() => {
          await deleteRole(id)
          // 判断是否删除本页最后一个数据---防止页码出错
          if (this.list.length === 1 && this.page.page > 1) this.page.page--
          this.getRoleList()
          this.$message.success('删除角色成功')
        })
      } catch (err) {
        console.log(err)
      }
    },
    async editRole(id) {
      this.title = '编辑部门'
      // 数据回写
      this.roleForm = await getRoleDetail(id)
      // 为了不出现闪烁问题，先获取数据，再显示弹层
      this.showDialog = true// 显示弹层
    },
    btnCancel() {
      this.showDialog = false
      // 下面只能初始化 设定name 的值
      // 防止出现校验为空时，点击取消再点击，会出现校验
      this.$refs.roleForm.resetFields()
      this.roleForm = {
        name: '',
        description: '',
        state: 1
      }
    },
    async btnOk() {
      try {
        await this.$refs.roleForm.validate()
        //  只有校验成功才会执行下面的内容
        // roleForm 有id就是编辑，没有就是新增
        if (this.roleForm.id) {
          await updateRole(this.roleForm)
        } else {
          await addRole(this.roleForm)
        }
        // 重新拉取数据
        this.getRoleList()
        this.$message.success('更新成功！')
        // 不需要做清空，因为关闭弹窗 触发close事件
        this.showDialog = false
      } catch (err) {
        console.log(err)
        this.$message.error('校验失败！')
      }
    },

    // 权限分配
    async assignPerm(id) {
      // 获取所有权限点
      this.permData = transListToTreeData(await getPermissionList(), 0)
      this.roleId = id
      // 获取id所拥有的权限点
      const { permIds } = await getRoleDetail(id)
      console.log(permIds)
      this.selectCheck = permIds
      this.showPerDialog = true
    },
    async btnPermOk() {
      const treeKeys = this.$refs.permTree.getCheckedKeys()
      await assignPerm({ permIds: treeKeys, id: this.roleId })
      this.$message.success('分配权限成功！')
      this.showPerDialog = false
      // ！！！！弹层关闭后，会调用下面的事件，不用再重置selectCheck
    },
    btnPermCancel() {
      this.selectCheck = []// 清空选择
      this.showPerDialog = false
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
