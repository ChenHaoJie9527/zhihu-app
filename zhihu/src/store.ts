import { createStore } from "vuex";
import { testData, testPosts, ColumnProps, PostProps } from "./testData";

interface UserProps {
    isLogin: boolean;
    name?: string;
    id?: number;
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
            isLogin: false
        }
    },
    mutations: {
        login(state) {
            state.user = {
                ...state.user,
                isLogin: true,
                name: "vikeet"
            }
        }
    },
    getters: {
        getColumns: state => (id: number) => {
            return state.columns.find(item => item.id == id);
        },
        getList: state => (id: number) => {
            return state.posts.filter(item => item.columnId == id);
        }
    },
}); 