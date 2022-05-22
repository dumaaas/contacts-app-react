import './BlackOverlay.css';
import {useContext, useState} from 'react'
import { ContactContext } from '../../helpers/Contexts';

// this component is used to show black overlay when modals are opened
// also if we click on black overlay we can close modals
const BlackOverlay = () => {
    // states we use from our contact context
    const {showModal, setShowModal} = useContext(ContactContext);
    const {showDeleteContactModal, setShowDeleteContactModal} = useContext(ContactContext);
    return (
        <div onClick={() => {setShowModal(false); setShowDeleteContactModal(false);}} className={`${showModal || showDeleteContactModal ? 'block' : 'hidden'} transition-all duration-200 absolute top-0 left-0 z-40 w-screen h-screen bg-black Black-overlay bg-opacity-70`}></div>
    )
}

export default BlackOverlay;