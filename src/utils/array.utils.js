const isArray = (arr) => Array.isArray(arr);
const arrayEmpty = (arr) => isArray(arr) && !arr.length;
const arrayFilled = (arr) => isArray(arr) && !!arr.length;

export { isArray, arrayEmpty, arrayFilled };
