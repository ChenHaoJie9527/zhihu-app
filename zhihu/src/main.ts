import { createApp } from 'vue';
import App from './App.vue'
import router from "./router/index";
import { store } from "./store";
import axios from "axios";
axios.defaults.baseURL = "http://apis.imooc.com/api";
axios.interceptors.request.use(config => {
    // if (config.method !== "GET") {
    //     config.data = { ...config.data, icode: "E219C6BE1D9368AF" }
    // }
    // get 请求，添加到 url 中
    config.params = { ...config.params, icode: "E219C6BE1D9368AF" };
    // 其他请求，添加到 body 中
    // 如果是上传文件，添加到 FormData 中
    if (config.data instanceof FormData) {
        config.data.append('icode', 'E219C6BE1D9368AF');
    } else {
        // 普通的 body 对象，添加到 data 中
        config.data = { ...config.data, icode: "E219C6BE1D9368AF" };
    }
    store.commit("setLoading", true);
    return config;
});
axios.interceptors.response.use(config => {
    setTimeout(() => {
        store.commit("setLoading", false);
    }, 2000)
    return config;
})

createApp(App).use(router).use(store).mount('#app')