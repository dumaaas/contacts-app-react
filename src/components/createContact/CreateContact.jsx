import './CreateContact.css';
import {useContext, useState, useEffect } from 'react'
import { ContactContext } from '../../helpers/Contexts';
import {addContact, updateContact} from '../../features/Contacts';
import {useDispatch} from "react-redux";

const CreateContact = (props) => {
    // we need dispatch in every component where we use action
    const dispatch = useDispatch();

    // states we use from our ContactContext
    const {setDashboardScreen} = useContext(ContactContext);
    const {contactId} = useContext(ContactContext);
    const {setSuccessToastMsg} = useContext(ContactContext);
    const {setShowSuccessToast} = useContext(ContactContext);

    // states for contact fields and its validations
    const [contactLabel, setContactLabel] = useState('default');
    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [contactAvatar, setContactAvatar] = useState('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAASZSURBVHgB1ZprbttGEIBnV6QoWn6QaIGi/VMZSB8p2to8QZUbOCdIewInJ6h8A/cEVU+Q3KD1CaS2P4KiAawESAIjMSjJkiiRNDcztCQoelDirh72ByxErpbizM7s7OyuGCwB13UtyOhHGoND4PxLIeCQCWEBY9agjQCoMSwgor8Zy1SCoHtm23YNFGEgCQmtZXPHIEQRb4sgR5UBO1VRJrUCQ8Gj6PFoD6vCQJSDwD9Jq0gqBa7a3q/LFnwCxko7efNk4eaLNMJeL+i68RT9+BDWAI2VIOg9WMQafF6Dluc90rRsZV3CE/iugqYblWazfTSvbaIC5DLiWpRX6jKzsRhnT2O3TWCmC8UPClGC20DCuJiqAJmOtIdbBMuwn7dN84+J+vEKGrDk8xtymyTqYdBzxgf2hAKtVuecBhFI4nV70PG60O50IQzDuC6b1cHAYu3tgK5poEB1Z3vLGa34SAEVv4+iCNzGFTSarcR2e7vbYKMinM8NgNPfI8TJ3k6+NLgfKhC7jm6cgwQk/JuL9+D7wULtySJffPaprBLkSvvoSnW6Gf5CJqOXQBLq+UWFJ6gtPSOJxbXs48FNbAGV3ic/f/X6AmT4HK1g5gyQYGiF2ALY+0WQRKEn48EuydAKsQIY849Bkp7vgyztjgeycMZ+ij/JfVAF6TzH90OQJQyvQYEipfZcxX02Dcp+xAVTyzI1LQOyUDhVgWTnnPEDUCBv5kAWQ1dTgAEvcJW0gdjaMkEWy9oFFTiDAyxqClAcx6kd0kIpha7gfoSgcApLwMaeTOPP1JbyoSVgsatWR8ASiJO5ehMaV+3EdqrJ3DioQNvFj6Xl/hTbSRGa4PzgZo6gSJU3TRwvOdnUYSasifm/6jjYFLR7wZmAKtxRaLuSRxC9hDtKhPusd9oCGdwkZvFep264IAlFnx4uUPx+6QUB1onheniAhmthGswUfQxdgxwOZlonq0SjMGD78YIGQ+mfkGKHmYTGZ6CN+XwXF/EqkCKUjlCESrfgF7jAzzvxE7hQPsP8ujjvEdpxoAWMqtCj0G9RuXQbsTI0RywSajEPOr35hP6WuZ49nzUfrELwJMjVPrEtyG/NThTJfWzbrMUOSGtLdNvfJhqhH9Nuw1ss6xL+5r3XcPHuEt5duhCEkwsmPBQpk/A3133GrUD7O26jGQ/ITULWsPd2ATe0hnWD3qfrYQgYtQL5I5VNC0+QNcgSJE8MbmwNhCcmthb/e1GrdHvB2s4C0mAYeu3be4X90bqJINwJvIc4R9fhtoEyeYH3YLx6QgHn/v1aBOIJ3DIiHv1Cso3XT50Gne+/LuNctfBB28pBWZzvvnk27avEQ77Kv/+XcKZPPOJZOSj8wQ9flWZ9PfeUsvLPiyPOxe/Ycr0HHujzUcSeOD/eKyc1W+iYtfL8eYFHGcyXWAHWQzXi4cNpPj9OqoPulbsU9TrORU6Cy4yT+q8GZA24zpQw+XsEy6IvOIStU8dxUoVw6T979BUpYl5yzCS3J4WAv7CcyQg+QFqBUQbK4OUhKnTAmCh8NF5oYmSiLoBXhYiXsFUI2s9khR7lAwmyEYQS24fWAAAAAElFTkSuQmCC');
    const [contactIsFavorite, setContactIsFavorite] = useState(false);
    const [contactLabelValidation, setContactLabelValidation] = useState('');
    const [contactNameValidation, setContactNameValidation] = useState('');
    const [contactEmailValidation, setContactEmailValidation] = useState('');
    const [contactPhoneValidation, setContactPhoneValidation] = useState('');

    // useEffect which executes only when contactId change  
    // if contactId !== 0, that means we need to edit contact, so we have to find that contact from the list by id and set contact states from that object
    // if not we clearForm so when we want to create contact all fields are empty
    useEffect(() => {
        if(contactId !== 0) {
            var editContactObj = props.contactList.find(contact => contact.id === contactId);
            if(editContactObj) {
                setContactName(editContactObj.name);
                setContactEmail(editContactObj.email);
                setContactLabel(editContactObj.label);
                setContactPhone(editContactObj.phone);
                setContactIsFavorite(editContactObj.isFavorite);
                setContactAvatar(editContactObj.avatar);
            }
        } else {
            clearForm();
        }
    }, [contactId]);

    // add or update contact
    const submitContact = () => {
        // flag we use so we can know if we have validation errors
        var validationFlag = false;

        // regex so we can only enter digits for phoneNumber
        const regexNumber = /\d+/g;

        // for contactName we only check if is empty
        if(!contactName.length) {
            setContactNameValidation('This field is required');
            validationFlag = true;
        }
        // for contactEmail we check if is empty and if is email valid
        if(!contactEmail.length) {
            setContactEmailValidation('This field is required');
            validationFlag = true;
        } else if(!isValidEmail(contactEmail)) {
            setContactEmailValidation('Please enter valid email');
            validationFlag = true;
        }
        // for contactLabel we check if label is selected
        if(contactLabel == 'default') {
            setContactLabelValidation('Please select one of the options!');
            validationFlag = true;
        }
        // for contactPhone we check if is empty and if it contains only digits
        if(!contactPhone.length) {
            setContactPhoneValidation('This field is required');
            validationFlag = true;
        } else if(!contactPhone.match(regexNumber)) {
            setContactPhoneValidation('Phone can only contain digits');
            validationFlag = true;
        }

        // if we find any validation error, we return from this function
        if(validationFlag) return;

        // following code serves to find unique id when creating a new contact
        // first we get array of ids
        // after that we find highest id in list
        // and in case of creating contact we increment id by 1
        var arrayOfIds = props.contactList.map(contact => {
            return contact.id;
        })

        var highestIdInArray = Math.max(...arrayOfIds);

        // object that we create or update
        var contactObj = {
            id: contactId == 0 ? highestIdInArray+1 : contactId,
            isFavorite: contactIsFavorite,
            label: contactLabel,
            name: contactName,
            email: contactEmail,
            phone: contactPhone,
            avatar: contactAvatar,
        }

        // redux action for adding or updating contact
        contactId == 0 ? dispatch(addContact(contactObj)) : dispatch(updateContact(contactObj));
        
        // if we added contact, then we clear form
        if(contactId == 0) clearForm();

        // go to table list
        setDashboardScreen('contactList');
        
        // different toast msg for different action
        var toastMsg = contactId == 0 ? 'Contact was successfully added' : 'Contact was succesffully edited';
        
        // show success toast
        setShowSuccessToast(true);
        // set success toast msg
        setSuccessToastMsg(toastMsg)
        // hide toast after 2 seconds
        setTimeout(() => {
            setShowSuccessToast(false);
        }, 2000);
    }

    // function for clearing form
    const clearForm = () => {
        setContactName('');
        setContactEmail('');
        setContactLabel('default');
        setContactPhone('');
        setContactAvatar('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAASZSURBVHgB1ZprbttGEIBnV6QoWn6QaIGi/VMZSB8p2to8QZUbOCdIewInJ6h8A/cEVU+Q3KD1CaS2P4KiAawESAIjMSjJkiiRNDcztCQoelDirh72ByxErpbizM7s7OyuGCwB13UtyOhHGoND4PxLIeCQCWEBY9agjQCoMSwgor8Zy1SCoHtm23YNFGEgCQmtZXPHIEQRb4sgR5UBO1VRJrUCQ8Gj6PFoD6vCQJSDwD9Jq0gqBa7a3q/LFnwCxko7efNk4eaLNMJeL+i68RT9+BDWAI2VIOg9WMQafF6Dluc90rRsZV3CE/iugqYblWazfTSvbaIC5DLiWpRX6jKzsRhnT2O3TWCmC8UPClGC20DCuJiqAJmOtIdbBMuwn7dN84+J+vEKGrDk8xtymyTqYdBzxgf2hAKtVuecBhFI4nV70PG60O50IQzDuC6b1cHAYu3tgK5poEB1Z3vLGa34SAEVv4+iCNzGFTSarcR2e7vbYKMinM8NgNPfI8TJ3k6+NLgfKhC7jm6cgwQk/JuL9+D7wULtySJffPaprBLkSvvoSnW6Gf5CJqOXQBLq+UWFJ6gtPSOJxbXs48FNbAGV3ic/f/X6AmT4HK1g5gyQYGiF2ALY+0WQRKEn48EuydAKsQIY849Bkp7vgyztjgeycMZ+ij/JfVAF6TzH90OQJQyvQYEipfZcxX02Dcp+xAVTyzI1LQOyUDhVgWTnnPEDUCBv5kAWQ1dTgAEvcJW0gdjaMkEWy9oFFTiDAyxqClAcx6kd0kIpha7gfoSgcApLwMaeTOPP1JbyoSVgsatWR8ASiJO5ehMaV+3EdqrJ3DioQNvFj6Xl/hTbSRGa4PzgZo6gSJU3TRwvOdnUYSasifm/6jjYFLR7wZmAKtxRaLuSRxC9hDtKhPusd9oCGdwkZvFep264IAlFnx4uUPx+6QUB1onheniAhmthGswUfQxdgxwOZlonq0SjMGD78YIGQ+mfkGKHmYTGZ6CN+XwXF/EqkCKUjlCESrfgF7jAzzvxE7hQPsP8ujjvEdpxoAWMqtCj0G9RuXQbsTI0RywSajEPOr35hP6WuZ49nzUfrELwJMjVPrEtyG/NThTJfWzbrMUOSGtLdNvfJhqhH9Nuw1ss6xL+5r3XcPHuEt5duhCEkwsmPBQpk/A3133GrUD7O26jGQ/ITULWsPd2ATe0hnWD3qfrYQgYtQL5I5VNC0+QNcgSJE8MbmwNhCcmthb/e1GrdHvB2s4C0mAYeu3be4X90bqJINwJvIc4R9fhtoEyeYH3YLx6QgHn/v1aBOIJ3DIiHv1Cso3XT50Gne+/LuNctfBB28pBWZzvvnk27avEQ77Kv/+XcKZPPOJZOSj8wQ9flWZ9PfeUsvLPiyPOxe/Ycr0HHujzUcSeOD/eKyc1W+iYtfL8eYFHGcyXWAHWQzXi4cNpPj9OqoPulbsU9TrORU6Cy4yT+q8GZA24zpQw+XsEy6IvOIStU8dxUoVw6T979BUpYl5yzCS3J4WAv7CcyQg+QFqBUQbK4OUhKnTAmCh8NF5oYmSiLoBXhYiXsFUI2s9khR7lAwmyEYQS24fWAAAAAElFTkSuQmCC')
        setContactNameValidation('');
        setContactEmailValidation('');
        setContactLabelValidation('');
        setContactPhoneValidation('');
    }

    // function for saving image in base64 format after file upload
    const onFileChange = (e) => {
        let files = e.target.files;
        let fileReader = new FileReader();
        fileReader.readAsDataURL(files[0]);
        var base64 = '';
        fileReader.onload = () => {
            base64 = fileReader.result;
            console.log(base64)
            setContactAvatar(base64);
        }
    
    }

    // function for checking if email is valid
    const isValidEmail = (email) => {
        const rg = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return rg.test(email);
    }
    return (
            <div className="max-w-[486px]">
                {/* Contacts Title | Start */}
                <div className="pb-[40px]">
                    <h1 className="text-lg font-semibold text-gray-900">{contactId == 0 ? 'Create contact' : 'Edit contact'}</h1>
                </div>
                {/* Contacts Title | End */}
                {/* Contacts Form | Start */}
                    <label className="text-sm font-medium text-gray-700 inline-block pb-[4px]">Photo</label>
                    <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[20px]">
                        <div className=""><img className="min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] rounded-full" src={contactAvatar.length ? contactAvatar : '"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAASZSURBVHgB1ZprbttGEIBnV6QoWn6QaIGi/VMZSB8p2to8QZUbOCdIewInJ6h8A/cEVU+Q3KD1CaS2P4KiAawESAIjMSjJkiiRNDcztCQoelDirh72ByxErpbizM7s7OyuGCwB13UtyOhHGoND4PxLIeCQCWEBY9agjQCoMSwgor8Zy1SCoHtm23YNFGEgCQmtZXPHIEQRb4sgR5UBO1VRJrUCQ8Gj6PFoD6vCQJSDwD9Jq0gqBa7a3q/LFnwCxko7efNk4eaLNMJeL+i68RT9+BDWAI2VIOg9WMQafF6Dluc90rRsZV3CE/iugqYblWazfTSvbaIC5DLiWpRX6jKzsRhnT2O3TWCmC8UPClGC20DCuJiqAJmOtIdbBMuwn7dN84+J+vEKGrDk8xtymyTqYdBzxgf2hAKtVuecBhFI4nV70PG60O50IQzDuC6b1cHAYu3tgK5poEB1Z3vLGa34SAEVv4+iCNzGFTSarcR2e7vbYKMinM8NgNPfI8TJ3k6+NLgfKhC7jm6cgwQk/JuL9+D7wULtySJffPaprBLkSvvoSnW6Gf5CJqOXQBLq+UWFJ6gtPSOJxbXs48FNbAGV3ic/f/X6AmT4HK1g5gyQYGiF2ALY+0WQRKEn48EuydAKsQIY849Bkp7vgyztjgeycMZ+ij/JfVAF6TzH90OQJQyvQYEipfZcxX02Dcp+xAVTyzI1LQOyUDhVgWTnnPEDUCBv5kAWQ1dTgAEvcJW0gdjaMkEWy9oFFTiDAyxqClAcx6kd0kIpha7gfoSgcApLwMaeTOPP1JbyoSVgsatWR8ASiJO5ehMaV+3EdqrJ3DioQNvFj6Xl/hTbSRGa4PzgZo6gSJU3TRwvOdnUYSasifm/6jjYFLR7wZmAKtxRaLuSRxC9hDtKhPusd9oCGdwkZvFep264IAlFnx4uUPx+6QUB1onheniAhmthGswUfQxdgxwOZlonq0SjMGD78YIGQ+mfkGKHmYTGZ6CN+XwXF/EqkCKUjlCESrfgF7jAzzvxE7hQPsP8ujjvEdpxoAWMqtCj0G9RuXQbsTI0RywSajEPOr35hP6WuZ49nzUfrELwJMjVPrEtyG/NThTJfWzbrMUOSGtLdNvfJhqhH9Nuw1ss6xL+5r3XcPHuEt5duhCEkwsmPBQpk/A3133GrUD7O26jGQ/ITULWsPd2ATe0hnWD3qfrYQgYtQL5I5VNC0+QNcgSJE8MbmwNhCcmthb/e1GrdHvB2s4C0mAYeu3be4X90bqJINwJvIc4R9fhtoEyeYH3YLx6QgHn/v1aBOIJ3DIiHv1Cso3XT50Gne+/LuNctfBB28pBWZzvvnk27avEQ77Kv/+XcKZPPOJZOSj8wQ9flWZ9PfeUsvLPiyPOxe/Ycr0HHujzUcSeOD/eKyc1W+iYtfL8eYFHGcyXWAHWQzXi4cNpPj9OqoPulbsU9TrORU6Cy4yT+q8GZA24zpQw+XsEy6IvOIStU8dxUoVw6T979BUpYl5yzCS3J4WAv7CcyQg+QFqBUQbK4OUhKnTAmCh8NF5oYmSiLoBXhYiXsFUI2s9khR7lAwmyEYQS24fWAAAAAElFTkSuQmCC"'} alt=""/></div>
                        {/* <div className=""><button className="border-[1px] border-gray-300 rounded-[6px] py-[9px] px-[17px] font-medium text-sm text-gray-700 hover:border-gray-700">Change</button></div> */}
                        <div className="">
                        <label for="avatar-upload" className="text-gray-700 text-sm font-medium py-[9px] px-[17px] border-[1px] border-gray-300 rounded-[6px] hover:border-gray-700 cursor-pointer">
                            Change
                        </label>
                            <input className="hidden" id="avatar-upload" type="file" onChange={onFileChange}/>
                        </div>
                    </div>
                    <div>
                        <select defaultValue={contactLabel} onChange={(event) => {setContactLabel(event.target.value); setContactLabelValidation('')}} className="border-[1px] border-gray-300 rounded-[6px] py-[9px] px-[17px] font-medium text-sm text-gray-700 hover:border-gray-700">
                        {contactId == 0 ? <option value="default" disabled hidden>Labels</option> : ''}
                        {props.labelList.map((label) => {
                            return <option value={label.name}>{label.name}</option>
                        })}
                        </select>
                    </div>
                    </div>
                    <span className={`${contactLabelValidation.length ? 'opacity-1' : 'opacity-0'} transform transition-all duration-200 text-xs text-red-600`}>{contactLabelValidation}</span>
                    
                    <div className="pt-[24px]">
                    <label className="inline-block font-medium text-sm text-gray-700 pb-[4px]">Name</label>
                    <input value={contactName} className={`${contactNameValidation.length ? 'border-red-600' : 'border-gray-300'} "transition-all duration-200 outline-none border py-[9px] px-[13px] rounded-[6px] w-full`} onChange={(event) => {setContactName(event.target.value); setContactNameValidation('')}} type="text" />
                    <span className={`${contactNameValidation.length ? 'opacity-1' : 'opacity-0'} transform transition-all duration-200 text-xs text-red-600`}>{contactNameValidation}</span>
                    </div>
                    <div className="pt-[24px]">
                    <label className="inline-block -medium text-sm text-gray-700 pb-[4px]">Email address</label>
                    <input value={contactEmail} className={`${contactEmailValidation.length ? 'border-red-600' : 'border-gray-300'} "transition-all duration-200 outline-none border py-[9px] px-[13px] rounded-[6px] w-full`} onChange={(event) => {setContactEmail(event.target.value); setContactEmailValidation('')}} type="text" />
                    <span className={`${contactEmailValidation.length ? 'opacity-1' : 'opacity-0'} transform transition-all duration-200 text-xs text-red-600`}>{contactEmailValidation}</span>
                    </div>
                    <div className="pt-[24px]">
                    <label className="inline-block font-medium text-sm text-gray-700 pb-[4px]">Phone number</label>
                    <input value={contactPhone} className={`${contactPhoneValidation.length ? 'border-red-600' : 'border-gray-300'} "transition-all duration-200 outline-none border py-[9px] px-[13px] rounded-[6px] w-full`} onChange={(event) => {setContactPhone(event.target.value); setContactPhoneValidation('')}} type="text" />
                    <span className={`${contactPhoneValidation.length ? 'opacity-1' : 'opacity-0'} transform transition-all duration-200 text-xs text-red-600`}>{contactPhoneValidation}</span>
                    </div>
                    {/* Modal Buttons | Start */}
                    <div className="flex justify-start gap-[12px] pt-[24px]">
                    <button onClick={() => {setDashboardScreen('contactList'); clearForm()}} className="py-[9px] px-[17px] text-sm font-medium text-gray-700 border border-gray-300 rounded-[6px] shadow-button bg-whit hover:border-gray-700 transition-all duration-150">Cancel</button>
                    <button onClick={() => {submitContact()}} className="py-[9px] px-[17px] text-sm font-medium text-white border border-transparent rounded-[6px] shadow-button bg-indigo hover:bg-white hover:text-indigo hover:border-indigo transition-all duration-150">Save</button>
                    </div>  
                    {/* Modal Buttons | End */}
                {/* Contacts Form | Start */}
            </div>
    )
}

export default CreateContact;