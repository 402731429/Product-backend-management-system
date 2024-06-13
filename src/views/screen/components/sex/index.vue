<template>
  <div class="container">
    <div class="title">
      <p>男女比例</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div class="sex">
      <div class="man">
        <img src="../../images/man.png" alt="" />
      </div>
      <div class="woman">
        <img src="../../images/woman.png" alt="" />
      </div>
    </div>
    <div class="rate">
      <span>男士58%</span>
      <span>女士42%</span>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

let charts = ref()

onMounted(() => {
  let myCharts = echarts.init(charts.value)
  myCharts.setOption({
    title: {},
    xAxis: {
      show: false,
      min: 0,
      max: 100,
    },
    yAxis: {
      show: false,
      type: 'category',
    },
    series: [
      {
        type: 'bar',
        data: [100],
        barWidth: 30,
        borderRadius: '50%',
        silent: true,
        itemStyle: {
          color: '#ff4b7a',
          borderRadius: 20,
        },
      },
      {
        type: 'bar',
        data: [58],
        barWidth: 30,
        barGap: '-100%',
        silent: true,
        itemStyle: {
          color: '#007afe',
          borderRadius: 20,
        },
      },
    ],
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  })
})
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-lc.png) no-repeat;
  background-size: 100% 100%;
  margin: 10px 0px;
  .title {
    margin-left: 20px;
    p {
      color: white;
      font-size: 20px;
    }
  }
  .sex {
    display: flex;
    justify-content: center;
    .man {
      width: 111px;
      height: 120px;
      margin: 30px;
      background: url(../../images/man-bg.png) no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .woman {
      width: 111px;
      height: 120px;
      margin: 30px;
      background: url(../../images/woman-bg.png) no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .rate {
    margin-left: 10%;
    width: 80%;
    display: flex;
    justify-content: space-between;
    color: white;
  }
  .charts {
    margin-left: 10%;
    width: 80%;
    height: 60px;
  }
}
</style>
