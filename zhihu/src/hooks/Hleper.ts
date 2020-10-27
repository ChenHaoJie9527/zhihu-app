interface CondiTionProps {
    format?: Array<string>;
    size?: number;
}
export type ErrorType = "size" | "format" | null;
export function beforUploadCheck(file: File, condition: CondiTionProps) {
    const { format, size } = condition;
    const isValidaFormat = format ? format.includes(file.type) : true;
    const fileSize = (file.size / 1024 / 1024);
    const isValidaSize = size ? (fileSize < size) : true;
    let error: ErrorType = null;
    if(!isValidaFormat){
        error = "format";
    }
    if(!isValidaSize){
        error = "size";
    }
    return {
        passed: isValidaFormat && isValidaSize,
        error
    }
}