import { getRequest } from "../../api/api";
import { getInitVillaForm } from "../../constants/form.const";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getTodos = createAsyncThunk(
  "todos/getAll",
  async (_, thunkApi) => {
    const { fulfillWithValue, rejectWithValue } = thunkApi;
    const { status, result, error } = await getRequest("/allVillas");

    return error
      ? rejectWithValue(`Cannot get todos - Error status ${status} - ${error}`)
      : fulfillWithValue(result);
  }
);

export const villaBooking = createAsyncThunk(
  "villa/booking",
  async (form, thunkApi) => {
    const { fulfillWithValue, rejectWithValue } = thunkApi;

    console.log(formatBooking(form));

    // const { status, result, error } = await getRequest("/allVillas");
    // return error
    //   ? rejectWithValue(`Cannot get todos - Error status ${status} - ${error}`)
    //   : fulfillWithValue(result);
  }
);

const formatBooking = (form) => {
  return {
    ...form,
    villa: `${form.villa}`,
    gender: form.gender === "male" ? 1 : 2,
    numberOfAdult: parseFloat(form.numberOfAdult),
    numberOfChild: parseFloat(form.numberOfChild),
  };
};

const villaFormSlice = createSlice({
  name: "villa-form",
  initialState: getInitVillaForm(),
  reducers: {
    villaFormUpdate: (state, action) => {
      const { key, value } = action.payload;
      return { ...state, [key]: value };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.fulfilled, (state, action) => {
        console.log(action);
      })
      .addCase(getTodos.rejected, (state, action) => {
        console.log(action);
      })
      .addCase(getTodos.pending, (state, action) => {
        console.log(action);
      });
  },
});

export const { villaFormUpdate } = villaFormSlice.actions;
export default villaFormSlice.reducer;
