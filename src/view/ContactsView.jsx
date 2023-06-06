import React from 'react';
import { useState, useEffect } from 'react';
import FormCreateContacts from 'components/Contacts/FormCreateContacts';
import ContactsFilter from '../components/Contacts/ContactsFilter';
import ContactsList from '../components/Contacts/ContactsList';
import { contactsOperations } from 'redux/contacts/contacts-operations';
import { useDispatch } from 'react-redux';
import ModalEdit from 'components/Contacts/ModalEdit/ModalEdit';

const ContactsView = () => {
  const [filter, setFilter] = useState('');

  const dispatch = useDispatch();
  const onFilter = e => setFilter(e.target.value);

  useEffect(() => {
    return () => {
      dispatch(contactsOperations.getContacts());
    };
  }, [dispatch]);

  return (
    <div>
      <FormCreateContacts />
      <ContactsFilter onFilter={onFilter} />
      <ContactsList filter={filter} />
      <ModalEdit />
    </div>
  );
};

export default ContactsView;
