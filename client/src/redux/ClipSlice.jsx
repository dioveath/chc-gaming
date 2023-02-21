import { createSlice } from '@reduxjs/toolkit';

const clipSlice = createSlice({
  name: "clip",
  initialState: {
    allClips: { clips: [], pagination: []},
    isPending: false,
    isError: false,
    errorMessages: [],
  },

  reducers: {
    setClips: (state, action) => {
      state.allClips = action.payload;
      state.isPending = false;
      state.isError = false;
    },

    addClip: (state, action) => {
      state.allClips.push(action.payload);
      state.isPending = false;
      state.isError = false;      
    },

    updateClip: (state, action) => {
      const filtered = state.allClips.filter(t => t.id !== action.payload.id);
      filtered.push(action.payload);

      state.allClips = filtered;
      state.isPending = false;
      state.isError = false;
    },

    removeClip: (state, action) => {
      const filtered = state.allClips.filter(t => t.id !== action.payload.id);      

      state.allClips = filtered;
      state.isPending = false;
      state.isError = false;      
    },

    pending: (state, _action) => {
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
  setClips,
  addClip,
  updateClip,
  removeClip,
  pending,
  error,
} = clipSlice.actions;

export default clipSlice.reducer;
