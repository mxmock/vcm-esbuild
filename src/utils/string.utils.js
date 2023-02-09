const isString = (s) => typeof s === "string";
const stringEmpty = (s) => isString(s) && !s.length;
const stringFilled = (s) => isString(s) && !!s.length;

export { isString, stringEmpty, stringFilled };
