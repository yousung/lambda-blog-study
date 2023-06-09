export const notFoundError = (statusCode = 404): { statusCode: number } => {
    return {
        statusCode,
    }
};

export const dataSuccess = (data: any, statusCode = 200): { body: any, statusCode: number } => {
    return {
        body: JSON.stringify(data),
        statusCode,
    }
};
export const success = (statusCode = 200): { statusCode: number } => {
    return {
        statusCode,
    }
};

export interface ResultStatus {
    body?: any;
    statusCode: number;
}