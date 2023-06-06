import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { contactsOperations } from 'redux/contacts/contacts-operations';
import contactsSelectors from 'redux/contacts/contacts-selectors';

import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';

const FormCreateContacts = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(contactsSelectors.getContactsAll);
  const dispatch = useDispatch();

  const handelChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handelSubmit = e => {
    e.preventDefault();

    const newContacts = {
      name,
      number,
    };

    const nameCheck = contacts.some(contact => contact.name.includes(name));

    if (nameCheck) {
      alert(`${number} is readly in contacts!`);
      return;
    }

    dispatch(contactsOperations.postContacts(newContacts));
    setName('');
    setNumber('');
  };

  return (
    <Box
      sx={{
        width: 250,
        boxShadow: 3,
        p: 2,
        mx: 'auto',
        borderRadius: '8px',
      }}
    >
      <form onSubmit={handelSubmit}>
        <TextField
          sx={{ mb: 2 }}
          fullWidth
          size="small"
          label="Name"
          type="text"
          name="name"
          value={name}
          required
          onChange={handelChange}
          color="grey"
        />

        <TextField
          fullWidth
          size="small"
          label="Number"
          type="tel"
          name="number"
          value={number}
          required
          onChange={handelChange}
          color="grey"
        />

        <Button
          sx={{
            boxShadow: 3,
            borderRadius: '8px',
            border: 0,
            mt: 2,
            display: 'flex',
            mx: 'auto',
            width: 150,
          }}
          size="small"
          color="success"
          variant="contained"
          type="submit"
        >
          Create
        </Button>
      </form>
    </Box>
  );
};

export default FormCreateContacts;
