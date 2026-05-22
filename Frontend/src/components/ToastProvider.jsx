import { useCallback, useState } from "react"
import { ToastContext } from "./toastContext.js"
import "./toast.scss"

export const ToastProvider = ({ children }) => {
    const [ toasts, setToasts ] = useState([])

    const showToast = useCallback(({ message, type = "info" }) => {
        const id = crypto.randomUUID()
        setToasts((currentToasts) => [ ...currentToasts, { id, message, type } ])

        setTimeout(() => {
            setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id))
        }, 3500)
    }, [])

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="toast-stack" aria-live="polite" aria-atomic="true">
                {toasts.map((toast) => (
                    <div className={`toast ${toast.type}`} key={toast.id}>
                        {toast.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    )
}
