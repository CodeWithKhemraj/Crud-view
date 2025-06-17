import './bootstrap';
import { createApp } from 'vue';
import App from './layouts/App.vue';
import Router from './routes';
import axios from 'axios';
import Vuetify from "./vuetify";
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const app = createApp(App);

app.config.globalProperties.$axios = axios;

app.use(Router);
app.use(ToastPlugin);
app.use(Vuetify);
app.mount('#app');
