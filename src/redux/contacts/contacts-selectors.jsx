const getContactsAll = state => state.contacts.items;
const onModal = state => state.contacts.openModal;

const contactsSelectors = { getContactsAll, onModal };
export default contactsSelectors;
