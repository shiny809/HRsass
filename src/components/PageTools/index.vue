<template>
  <el-card class="page-tools">
    <el-row type="flex" justify="space-between">
      <!-- 前插槽 -->
      <el-col>
        <!-- 具名插槽 -->
        <div v-if="showBefore" class="before">
          <i class="el-icon-info" />
          <slot name="before" />
        </div>
      </el-col>
      <!-- 后插槽 -->
      <el-col>
        <el-row type="flex" justify="end">
          <slot name="after" />
        </el-row>

      </el-col>
    </el-row>
  </el-card>
</template>

<script>
// 组件可以显示左侧或者是右侧内容
export default {
  name: 'PageTools',
  props: {
    showBefore: {
      default: false,
      type: Boolean
    }

  },
  data() {
    return {

    }
  }

}
</script>

<style lang="scss">
 .page-tools {
    margin: 10px 0;
    .before {
      line-height: 34px;
    i {
      margin-right: 5px;
      color: #409eff;
    }
    display: inline-block;
    padding: 0px 10px;
    border-radius: 3px;
    border: 1px solid rgba(145, 213, 255, 1);
    background: rgba(230, 247, 255, 1);
  }
 }

</style>
