import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import CreatePost from "../views/CreatePost.vue";
import ColumnDetail from "../views/ColumnDetail.vue";
import { store } from "../store";
import axios from "axios";
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
        },
        {
            path: "/singup",
            name: "singup",
            component: () => import("../views/SingUp.vue"),
            meta: { redirectAlreadyLogin: true }
        },
        {
            path: "/posts/:id",
            name: "posts",
            component: () => import("../views/PostDetail.vue"),
            meta: {
                name: "posts-detail"
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    const { user, token } = store.state;
    const { requiredLogin, readireactAlreadLogin } = to.meta;
    if (!user.isLogin) {
        if (token) {
            console.log("123");
            axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            store.dispatch("fetchCurrentUser").then(() => {
                if (readireactAlreadLogin) {
                    console.log("101112");
                    next("/");
                } else {
                    console.log("131415");
                    next();
                }
            }).catch(e => {
                console.log(e);
                store.commit("logout");
                next({
                    name: "login"
                })
            })
        } else {
            if (requiredLogin) {
                console.log("456");
                next({ name: "login" });
            } else {
                console.log("789");
                next();
            }
        }
    } else {
        if (readireactAlreadLogin) {
            next("/");
        } else {
            next();
        }
    }
})

export default router;