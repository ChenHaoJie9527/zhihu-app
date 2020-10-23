import { createApp } from "vue";
import Message from "../components/Message.vue";
type MessageProps = "default" | "success" | "error";
const CreateMessage = (message: string, type: MessageProps, timeOut = 2000) => {
    // 创建一个vue实例
    const messageInstance = createApp(Message, {
        message,
        type
    });
    // 创建一个vue挂载节点
    const mountNode = document.createElement("div");
    document.body.appendChild(mountNode);
    messageInstance.mount(mountNode);
    // 两秒后移除组件和节点
    setTimeout(() => {
        messageInstance.unmount(mountNode);
        document.body.removeChild(mountNode);
    }, timeOut);
};
export default CreateMessage;