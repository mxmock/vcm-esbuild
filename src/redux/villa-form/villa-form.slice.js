import { postRequest } from "../../api/api";
import { getInitVillaForm } from "../../constants/form.const";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const villaBooking = createAsyncThunk("villa/booking", async (form, thunkApi) => {
  const { fulfillWithValue, rejectWithValue } = thunkApi;

  const { status, result, error } = await postRequest("/addBookingRequest", formatBooking(form));
  return !!error
    ? rejectWithValue(`Cannot post villa booking form - Error status ${status} - ${error}`)
    : fulfillWithValue(result);
});

const formatBooking = (form) => ({
  ...form,
  villa: `${form.villa}`,
  gender: form.gender === "male" ? 1 : 2,
  numberOfAdult: parseFloat(form.numberOfAdult),
  numberOfChild: parseFloat(form.numberOfChild),
});

const villaFormSlice = createSlice({
  name: "villa-form",
  initialState: getInitVillaForm(),
  reducers: {
    villaFormUpdate: (state, action) => {
      const { key, value } = action.payload;
      return { ...state, [key]: value };
    },
    resetForm: (state, action) => ({ ...getInitVillaForm() }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(villaBooking.fulfilled, (state, action) => {
        console.log("success");
        return { ...getInitVillaForm(), success: true };
      })
      .addCase(villaBooking.rejected, (state, action) => {
        console.log("failed");
        console.log(action.payload);
        return { ...state, loading: false, success: false, error: action.payload };
      })
      .addCase(villaBooking.pending, (state, action) => {
        console.log("loading");
        return { ...state, loading: true, success: false, error: null };
      });
  },
});

export const { villaFormUpdate, resetForm } = villaFormSlice.actions;
export default villaFormSlice.reducer;
