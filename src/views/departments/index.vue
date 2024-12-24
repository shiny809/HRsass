<template>
  <div class="department-container">
    <div class="app-container">
      <!-- 组织架构内容 - 头部 -->
      <el-card class="tree-card">
        <!-- 放置结构内容 -->
        <tree-tools
          :tree-node="company"
          :is-root="true"
          @addDepts="addDepts"
        />
        <!-- 树形静态组织架构 -->
        <el-tree
          default-expand-all
          :data="departs"
          :props="defaultProps"
        >
          <!-- 传入内容 插槽内容 会循环多次 有多少节点 就循环多少次 -->
          <!-- 作用域插槽 slot-scope="obj" 接收传递给插槽的数据 data 每个节点的数据对象-->
          <tree-tools
            slot-scope="{ data }"
            :tree-node="data"
            @update-depart="getDepartments"
            @addDepts="addDepts"
            @editDepts="editDepts"
          />
        </el-tree>
      </el-card>
    </div>
    <!-- 放置新增组织 弹层-->
    <add-dept ref="addDept" :show-dialog.sync="showDialog" :tree-node="node" @update-depart="getDepartments" />
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
import { getDepartments } from '@/api/departments'
import { transListToTreeData } from '@/utils'
import AddDept from './components/add-dept'
export default {
  components: {
    TreeTools,
    AddDept

  },
  data() {
    return {
      company: { name: '江苏传智播客教育科技股份有限公司', managerName: '负责人', id: 1 }, // 头部数据结构
      // departs: [
      //   {
      //     name: '总裁办',
      //     manager: '孙财',
      //     children: [{
      //       name: '董事会'
      //     }
      //     ]
      //   },
      //   {
      //     name: '行政部',
      //     manager: '罗晓晓'
      //   },
      //   {
      //     name: '人事部',
      //     manager: '文吉星'
      //   },
      //   {
      //     name: '财务部',
      //     children: [
      //       {
      //         name: '财务核算部',
      //         manager: '武高丽'
      //       },
      //       {
      //         name: '税务管理部'
      //       },
      //       {
      //         name: '薪资管理部部'
      //       }
      //     ]
      //   }
      // ],
      departs: [],
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      showDialog: false,
      node: null // 记录当前点击的node

      // 记录当前的点击信息
      // formData: {}
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const res = await getDepartments()
      console.log(res)
      this.departs = transListToTreeData(res, 1)
    },
    // 监听tree-tools 中触发的点击添加 子部门 的事件
    // node---记录当前点击的node节点
    addDepts(node) {
      this.showDialog = true
      this.node = node
    },

    // 触发 子部门点击 编辑事件
    async  editDepts(node) {
      this.node = node
      await this.$refs.addDept.getDepartDetail(node.id)
      this.showDialog = true
    }
  }

}
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}

</style>
