import { createApp } from 'vue';
import App from './App.vue'
import router from "./router/index";
import { store } from "./store";
import axios from "axios";
axios.defaults.baseURL = "http://apis.imooc.com/api";
axios.interceptors.request.use(config => {
    config.params = { ...config.params, icode: "E219C6BE1D9368AF" };
    return config;
})
// axios.get("/columns").then(res => {
//     console.log(res.data);
// })


createApp(App).use(router).use(store).mount('#app')