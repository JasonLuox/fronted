<script lang="ts" setup>
    import {onMounted, ref} from 'vue'
    import Axios from 'axios'
    // import {useRouter} from 'vue-router'
    import {ajaxGet} from '@/utils/axios'

    // const router = useRouter()
    const instance = Axios.create({
        baseURL: 'http://127.0.0.1:8000/api',
    })
    const msg = ref('before')

    const handleAxiosTest = () => {
        instance.get('/test/').then(res => {
            msg.value = res.data.data
            console.log(msg)
        }).catch(err => {
            console.log(err, 'err')
        })
    }
    const handleAxiosTest2 = async() => {
        const res = await ajaxGet('/test/2')
        console.log(res?.data, 'show res data')
        // ajaxGet('/test/2').then(res => {
        //     console.log(res.data, 'hahaha')
        // })
        // console.log(router, 'show router')
        // router.push({ name: 'Test' })
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
</template>

