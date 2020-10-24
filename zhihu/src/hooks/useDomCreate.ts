import { onUnmounted } from "vue";
function useDomCreate(name: string | HTMLDivElement) {
    if (typeof name === "object") {
        name.id = "message";
        document.body.appendChild(name);
        onUnmounted(() => {
            document.body.removeChild(name);
        })
    } else if (typeof name === "string") {
        const node = document.createElement("div");
        node.id = name;
        document.body.appendChild(node);
        onUnmounted(() => {
            document.body.removeChild(node);
        })
    }
}
export default useDomCreate;