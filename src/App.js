import './App.css';
import {useSelector} from "react-redux";
import {useState} from 'react'
import Sidebar from './components/sidebar/Sidebar';
import Search from './components/search/Search';
import {ContactContext} from './helpers/Contexts';
import CreateModal from './components/createModal/CreateModal';
import ContactsTable from './components/contactsTable/ContactsTable';
import DeleteContactModal from './components/deleteContactModal/DeleteContactModal';
import CreateContact from './components/createContact/CreateContact';
import BlackOverlay from './components/blackOverlay/BlackOverlay';
import Toast from './components/toast/Toast';

function App() {
  // every data from contact list
  const contactList = useSelector((state) => state.contacts.value);
  // every data from label list
  const labelList = useSelector((state) => state.labels.value);

  // state toggler for modal label
  const [showModal, setShowModal] = useState(false);
  // state for changing dashboard screen, default is 'contactList' which shows <ContactTable/>
  const [dashboardScreen, setDashboardScreen] = useState('contactList');
  // state toggler for delete contact modal
  const [showDeleteContactModal, setShowDeleteContactModal] = useState(false);
  // state for success toast
  const [showSuccessToast, setShowSuccessToast] = useState(false); 
  // state for toast msg
  const [successToastMsg, setSuccessToastMsg] = useState('');
  // state for contactId
  const [contactId, setContactId] = useState(0);
  // state for search query
  const [searchQuery, setSearchQuery] = useState('');
  // state for favorites query
  const [favoritesQuery, setFavoritesQuery] = useState(false);
  // state for label query
  const [labelQuery, setLabelQuery] = useState('');

  // we use ContactContext so we can manipulate with states from App component in all others components
  return (
    <div className="App">
      <ContactContext.Provider value={{showModal, setShowModal, dashboardScreen, setDashboardScreen, showDeleteContactModal, setShowDeleteContactModal, labelQuery, setLabelQuery, searchQuery, setSearchQuery, favoritesQuery, setFavoritesQuery, contactId, setContactId, showSuccessToast, setShowSuccessToast, successToastMsg, setSuccessToastMsg}}>
        {/* Main | Start */}
        <div className="Main ">
          {/* Sidebar | Start */}
          <Sidebar contactList={contactList} labelList={labelList}/>
          {/* Sidebar | End */}
          {/* Dashboard | Start */}
          <div className="overflow-x-auto Dashboard-main flex flex-col px-[32px] pb-[26px] gap-[24px] ml-[255px] relative z-30">
            {/* Search | Start */}
            <Search/>
            {/* Search | End */}
            {/* Two Main screens which shows in dashboard with condition | START */}
              {/* Contacts | Start */}
              {dashboardScreen === 'contactList' && <ContactsTable contactList={contactList} searchQuery={searchQuery} favoritesQuery={favoritesQuery} labelQuery={labelQuery}/> }
              {/* Contacts | End */}
              {/* Create Contact | Start */}
              {dashboardScreen === 'createContact' && <CreateContact labelList={labelList} contactList={contactList} />}
              {/* Create Contact | End */}
            {/* Two Main screens which shows in dashboard with condition | END */}
          </div>
          {/* Dashboard | End */}
        </div>
        {/* Main | End */}
        {/* Create Label Modal | Start */}
        <CreateModal labelList={labelList}/>
        {/* Create Label Modal | End */}
        {/* Delete Contact Modal | Start */}
        <DeleteContactModal contactId={contactId} />
        {/* Delete Contact Modal | End */}
        {/* Black Overlay | Start */}
        <BlackOverlay />
        {/* Black Overlay | End */}
        {/* Toast for Success Label | Start */}
        <Toast msg={successToastMsg} showSuccessToast={showSuccessToast} />
        {/* Toast for Success Label | End */}
      </ContactContext.Provider>
    </div>
  );
}

export default App;
