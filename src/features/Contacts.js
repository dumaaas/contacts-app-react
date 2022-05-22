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
            state.value.push(action.payload);
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
        // update contact data
        updateContact: (state, action) => {
            state.value.map((contact) => {
                if(contact.id === action.payload.id) {
                    contact.name = action.payload.name;
                    contact.email = action.payload.email;
                    contact.phone = action.payload.phone;
                    contact.isFavorite = action.payload.isFavorite;
                    contact.label = action.payload.label;
                    contact.avatar = action.payload.avatar;
                }
            })
        }
    }
})

export const { addContact, deleteContact, addOrRemoveFromFavorites, updateContact } = contactSlice.actions;
export default contactSlice.reducer;