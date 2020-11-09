interface CondiTionProps {
    format?: Array<string>;
    size?: number;
}
type ErrorType = "size" | "format" | null;

import { ColumnProps, AvatarType, UserProps } from "../store";
export function generateFitUrl(data: AvatarType, width: number | string, height: number | string, format = ["m_pad"]) {
    if (data && data.url) {
        const formatStr = format.reduce((prev, current) => {
            return current + "," + prev;
        })
        data.tacitlyUrl = data.url + `?x-oss-process=image/resize,${formatStr}h_${height},w_${width}`;
    }
}

export function addColumnAvatar(data: ColumnProps | UserProps, width: number, height: number) {
    console.log(data)
    if (data.avatar) {
        generateFitUrl(data.avatar, width, height)
    } else {
        const parseCol = data as ColumnProps;
        data.avatar = {
            tacitlyUrl: require(parseCol.title ? "../assets/column.jpg" : "../assets/avatar.jpg")
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