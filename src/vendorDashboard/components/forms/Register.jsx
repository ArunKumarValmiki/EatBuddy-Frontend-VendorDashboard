import React, { useState } from 'react'
import { API_URL } from '../../data/ApiPath'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Register = ({ showLoginHandler }) => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!username || !email || !password) {
            toast.error("All fields are required")
            return
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address")
            return
        }

        // // Password length validation
        // if (password.length < 6) {
        //     toast.error("Password must be at least 6 characters")
        //     return
        // }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        if (!passwordRegex.test(password)) {
        toast.error("Password must be at least 8 characters, include uppercase, lowercase, number, and special character")
        return
        }

        setLoading(true)
        try {
            const response = await fetch(`${API_URL}/vendor/register`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            })

            const data = await response.json()
            if (response.ok) {
                toast.success("Registered successfully")
                setUsername("")
                setEmail("")
                setPassword("")
                showLoginHandler()
            } else {
                toast.error(data.message || "Registration failed")
            }
        } catch (error) {
            console.error("Registration failed:", error)
            toast.error("Registration failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="registerSection">
            <form className='authForm' onSubmit={handleSubmit}>
                <h2>Vendor Register</h2>
                <label>Username</label>
                <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} /><br />
                <label>Email</label>
                <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} /><br />
                <label>Password</label>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} /><br />
                <div className="btnSubmit">
                    <button type='submit' disabled={loading}>{loading ? 'Registering...' : 'Submit'}</button>
                </div>
            </form>
        </div>
    )
}

export default Register
