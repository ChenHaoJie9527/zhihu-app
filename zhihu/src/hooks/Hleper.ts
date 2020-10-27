interface CondiTionProps {
    format?: Array<string>;
    size?: number;
}
type ErrorType = "size" | "format" | null;

import { ColumnProps } from "../store";
export function generateFitUrl(column: ColumnProps, width: number, height: number) {
    if (column.avatar) {
        column.avatar.tacitlyUrl = column.avatar.url + `?x-oss-process=image/resize,m_pad,h_${height},w_${width}`;
    } else {
        column.avatar = {
            tacitlyUrl: require("../assets/column.jpg")
        }
    }
}

export function beforUploadCheck(file: File, condition: CondiTionProps) {
    const { format, size } = condition;
    const isValidaFormat = format ? format.includes(file.type) : true;
    const fileSize = (file.size / 1024 / (1024 * 5)); //不超过5MB
    
    const isValidaSize = size ? (fileSize < size) : true;
    let error: ErrorType = null;
    if (!isValidaFormat) {
        error = "format";
    }
    if (!isValidaSize) {
        error = "size";
    }
    return {
        passed: isValidaFormat && isValidaSize,
        error
    }
}