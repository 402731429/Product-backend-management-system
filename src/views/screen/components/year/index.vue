<template>
  <div class="container">
    <div class="title">
      <p>年度游客量对比</p>
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
      text: '(人数)',
      textStyle: {
        color: 'white',
        fontWeight: 200,
        fontSize: 14,
      },
    },
    xAxis: {
      type: 'category',
      show: true,
    },
    yAxis: {
      show: true,
      splitLine: {
        show: false,
      },
    },
    grid: {
      left: 40,
      right: 40,
      top: 40,
      bottom: 40,
    },
    legend: {
      data: ['2022年', '2023年'],
      textStyle: {
        color: 'white',
      },
      left: '80%',
    },
    series: [
      {
        name: '2022年',
        type: 'line',
        data: [39, 214, 343, 432, 853, 341, 43, 123, 34, 564, 234, 764],
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
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
                color: 'rgba(183, 46, 124, 0.95)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#11144e', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
      {
        name: '2023年',
        type: 'line',
        data: [987, 654, 324, 547, 214, 311, 416, 162, 945, 325, 745, 154],
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
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
                color: 'rgba(238, 165, 86, 0.95)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#11144e', // 100% 处的颜色
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

<style scoped>
.container {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-rc.png) no-repeat;
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
