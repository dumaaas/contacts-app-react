import {
    createSlice
} from "@reduxjs/toolkit";
import {
    ContactsData
} from '../helpers/FakeContactsData'

export const contactSlice = createSlice({
    name: "contacts",
    initialState: {
        value: ContactsData
    },
    reducers: {
        addContact: (state, action) => {

        }
    }
})

export default contactSlice.reducer;