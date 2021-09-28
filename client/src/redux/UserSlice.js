import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: "user",
  initialState: {
    user_id: null,
    first_name: "Charicha",
    last_name: "Gaming",
    gaming_name: "charicha_gaming",
    email: "charichagaming@gmail.com",
    dob: null,
  },

  reducers: {
    updateUser: (state, action) => {
      state.user_id = action.payload.user_id;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.gaming_name = action.payload.gaming_name;
      state.email = action.payload.email;
      state.dob = action.payload.dob;
    },
    
  }
  
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
