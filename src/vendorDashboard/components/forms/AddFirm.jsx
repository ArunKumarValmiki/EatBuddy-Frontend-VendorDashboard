import React, { useState, useRef } from 'react'
import { API_URL } from '../../data/ApiPath'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AddFirm = () => {
    const [firmName, setFirmName] = useState("")
    const [area, setArea] = useState("")
    const [category, setCategory] = useState([])
    const [region, setRegion] = useState([])
    const [offer, setOffer] = useState("")
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)

    const fileInputRef = useRef(null) // Ref to reset file input

    const handleCategoryChange = (e) => {
        const value = e.target.value
        setCategory(prev =>
            prev.includes(value)
                ? prev.filter(item => item !== value)
                : [...prev, value]
        )
    }

    const handleRegionChange = (e) => {
        const value = e.target.value
        setRegion(prev =>
            prev.includes(value)
                ? prev.filter(item => item !== value)
                : [...prev, value]
        )
    }

    const handleFirmSubmit = async (e) => {
        e.preventDefault()

        if (!firmName || !area || category.length === 0 || region.length === 0 || !file) {
            toast.error("All fields are required")
            return
        }

        setLoading(true)
        try {
            const loginToken = localStorage.getItem("loginToken")
            if (!loginToken) {
                toast.error("Unauthorized. Please log in again.")
                return
            }

            const formData = new FormData()
            formData.append('firmName', firmName)
            formData.append('area', area)
            formData.append('offer', offer)
            formData.append('image', file)
            category.forEach(cat => formData.append('category', cat))
            region.forEach(reg => formData.append('region', reg))

            const response = await fetch(`${API_URL}/firm/add-firm`, {
                method: "POST",
                headers: { 'token': loginToken },
                body: formData
            })

            const data = await response.json()
            if (response.ok) {
                toast.success("Firm added successfully")
                setFirmName("")
                setArea("")
                setCategory([])
                setRegion([])
                setOffer("")
                setFile(null)
                if (fileInputRef.current) {
                    fileInputRef.current.value = "" // Clear file input manually
                }
                localStorage.setItem('firmId', data.firmId)
            } else {
                toast.error(data.message || "Failed to add firm")
            }
        } catch (error) {
            toast.error("Failed to add firm")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="firmSection">
            <form className="authForm" onSubmit={handleFirmSubmit}>
                <h2>Add Firm</h2>

                <label>Firm Name</label>
                <input
                    type="text"
                    value={firmName}
                    onChange={e => setFirmName(e.target.value)}
                    placeholder="Enter firm name"
                />

                <label>Area</label>
                <input
                    type="text"
                    value={area}
                    onChange={e => setArea(e.target.value)}
                    placeholder="Enter area"
                />

                <div className="formRow">
                    <div className="formGroup">
                        <label>Category</label>
                        <div className="checkInp">
                            <label>
                                <input
                                    type='checkbox'
                                    value='veg'
                                    checked={category.includes('veg')}
                                    onChange={handleCategoryChange}
                                /> Veg
                            </label>
                            <label>
                                <input
                                    type='checkbox'
                                    value='non-veg'
                                    checked={category.includes('non-veg')}
                                    onChange={handleCategoryChange}
                                /> Non-Veg
                            </label>
                        </div>
                    </div>

                    <div className="formGroup">
                        <label>Region</label>
                        <div className="checkInp">
                            {['south-indian', 'north-indian', 'chinese', 'bakery'].map((r) => (
                                <label key={r}>
                                    <input
                                        type='checkbox'
                                        value={r}
                                        checked={region.includes(r)}
                                        onChange={handleRegionChange}
                                    /> {r}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <label>Offer</label>
                <input
                    type="text"
                    value={offer}
                    onChange={e => setOffer(e.target.value)}
                    placeholder="Enter offer"
                />

                <label>Firm Image</label>
                <input
                    type="file"
                    onChange={e => setFile(e.target.files[0])}
                    ref={fileInputRef}
                />

                <div className="btnSubmit">
                    <button type="submit" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddFirm
