<template>
  <div class="container" ref="map"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import chinaJSON from './china.json'

let map = ref()

echarts.registerMap('china', chinaJSON as any)
onMounted(() => {
  let myCharts = echarts.init(map.value)
  myCharts.setOption({
    geo: {
      map: 'china',
      roam: true,
      top: 100,
      left: 50,
      right: 50,
      bottom: 0,
      emphasis: {
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
                color: '#023E87', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#042148', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
          opacity: 1,
        },
        label: {
          color: 'white',
          fontSize: 26,
        },
      },
      label: {
        show: true,
        color: 'white',
        fontSize: 16,
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
              color: '#023E87', // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#042148', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
        borderColor: 'skyBlue',
        borderWidth: 1,
        shadowColor: 'rgba(0, 191, 255, 0.5)',
        // 设置阴影模糊程度
        shadowBlur: 10,
        opacity: 0.8,
      },
    },
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    series: [
      {
        type: 'lines',
        data: [
          {
            coords: [
              [104.065735, 30.659462],
              [116.405285, 39.904989],
            ],
            lineStyle: {
              color: 'white',
              width: 1,
              type: 'dashed',
              curveness: 0.3,
            },
          },
          {
            coords: [
              [116.405285, 39.904989],
              [104.065735, 30.659462],
            ],
            lineStyle: {
              color: 'white',
              width: 1,
              type: 'dashed',
              curveness: 0.3,
            },
          },
          {
            coords: [
              [87.617733, 43.792818],
              [104.065735, 30.659462],
            ],
            lineStyle: {
              color: 'white',
              width: 1,
              type: 'dashed',
              curveness: 0.3,
            },
          },
          {
            coords: [
              [104.065735, 30.659462],
              [87.617733, 43.792818],
            ],
            lineStyle: {
              color: 'white',
              width: 1,
              type: 'dashed',
              curveness: 0.3,
            },
          },
          {
            coords: [
              [116.405285, 39.904989],
              [113.280637, 23.125178],
            ],
            lineStyle: {
              color: 'white',
              width: 1,
              type: 'dashed',
              curveness: 0.3,
            },
          },
          {
            coords: [
              [113.280637, 23.125178],
              [116.405285, 39.904989],
            ],
            lineStyle: {
              color: 'white',
              width: 1,
              type: 'dashed',
              curveness: 0.3,
            },
          },
          {
            coords: [
              [116.405285, 39.904989],
              [121.472644, 31.231706],
            ],
            lineStyle: {
              color: 'white',
              width: 1,
              type: 'dashed',
              curveness: 0.3,
            },
          },
          {
            coords: [
              [121.472644, 31.231706],
              [116.405285, 39.904989],
            ],
            lineStyle: {
              color: 'white',
              width: 1,
              type: 'dashed',
              curveness: 0.3,
            },
          },
        ],
        effect: {
          show: true,
          symbol:
            'path://M995.679767 658.818049c-8.943231-1.490539-23.848617-2.981077-44.716157-4.471615-73.03639-8.943231-207.184862-26.829694-295.126638-38.754003l-19.377001-5.962154h-2.981077l-44.716157-13.414848c-4.471616 90.922853-10.43377 166.94032-17.886463 225.071325v10.43377l22.358078 10.43377 70.055313 32.791849c2.981077 1.490539 4.471616 4.471616 4.471616 7.452693l1.490539 55.149927v4.471615c0 2.981077-1.490539 5.962154-4.471616 4.471616l-114.77147-19.377001c-8.943231 22.358079-17.886463 34.282387-31.30131 35.772925h-1.490539c-13.414847 0-23.848617-11.924309-31.30131-35.772925l-114.77147 17.886463c-2.981077 0-4.471616-1.490539-4.471616-4.471616v-4.471616l1.490539-55.149927c0-2.981077 1.490539-5.962154 4.471615-7.452693l70.055313-32.791849 22.358079-10.43377V819.796215c-5.962154-58.131004-10.43377-134.148472-14.905386-225.071324l-46.206696 13.414847h-4.471615l-19.377002 4.471616c-87.941776 10.43377-222.090247 26.829694-295.126637 35.772925-20.86754 2.981077-35.772926 4.471616-44.716158 4.471616-23.848617 2.981077-25.339156-26.829694-7.452692-37.263464 2.981077-1.490539 56.640466-29.810771 123.714701-67.074236v-38.754003c0-14.905386 11.924309-26.829694 26.829695-26.829694s26.829694 11.924309 26.829694 26.829694v8.943232c40.244541-20.86754 81.979622-43.225619 119.243086-64.093159v-44.716157c0-14.905386 11.924309-26.829694 26.829694-26.829695s26.829694 11.924309 26.829694 26.829695v14.905385c23.848617-11.924309 43.225619-23.848617 56.640466-31.30131-1.490539-174.393013 11.924309-308.541485 61.112082-332.390101 2.981077-1.490539 4.471616-1.490539 7.452693-2.981078 1.490539 0 4.471616 0 5.962154-1.490538h5.962154c1.490539 0 4.471616 0 5.962154 1.490538 2.981077 0 4.471616 1.490539 7.452693 2.981078 49.187773 23.848617 62.60262 157.997089 58.131005 332.390101 13.414847 7.452693 32.791849 17.886463 55.149927 29.810772v-14.905386c0-14.905386 11.924309-26.829694 26.829694-26.829694s26.829694 11.924309 26.829695 26.829694v44.716157c37.263464 20.86754 78.998544 43.225619 119.243085 65.583698V506.783115c0-14.905386 11.924309-26.829694 26.829695-26.829694s26.829694 11.924309 26.829694 26.829694v44.716157c68.564774 37.263464 122.224163 67.074236 123.714702 68.564775 25.339156 10.43377 23.848617 41.73508-1.490539 38.754002z',
          symbolSize: 25,
          trailLength: 0,
        },
      },
    ],
  })
})
</script>

<style scoped></style>
