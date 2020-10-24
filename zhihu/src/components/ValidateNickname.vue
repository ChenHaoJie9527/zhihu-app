<template>
  <div class="validate-input-container pb-3">
    <input
      type="text"
      class="form-control"
      :class="{ 'is-invalid': nickNameRef.error }"
      v-bind="$attrs"
      @blur="validateNickName"
      :value="nickNameRef.val"
      @input="updateName"
    />
    <span class="invalid-feedback" v-if="nickNameRef.error">
      {{ nickNameRef.message }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, reactive } from "vue";
interface RuleProp {
  type: "required" | "check";
  message: string;
}
interface NickNameProps {
  val: string;
  message: string;
  error: boolean;
}
import { emitter } from "./ValidateForm.vue";
export type RulesProps = RuleProp[];
export default defineComponent({
  name: "Nickname",
  props: {
    rules: Array as PropType<RulesProps>,
    modelValue: String,
  },
  inheritAttrs: false,
  setup(props, context) {
    const nickName = /^(?:[\u4e00-\u9fa5·]{2,16})$/;
    const nickNameRef = reactive<NickNameProps>({
      val: props.modelValue || "",
      message: "",
      error: false,
    });
    const updateName = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value;
      nickNameRef.val = targetValue;
      context.emit("update:modelValue", targetValue);
    };
    const validateNickName = () => {
      if (props.rules) {
        const allPassed = props.rules.every((item) => {
          let passed = true;
          nickNameRef.message = item.message;
          switch (item.type) {
            case "required":
              passed = nickNameRef.val.trim() !== "";
              break;
            case "check":
              passed = nickName.test(nickNameRef.val);
              break;
            default:
              break;
          }
          return passed;
        });
        nickNameRef.error = !allPassed;
        return allPassed;
      }
      return true;
    };
    onMounted(() => {
      emitter.emit("form-item-create", validateNickName);
    });
    return {
      nickNameRef,
      updateName,
      validateNickName,
    };
  },
});
</script>

<style>
</style>