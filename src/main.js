import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// importar bootstrap'
import bootstrap from './bootstrap'

const app = createApp(App)
app.use(bootstrap)
app.use(router)

app.mount('#app')
