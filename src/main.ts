import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { naive } from './utils/demand-import'
import { createPinia } from 'pinia'
// mock数据
// import './utils/mock'

const app = createApp(App as any)
app.use(router)
app.use(naive)
app.use(createPinia())
app.mount('#app')
