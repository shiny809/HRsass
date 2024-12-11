<template>
  <div class="detail-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">
            <!-- 表单详情 -->
            <el-form ref="userForm" :model="userInfo" :rules="rules" label-width="120px" style="margin-left:120px;margin-top:30px">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="userInfo.username" style="width:300px" />
              </el-form-item>
              <el-form-item label="密码" prop="workNumber">
                <el-input v-model="userInfo.workNumber" style="width:300px" show-password />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveUser">保存</el-button>
              </el-form-item>
            </el-form>

          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <!-- 打印按钮 -->
            <el-row type="flex" justify="end">
              <el-tooltip content="打印个人基本信息">
                <router-link :to="`/employees/print/${userId}?type=personal`">
                  <i class="el-icon-printer" />
                </router-link>
              </el-tooltip>
            </el-row>
            <!-- <user-info /> -->
            <!-- 内置组件 component 可以是任一组件 -->
            <component :is="UserComponent" />
          </el-tab-pane>
          <el-tab-pane label="岗位详情">
            <el-row type="flex" justify="end">
              <el-tooltip content="打印岗位信息">
                <router-link :to="`/employees/print/${userId}?type=job`">
                  <i class="el-icon-printer" />
                </router-link>
              </el-tooltip>
            </el-row>
            <component :is="JobComponent" />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetailById } from '@/api/user'
import { saveUserDetailById } from '@/api/employees'
import UserInfo from './components/user-info.vue'
import JobInfo from './components/job-info.vue'
export default {
  components: {
    UserInfo,
    JobInfo
  },
  data() {
    return {
      UserComponent: 'UserInfo',
      JobComponent: 'JobInfo',
      userId: this.$route.params.id, // 直接将路由中的参数 赋值给data中的属性
      userInfo: {
        username: '',
        workNumber: ''// 接口没有密码，先workNumber替代一下
      },
      rules: {
        username: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        workNumber: [{ required: true, message: '密码不能为空', trigger: 'blur' }, { min: 6, max: 11, message: '密码长度为6-10位', trigger: 'blur' }]
      }

    }
  },
  created() {
    this.getUserDetailById()
  },
  methods: {
    async getUserDetailById() {
      this.userInfo = await getUserDetailById(this.userId)
    },
    async saveUser() {
      try {
        await this.$refs.userForm.validate()
        await saveUserDetailById(this.userInfo)
        this.$message.success('修改信息成功')
      } catch (err) {
        this.$message.error(err.message)
      }
    }
  }

}
</script>

<style>

</style>
