<template>
  <div class="validate-from-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary btn-block btn-large">提交</button>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from "vue";
import mitt from "mitt";
export const emitter = mitt();
type emitsType = Array<string>;
const emitsArr: emitsType = ["form-submit"];
type FuncType = () => boolean;
export default defineComponent({
  emits: emitsArr, //emits也可以是个数组，这样相当于放弃自定义验证，从而声明多个emits事件
  setup(props, context) {
    let funcArr: FuncType[] = [];
    const submitForm = () => {
      //循环数组 将得到的验证结果
      const res = funcArr.map((func) => func()).every((item) => item);
      context.emit("form-submit", res);
    };
    //创建数组，push方法进去
    const callback = (test?: FuncType) => {
      if (typeof test !== "undefined") {
        funcArr.push(test);
      }
    };
    // 添加监听
    emitter.on("form-item-create", callback);
    onUnmounted(() => {
      // 删除监听
      emitter.off("form-item-create", callback);
      funcArr = [];
    });
    return { submitForm };
  },
});
</script>

<style scoped>
</style>