import React from 'react'
import LandingPage from './vendorDashboard/pages/LandingPage'
import './App.css'

import { Routes, Route } from 'react-router-dom'
import NotFound from './vendorDashboard/components/NotFound'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' 

const App = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/*' element={<NotFound />} />
            </Routes>
            
            {/* Toast Notifications */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    )
}

export default App
