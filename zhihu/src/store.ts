import { createStore } from "vuex";
import { testData, testPosts } from "./testData";
import axios from "axios";
interface AvatarType {
    url: string;
    _id: string;
}
export interface ColumnProps {
    _id: number;
    title: string;
    avatar?: AvatarType;
    description: string;
    createdAt: string;
    key: number;
}
export interface PostProps {
    id: number;
    title: string;
    content: string;
    image?: string;
    createAt?: string;
    columnId: number;
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
        posts: testPosts,
        user: {
            isLogin: true,
            name: "viking",
            columnId: 1
        }
    },
    getters: {
        getColumns: state => (id: number) => {
            return state.columns.find(item => item._id == id);
        },
        getList: state => (id: number) => {
            return state.posts.filter(item => item.columnId == id);
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
        }
    },
    actions: {
        fetchColumns(context) {
            axios.get("/columns").then(res => {
                context.commit("fetchColumns", res.data);
            })
        }
    }
}); 