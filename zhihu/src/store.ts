import { createStore, Commit, } from "vuex";
import axios, { AxiosRequestConfig } from "axios";
import { objToarr, arrToObj } from "./hooks/Hleper";
export interface RespontenProps<P = {}> {
    code: number;
    msg: string;
    data: P;
}
export interface AvatarType {
    url?: string;
    _id?: string;
    tacitlyUrl?: string;
    createdAt?: string;
}
export interface ColumnProps {
    _id: string;
    title: string;
    avatar?: AvatarType;
    description: string;
}
export interface PostProps {
    _id?: string | number;
    title?: string;
    content?: string;
    excerpt?: string;
    image?: AvatarType | string;
    updatedAt?: string;
    column?: string;
    author?: string | number | UserProps;
    isHTML?: boolean;
}

export interface UserProps {
    isLogin: boolean;
    nickName?: string;
    _id?: string;
    column?: string;
    email?: string;
    description?: string;
    avatar?: AvatarType;
}

interface ListProps<T> {
    [key: string]: T;
}

export interface GlobalDataProps {
    columns: ListProps<ColumnProps>;
    posts: ListProps<PostProps>;
    user: UserProps;
    loading: boolean;
    token: string;
    error: GlobalError;
}

export interface GlobalError {
    status: boolean;
    message?: string;
}

// Action函数
const getAndCommit = async (commit: Commit, url: string, mutationsName: string) => {
    const { data } = await axios.get(url);
    commit(mutationsName, data);
    return data;
}

const postAndCommit = async (commit: Commit, url: string, mutationsName: string, payload: object) => {
    const { data } = await axios.post(url, payload);
    commit(mutationsName, data);
    return data;
}

const asyncAndCommitUpadate = async (commit: Commit, url: string, mutationsName: string, config: AxiosRequestConfig = { method: "GET" }) => {
    const { data } = await axios(url, config);
    commit(mutationsName, data);
    return data;
}

export const store = createStore<GlobalDataProps>({
    state: {
        // columns: [],
        columns: {},
        posts: {},
        user: {
            isLogin: false,
        },
        loading: false,
        token: localStorage.getItem("token") || "",
        error: {
            status: false
        }
    },
    getters: {
        getColumns: state => {
            // return state.columns.find(item => item._id == id);
            return objToarr(state.columns);
        },
        getColumnsById: state => (id: string) => {
            return state.columns[id];
            // return objToarr(state.columns);
        },
        getList: state => (id: string) => {
            return objToarr(state.posts).filter(item => item.column === id);
        },
        getUserIsLogin: state => () => {
            return state.user.isLogin;
        },
        getLoading: state => () => {
            return state.loading;
        },
        getCurrentPost: state => (id: string) => {
            // const arr = state.posts.find(item => item._id == id);
            const arr = state.posts[id];
            return {
                isHTML: false,
                ...arr
            };
        }
    },
    mutations: {
        createPost(state, data) {
            state.posts[data._id] = data;
        },
        // 获取首页列表
        fetchColumns(state, ColumnsData) {
            state.columns = arrToObj(ColumnsData.data.list);
        },
        // 获取个人专栏列表
        fetchColumn(state, ColumnData) {
            state.columns[ColumnData.data._id] = ColumnData.data;
        },
        fetchPosts(state, PostsData) {
            state.posts = arrToObj(PostsData.data.list);
        },
        fetchPost(state, rawdata) {
            state.posts[rawdata.data._id] = rawdata.data;
        },
        setLoading(state, status) {
            state.loading = status;
        },
        login(state, rawdata) {
            const token = rawdata.data.token;
            localStorage.setItem("token", token);
            state.token = token;
            axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        },
        fetchCurrentUser(state, rawdata) {
            state.user = {
                isLogin: true,
                ...rawdata.data
            }
        },
        setError(state, e: GlobalError) {
            state.error = e;
        },
        logout(state) {
            state.token = "";
            localStorage.removeItem("token");
            delete axios.defaults.headers.common.Authorization;
        },
        updatePost(state, { data }) {
            // state.posts = state.posts.map(item => {
            //     if (item._id == data._id) {
            //         return data;
            //     } else {
            //         return item;
            //     }
            // })
            state.posts[data._id] = data;
        },
        deletePost(state, { data }) {
            // state.posts = state.posts.filter(item => {
            //     return item._id !== data._id;
            // })
            delete state.posts[data._id];
        }
    },
    actions: {
        async fetchColumns({ commit }) {
            return getAndCommit(commit, "/columns", "fetchColumns");
        },
        async fetchColumn({ commit }, cid) {
            return getAndCommit(commit, `/columns/${cid}`, "fetchColumn");
        },
        async fetchPosts({ commit }, cid) {
            return getAndCommit(commit, `/columns/${cid}/posts`, "fetchPosts");
        },
        async fetchPost({ commit }, id) {
            return asyncAndCommitUpadate(commit, `/posts/${id}`, 'fetchPost');
        },
        async login({ commit }, payload) {
            return postAndCommit(commit, `/user/login`, "login", payload);
        },
        async fetchCurrentUser({ commit }) {
            return asyncAndCommitUpadate(commit, `/user/current`, "fetchCurrentUser");
        },
        async createPost({ commit }, payload) {
            return postAndCommit(commit, `/posts`, "createPost", payload);
        },
        async updatePost({ commit }, { id, payload }) {
            return asyncAndCommitUpadate(commit, `/posts/${id}`, "updatePost", {
                method: "PATCH",
                data: payload
            });
        },
        async deletePost({ commit }, id) {
            return asyncAndCommitUpadate(commit, `/posts/${id}`, "deletePost", {
                method: "DELETE",
            })
        },
        //组合actions 将多个异步方法组合起来使用
        loginAndFetchCurrentUser({ dispatch }, loginData) {
            return dispatch("login", loginData).then(() => {
                return dispatch("fetchCurrentUser");
            })
        }
    }
}); 
