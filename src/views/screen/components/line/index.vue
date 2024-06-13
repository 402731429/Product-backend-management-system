<template>
  <div class="container">
    <div class="title">
      <p>未来七天游客数量趋势图</p>
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
  myCharts.setOption({
    title: {
      text: '(访问量)',
      textStyle: {
        color: 'white',
        fontWeight: 100,
        fontSize: 16,
      },
    },
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日      '],
      show: true,
      boundaryGap: false,
    },
    yAxis: {
      type: 'value',
      show: true,
      splitLine: {
        show: false,
      },
    },
    grid: {
      left: 60,
      right: 0,
      top: 40,
      bottom: 18,
    },
    series: [
      {
        type: 'line',
        data: [150, 520, 265, 218, 135, 147, 387],
        smooth: true,
        lineStyle: {
          color: '#72644E',
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#735E36', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#151B4F', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
    ],
  })
})
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  margin: 0px 10px;
  .title {
    margin-left: 10px;
    p {
      color: white;
      font-size: 20px;
    }
  }
  .charts {
    height: calc(100% - 40px);
  }
}
</style>
