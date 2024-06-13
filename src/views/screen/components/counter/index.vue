<template>
  <div class="container">
    <div class="title">
      <p>预约渠道数据统计</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

let charts = ref()

onMounted(() => {
  let myCharts = echarts.init(charts.value)
  let option = {
    title: {
      text: '游客消费统计',
      textStyle: {
        color: 'white',
        fontSize: 16,
      },
    },
    radar: {
      // shape: 'circle',
      indicator: [
        { name: '消费', max: 6500 },
        { name: '好感', max: 16000 },
        { name: '出行', max: 30000 },
        { name: '小吃', max: 38000 },
        { name: '爱好', max: 52000 },
        { name: '景点', max: 25000 },
      ],
      shape: 'circle',
      axisName: {
        color: 'rgb(238, 197, 102)',
      },
      splitArea: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(238, 197, 102, 0.5)',
        },
      },
      splitLine: {
        lineStyle: {
          color: [
            'rgba(238, 197, 102, 0.1)',
            'rgba(238, 197, 102, 0.2)',
            'rgba(238, 197, 102, 0.4)',
            'rgba(238, 197, 102, 0.6)',
            'rgba(238, 197, 102, 0.8)',
            'rgba(238, 197, 102, 1)',
          ].reverse(),
        },
      },
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            name: 'Allocated Budget',
          },
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
  background: url(../../images/dataScreen-main-rb.png) no-repeat;
  background-size: 100% 100%;
  margin: 10px 0px;
  .title {
    margin-left: 20px;
    margin-top: 5px;
    p {
      color: white;
      font-size: 20px;
    }
  }
  .charts {
    margin-top: 15px;
    height: calc(100% - 60px);
  }
}
</style>
