import {createSlice} from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: 'bet',
    initialState: {
        totalYes: 0,
        totalNo: 0
    },
    reducers: {
        calculateCoefficient(state, action) {

        }
    }
});

export const {calculateCoefficient} = todoSlice.actions;
export default todoSlice.reducer;