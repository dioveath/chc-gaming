import { createSlice } from '@reduxjs/toolkit';

const defaultState = {
    data: null,
    error: null,
    isUninitialized: true,
    isLoading: false,
    isFetching: false,
    isSuccess: false,
    isError: false
};

const userSlice = createSlice({
  name: "user",
  initialState: defaultState,
  reducers: {
    updateUser: (state, action) => {
      const newState = ({ data, error, isUnitialized, isLoading, isFetching, isSuccess, isError }) =>
            ({ data, error, isUnitialized, isLoading, isFetching, isSuccess, isError })(action.payload);
      state = newState;
    },
    deleteUser: (state, _action) => {
      state = defaultState;
    }
  }
});

export const { updateUser, pending, error, deleteUser } = userSlice.actions;
export default userSlice.reducer;
