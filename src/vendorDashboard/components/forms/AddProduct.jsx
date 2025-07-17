import React, { useState, useRef } from 'react'
import { API_URL } from '../../data/ApiPath'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AddProduct = () => {
    const [productName, setProductName] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState([])
    const [bestSeller, setBestSeller] = useState(false)
    const [image, setImage] = useState(null)
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false)

    const fileInputRef = useRef(null) // Ref for file input

    const handleCategoryChange = (e) => {
        const value = e.target.value
        setCategory(prev =>
            prev.includes(value)
                ? prev.filter(i => i !== value)
                : [...prev, value]
        )
    }

    const handleBestSeller = (e) => setBestSeller(e.target.value === 'true')

    const handleAddProduct = async (e) => {
        e.preventDefault()

        if (!productName || !price || category.length === 0 || !image) {
            toast.error("All fields are required")
            return
        }

        setLoading(true)
        try {
            const loginToken = localStorage.getItem("loginToken")
            const firmId = localStorage.getItem("firmId")

            if (!loginToken || !firmId) {
                toast.error("Unauthorized or firm not found")
                return
            }

            const formData = new FormData()
            formData.append('productName', productName)
            formData.append('price', price)
            formData.append('description', description)
            formData.append('image', image)
            category.forEach(cat => formData.append('category', cat))
            formData.append('bestSeller', bestSeller)

            const response = await fetch(`${API_URL}/product/add-product/${firmId}`, {
                method: "POST",
                body: formData
            })

            const data = await response.json()

            if (response.ok) {
                toast.success("Product added successfully")
                // Reset form fields
                setProductName("")
                setPrice("")
                setCategory([])
                setBestSeller(false)
                setImage(null)
                setDescription("")
                if (fileInputRef.current) {
                    fileInputRef.current.value = "" // Clear file input manually
                }
            } else {
                toast.error(data.message || "Failed to add product")
            }
        } catch (error) {
            toast.error("Error while adding product")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="firmSection">
            <form className="authForm" onSubmit={handleAddProduct}>
                <h2>Add Product</h2>

                <label>Product Name</label>
                <input
                    type="text"
                    value={productName}
                    onChange={e => setProductName(e.target.value)}
                    placeholder="Product name"
                />

                <label>Price</label>
                <input
                    type="text"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder="Enter price"
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
                        <label>Best Seller</label>
                        <div className="checkInp">
                            <label>
                                <input
                                    type='radio'
                                    value='true'
                                    checked={bestSeller === true}
                                    onChange={handleBestSeller}
                                /> Yes
                            </label>
                            <label>
                                <input
                                    type='radio'
                                    value='false'
                                    checked={bestSeller === false}
                                    onChange={handleBestSeller}
                                /> No
                            </label>
                        </div>
                    </div>
                </div>

                <label>Description</label>
                <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Product description"
                />

                <label>Product Image</label>
                <input
                    type="file"
                    onChange={e => setImage(e.target.files[0])}
                    ref={fileInputRef}
                />

                <div className="btnSubmit">
                    <button type="submit" disabled={loading}>
                        {loading ? 'Adding...' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddProduct
