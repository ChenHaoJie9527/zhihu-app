<template>
  <div class="validate-input-container pb-3">
    <input
      v-if="tag !== 'textarea'"
      class="form-control"
      @blur="validatePassword"
      :class="{ 'is-invalid': passwordRef.error }"
      v-model="passwordRef.val"
      v-bind="$attrs"
    />
    <textarea
      v-else
      class="form-control"
      @blur="validatePassword"
      :class="{ 'is-invalid': passwordRef.error }"
      v-model="passwordRef.val"
      v-bind="$attrs"
      rows="30"
    ></textarea>
    <span v-if="passwordRef.error" class="invalid-feedback">
      {{ passwordRef.message }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, } from "vue";
import useValidatePassword from "../hooks/useValidatePassword";
import { emitter } from "./ValidateForm.vue";
interface RuleProp {
  type: "text" | "password" | "required" | "custom";
  message: string;
  validator?: () => void;
}
export type tagType = "input" | "textarea";
export type RulesPropType = RuleProp[];
export default defineComponent({
  name: "ValidatePassword",
  props: {
    rules: Array as PropType<RulesPropType>,
    modelValue: String,
    tag: {
      type: String as PropType<tagType>,
      default: "input",
    },
  },
  inheritAttrs: false, // inheritAttrs 禁用子组件根节点继承子组件非prop属性
  setup(props, context) {
    const {
      passwordRef,
      validatePassword,
    } = useValidatePassword(props, context);
    onMounted(() => {
      emitter.emit("form-item-create", validatePassword);
    });
    return {
      passwordRef,
      validatePassword,
    };
  },
});
</script>

<style scoped>
</style>