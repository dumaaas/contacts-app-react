import './CreateModal.css';
import {useContext, useState} from 'react';
import {useDispatch} from "react-redux";
import { ContactContext } from '../../helpers/Contexts';
import {addLabel} from '../../features/Labels';


const CreateModal = (props) => {
  // we need dispatch in every component where we use action
  const dispatch = useDispatch();
  
  // states we use from our ContactContext
  const {showModal, setShowModal} = useContext(ContactContext);
  const {setShowSuccessToast} = useContext(ContactContext);
  const {setSuccessToastMsg} = useContext(ContactContext);

  // state for label name and validation
  const [labelName, setLabelName] = useState("");
  const [labelValidation, setLabelValidation] = useState('');

   // function for submiting label when we are creating one
   const submitLabel = (() => {
    // if label input is empty show validation msg
    if(!labelName.length) {
      setLabelValidation('This field is required!'); return;
    } 

    // if label input is longer than 15 characters we show validation msg and return from function
    if(labelName.length > 15) {
      setLabelValidation('Label name is too long (maximum is 15 characters)'); return;
    }

    // flag to check if label already exist
    let alreadyExist = false; 

    // go through label list and if we get to element with same name as label from input, we set flag to true so we can show validation msg
    props.labelList.every((item) => {
      if(item.name === labelName) {
        alreadyExist = !alreadyExist;
        return false;
      }
      return true;
    })

    // if flag is true, we show validation msg and return from function
    if(alreadyExist) {
      setLabelValidation('Label with this name already exist!');
      return;
    }

    // we add new element to the store
    dispatch(addLabel({name: labelName}));
    
    // after we added new element hide modal and clear input
    setLabelName("");
    setShowModal(false);
    
    // finally, we show success msg in toast for 2 seconds and after that we hide toast again
    setShowSuccessToast(true);
    setSuccessToastMsg('Label was successfully added')
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 2000);
  })
  
    return (
        <div className={`${showModal ? 'opacity-1 left-[50%] z-50' : 'opacity-0 left-[46%] z-10'} transition-all duration-200 mx-[16px] Label-modal absolute top-[32%] transform translate-x-[-50%] translate-y-[50%] sm:w-[512px] w-[320px]  bg-white shadow-modal p-[24px] rounded-[8px]`}>
          {/* Modal Title | Start */}
          <div className="">
              <p className="text-base font-medium text-gray-900">
                Create label
              </p>
          </div>
          {/* Modal Title | Start */}
          {/* Modal Input | Start */}
          <div className="py-[16px]">
              <input value={labelName} className={`${labelValidation.length ? 'border-red-600' : 'border-gray-300'} "transition-all duration-200 outline-none border py-[9px] px-[13px] rounded-[6px] w-full`} onChange={(event) => {setLabelName(event.target.value); setLabelValidation('')}} type="text" />
              <span className={`${labelValidation.length ? 'opacity-1' : 'opacity-0'} transform transition-all duration-200 text-xs text-red-600`}>{labelValidation}</span>
          </div>
          {/* Modal Input | End */}
          {/* Modal Buttons | Start */}
          <div className="flex justify-end gap-[12px]">
            <button onClick={() => {setShowModal(false); setLabelValidation(''); setLabelName('')}} className="py-[9px] px-[17px] text-sm font-medium text-gray-700 border border-gray-300 rounded-[6px] shadow-button bg-whit hover:border-gray-700 transition-all duration-150">Cancel</button>
            <button onClick={() => {submitLabel()}} className="py-[9px] px-[17px] text-sm font-medium text-white border border-transparent rounded-[6px] shadow-button bg-indigo hover:bg-white hover:text-indigo hover:border-indigo transition-all duration-150">Save</button>
          </div>  
          {/* Modal Buttons | End */}
        </div>
    )
}

export default CreateModal;