
export const getErrorObject = (id, errorInstance) => {
    const keyArray = id
        .replaceAll('.', ',')
        .replaceAll('[', ',')
        .replaceAll(']', '')
        .split(',');
    let errorObj = errorInstance;
    keyArray.forEach((key) => {
        errorObj = errorObj?.[key];
    });
    return errorObj;
};