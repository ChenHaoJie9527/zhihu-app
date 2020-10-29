import { reactive, SetupContext, computed, WritableComputedRef } from "vue";
interface EmailProps {
    val: string | WritableComputedRef<string>;
    message: string;
    error: boolean;
}
interface RuleProp {
    type: "required" | "email";
    message: string;
}
type RulesProp = RuleProp[];

interface T1 {
    rules?: RulesProp;
    modelValue?: string;
}

type propsType = Readonly<T1>;
type contextType = SetupContext<Record<string, any>>;
const useValidate = (props: propsType, context: contextType) => {
    const email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const inputRef = reactive<EmailProps>({
        val: computed({
            get: () => props.modelValue || "",
            set: newValue => {
                context.emit("update:modelValue", newValue)
            }
        }),
        message: "",
        error: false,
    });
    
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
            return allPassed;
        }
        return true;
    };
    return {
        inputRef,
        validateInput
    }
};
export default useValidate;
