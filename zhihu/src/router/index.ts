import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import CreatePost from "../views/CreatePost.vue";
import ColumnDetail from "../views/ColumnDetail.vue";
import { store } from "../store";
const routerHistory = createWebHashHistory(); // 使用web HTML5 history模式

const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/login",
            name: "login",
            component: Login,
            meta: {
                readireactAlreadLogin: true
            }
        },
        {
            path: "/column/:id",
            name: "column",
            component: ColumnDetail
        },
        {
            path: "/create",
            name: "create",
            component: CreatePost,
            meta: {
                requiredLogin: true
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiredLogin && !(store.getters.getUserIsLogin())) {
        next({
            name: "login"
        });
    }
    else if (to.meta.readireactAlreadLogin && store.getters.getUserIsLogin()) {
        next({
            name: "home"
        })
    }
    else {
        next();
    }
})

export default router;