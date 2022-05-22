import './Sidebar.css';
import {useContext} from 'react'
import { ContactContext } from '../../helpers/Contexts';

const Sidebar = (props) => {

  // states we use from our ContactContext
  const {setShowModal} = useContext(ContactContext);
  const {setDashboardScreen} = useContext(ContactContext);
  const {favoritesQuery, setFavoritesQuery} = useContext(ContactContext);
  const {labelQuery, setLabelQuery} = useContext(ContactContext);
  const {setContactId} = useContext(ContactContext);

  // helper function that helps us find lenght of different categories
  // lenght of all contacts, length of favorite contacts and lenght of contacts with different labels
  const getMenuContactLength = ((condition) => {
    var length;
    switch (condition) {
        case '':
            length = props.contactList.length
            break;
        case 'favorites':
            length = props.contactList.filter((item) => { return item.isFavorite; }).length;
            break;
        default:
            length = props.contactList.filter((item) => { return item.label === condition; }).length;
            break;
    }
    return length;
  })

  return (
    <div className="overflow-y-auto Sidebar w-[255px] bg-white border-r-[1px] py-[21px] px-[8px] border-r-gray-200 fixed h-screen">
    {/* Logo | Start */}
    <div className="cursor-pointer logo pl-[9px] flex items-center  gap-[10px]" onClick={() => {setDashboardScreen('contactList'); setFavoritesQuery(false); setLabelQuery('')}}>
      <svg width="33" height="30" viewBox="0 0 33 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.9844 27.4376C14.179 26.9367 14.2717 26.4021 14.2573 25.865C14.2869 24.3764 14.6848 22.9184 15.4153 21.621C16.144 20.3258 17.1831 19.2321 18.4393 18.438C18.9044 18.1885 19.314 17.8473 19.6435 17.4349C19.9729 17.0225 20.2153 16.5476 20.3559 16.0389C20.4965 15.5301 20.5324 14.9982 20.4615 14.4751C20.3905 13.9521 20.2143 13.4489 19.9433 12.996C19.5813 12.391 19.0603 11.895 18.4393 11.565C18.0833 11.318 17.7413 11.052 17.4153 10.767L16.5983 9.967C15.1012 8.3932 14.2617 6.30708 14.2513 4.135C14.2667 3.59777 14.1744 3.06288 13.9798 2.56188C13.7853 2.06089 13.4923 1.60395 13.1183 1.218C12.7459 0.832488 12.2997 0.52595 11.8062 0.316684C11.3128 0.107418 10.7822 -0.000286365 10.2463 5.71818e-07C9.71058 0.000756001 9.1805 0.108938 8.68737 0.318146C8.19423 0.527354 7.74807 0.833339 7.37526 1.218C7.00188 1.60462 6.70937 2.06183 6.51482 2.56287C6.32028 3.06391 6.22762 3.59872 6.24226 4.136C6.251 4.83344 6.4431 5.5163 6.79926 6.116C7.1542 6.71469 7.66095 7.20902 8.26826 7.549C10.7273 9.105 12.4383 12.08 12.4383 15.006C12.4322 17.1592 11.6087 19.2298 10.1343 20.799L8.27426 22.451C7.66726 22.79 7.16026 23.284 6.80426 23.884C6.44726 24.483 6.25626 25.167 6.24726 25.865C6.23197 26.4022 6.32433 26.9371 6.51891 27.438C6.71349 27.939 7.00636 28.396 7.38026 28.782C7.7527 29.1674 8.19893 29.4739 8.69236 29.6832C9.18578 29.8924 9.7163 30.0002 10.2523 30C10.7881 29.9994 11.3184 29.8913 11.8117 29.682C12.305 29.4728 12.7513 29.1668 13.1243 28.782C13.4975 28.3955 13.7899 27.9384 13.9844 27.4376Z" fill="#4F46E5"/>
        <path d="M19.4163 6.36C18.9753 5.698 18.7403 4.919 18.7403 4.123C18.7409 3.05673 19.1633 2.034 19.9153 1.278C20.5691 0.62024 21.4314 0.210504 22.3543 0.119089C23.2772 0.0276751 24.2031 0.260281 24.9733 0.777001C25.6329 1.2199 26.1466 1.84836 26.4493 2.583C26.752 3.31848 26.831 4.12692 26.6764 4.9071C26.5219 5.68728 26.1406 6.40452 25.5803 6.969C25.0217 7.53193 24.308 7.91563 23.5304 8.07112C22.7527 8.22661 21.9464 8.14685 21.2143 7.842C20.4815 7.53685 19.8557 7.02107 19.4163 6.36Z" fill="#4F46E5"/>
        <path d="M20.5213 22.518C21.1803 22.076 21.9553 21.84 22.7473 21.84V21.838C23.2737 21.8386 23.7949 21.9432 24.2809 22.1457C24.7669 22.3482 25.2081 22.6446 25.5793 23.018C26.2352 23.6779 26.6432 24.544 26.7343 25.47C26.8254 26.3959 26.594 27.3249 26.0793 28.1C25.6399 28.762 25.0137 29.2785 24.2803 29.584C23.5482 29.8888 22.7418 29.9686 21.9642 29.8131C21.1865 29.6576 20.4729 29.2739 19.9143 28.711C19.3538 28.1464 18.9723 27.429 18.8177 26.6486C18.6632 25.8683 18.7423 25.0596 19.0453 24.324C19.348 23.5894 19.8616 22.9609 20.5213 22.518Z" fill="#4F46E5"/>
        <path d="M32.3243 12.758C32.7641 13.4198 32.9991 14.1974 32.9993 14.9931C32.9986 16.0597 32.5762 17.0827 31.8243 17.839C31.453 18.2122 31.0118 18.5086 30.5258 18.7111C30.0398 18.9136 29.5187 19.0182 28.9923 19.019C28.1994 19.019 27.4245 18.783 26.7663 18.341C26.1066 17.8981 25.593 17.2696 25.2903 16.535C24.9873 15.7994 24.9082 14.9907 25.0627 14.2104C25.2173 13.43 25.5988 12.7126 26.1593 12.148C26.7179 11.5849 27.4318 11.2011 28.2096 11.0456C28.9875 10.8901 29.794 10.9699 30.5263 11.275C31.2592 11.5804 31.885 12.0966 32.3243 12.758Z" fill="#4F46E5"/>
        <path d="M1.78026 11.647C2.43926 11.205 3.21326 10.969 4.00626 10.969C4.53261 10.9701 5.05357 11.075 5.53934 11.2776C6.02511 11.4803 6.46617 11.7767 6.83726 12.15C7.49287 12.8097 7.90068 13.6754 7.99178 14.601C8.08288 15.5265 7.85169 16.4552 7.33726 17.23C6.89793 17.8914 6.27217 18.4075 5.53926 18.713C4.8069 19.0164 4.00093 19.0953 3.22361 18.9399C2.44629 18.7845 1.73266 18.4017 1.17326 17.84C0.612965 17.2755 0.231653 16.5583 0.0770756 15.7781C-0.0775017 14.9979 0.00152573 14.1895 0.304262 13.454C0.606855 12.719 1.12048 12.0902 1.78026 11.647Z" fill="#4F46E5"/>
      </svg>
      <h2 className='text-base font-bold'>
        Contacts
      </h2>
    </div>
    {/* Logo | End */}
    {/* Create Contact Button | Start */}
    <div className="create-btn pl-[8px] pt-[29px]" onClick={() => {setDashboardScreen('createContact'); setContactId(0);}}>
      <button className="transition-all duration-150 flex gap-[10px] border-[1px] border-transparent items-center bg-indigo text-xs text-white font-medium py-[7px] px-[11px] rounded-[4px] shadow-button group hover:bg-white hover:text-indigo hover:border-[1px] hover:border-indigo">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" className='group-hover:fill-indigo'>
          <path className='group-hover:fill-indigo' fillRule="evenodd" clipRule="evenodd" d="M6.00002 0.400024C6.44185 0.400024 6.80002 0.758197 6.80002 1.20002V5.20002H10.8C11.2419 5.20002 11.6 5.5582 11.6 6.00002C11.6 6.44185 11.2419 6.80002 10.8 6.80002H6.80002V10.8C6.80002 11.2419 6.44185 11.6 6.00002 11.6C5.5582 11.6 5.20002 11.2419 5.20002 10.8V6.80002H1.20002C0.758197 6.80002 0.400024 6.44185 0.400024 6.00002C0.400024 5.5582 0.758197 5.20002 1.20002 5.20002H5.20002V1.20002C5.20002 0.758197 5.5582 0.400024 6.00002 0.400024Z" fill="white"/>
        </svg>
        Create contact
      </button>
    </div>
    {/* Create Contact Button | End */}
    {/* Sidebar Contact Items | Start */}
    <div className="Sidebar-items pt-[28px] gap-[5px] flex flex-col">
      <div onClick={() => {setFavoritesQuery(false); setLabelQuery(''); setDashboardScreen('contactList')}} className={`${!favoritesQuery && !labelQuery.length ? 'bg-gray-100': ''} flex items-center justify-between py-[10px] px-[12px] rounded-[6px] cursor-pointer group transition-all duration-200 hover:bg-gray-100`}>
        <div className="flex justify-center gap-[17px]">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 16 20" fill="none">
            <path d="M12 5C12 7.20914 10.2091 9 8 9C5.79086 9 4 7.20914 4 5C4 2.79086 5.79086 1 8 1C10.2091 1 12 2.79086 12 5Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 12C4.13401 12 1 15.134 1 19H15C15 15.134 11.866 12 8 12Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p className={`${!favoritesQuery && !labelQuery.length ? 'text-gray-900': 'text-gray-600'} text-sm font-medium group-hover:text-gray-900`}>
            Contacts
          </p>
        </div>
        <div className={`${!favoritesQuery && !labelQuery.length ? 'bg-white text-gray-900': 'bg-gray-100 text-gray-600 '} group-hover:bg-white group-hover:text-gray-900 text-xs font-medium text-center  w-[32px] h-[20px] rounded-[10px] flex items-center justify-center`}>
          <span>{getMenuContactLength('')}</span>
        </div>
      </div>
      <div onClick={() => {setFavoritesQuery(true); setLabelQuery(''); setDashboardScreen('contactList')}} className={`${favoritesQuery && !labelQuery.length ? 'bg-gray-100': ''} flex items-center justify-between py-[10px] px-[12px] rounded-[6px] cursor-pointer group transition-all duration-200 hover:bg-gray-100`}>
        <div className="flex justify-center gap-[17px]" >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 16 20" fill="none">
            <path d="M12 5C12 7.20914 10.2091 9 8 9C5.79086 9 4 7.20914 4 5C4 2.79086 5.79086 1 8 1C10.2091 1 12 2.79086 12 5Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 12C4.13401 12 1 15.134 1 19H15C15 15.134 11.866 12 8 12Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p className={`${favoritesQuery && !labelQuery.length ? 'text-gray-900': 'text-gray-600'} text-sm font-medium group-hover:text-gray-900`}>
            Favorites
          </p>
        </div>
        <div className={`${favoritesQuery && !labelQuery.length ? 'bg-white text-gray-900': 'bg-gray-100 text-gray-600 '} group-hover:bg-white group-hover:text-gray-900 text-xs font-medium text-center  w-[32px] h-[20px] rounded-[10px] flex items-center justify-center`}>
          <span>{getMenuContactLength('favorites')} </span>
        </div>
      </div>
    </div>
    {/* Sidebar Contact Items | End */}
    {/* Sidebar Label Divider | Start */}
    <div className="Sidebar-divider flex gap-[8px] items-center py-[20px]">
      <p className="text-sm text-gray-500">Labels</p>
      <div className="w-full h-[1px] bg-gray-300"></div>
    </div>
    {/* Sidebar Label Divider | End */}
    {/* Sidebar Label Items | Start */}
    <div className="Sidebar-items gap-[5px] flex flex-col">
      {props.labelList.map((label) => {
        return <div key={label.name} onClick={() => {setFavoritesQuery(false); setLabelQuery(label.name); setDashboardScreen('contactList')}} className={`${!favoritesQuery && labelQuery === label.name ? 'bg-gray-100': ''} flex items-center justify-between py-[10px] px-[12px] rounded-[6px] cursor-pointer group transition-all duration-200 hover:bg-gray-100`}>
                  <div  className="flex justify-center gap-[17px]" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 16 20" fill="none">
                      <path d="M1 3C1 1.89543 1.89543 1 3 1H13C14.1046 1 15 1.89543 15 3V19L8 15.5L1 19V3Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className={`${!favoritesQuery && labelQuery === label.name ? 'text-gray-900': 'text-gray-600'} text-sm font-medium group-hover:text-gray-900`}>
                      {label.name}
                    </p>
                  </div>
                  <div className={`${!favoritesQuery && labelQuery === label.name ? 'bg-white text-gray-900': 'bg-gray-100 text-gray-600 '} group-hover:bg-white group-hover:text-gray-900 text-xs font-medium text-center  w-[32px] h-[20px] rounded-[10px] flex items-center justify-center`}>
                    <span>{ getMenuContactLength(label.name) }</span>
                  </div>
                </div>
           
      })}
    </div>
    {/* Sidebar Label Items | End */}
    {/* Create Label Button | Start */}
    <div className="create-btn pl-[8px] pt-[29px]">
      <button onClick={() => {setShowModal(true)}} className="transition-all duration-150 flex gap-[18px] border-[1px] border-white items-center text-sm text-gray-600 font-medium py-[7px] px-[11px] rounded-[4px] group hover:bg-white hover:text-indigo hover:border-[1px] hover:border-indigo">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" className='group-hover:fill-indigo fill-gray-400'>
          <path className='group-hover:fill-indigo fill-gray-400' fillRule="evenodd" clipRule="evenodd" d="M6.00002 0.400024C6.44185 0.400024 6.80002 0.758197 6.80002 1.20002V5.20002H10.8C11.2419 5.20002 11.6 5.5582 11.6 6.00002C11.6 6.44185 11.2419 6.80002 10.8 6.80002H6.80002V10.8C6.80002 11.2419 6.44185 11.6 6.00002 11.6C5.5582 11.6 5.20002 11.2419 5.20002 10.8V6.80002H1.20002C0.758197 6.80002 0.400024 6.44185 0.400024 6.00002C0.400024 5.5582 0.758197 5.20002 1.20002 5.20002H5.20002V1.20002C5.20002 0.758197 5.5582 0.400024 6.00002 0.400024Z" fill="white"/>
        </svg>
        Create Label
      </button>
    </div>
    {/* Create Label Button | End */}
  </div>
  );
}

export default Sidebar;
