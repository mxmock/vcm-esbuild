const getToday = () => {
  const date = new Date();
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()].reduce((toBuild, val, index) => {
    const value = val < 10 ? `0${val}` : `${val}`;
    return (toBuild += !index ? value : `-${value}`);
  }, "");
};

export default getToday;
