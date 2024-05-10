import { createApp } from 'vue';
import App from './Aframe.vue';
import router from './router' 
// createApp(App).mount('#app');


createApp(App).use(router).mount('#app')