import './bootstrap';
import { createApp } from 'vue';
import App from './layouts/App.vue';
import router from './routes';
import axios from 'axios';
import vuetify from "./vuetify";

const app = createApp(App);

app.config.globalProperties.$axios = axios;

app.use(router);
app.use(vuetify);
app.mount('#app');
