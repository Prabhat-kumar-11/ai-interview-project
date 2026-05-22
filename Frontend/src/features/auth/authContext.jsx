import { useEffect, useState } from "react";
import { getMe } from "./services/authApi";
import { AuthContext } from "./authContextValue.js";


export const AuthProvider = ({ children }) => { 

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const hasToken = document.cookie
            .split("; ")
            .some((cookie) => cookie.startsWith("token="))

        if (!hasToken) {
            setLoading(false)
            return
        }

        const getAndSetUser = async () => {
            try {
                const data = await getMe()
                setUser(data?.user || null)
            } finally {
                setLoading(false)
            }
        }

        getAndSetUser()
    }, [])


    return (
        <AuthContext.Provider value={{user,setUser,loading,setLoading}} >
            {children}
        </AuthContext.Provider>
    )

    
}
