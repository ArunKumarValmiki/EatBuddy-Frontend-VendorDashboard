import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import Welcome from '../components/Welcome'
import AllProducts from '../components/AllProducts'
import GuestWelcome from '../components/GuestWelcome'

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showFirm, setShowFirm] = useState(false)
  const [showProduct, setShowProduct] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [showAllProducts, setShowAllProducts] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [hasFirm, setHasFirm] = useState(false)

  useEffect(() => {
    const loginToken = localStorage.getItem('loginToken')
    const firmId = localStorage.getItem('firmId')

    if (loginToken) {
      setIsLoggedIn(true)
      setShowWelcome(true)
    }

    if (firmId) {
      setHasFirm(true)
    }
  }, [])

  const resetViews = () => {
    setShowLogin(false)
    setShowRegister(false)
    setShowFirm(false)
    setShowProduct(false)
    setShowWelcome(false)
    setShowAllProducts(false)
  }

  const logOutHandler = () => {
    const confirmed = confirm("Are you sure you want to logout?")
    if (confirmed) {
      localStorage.clear()
      setIsLoggedIn(false)
      setHasFirm(false)
      resetViews()
    }
  }

  const goHomeHandler = () => {
    const loginToken = localStorage.getItem('loginToken')
    const firmId = localStorage.getItem('firmId')

    resetViews()

    if (loginToken) {
      setIsLoggedIn(true)
      setShowWelcome(true)
    }

    if (firmId) {
      setHasFirm(true)
    }
  }

  const showLoginHandler = () => {
    resetViews()
    setShowLogin(true)
  }

  const showRegisterHandler = () => {
    resetViews()
    setShowRegister(true)
  }

  const showFirmHandler = () => {
    if (isLoggedIn && !hasFirm) {
      resetViews()
      setShowFirm(true)
    } else if (!isLoggedIn) {
      alert("Please Log in ! To add a Firm")
      resetViews()
      setShowLogin(true)
    } else {
      alert("You already have a firm.")
    }
  }

  const showProductHandler = () => {
    if (isLoggedIn) {
      resetViews()
      setShowProduct(true)
    } else {
      alert("Please Log in ! To add a Product")
      resetViews()
      setShowLogin(true)
    }
  }

  const showWelcomeHandler = () => {
    const firmId = localStorage.getItem('firmId')
    setIsLoggedIn(true)
    if (firmId) {
      setHasFirm(true)
    } else {
      setHasFirm(false)
    }
    resetViews()
    setShowWelcome(true)
  }

  const showAllProductsHandler = () => {
    if (isLoggedIn) {
      resetViews()
      setShowAllProducts(true)
    } else {
      alert("Please Log in ! To see all Products")
      resetViews()
      setShowLogin(true)
    }
  }

  return (
    <section className='landingSection'>
      <NavBar
        showLoginHandler={showLoginHandler}
        showRegisterHandler={showRegisterHandler}
        showLogOut={isLoggedIn}
        logOutHandler={logOutHandler}
        goHomeHandler={goHomeHandler}
      />

      <div className='collectionSection'>
        <SideBar
          showFirmHandler={showFirmHandler}
          showProductHandler={showProductHandler}
          showAllProductsHandler={showAllProductsHandler}
          showFirmTitle={!hasFirm}
        />

        {showRegister && <Register showLoginHandler={showLoginHandler} />}
        {showLogin && <Login showWelcomeHandler={showWelcomeHandler} />}
        {showFirm && isLoggedIn && !hasFirm && <AddFirm />}
        {showProduct && isLoggedIn && <AddProduct />}
        {showWelcome && <Welcome />}
        {showAllProducts && isLoggedIn && <AllProducts />}
        {!showLogin && !showRegister && !showFirm && !showProduct && !showWelcome && !showAllProducts && (
          <GuestWelcome />
        )}
      </div>
    </section>
  )
}

export default LandingPage
