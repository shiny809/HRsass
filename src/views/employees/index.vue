<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <!-- 左侧显示总记录数 -->
        <!-- <span slot="before">共16条记录</span> -->
        <template v-slot:before>
          <span slot="before">共16条记录</span>
        </template>
        <!-- 右侧显示按钮 Excel 导入 Excel 导出 新增员工 -->
        <template v-slot:after />
      </page-tools>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
