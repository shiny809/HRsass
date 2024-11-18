<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <page-tools :show-before="showBefore">
      <!-- 插槽除了使用slot="name"  还可以v-slot 或 #slotname-->
      <!-- <span slot="before">
        前部分
      </span> -->
      <template v-slot:before>
        前部分
      </template>
      <div slot="after">后部分</div>
    </page-tools>
    <upload-excel />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UploadExcel from '@/components/UploadExcel'

export default {
  name: 'Dashboard',
  components: {
    UploadExcel
  },
  data() {
    return {
      showBefore: true
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
