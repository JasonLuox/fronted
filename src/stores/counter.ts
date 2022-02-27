/**
 * pinia
 * 文档指引 https://pinia.vuejs.org/introduction.html
 * **/

import { defineStore } from 'pinia'
import { ref } from 'vue'
// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
// 使用示例一：函数式定义【个人推荐】
export const useCounterStore = defineStore('counter', () => {
    const count = ref(0)
    function increment() {
        count.value++
    }

    return { count, increment }
})

// 使用示例二：基本使用
export const useCounterStore2 = defineStore('counter2', {
    state: () => {
        return {
            count: 0
        }
    },
    actions: {
        increment() {
            this.count++
        }
    }
})

/*
// 调用示例
import { useCounterStore } from '@/stores/counter'

export default {
    setup() {
        const counter = useCounterStore()

        counter.count++
        // with autocompletion ✨
        counter.$patch({ count: counter.count + 1 })
        // or using an action instead【个人推荐】
        counter.increment()
    },
}*/
