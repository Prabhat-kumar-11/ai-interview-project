import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router'
import "../authForm.scss"
import { useAuth } from '../hooks/useAuth'

const Login = () => {

    const { loading, authActionLoading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ errors, setErrors ] = useState({})

    const validateForm = () => {
        const nextErrors = {}

        if (!email.trim()) {
            nextErrors.email = "Email is required"
        }

        if (!password) {
            nextErrors.password = "Password is required"
        }

        setErrors(nextErrors)
        return Object.keys(nextErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateForm()) return

        const data = await handleLogin({email,password})
        if (data?.user) {
            navigate('/dashboard')
        }
    }

    if(loading){
        return (<main className='auth-page'><h1>Loading.......</h1></main>)
    }


    return (
        <main className='auth-page'>
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
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
                        {authActionLoading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <p>Don't have an account? <Link to={"/register"} >Register</Link> </p>
            </div>
        </main>
    )
}

export default Login
