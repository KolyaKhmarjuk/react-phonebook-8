import { createSlice } from '@reduxjs/toolkit';
import { contactsOperations } from './contacts-operations';
import { authOperations } from 'redux/auth/auth-operations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    openModal: false,
    idItemEdit: [],
  },
  reducers: {
    onModal: (state, action) => {
      state.idItemEdit = action.payload;
      state.openModal = true;
    },
    closeModal: (state, _) => {
      state.openModal = false;
      state.idItemEdit = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(contactsOperations.postContacts.pending, handlePending);
    builder.addCase(
      contactsOperations.postContacts.fulfilled,
      (state, action) => {
        state.items = [...state.items, action.payload];
        state.isLoading = false;
        state.error = null;
      }
    );
    builder.addCase(contactsOperations.postContacts.rejected, handleRejected);

    builder.addCase(contactsOperations.getContacts.pending, handlePending);
    builder.addCase(
      contactsOperations.getContacts.fulfilled,
      (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
        state.error = null;
      }
    );
    builder.addCase(contactsOperations.getContacts.rejected, handleRejected);

    builder.addCase(contactsOperations.deleteContacts.pending, handlePending);
    builder.addCase(
      contactsOperations.deleteContacts.fulfilled,
      (state, action) => {
        state.items = state.items.filter(({ id }) => id !== action.payload);
        state.isLoading = false;
        state.error = null;
      }
    );
    builder.addCase(contactsOperations.deleteContacts.rejected, handleRejected);

    builder.addCase(authOperations.logOut.fulfilled, state => {
      state.items = [];
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(
      contactsOperations.updateContact.fulfilled,
      (state, action) => {
        const idx = state.items.findIndex(
          item => item.id === action.payload.id
        );
        state.items[idx] = action.payload;
        state.openModal = false;
      }
    );
  },
});

export const { onModal, closeModal } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
