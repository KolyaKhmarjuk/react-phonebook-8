import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { closeModal } from 'redux/contacts/contacts-slice';
import { contactsOperations } from 'redux/contacts/contacts-operations';

import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 250,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
  border: 0,
};

const ModalEdit = () => {
  const open = useSelector(state => state.contacts.openModal);
  const contact = useSelector(state => state.contacts.idItemEdit);
  const { id } = contact;
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    setName(contact.name || '');
    setNumber(contact.number || '');
  }, [contact.name, contact.number]);

  const handelChange = e => {
    const { name } = e.target;

    switch (name) {
      case 'name':
        setName(e.target.value);
        break;
      case 'number':
        setNumber(e.target.value);
        break;

      default:
        return;
    }
  };

  const handelSubmit = e => {
    e.preventDefault();

    const update = {
      name: name,
      number: number,
    };

    dispatch(contactsOperations.updateContact({ id, update }));
  };

  return (
    <Modal
      open={open}
      onClose={() => dispatch(closeModal())}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <IconButton
          sx={{ position: 'absolute', top: '0%', right: '0%' }}
          onClick={() => dispatch(closeModal())}
        >
          <CloseIcon />
        </IconButton>

        <form onSubmit={handelSubmit}>
          <TextField
            sx={{ boxShadow: 3, borderRadius: '8px', mb: 2, mt: 2 }}
            size="small"
            fullWidth
            type="text"
            name="name"
            value={name}
            label="Name"
            onChange={handelChange}
            color="grey"
          />

          <TextField
            sx={{ boxShadow: 3, borderRadius: '8px', mb: 2 }}
            size="small"
            fullWidth
            type="text"
            name="number"
            value={number}
            label="Number"
            onChange={handelChange}
            color="grey"
          />

          <ButtonGroup sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              sx={{ boxShadow: 3, borderRadius: '8px', border: 0, width: 100 }}
              size="small"
              color="success"
              variant="contained"
              type="submit"
              endIcon={<SaveIcon />}
            >
              Save
            </Button>

            <Button
              sx={{ boxShadow: 3, borderRadius: '8px', border: 0, width: 100 }}
              size="small"
              color="error"
              variant="contained"
              type="submit"
              endIcon={<CloseIcon />}
              onClick={() => dispatch(closeModal())}
            >
              Close
            </Button>
          </ButtonGroup>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalEdit;
