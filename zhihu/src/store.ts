import { createStore, Commit } from "vuex";
// import { testPosts } from "./testData";
import axios from "axios";
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
interface UserProps {
    isLogin: boolean;
    name?: string;
    id?: number;
    columnId?: number;
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
}

// Action函数
const asyncFunc = async (commit: Commit, url: string, mutationsName: string) => {
    const { data } = await axios.get(url);
    commit(mutationsName, data);
}

export const store = createStore<GlobalDataProps>({
    state: {
        columns: [],
        posts: [],
        user: {
            isLogin: true,
            name: "viking",
            columnId: 1,
        },
        loading: false
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
        }
    },
    mutations: {
        login(state) {
            state.user = {
                ...state.user,
                isLogin: true,
                name: "vikeet"
            }
        },
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
        }
    }
}); 