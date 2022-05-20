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
        addLabel: (state, action) => {

        }
    }
})

export default labelSlice.reducer;