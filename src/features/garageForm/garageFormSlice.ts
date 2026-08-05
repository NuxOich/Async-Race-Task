import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface GarageFormState {
  createName: string;
  createColor: string;
  editingCarId: number | null;
  editName: string;
  editColor: string;
}

const initialState: GarageFormState = {
  createName: '',
  createColor: '#000000',
  editingCarId: null,
  editName: '',
  editColor: '#000000',
};

const garageFormSlice = createSlice({
  name: 'garageForm',
  initialState,
  reducers: {
    setCreateName: (state, action: PayloadAction<string>) => {
      state.createName = action.payload;
    },
    setCreateColor: (state, action: PayloadAction<string>) => {
      state.createColor = action.payload;
    },
    resetCreateForm: (state) => {
      state.createName = '';
      state.createColor = '#000000';
    },
    startEditingCar: (state, action: PayloadAction<{ id: number; name: string; color: string }>) => {
      state.editingCarId = action.payload.id;
      state.editName = action.payload.name;
      state.editColor = action.payload.color;
    },
    setEditName: (state, action: PayloadAction<string>) => {
      state.editName = action.payload;
    },
    setEditColor: (state, action: PayloadAction<string>) => {
      state.editColor = action.payload;
    },
    resetEditForm: (state) => {
      state.editingCarId = null;
      state.editName = '';
      state.editColor = '#000000';
    },
  },
});


export const { setCreateName, setCreateColor, resetCreateForm, startEditingCar, setEditName, setEditColor, resetEditForm } = garageFormSlice.actions;
export default garageFormSlice.reducer;