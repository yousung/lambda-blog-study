export const notFoundError = (statusCode: number = 404) :{statusCode: number}  => {
    return {
        statusCode,
    }
};

export const dataSuccess = (data: any, statusCode: number = 200) :{data: any, statusCode: number}  => {
    return {
        data,
        statusCode,
    }
};
export const success = (statusCode: number = 200) :{statusCode: number}  => {
    return {
        statusCode,
    }
};

export interface ResultStatus {
    data?: any;
    statusCode: number;
}