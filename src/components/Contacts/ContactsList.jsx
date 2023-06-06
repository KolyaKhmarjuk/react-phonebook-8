import React from 'react';
import { useSelector } from 'react-redux';
import contactsSelectors from 'redux/contacts/contacts-selectors';
import { contactsOperations } from 'redux/contacts/contacts-operations';
import { useDispatch } from 'react-redux';
import { onModal } from 'redux/contacts/contacts-slice';

import Box from '@mui/material/Box';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ButtonGroup from '@mui/material/ButtonGroup';

const ContactsList = ({ filter }) => {
  const contacts = useSelector(contactsSelectors.getContactsAll);

  const dispatch = useDispatch();

  const filterNormalized = filter.toLowerCase();
  const getFilteredContacts = (contacts, filter) => {
    if (filter === '') {
      return contacts;
    }
    return contacts.filter(contact => contact.name.includes(filterNormalized));
  };

  const filteredContacts = getFilteredContacts(contacts, filterNormalized);

  return (
    <Box sx={{ minWidth: 250, mx: 'auto' }}>
      <List
        sx={{
          mx: 'auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(1, 1fr)',
        }}
      >
        {filteredContacts?.map(contact => (
          <ListItem
            spacing={1}
            sx={{
              boxShadow: 3,
              mx: 'auto',
              borderRadius: '8px',
              mb: 1,
              '&:hover': { backgroundColor: 'rgb(192,192,192)' },
              maxWidth: 400,
            }}
            key={contact.id}
            disableGutters
            secondaryAction={
              <ButtonGroup
                color="inherit"
                aria-label="outlined primary button group"
              >
                <IconButton
                  sx={{}}
                  aria-label="edit"
                  onClick={() => dispatch(onModal(contact))}
                >
                  <EditRoundedIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() =>
                    dispatch(contactsOperations.deleteContacts(contact.id))
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </ButtonGroup>
            }
          >
            <ListItemText
              sx={{ px: 3 }}
              primary={`${contact.name} ${contact.number}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ContactsList;
