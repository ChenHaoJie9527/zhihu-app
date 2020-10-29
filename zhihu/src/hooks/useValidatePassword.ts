import { reactive, SetupContext, computed, WritableComputedRef } from "vue";
interface PasswordProps {
    val: string | WritableComputedRef<string>;
    message: string;
    error: boolean;
}
interface RuleProp {
    type: "text" | "password" | "required" | "custom";
    message: string;
    validator?: () => void;
}
type RulesPropType = RuleProp[];
interface P1 {
    rules?: RulesPropType;
    modelValue?: string;
    tag?: string;
}
type passwordType = Readonly<P1>;
type passwordContextType = SetupContext<Record<string, any>>;
const useValidatePassword = (props: passwordType, context: passwordContextType) => {
    const password = /^\d{6}$/; // 最少6位 包括至少1个大写字母 1个小写字母 1个数字 1个特殊字符 如Kd@chj183
    const passwordRef = reactive<PasswordProps>({
        val: computed({
            get: () => props.modelValue || "",
            set: newValue => {
                context.emit("update:modelValue",newValue)
            }
        }),
        message: "",
        error: false
    });
    const validatePassword = () => {
        if (props.rules) {
            const allpassword = props.rules.every(item => {
                let passw = true;
                passwordRef.message = item.message;
                switch (item.type) {
                    case "required":
                        passw = passwordRef.val.trim() !== "";
                        break;
                    case "password":
                        passw = password.test(passwordRef.val)
                        break;
                    case "custom":
                        passw = item.validator ? (item.validator() as unknown as boolean) : true;
                        break;
                    default:
                        break;
                }
                return passw;
            })
            passwordRef.error = !allpassword;
            return allpassword;
        }
        return true;
    };

    return {
        passwordRef,
        validatePassword
    }
};
export default useValidatePassword;