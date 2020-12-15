import React from 'react';
import { toast } from 'react-toastify';
import './CustomToast.scss';
import TOAST_ERROR_ICON from '../../images/toast-error.svg';
import TOAST_INFO_ICON from '../../images/toast-info.svg';
import TOAST_WARNING_ICON from '../../images/toast-warning.svg';


const ToastMsg = (props) => {
    let msg = props.msg;
    let icon = props.icon
    return (
        <div className="ToastMsg">
            <div>
                <img src={icon} alt="toast icon" className={"ToastImg"} />
            </div>
            <div>
                {msg}
            </div>
        </div>
    )
}

const customToast = {
    success(msg, options = {}) {
        return toast.success(<ToastMsg msg={msg} icon={TOAST_INFO_ICON} />, {
            ...options,
            className: 'toast-success-container toast-success-container-after'
        });
    },
    error(msg, options = {autoClose: 20000}) {
        return toast.error(<ToastMsg msg={msg} icon={TOAST_ERROR_ICON} />, {
            ...options,
            className: 'toast-error-container toast-error-container-after',
        });
    },
    info(msg, options = {}) {
        return toast.error(<ToastMsg msg={msg} icon={TOAST_INFO_ICON} />, {
            ...options,
            className: 'toast-info-container toast-info-container-after',
        });
    },
    warning(msg, options = {}) {
        return toast.warn(<ToastMsg msg={msg} icon={TOAST_WARNING_ICON} />, {
            ...options,
            className: 'toast-warn-container toast-warn-container-after',
        });
    },
};


export default customToast;