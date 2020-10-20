import { createStore } from "vuex";
import { testData, testPosts, ColumnProps, PostProps } from "./testData";
export { PostProps } from "./testData";
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
        columns: testData,
        posts: testPosts,
        user: {
            isLogin: true,
            name: "viking",
            columnId: 1
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
        }
    },
    getters: {
        getColumns: state => (id: number) => {
            return state.columns.find(item => item.id == id);
        },
        getList: state => (id: number) => {
            return state.posts.filter(item => item.columnId == id);
        },
        getUserIsLogin: state => ()=>{
            return state.user.isLogin;
        }
    },
}); 