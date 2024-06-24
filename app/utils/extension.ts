import { toast } from "react-toastify";

//======= Toast Alert =======
export const AlertSuccess = (message:string) => {
    toast.success(message ?? "", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
}

export const AlertWarning = (message:string) => {
    toast.warning(message ?? "", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
}

export const AlertError = (message:string) => {
    toast.error(message ?? "", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
}

//Local Storage

export const SaveLocalStorage = (key:string,value:string) => {
    localStorage.setItem(key,value)
}

export const RemoveLocalStorage = (key:string) =>{
    localStorage.removeItem(key)
}

export const ClearLocalStorage = () =>{
    localStorage.clear()
}
