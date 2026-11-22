import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'
// 2. 再引入 Tailwind 样式（确保 preflight 已在配置中禁用）
import './assets/styles/tailwind.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
