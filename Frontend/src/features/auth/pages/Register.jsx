import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import "../authForm.scss"

const Register = () => {

    const navigate = useNavigate()
    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ errors, setErrors ] = useState({})

    const {loading, authActionLoading, handleRegister} = useAuth()

    const validateForm = () => {
        const nextErrors = {}
        const trimmedUsername = username.trim()

        if (!trimmedUsername) {
            nextErrors.username = "Username is required"
        } else if (trimmedUsername.length < 3 || trimmedUsername.length > 30 || !/^[a-zA-Z0-9_]+$/.test(trimmedUsername)) {
            nextErrors.username = "Use 3-30 letters, numbers or underscores"
        }

        if (!email.trim()) {
            nextErrors.email = "Email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            nextErrors.email = "Enter a valid email address"
        }

        if (!password) {
            nextErrors.password = "Password is required"
        } else if (password.length < 6) {
            nextErrors.password = "Password must be at least 6 characters"
        }

        setErrors(nextErrors)
        return Object.keys(nextErrors).length === 0
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateForm()) return

        const data = await handleRegister({username: username.trim(), email: email.trim(), password})
        if (data?.user) {
            navigate("/dashboard")
        }
    }

    if(loading){
        return (<main className='auth-page'><h1>Loading.......</h1></main>)
    }

    return (
        <main className='auth-page'>
            <div className="form-container">
                <h1>Register</h1>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            value={username}
                            onChange={(e) => { setUsername(e.target.value) }}
                            type="text" id="username" name='username' placeholder='Enter username' />
                        {errors.username && <span className="field-error">{errors.username}</span>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email" id="email" name='email' placeholder='Enter email address' />
                        {errors.email && <span className="field-error">{errors.email}</span>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password" id="password" name='password' placeholder='Enter password' />
                        {errors.password && <span className="field-error">{errors.password}</span>}
                    </div>

                    <button className='button primary-button' disabled={authActionLoading}>
                        {authActionLoading && <span className="button-spinner" aria-hidden="true"></span>}
                        {authActionLoading ? "Creating account..." : "Register"}
                    </button>

                </form>

                <p>Already have an account? <Link to={"/login"} >Login</Link> </p>
            </div>
        </main>
    )
}

export default Register
