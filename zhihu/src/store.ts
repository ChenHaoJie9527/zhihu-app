import { createStore } from "vuex";
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
}
export const store = createStore<GlobalDataProps>({
    state: {
        columns: [],
        posts: [],
        user: {
            isLogin: true,
            name: "viking",
            columnId: 1
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
        }
    },
    actions: {
        fetchColumns({ commit }) {
            axios.get("/columns").then(res => {
                commit("fetchColumns", res.data);
            })
        },
        fetchColumn({ commit }, cid) {
            axios.get(`/columns/${cid}`).then(res => {
                commit("fetchColumn", res.data);
            })
        },
        fetchPosts({ commit }, cid) {
            axios.get(`/columns/${cid}/posts`).then(res => {
                commit("fetchPosts", res.data);
            })
        }
    }
}); 