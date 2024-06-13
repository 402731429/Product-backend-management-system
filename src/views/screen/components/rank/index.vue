<template>
  <div class="container">
    <div class="title">
      <p>热门景区排行</p>
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
  myCharts.setOption({
    title: {
      text: '景区排行',
      textStyle: {
        color: 'white',
      },
      subtext: '各大景区排行',
      subtextStyle: {
        color: 'white',
      },
      left: 170,
    },
    xAxis: {
      type: 'category',
      data: [
        '黄山',
        '西湖',
        '张家界',
        '阿尔卑斯',
        '九寨沟',
        '颐和园',
        '桂林山水',
      ],
    },
    yAxis: {},
    grid: {
      left: 40,
      right: 40,
      top: 50,
      bottom: 30,
    },
    series: [
      {
        type: 'bar',
        data: [10, 20, 30, 40, 50, 60, 70],
        label: {
          show: true,
          position: 'insideTop',
        },
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#42aa90', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#cafff7', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
      {
        type: 'line',
        data: [5, 15, 25, 35, 45, 60, 80],
        smooth: true,
        itemStyle: {
          color: 'white',
          shadowColor: '#2a537e',
          shadowBlur: 10,
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
  background: url(../../images/dataScreen-main-rt.png) no-repeat;
  background-size: 100% 100%;
  margin: 10px 0px;
  .title {
    margin-left: 20px;
    margin-top: 10px;
    p {
      color: white;
      font-size: 20px;
    }
  }
  .charts {
    margin-top: 20px;
    height: calc(100% - 70px);
  }
}
</style>
