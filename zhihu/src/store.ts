import { createStore, Commit } from "vuex";
// import { testPosts } from "./testData";
import axios from "axios";
import { resolve } from 'path';
interface AvatarType {
    url: string;
    _id: string;
}
export interface ColumnProps {
    _id: string;
    title: string;
    avatar?: AvatarType;
    description: string;
    createdAt: string;
    key: number;
}
export interface PostProps {
    _id: string | number;
    title: string;
    content?: string;
    excerpt?: string;
    image?: AvatarType;
    createAt?: string;
    column: string;
}
export interface UserProps {
    isLogin: boolean;
    nickName?: string;
    _id?: string;
    column?: string;
    email?: string;
    description?: string;
}
export interface GetPops {
    getColumns(): void;
    getList(): void;
}
export interface GlobalDataProps {
    columns: ColumnProps[];
    posts: PostProps[];
    user: UserProps;
    loading: boolean;
    token: string;
}

// Action函数
const asyncFunc = async (commit: Commit, url: string, mutationsName: string) => {
    // 请求开始时显示loading
    // commit("setLoading", true);
    const { data } = await axios.get(url);

    // 延迟两秒
    // await new Promise(resolve => setTimeout(resolve, 2000));

    commit(mutationsName, data);
    // 请求完成时关闭loading
    // commit("setLoading", false);
}

const asyncLogin = async (commit: Commit, url: string, mutationsName: string, payload: object) => {
    const { data } = await axios.post(url, payload);
    commit(mutationsName, data);
    return data;
}

export const store = createStore<GlobalDataProps>({
    state: {
        columns: [],
        posts: [],
        user: {
            isLogin: false,

        },
        loading: false,
        token: "",
    },
    getters: {
        getColumns: state => (id: string) => {
            return state.columns.find(item => item._id === id);
        },
        getList: state => (id: string) => {
            return state.posts.filter(item => item.column === id);
        },
        getUserIsLogin: state => () => {
            return state.user.isLogin;
        },
        getLoading: state => () => {
            return state.loading;
        }
    },
    mutations: {
        createPost(state, data) {
            state.posts.push(data)
        },
        fetchColumns(state, ColumnsData) {
            state.columns = ColumnsData.data.list;
        },
        fetchColumn(state, ColumnData) {
            state.columns = [ColumnData.data];
        },
        fetchPosts(state, PostsData) {
            state.posts = PostsData.data.list;
        },
        setLoading(state, status) {
            state.loading = status;
        },
        login(state, rawdata) {
            const token = rawdata.data.token;
            state.token = token;
            axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        },
        fetchCurrentUser(state, rawdata) {
            state.user = {
                isLogin: true,
                ...rawdata.data
            }
        }
    },
    actions: {
        async fetchColumns({ commit }) {
            // const { data } = await axios.get("/columns");
            // commit("fetchColumns", data);
            asyncFunc(commit, "/columns", "fetchColumns");
        },
        async fetchColumn({ commit }, cid) {
            // const { data } = await axios.get(`/columns/${cid}`);
            // commit("fetchColumn", data);
            asyncFunc(commit, `/columns/${cid}`, "fetchColumn");
        },
        async fetchPosts({ commit }, cid) {
            // const { data } = await axios.get(`/columns/${cid}/posts`);
            // commit("fetchPosts", data);
            asyncFunc(commit, `/columns/${cid}/posts`, "fetchPosts");
        },
        async login({ commit }, payload) {
            return asyncLogin(commit, `/user/login`, "login", payload);
        },
        async fetchCurrentUser({ commit }) {
            asyncFunc(commit, `/user/current`, "fetchCurrentUser");
        },
        //组合actions 将多个异步方法组合起来使用
        loginAndFetchCurrentUser({ dispatch }, loginData) {
            return dispatch("login", loginData).then(res => {
                return dispatch("fetchCurrentUser");
            })
        }
    }
}); 