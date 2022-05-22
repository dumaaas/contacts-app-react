import './ContactsTable.css';
import {useDispatch} from "react-redux";
import {useContext} from 'react';
import {ContactContext} from '../../helpers/Contexts';
import {addOrRemoveFromFavorites} from '../../features/Contacts';

const ContactsTable = (props) => {
    // we need dispatch in every component where we use action
    const dispatch = useDispatch();

    // states we use from our ContractContext
    const {setDashboardScreen} = useContext(ContactContext);
    const {setShowDeleteContactModal} = useContext(ContactContext);
    const {favoritesQuery} = useContext(ContactContext);
    const {labelQuery} = useContext(ContactContext);
    const {searchQuery} = useContext(ContactContext);
    const {setContactId} = useContext(ContactContext);
    const {setSuccessToastMsg} = useContext(ContactContext);
    const {setShowSuccessToast} = useContext(ContactContext);

    // function for adding or removing contact from list of favorites
    const favContact = ((contact) => {
        // we add or remove contact from favorites
        dispatch(addOrRemoveFromFavorites({id: contact.id, isFavorite: !contact.isFavorite}));
        // differenct toast msg in case of different actions
        var toastMsg = !contact.isFavorite ? 'Contact added to favorites' : 'Contact removed from favorites';
        // after that we show success msg
        setShowSuccessToast(true);
        // we set toast msg
        setSuccessToastMsg(toastMsg)
        // hide toast
        setTimeout(() => {
        setShowSuccessToast(false);
        }, 2000);
    })

    // filter through contacts 
    const filterContacts = (() => {
        var array;
        // filter contacts through search filter (if search is empty, then we show all contacts)
        array = props.contactList.filter((item) => item.name.includes(searchQuery) || item.email.includes(searchQuery) || item.phone.includes(searchQuery));
        // in case we want to show favorite contacts, we keep filtering array and find only contacts that have true value for isFavorite
        if(favoritesQuery) {
            array = array.filter((item) => item.isFavorite)
        }
        // in case labelQuery is not empty, we keep filtering array and find only contacts that matches label value
        if(labelQuery.length) {
        array = array.filter((item) => item.label === labelQuery);
        }
        // finally we return array
        return array;
    })

    return (
        <div >
              {/* Contacts Title | Start */}
              <div className="pb-[16px]">
                  <h1 className="text-lg font-semibold text-gray-900">Contacts</h1>
              </div>
              {/* Contacts Title | End */}
              {/* Contacts Table | Start */}
              <div className={`${filterContacts().length ? 'flex' : 'hidden'}`}>
                  <table className="w-full border border-collapse table-auto">
                    {/* Contacts Table Head | Start */}
                    <thead>
                      <tr className="text-xs font-medium text-left text-gray-500 bg-gray-50">
                        <th className="border border-gray-200  w-[300px] px-[24px] py-[12px]">NAME</th>
                        <th className="border border-gray-200  w-[318px] px-[24px] py-[12px]">EMAIL</th>
                        <th className="border border-gray-200 w-[220px] px-[24px] py-[12px]">PHONE NUMBER</th>
                        <th className="border border-gray-200 w-[200px] px-[24px] py-[12px]"></th>
                      </tr>
                    </thead>
                    {/* Contacts Table Head | End */}
                    {/* Contacts Table Body | Start */}
                    <tbody>
                      {filterContacts().map((contact) => {
                        return <tr key={contact.id} className="border-b-[1px] border-b-gray-200 hover:bg-gray-50">
                                <td className=" px-[24px] py-[16px] font-medium text-sm text-gray-900 flex gap-[16px] items-center">
                                  <img className="w-[40px] h-[40px] rounded-full" src={contact.avatar} alt=""/>
                                  {contact.name}
                                </td>
                                <td className="px-[24px] py-[16px] text-gray-500 text-sm">
                                  {contact.email}
                                </td>
                                <td className="px-[24px] py-[16px] text-gray-500 text-sm">
                                  {contact.phone}
                                </td>
                                {/* Contact Actions | Start */}
                                <td className="inline-flex px-[24px] py-[16px] gap-[16px] mt-[-33px] items-center">
                                  {/* Contact Favorite | Start */}
                                  <div className='cursor-pointer Star group' onClick={() => {favContact(contact)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none" className={`${contact.isFavorite ? 'fill-gray-400' : ''} group-hover:fill-gray-400`}>
                                      <path d="M8.04896 1.92664C8.34833 1.00537 9.65167 1.00538 9.95104 1.92664L11.0208 5.21864C11.1547 5.63063 11.5386 5.90957 11.9718 5.90958L15.4333 5.90971C16.402 5.90975 16.8047 7.1493 16.0211 7.71871L13.2208 9.75341C12.8703 10.008 12.7237 10.4594 12.8575 10.8714L13.927 14.1635C14.2263 15.0847 13.1719 15.8508 12.3882 15.2815L9.58775 13.247C9.23728 12.9924 8.76272 12.9924 8.41225 13.247L5.61179 15.2815C4.82809 15.8508 3.77367 15.0847 4.07297 14.1635L5.14249 10.8714C5.27634 10.4594 5.1297 10.008 4.77924 9.75341L1.97894 7.71871C1.19528 7.1493 1.59804 5.90975 2.56672 5.90971L6.02818 5.90958C6.46137 5.90957 6.8453 5.63063 6.97918 5.21864L8.04896 1.92664Z" stroke="#9CA3AF" strokeWidth="2"/>
                                    </svg>
                                  </div>
                                  {/* Contact Favorite | End */}
                                  {/* Contact Delete | Start */}
                                  <div className="cursor-pointer Trash group" onClick={() => {setContactId(contact.id); setShowDeleteContactModal(true)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none" className="group-hover:fill-gray-400">
                                      <path d="M13.8333 4.83333L13.1105 14.9521C13.0482 15.8243 12.3225 16.5 11.4481 16.5H4.55184C3.67745 16.5 2.95171 15.8243 2.88941 14.9521L2.16665 4.83333M6.33331 8.16667V13.1667M9.66665 8.16667V13.1667M10.5 4.83333V2.33333C10.5 1.8731 10.1269 1.5 9.66665 1.5H6.33331C5.87308 1.5 5.49998 1.8731 5.49998 2.33333V4.83333M1.33331 4.83333H14.6666" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  </div>
                                  {/* Contact Delete | End */}
                                  {/* Contact Edit | Start */}
                                  <div className="cursor-pointer Edit group" onClick={() => {setDashboardScreen('createContact'); setContactId(contact.id);}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" className="group-hover:stroke-gray-400">
                                      <path d="M15.8898 2.11019L16.5969 1.40309V1.40309L15.8898 2.11019ZM4.41673 16.5296V17.5296C4.68194 17.5296 4.9363 17.4242 5.12383 17.2367L4.41673 16.5296ZM1.50006 16.5296H0.500061C0.500061 17.0819 0.947776 17.5296 1.50006 17.5296L1.50006 16.5296ZM1.50006 13.5537L0.792954 12.8466C0.605418 13.0341 0.500061 13.2885 0.500061 13.5537H1.50006ZM13.6507 2.8173C14.0737 2.39423 14.7596 2.39423 15.1827 2.8173L16.5969 1.40309C15.3928 0.198971 13.4406 0.198971 12.2364 1.40309L13.6507 2.8173ZM15.1827 2.8173C15.6058 3.24037 15.6058 3.9263 15.1827 4.34937L16.5969 5.76358C17.801 4.55946 17.801 2.6072 16.5969 1.40309L15.1827 2.8173ZM15.1827 4.34937L3.70962 15.8225L5.12383 17.2367L16.5969 5.76358L15.1827 4.34937ZM4.41673 15.5296H1.50006V17.5296H4.41673V15.5296ZM12.2364 1.40309L0.792954 12.8466L2.20717 14.2608L13.6507 2.8173L12.2364 1.40309ZM0.500061 13.5537V16.5296H2.50006V13.5537H0.500061ZM10.9864 4.0673L13.9327 7.01358L15.3469 5.59937L12.4007 2.65309L10.9864 4.0673Z" fill="#9CA3AF"/>
                                    </svg>
                                  </div>    
                                  {/* Contact Edit | Start */}
                                </td>
                                {/* Contact Actions | End */}
                              </tr>
                      })}
                    </tbody>
                    {/* Contacts Table Body | End */}
                  </table>
              </div>
              <div className={`${!filterContacts().length ? 'flex' : 'hidden'}`}>
                  <p className="px-[12px] py-[9px] bg-red-100 text-red-600 rounded-[8px]">No results found</p>
              </div>
              {/* Contacts Table | End */}
            </div>
    )
}

export default ContactsTable;