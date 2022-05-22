import './Search.css';
import {useContext} from 'react';
import {ContactContext} from '../../helpers/Contexts';

const Search = () => {
    // state for searchQuery data
    const {searchQuery, setSearchQuery} = useContext(ContactContext);

    // HTML for Search component
    return (
        <div className="relative Search">
            <input onChange={(event) => {setSearchQuery(event.target.value);}} value={searchQuery} type="text" placeholder="Search" className="px-[38px] py-[21.5px] w-full border-b-[1px] border-x-gray-200 outline-none"/>
            <svg className="absolute transform top-[38%] left-[8px]" xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M6 2.5C3.79086 2.5 2 4.29086 2 6.5C2 8.70914 3.79086 10.5 6 10.5C8.20914 10.5 10 8.70914 10 6.5C10 4.29086 8.20914 2.5 6 2.5ZM0 6.5C0 3.18629 2.68629 0.5 6 0.5C9.31371 0.5 12 3.18629 12 6.5C12 7.79583 11.5892 8.99572 10.8907 9.97653L15.7071 14.7929C16.0976 15.1834 16.0976 15.8166 15.7071 16.2071C15.3166 16.5976 14.6834 16.5976 14.2929 16.2071L9.47653 11.3907C8.49572 12.0892 7.29583 12.5 6 12.5C2.68629 12.5 0 9.81371 0 6.5Z" fill="#9CA3AF"/>
            </svg>
          </div>
    )
}

export default Search;