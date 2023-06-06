import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const postContacts = createAsyncThunk('contacts/contact', async creditials => {
  try {
    const { data } = await axios.post('/contacts', creditials);
    return data;
  } catch (error) {}
});

const getContacts = createAsyncThunk('contacts/contacts', async () => {
  try {
    const { data } = await axios.get('/contacts');
    return data;
  } catch (error) {}
});

const deleteContacts = createAsyncThunk('contacts/delete', async contactId => {
  try {
    await axios.delete(`/contacts/${contactId}`);
    return contactId;
  } catch (error) {}
});

const updateContact = createAsyncThunk(
  'contacts/patch',
  async ({ id, update }) => {
    try {
      const { data } = await axios.patch(`/contacts/${id}`, update);
      return data;
    } catch (error) {}
  }
);

export const contactsOperations = {
  postContacts,
  getContacts,
  deleteContacts,
  updateContact,
};
