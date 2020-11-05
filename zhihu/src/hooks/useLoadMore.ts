import { computed, ComputedRef, ref } from 'vue';
import { useStore } from "vuex";
interface LoadParams {
    currentPage: number;
    pageSize: number;
}
export const useLoadMore = (actionName: string, total: ComputedRef<number>, params: LoadParams = { currentPage: 2, pageSize: 5 }) => {
    const store = useStore();
    const currentPage = ref(params.currentPage);
    const requestParams = computed(() => ({
        currentPage: currentPage.value,
        pageSize: params.pageSize
    }));
    const loadMorePage = () => {
        store.dispatch(actionName, requestParams.value).then(() => {
            currentPage.value++;
        })
    }
    // 判断是否到达底部显示/隐藏按钮
    const isLastPage = computed(() => {
        return Math.ceil(total.value / params.pageSize) < currentPage.value;
    })
    return {
        loadMorePage,
        isLastPage,
        currentPage
    }
};