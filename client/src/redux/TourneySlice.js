import { createSlice } from '@reduxjs/toolkit';

const tourneySlice = createSlice({
  name: "tourney",
  initialState: {
    allTourneys: [],
    selectedTourney: null
  },

  reducers: {
    setTourneys: (state, action) => {
      state.allTourneys = action.payload;
    },

    setSelectedTourney: (state, action) => {
      state.selectedTourney = action.payload;
    }
  }

});


export const { setTourneys, setSelectedTourney } = tourneySlice.actions;
export default tourneySlice.reducer;
