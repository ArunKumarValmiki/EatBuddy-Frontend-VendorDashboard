import React, { useState } from 'react'
import { API_URL } from '../../data/ApiPath'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Login = ({ showWelcomeHandler }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const loginHandler = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error("All fields are required")
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (response.ok) {
        toast.success("Logged In Successfully")
        localStorage.setItem('loginToken', data.token)
        localStorage.setItem('vendorName', data.vendorName)

        const vendorId = data.vendorId

        // Fetch full vendor info to check firm existence
        const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)
        const vendorData = await vendorResponse.json()

        if (vendorResponse.ok) {
          const firmList = vendorData.vendor.firm
          const hasFirm = firmList && firmList.length > 0

          if (hasFirm) {
            localStorage.setItem('firmId', vendorData.vendorFirmId)
            localStorage.setItem('firmName', firmList[0].firmName)
          } else {
            localStorage.removeItem('firmId')
            localStorage.removeItem('firmName')
          }
        }

        setEmail("")
        setPassword("")
        showWelcomeHandler()
      } else {
        toast.error(data.message || "Login failed")
      }
    } catch (error) {
      console.error("Login failed:", error)
      toast.error("Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="loginSection">
      <form className='authForm' onSubmit={loginHandler}>
        <h2>Vendor Login</h2>
        <label>Email</label>
        <input
          type='text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter your email'
        /><br />
        <label>Password</label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Enter your password'
        /><br />
        <div className="btnSubmit">
          <button type='submit' disabled={loading}>
            {loading ? 'Logging in...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
