<template>
  <div class="container">
    <div class="title">
      <p>年龄分布</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

let charts = ref()

onMounted(() => {
  let myCharts = echarts.init(charts.value)
  let option = {
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '23%',
      right: 10,
      orient: 'vertical',
      textStyle: {
        color: 'white',
        fontSize: 14,
      },
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#11144e',
          borderWidth: 1,
        },
        label: {
          show: true,
          position: 'inside',
          color: 'white',
          formatter: function (params: any) {
            // 分割name属性，获取空格后面的文本
            let nameSplit = params.name.split(' ')
            if (nameSplit.length > 1) {
              // 如果存在空格并成功分割，则返回第二部分
              return nameSplit.slice(1).join(' ')
            } else {
              // 如果没有空格或者不能正确分割，直接返回原name
              return params.name
            }
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 16, name: '10岁以下 16%' },
          { value: 8, name: '10-18岁 8%' },
          { value: 12, name: '18-30岁 12%' },
          { value: 24, name: '30-40岁 24%' },
          { value: 20, name: '40-60岁 20%' },
          { value: 20, name: '60岁以上 20%' },
        ],
      },
    ],
  }
  myCharts.setOption(option)
})
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  .title {
    margin-left: 20px;
    p {
      color: white;
      font-size: 20px;
    }
  }
  .charts {
    height: 260px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
