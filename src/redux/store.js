import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counter.slice";
import carFormReducer from "./car-form/car-form.slice";
import villaFormReducer from "./villa-form/villa-form.slice";

module.exports = configureStore({
  reducer: {
    counterReducer,
    carFormReducer,
    villaFormReducer,
  },
});
