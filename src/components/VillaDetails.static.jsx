import React from "react";
import { useDispatch, useSelector } from "react-redux";
import villasData from "../data/villas.data.json";
import { increment, decrement } from "../redux/counter/counter.slice";

const VillaDetails = ({ data }) => {
  const dispatch = useDispatch();

  const counter = useSelector((store) => store.counterReducer.value);

  const villa = villasData.find((v) => v.id === data.id);

  const handleDecrement = () => {
    dispatch(decrement());
  };

  const handleIncrement = () => {
    dispatch(increment());
  };

  React.useEffect(() => {
    console.log(data);
    console.log(villasData);
  }, []);

  return (
    <>
      <div className="villa-detail">
        <h1>{villa.name}</h1>
      </div>

      <button type="button" onClick={handleIncrement}>
        increment
      </button>
      <button type="button" onClick={handleDecrement}>
        decrement
      </button>

      <div>
        <p>counter value : {counter}</p>
      </div>
    </>
  );
};

export default VillaDetails;
