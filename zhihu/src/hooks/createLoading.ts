import { createApp, onUnmounted } from "vue";
import Loading from "../components/Loading.vue";
export const CreateLoading = (text: string, background: string, timeOut = 2000) => {
    const loadingInstance = createApp(Loading, {
        text,
        background
    });
    const loadingNode = document.createElement("div");
    loadingNode.id = "loading";
    document.body.appendChild(loadingNode);
    loadingInstance.mount(loadingNode);
    onUnmounted(() => {
        loadingInstance.unmount(loadingNode);
        document.body.removeChild(loadingNode);
    })
}