<template>
  <div ref="myBox" class="radar-echart" />
</template>

<script>
// 按需引入
var echarts = require('echarts/lib/echarts')// 引入echart主模块
require('echarts/lib/chart/radar')// 引入雷达图
// 引入提示框与组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
export default {
  name: 'Radar',
  created() {
    // 实例创建完毕

  },
  mounted() {
    // 页面渲染完毕
    const myChart = echarts.init(this.$refs.myBox) // 图表的实例
    // 绘制图表
    myChart.setOption({
      title: {
        text: '绩效评估'
      },
      legend: {
        data: ['张三', '李四', '王五']
      },
      radar: {
        // shape: 'circle',
        name: {
          textStyle: {
            color: '#fff',
            backgroundColor: '#999',
            borderRadius: 3,
            padding: [3, 5]
          }},
        indicator: [
          { name: '工作效率', max: 100 },
          { name: '考勤', max: 100 },
          { name: '积极性', max: 100 },
          { name: '帮助同事', max: 100 },
          { name: '自主学习', max: 100 },
          { name: '准确率', max: 100 }
        ]
      },
      series: [
        {
          name: 'Budget vs spending',
          type: 'radar',
          data: [
            {
              value: [100, 1, 100, 5, 100, 0],
              name: '张三'
            },
            {
              value: [100, 100, 80, 90, 70, 0],
              name: '李四'
            },
            {
              value: [60, 50, 80, 66, 70, 40],
              name: '王五'
            }
          ]
        }
      ]
    })
  }

}
</script>

<style>
.radar-echart {
    width: 500px;
    height: 500px;
}

</style>
