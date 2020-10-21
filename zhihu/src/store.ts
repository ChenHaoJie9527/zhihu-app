import { createStore } from "vuex";
import { testData, testPosts, ColumnProps, PostProps } from "./testData";
export { ColumnProps, PostProps } from "./testData";
export interface UserPops {
    isLogin: boolean;
    name?: string;
    id?: number;
    columnId?: number;
}
export type GlobalDataProps = {
    columns: ColumnProps[];
    posts: PostProps[];
    user: UserPops;
}
const store = createStore<GlobalDataProps>({
    state: {
        columns: testData,
        posts: testPosts,
        user: {
            isLogin: false,
            name: "viking",
            columnId: 1
        },
    },
    mutations: {
        login(state) {
            state.user = {
                ...state.user,
                isLogin: true,
                name: "viking"
            }
        },
        createPost(state, newPost) {
            state.posts.push(newPost);
        }
    },
    getters: {
        biggerColumnSlen(state) {
            return state.columns.filter(item => item.id > 2).length;
        },
        getColumnId: state => (id: number) => {
            return state.columns.find(item => item.id == id);
        },
        getColumnList: state => (id: number) => {
            return state.posts.filter(item => item.columnId == id);
        }
    }
});
export default store; 