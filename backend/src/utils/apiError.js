export const apiError = (statusCode, message, errors = null) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    error.errors = errors;
    error.isOperational = true;
    Error.captureStackTrace(error, apiError);
    return error;
};

export default apiError;