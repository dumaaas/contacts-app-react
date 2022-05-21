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
        // add new contact action
        addContact: (state, action) => {

        },
        // delete contact action
        deleteContact: (state, action) => {
            state.value = state.value.filter((contact) => contact.id !== action.payload.id); 
        },
        // add or remove contact from favorites
        addOrRemoveFromFavorites: (state, action) => {
            state.value.map((contact) => {
                if(contact.id === action.payload.id) {
                    contact.isFavorite = action.payload.isFavorite;
                }
            })
        },
    }
})

export const { deleteContact, addOrRemoveFromFavorites, filterContacts } = contactSlice.actions;
export default contactSlice.reducer;