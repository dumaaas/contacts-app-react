import {
    createSlice
} from "@reduxjs/toolkit";
import {
    LabelsData
} from '../helpers/FakeLabelsData'

export const labelSlice = createSlice({
    name: "labels",
    initialState: {
        value: LabelsData
    },
    reducers: {
        // add new label
        addLabel: (state, action) => {
            state.value.push(action.payload);
        }
    }
})

export const {addLabel} = labelSlice.actions;
export default labelSlice.reducer;