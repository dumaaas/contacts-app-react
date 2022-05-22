// component that is showing Toast for different actions with different msgs
const Toast = (props) => {
    return ( 
        <div className={`${props.showSuccessToast ? 'opacity-1 top-[20px]' : 'border-[1px] border-green-500 opacity-0 top-[-40px]'}  z-50 absolute transition-all duration-150 right-[20px] p-[24px] bg-green-200 rounded-[8px]`}>
              <p className="font-medium text-green-500 text-md">{props.msg}</p>
        </div>
    )
}
export default Toast;