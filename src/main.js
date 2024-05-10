import { createApp } from 'vue'
import App from './App.vue'
import router from './router/routes';
import store from './store';

import './config/css/normalize.css';

createApp(App).use(router).use(store).mount('#app')
