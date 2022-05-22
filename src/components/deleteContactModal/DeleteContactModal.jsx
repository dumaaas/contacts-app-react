import './DeleteContactModal.css';
import {useContext, useState} from 'react';
import {useDispatch} from "react-redux";
import {ContactContext} from '../../helpers/Contexts';
import {deleteContact, addOrRemoveFromFavorites} from '../../features/Contacts';
import danger from '../../images/png/danger.png';

const DeleteContactModal = (props) => {
    // we need dispatch in every component where we use action
    const dispatch = useDispatch();

    // states we use from our ContactContext
    const {showDeleteContactModal, setShowDeleteContactModal} = useContext(ContactContext);
    const {setSuccessToastMsg} = useContext(ContactContext);
    const {setShowSuccessToast} = useContext(ContactContext);
    
    // function for removing contact from store
    const removeContact = ((id) => {
        // we delete contact from store
        dispatch(deleteContact({id: id}));
        // after that we show success msg
        setShowSuccessToast(true);
        setSuccessToastMsg('Contact was successfully deleted')
        setTimeout(() => {
        setShowSuccessToast(false);
        }, 2000);
        // hide delete modal
        setShowDeleteContactModal(false);
    })
    return (
        <div className={`${showDeleteContactModal ? 'opacity-1 left-[50%] z-50' : 'opacity-0 left-[46%] z-10'} transition-all duration-200 mx-[16px] Label-modal absolute top-[32%] transform translate-x-[-50%] translate-y-[50%] sm:w-[512px] w-[320px]  bg-white shadow-modal p-[24px] rounded-[8px]`}>
          {/* Modal Title | Start */}
          <div className="flex gap-[16px]">
            <div>
              <img src={danger} alt=""/>
            </div>
            <div>
              <p className="text-base font-medium text-gray-900">
                Delete contact
              </p>
              <span className="text-sm text-gray-500 pt-[8px]">
                Are you sure you want to delete this contact?
              </span> 
            </div>
          </div>
          {/* Modal Title | Start */}
          {/* Modal Buttons | Start */}
          <div className="flex justify-end gap-[12px] pt-[25px]">
            <button onClick={() => {setShowDeleteContactModal(false);}} className="py-[9px] px-[17px] text-sm font-medium text-gray-700 border border-gray-300 rounded-[6px] shadow-button bg-whit hover:border-gray-700 transition-all duration-150">Cancel</button>
            <button onClick={() => {removeContact(props.contactId)}} className="py-[9px] px-[17px] text-sm font-medium text-white border border-transparent rounded-[6px] shadow-button bg-red-600 hover:bg-white hover:text-red-600 hover:border-red-600 transition-all duration-150">Delete</button>
          </div>  
          {/* Modal Buttons | End */}
        </div>
    )
}

export default DeleteContactModal;