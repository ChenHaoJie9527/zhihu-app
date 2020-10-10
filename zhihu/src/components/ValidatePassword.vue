<template>
  <div class="validate-input-container pb-3">
    <input
      class="form-control"
      @blur="validatePassword"
      :class="{'is-invalid':passwordRef.error}"
      :value="passwordRef.val"
      @input="passwordUpdate"
      v-bind="$attrs"
    />
    <span v-if="passwordRef.error" class="invalid-feedback">
        {{passwordRef.message}}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import useValidatePassword from "../hooks/useValidatePassword";
interface RuleProp {
  type: "password" | "required";
  message: string;
}
export type RulesPropType = RuleProp[];
export default defineComponent({
  name: "ValidatePassword",
  props: {
    rules: Array as PropType<RulesPropType>,
    modelValue: String,
  },
  inheritAttrs: false, // inheritAttrs 禁用子组件根节点继承子组件非prop属性
  setup(props, context) {
    const {
      passwordRef,
      passwordUpdate,
      validatePassword,
    } = useValidatePassword(props, context);
    return {
      passwordRef,
      passwordUpdate,
      validatePassword,
    };
  },
});
</script>

<style scoped>
</style>