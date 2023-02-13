import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counter.slice";
import villaFormReducer from "./villa-form/villa-form.slice";

module.exports = configureStore({
  reducer: {
    counterReducer,
    villaFormReducer,
  },
});
