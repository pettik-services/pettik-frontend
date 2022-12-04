import { toast, ToastOptions } from 'react-toastify';

const toastConfig: ToastOptions  = {
    position: "bottom-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
}

export const showSuccessToast = (message: string) => {
    toast.success(message, toastConfig);
}

export const showErrorToast = (message: string) => {
    toast.error(message, toastConfig);
}

export const showInfoToast = (message: string) => {
    toast.info(message, toastConfig);
}