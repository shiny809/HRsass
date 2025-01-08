<template>
  <el-dropdown trigger="click" @command="changeLang">
    <!-- 显示一个图标 -->
    <div>
      <svg-icon
        icon-class="language"
        style="color:#fff;font-size:20px"
      />
    </div>
    <!-- 下拉图标 -->
    <el-dropdown-menu
      slot="dropdown"
    >
      <el-dropdown-item
        command="zh"
        :disabled="$i18n.locale==='zh'"
      >中文</el-dropdown-item>
      <el-dropdown-item
        command="en"
        :disabled="$i18n.locale==='en'"
      >En</el-dropdown-item>
      <el-dropdown-item
        command="ja"
        :disabled="$i18n.locale==='ja'"
      >日语</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  name: 'LangSelect',
  methods: {
    changeLang(type) {
      // 设置类型  先写入cookie
      Cookie.set('language', type)
      // 改变当前语言
      this.$i18n.locale = type
      this.$message.success(`已经切换成 ${type}`)
    }
  }

}
</script>

<style>

</style>
