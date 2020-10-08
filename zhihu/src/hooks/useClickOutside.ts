import { ref, onMounted, onUnmounted, Ref } from "vue";
const useClickOutside = (el: Ref<null | HTMLElement>) => {
    const isClickOutside = ref(false);
    const handerClick = (e: MouseEvent) => {
        if (el.value) {
            if (el.value.contains(e.target as HTMLElement)) {
                isClickOutside.value = false;
            }else {
                isClickOutside.value = true;
            }
        }
    };
    onMounted(() => {
        document.addEventListener("click", handerClick);
    });
    onUnmounted(() => {
        document.removeEventListener("click", handerClick);
    });
    return isClickOutside
}
export default useClickOutside;


