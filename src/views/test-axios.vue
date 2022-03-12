<script lang="ts" setup>
    import { onMounted } from 'vue'
    import Axios from 'axios'
    import {get} from '@/utils/axios'

    const handleAxiosTest = async() => {
        const a = await Axios.get('/test/')
        console.log(a, 'a')
        // Axios.get('/test/').then(res => {
        //     console.log(res, 'res')
        // }).catch(err => {
        //     console.log(err, 'err')
        // })
    }
    const handleAxiosTest2 = () => {
        get('/test/')
    }

    onMounted(() => {
        // 测试echarts的引入
    })

</script>

<template>
    <div>hello  axios</div>
    <n-button type="tertiary" @click="handleAxiosTest">
        点我发送请求
    </n-button>
    <n-button type="tertiary" @click="handleAxiosTest2">
        点我发送请求2
    </n-button>
</template>

