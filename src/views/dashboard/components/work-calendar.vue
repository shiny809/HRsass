<template>
  <!-- 工作日历 -->
  <div>
    <!-- 年 和 月 -->
    <el-row type="flex" justify="end">
      <!-- 年：组件给定日期，取前后五年 -->
      <el-select v-model="currentYear" size="small" style="width:120px" @change="dataChange">
        <el-option
          v-for="item in yearList"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-select
        v-model="currentMonth"
        size="small"
        style="width:120px;margin-left:10px"
        @change="dataChange"
      >
        <el-option v-for="item in 12" :key="item" :label="item+'月'" :value="item" /></el-select>
    </el-row>
    <!-- 放置 日历组件 -->
    <el-calendar v-model="currentDate">
      <!-- 在 scoped-slot 可以获取到 date（当前单元格的日期）, data（包括 type，isSelected，day 属性） -->
      <!-- <template slot="dateCell" slot-scope="{date,data}"> -->
      <template v-slot:dateCell="{date,data}">
        <div class="date-content">
          <span class="text">{{ data.day | getDay }}</span>
          <span v-if="isWeek(date)" class="rest">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: 'WorkCalendar',
  filters: {
    getDay(value) {
      const day = value.split('-')[2]// 得到当天具体 日期
      return day.startsWith('0') ? day.substr(1) : day// 去掉 0
    }

  },
  props: {
    startDate: {
      type: Date,
      default: () => new Date()// 如果没有传递值，则当前时间
    }
  },
  data() {
    return {
      yearList: [], // 遍历年的数组
      currentYear: null, // 当前年份
      currentMonth: null, // 当前月份
      currentDate: null// 当前时间
    }
  },
  created() {
    this.currentYear = this.startDate.getFullYear()// 当前年份
    this.currentMonth = this.startDate.getMonth() + 1// 当前月份
    // 快速生成数组
    // Array.from(Array(数组长度),(value,index)=>{return })
    this.yearList = Array.from(Array(11), (v, i) => this.currentYear + i - 5)

    this.dataChange()
  },
  methods: {
    dataChange() {
    //   点击改变生成新的时间---从1号开始
      this.currentDate = new Date(`${this.currentYear}-${this.currentMonth}-1`)
    },
    // 判断周末 添加 休息 标签
    isWeek(date) {
      return date.getDay() === 6 || date.getDay() === 0
    }
  }

}
</script>

<style  scoped >
 ::v-deep .el-calendar-day {
  height:  auto;
 }
 ::v-deep .el-calendar-table__row td,
 ::v-deep .el-calendar-table tr td:first-child,
  ::v-deep .el-calendar-table__row td.prev{
  border:none;
 }
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text{
  width: 20px;
  height: 20px;
  line-height: 20px;
 display: inline-block;

}
 ::v-deep .el-calendar-table td.is-selected .text{
   background: #409eff;
   color: #fff;
   border-radius: 50%;
 }
 ::v-deep .el-calendar__header {
   display: none
 }
</style>
