<template>
  <div class="validate-input-container pb-3">
    <input
      class="form-control"
      @blur="validateInput"
      :class="{ 'is-invalid': inputRef.error }"
      v-bind="$attrs"
      v-model="inputRef.val"
    />
    <span v-if="inputRef.error" class="invalid-feedback">
      {{ inputRef.message }}
    </span>
  </div>
</template> 

<script lang="ts">
import { defineComponent, onMounted, PropType } from "vue";
import { emitter } from "./ValidateForm.vue";
import useValidate from "../hooks/useValidate";
interface RuleProp {
  type: "required" | "email";
  message: string;
}
export type RulesProp = RuleProp[];
export default defineComponent({
  name: "ValidateInput",
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String,
  },
  inheritAttrs: false, // inheritAttrs 禁用子组件根节点继承子组件非prop属性
  setup(props, context) {
    // console.log(context.attrs); // 可以获取到父组件传递过来的非prop属性 可通过v-bing="$attrs"设置属性
    const { inputRef, validateInput } = useValidate(
      props,
      context
    );
    onMounted(()=>{
      emitter.emit("form-item-create",validateInput)
    })
    return {
      inputRef,
      validateInput,
    };
  },
});
</script>

<style scoped>
</style>