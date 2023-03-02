import { getRequest } from "../../api/api";
import { getInitCarForm } from "../../constants/form.const";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const carBooking = createAsyncThunk("car/booking", async (form, thunkApi) => {
  const { fulfillWithValue, rejectWithValue } = thunkApi;

  console.log(formatBooking(form));

  // const { status, result, error } = await getRequest("/allVillas");
  // return error
  //   ? rejectWithValue(`Cannot get todos - Error status ${status} - ${error}`)
  //   : fulfillWithValue(result);
});

const formatBooking = (form) => {
  return {
    ...form,
    car: `${form.car}`,
    gender: form.gender === "male" ? 1 : 2,
  };
};

const carFormSlice = createSlice({
  name: "car-form",
  initialState: getInitCarForm(),
  reducers: {
    carFormUpdate: (state, action) => {
      console.log(action.payload);
      const { key, value } = action.payload;
      return { ...state, [key]: value };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(carBooking.fulfilled, (state, action) => {
        console.log(action);
      })
      .addCase(carBooking.rejected, (state, action) => {
        console.log(action);
      })
      .addCase(carBooking.pending, (state, action) => {
        console.log(action);
      });
  },
});

export const { carFormUpdate } = carFormSlice.actions;
export default carFormSlice.reducer;
