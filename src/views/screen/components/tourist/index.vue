<template>
  <div class="container">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right">
        可预约总量
        <span>999999</span>
        人
      </p>
    </div>
    <div class="number">
      <span v-for="(item, index) in number" :key="index">{{ item }}</span>
    </div>
    <div class="charts" ref="chart"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import 'echarts-liquidfill'

let number = ref('219876人')
let chart = ref()

onMounted(() => {
  let mychart = echarts.init(chart.value)
  mychart.setOption({
    series: {
      type: 'liquidFill', //系列
      data: [
        0.5,
        0.4,
        {
          value: 0.3,
          itemStyle: {
            color: '#1BB5BC',
            opacity: 0.6,
          },
          emphasis: {
            itemStyle: {
              opacity: 0.9,
            },
          },
        },
      ], //展示的数据
      waveAnimation: true, //动画
      animationDuration: 3,
      animationDurationUpdate: 0,
      radius: '80%', //半径
      label: {
        position: ['50%', '25%'],
        formatter: function () {
          return '预测值'
        },
        fontSize: 18,
        color: '#1BB5BC',
      },
      outline: {
        //外层边框颜色设置
        show: true,
        borderDistance: 8,
        itemStyle: {
          color: '#11144e',
          borderColor: '#1BB5BC',
          borderWidth: 8,
          shadowBlur: 10,
          shadowColor: '#1BB5BC',
        },
      },
    },
  })
})
</script>

<style scoped lang="scss">
.container {
  background: url(../../images/dataScreen-main-lt.png) no-repeat;
  background-size: cover;
  margin: 10px 0px;
  .top {
    margin-left: 20px;
    .title {
      color: white;
      font-size: 20px;
    }
    .bg {
      width: 68px;
      height: 7px;
      background: url(../../images/dataScreen-title.png) no-repeat;
      background-size: cover;
      margin-top: 10px;
    }
    .right {
      float: right;
      color: white;
      font-size: 20px;
      span {
        color: rgb(255, 170, 0);
      }
    }
  }
  .number {
    width: 100%;
    height: 40px;
    margin-top: 30px;
    display: flex;
    margin-top: 30px;
    font-size: 26px;
    font-weight: bold;
    span {
      flex: 1;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: url(../../images/total.png);
      background-size: cover;
      color: #29fcff;
    }
  }
  .charts {
    width: 100%;
    height: 250px;
    margin-top: 10px;
  }
}
</style>
