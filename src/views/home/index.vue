<script lang="ts" setup>
    import { onMounted } from 'vue'
    import { useCounterStore } from '@/stores/counter'
    import { $echarts, ECOption } from '@/utils/echarts'
    import testAxios from '@/views/test-axios.vue'

    const counter = useCounterStore()

    counter.count++
    const { count } = counter
    console.log(count, 'count')

    onMounted(() => {
        // 测试echarts的引入
        const ele = document.getElementById('echarts') as HTMLCanvasElement
        const myChart = $echarts.init(ele)
        const option: ECOption = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data: ['销量']
            },
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [
                {
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }
            ]
        }
        myChart.setOption(option)
    })

</script>

<template>
    <div>hello  vue3</div>
    <n-button type="tertiary">
        Tertiary
    </n-button>
    <div @click="counter.increment()">累加器{{ count }}</div>
    <div id="echarts" style="width: 400px;height: 200px;"></div>
    <test-axios></test-axios>
</template>

