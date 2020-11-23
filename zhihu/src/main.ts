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
    config.params = { ...config.params, icode: "C9249D041B8891D4" };
    // 其他请求，添加到 body 中
    // 如果是上传文件，添加到 FormData 中
    if (config.data instanceof FormData) {
        config.data.append('icode', 'C9249D041B8891D4');
    } else {
        // 普通的 body 对象，添加到 data 中
        config.data = { ...config.data, icode: "C9249D041B8891D4" };
    }
    store.commit("setError", {
        status: false,
        message: ""
    });
    store.commit("setLoading", true);
    return config;
});
axios.interceptors.response.use(config => {
    setTimeout(() => {
        store.commit("setLoading", false);
    }, 2000)
    return config;
}, e => {
    const { error } = e.response.data;
    store.commit("setError", {
        status: true,
        message: error
    });
    store.commit("setLoading", false);
    return Promise.reject(e);
})

createApp(App).use(router).use(store).mount('#app')
