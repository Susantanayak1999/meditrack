import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  status: 'Admitted' | 'Discharged' | 'Critical';
  doctor: string;
}

interface PatientState {
  list: Patient[];
}

const initialState: PatientState = {
  list: [
    { id: 'P-1001', name: 'John Doe', age: 45, gender: 'Male', status: 'Admitted', doctor: 'Dr. Smith' },
    { id: 'P-1002', name: 'Jane Roe', age: 32, gender: 'Female', status: 'Discharged', doctor: 'Dr. Adams' },
    { id: 'P-1003', name: 'Michael Johnson', age: 58, gender: 'Male', status: 'Critical', doctor: 'Dr. Smith' },
    { id: 'P-1004', name: 'Emily Davis', age: 27, gender: 'Female', status: 'Admitted', doctor: 'Dr. Lee' },
    { id: 'P-1005', name: 'William Brown', age: 61, gender: 'Male', status: 'Discharged', doctor: 'Dr. Adams' },
  ],
};

const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    addPatient: (state, action: PayloadAction<Patient>) => {
      state.list.unshift(action.payload); // Adds to the top of the table
    },
  },
});

export const { addPatient } = patientSlice.actions;
export default patientSlice.reducer;