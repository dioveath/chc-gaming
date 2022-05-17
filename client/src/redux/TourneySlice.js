import { createSlice } from '@reduxjs/toolkit';

const tourneySlice = createSlice({
  name: "tourney",
  initialState: {
    allTourneys: [],
    selectedTourney: null,
    isPending: false,
    isError: false,
    errorMessages: []
  },

  reducers: {
    setTourneys: (state, action) => {
      state.allTourneys = action.payload;
      state.isPending = false;
      state.isError = false;
    },

    addTourney: (state, action) => {
      state.allTourneys.push(action.payload);
      state.isPending = false;
      state.isError = false;      
    },

    removeTourney: (state, action) => {
      // TODO: implement
      state.isPending = false;
      state.isError = false;      
    },

    setSelectedTourney: (state, action) => {
      state.selectedTourney = action.payload;
      state.isPending = false;
      state.isError = false;      
    },

    pending: (state, action) => {
      state.isPending = true;
      state.isError = false;
    },

    error: (state, action) => {
      state.isPending = false;
      state.isError = true;
      state.errorMessages = action.payload;
    }
  }

});


export const {
  setTourneys,
  setSelectedTourney,
  addTourney,
  removeTourney,
  pending,
  error
} = tourneySlice.actions;

export default tourneySlice.reducer;
