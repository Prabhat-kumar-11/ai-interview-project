import { useContext, useState } from "react";
import { AuthContext } from "../authContextValue";
import { login, register, logout } from "../services/authApi";
import { useToast } from "../../../components/toastContext";



export const useAuth = () => {

    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context
    const [ authActionLoading, setAuthActionLoading ] = useState(false)
    const { showToast } = useToast()


    const handleLogin = async ({ email, password }) => {
        setAuthActionLoading(true)
        try {
            const data = await login({ email, password })
            setUser(data?.user || null)
            showToast({ type: "success", message: "Login successful" })
            return data
        } catch (err) {
            showToast({ type: "error", message: err.message })
            return null
        } finally {
            setAuthActionLoading(false)
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setAuthActionLoading(true)
        try {
            const data = await register({ username, email, password })
            setUser(data?.user || null)
            showToast({ type: "success", message: "Registration successful" })
            return data
        } catch (err) {
            showToast({ type: "error", message: err.message })
            return null
        } finally {
            setAuthActionLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            const data = await logout()
            setUser(null)
            showToast({ type: "success", message: data?.message || "Logged out successfully" })
        } catch (err) {
            showToast({ type: "error", message: err.message })
        } finally {
            setLoading(false)
        }
    }

    return { user, loading, authActionLoading, handleRegister, handleLogin, handleLogout }
}
