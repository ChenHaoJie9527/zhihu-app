import { createStore, Commit } from "vuex";
import axios from "axios";
export interface RespontenProps<P = {}> {
    code: number;
    msg: string;
    data: P;
}
export interface AvatarType {
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
    error: GlobalError;
}

export interface GlobalError {
    status: boolean;
    message?: string;
}

// Action函数
const getasyncFunc = async (commit: Commit, url: string, mutationsName: string) => {
    const { data } = await axios.get(url);
    commit(mutationsName, data);
    return data;
}

const postasyncLogin = async (commit: Commit, url: string, mutationsName: string, payload: object) => {
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
        token: localStorage.getItem("token") || "",
        error: {
            status: false
        }
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
        logout(state){
            state.token = "";
            localStorage.removeItem("token");
            delete axios.defaults.headers.common.Authorization;
        }
    },
    actions: {
        async fetchColumns({ commit }) {
            return getasyncFunc(commit, "/columns", "fetchColumns");
        },
        async fetchColumn({ commit }, cid) {
            return getasyncFunc(commit, `/columns/${cid}`, "fetchColumn");
        },
        async fetchPosts({ commit }, cid) {
            return getasyncFunc(commit, `/columns/${cid}/posts`, "fetchPosts");
        },
        async login({ commit }, payload) {
            return postasyncLogin(commit, `/user/login`, "login", payload);
        },
        async fetchCurrentUser({ commit }) {
            return getasyncFunc(commit, `/user/current`, "fetchCurrentUser");
        },
        //组合actions 将多个异步方法组合起来使用
        loginAndFetchCurrentUser({ dispatch }, loginData) {
            return dispatch("login", loginData).then(() => {
                return dispatch("fetchCurrentUser");
            })
        }
    }
}); 
