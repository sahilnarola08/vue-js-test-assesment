import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from "pinia-plugin-persistedstate"
const pinia = createPinia();
pinia.use(piniaPluginPersistedState)
import App from './App.vue'
import router from './router'
import Accordion  from './components/accordion.vue'
import Common  from './components/common.vue'
import Model  from './components/model.vue'


const app = createApp(App)

app.use(createPinia())
app.use(pinia)
app.use(router)
app.component("Accordion", Accordion)
app.component("Common",Common)
app.component("Model", Model)
app.mount('#app')
