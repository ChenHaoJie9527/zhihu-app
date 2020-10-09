<template>
  <div class="validate-input-container pb-3">
    <input
      type="text"
      class="form-control"
      @blur="validateInput"
      v-model="inputRef.val"
      :class="{ 'is-invalid': inputRef.error }"
      @input="updateValue"
    />
    <span v-if="inputRef.error" class="invalid-feedback">{{
      inputRef.message
    }}</span>
  </div>
</template>

<script lang="ts">
interface RuleProp {
  type: "required" | "email";
  message: string;
}
export type RulesProp = RuleProp[];
import { defineComponent, PropType, reactive } from "vue";
const email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
interface EmailProps {
  val: string;
  message: string;
  error: boolean;
}
export default defineComponent({
  name: "ValidateInput",
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String,
  },
  setup(props, context) {
    const inputRef = reactive<EmailProps>({
      val: props.modelValue || "",
      message: "",
      error: false,
    });
    const updateValue = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value;
      inputRef.val = targetValue;
      context.emit("update:modelValue", targetValue);
    };
    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every((item) => {
          let passed = true;
          inputRef.message = item.message;
          switch (item.type) {
            case "required":
              passed = inputRef.val.trim() !== "";
              break;
            case "email":
              passed = email.test(inputRef.val);
              break;
            default:
              break;
          }
          return passed;
        });
        inputRef.error = !allPassed;
      }
    };

    return {
      inputRef,
      validateInput,
      updateValue,
    };
  },
});
</script>

<style scoped>
</style>