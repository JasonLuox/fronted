<script lang="ts" setup>
    import {onMounted, ref} from 'vue'
    import Axios from 'axios'
    import {useRouter} from 'vue-router'
    import { ajaxGet, ajaxPost, cancelRequest } from '@/utils/axios'

    const router = useRouter()
    const instance = Axios.create({
        baseURL: 'http://127.0.0.1:4000/api',
    })
    const msg = ref('before')

    const handleAxiosTest = () => {
        instance.get('/test1').then(res => {
            msg.value = res.data.data
            console.log(res, 'show res test1')
        }).catch(err => {
            console.log(err, 'err')
        })
    }
    const handleAxiosTest2 = async() => {
        // 1. 链式调用
        ajaxGet('/test1').then(res => {
            console.log(res, ' res')
        }).catch((e) => {
            console.log(e, 'error')
        })

        // 2. try await catch
        try {
            const res = await ajaxGet('/test1', {})
            console.log(res, 'res2')
        } catch (e) {
            console.log(e, 'error2')
        }
    }

    const handleAxiosTest3 = async() => {
        const res = await ajaxPost('/test3', { name: 'zhangsan' })
        console.log(res, 'show post res')
    }

    const toTestPage = () => {
        router.push('/test')
    }


    onMounted(() => {
        // handleAxiosTest()
    })

</script>

<template>
    <div>{{ msg }}</div>
    <div v-if="msg === 'after'">hags</div>
    <div id="test"></div>
    <n-button type="tertiary" @click="handleAxiosTest">
        点我发送请求
    </n-button>
    <n-button type="tertiary" @click="handleAxiosTest2">
        点我发送请求2
    </n-button>
    <n-button type="tertiary" @click="handleAxiosTest3">
        测试post请求
    </n-button>
    <n-button @click="cancelRequest">取消请求</n-button>
    <n-button @click="toTestPage">跳转页面</n-button>
</template>

