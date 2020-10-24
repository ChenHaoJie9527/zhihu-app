import { reactive, SetupContext } from "vue";
interface PasswordProps {
    val: string;
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
    modeValue?: string;
    tag?: string;
}
type passwordType = Readonly<P1>;
type passwordContextType = SetupContext<Record<string, any>>;
const useValidatePassword = (props: passwordType, context: passwordContextType) => {
    const password = /^\d{6}$/; // 最少6位 包括至少1个大写字母 1个小写字母 1个数字 1个特殊字符 如Kd@chj183
    const passwordRef = reactive<PasswordProps>({
        val: props.modeValue || "",
        message: "",
        error: false
    });
    const passwordUpdate = (e: KeyboardEvent) => {
        const targetValue = (e.target as HTMLInputElement).value;
        passwordRef.val = targetValue;
        context.emit("update:modelValue", targetValue);
    };
    const validatePassword = () => {
        if (props.rules) {
            const allpassword = props.rules.every(item => {
                let passw= true;
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
        passwordUpdate,
        validatePassword
    }
};
export default useValidatePassword;