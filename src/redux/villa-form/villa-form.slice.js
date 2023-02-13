import { createSlice } from "@reduxjs/toolkit";
import { getInitVillaForm } from "../../constants/form.const";

const villaFormSlice = createSlice({
  name: "villa-form",
  initialState: getInitVillaForm(),
  reducers: {
    villaFormUpdate: (state, action) => {
      const { key, value } = action.payload;
      return {
        ...state,
        [key]: value,
      };
    },
  },
});

export const { villaFormUpdate } = villaFormSlice.actions;
export default villaFormSlice.reducer;
