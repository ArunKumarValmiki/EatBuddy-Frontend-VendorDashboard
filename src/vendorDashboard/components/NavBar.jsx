import React from 'react'

const NavBar = ({ showLoginHandler, showRegisterHandler, showLogOut, logOutHandler, goHomeHandler }) => {
  const firmName = localStorage.getItem('firmName')

  return (
    <div className="navSection">
      <div
        className="company"
        onClick={goHomeHandler}
        title="Go to Dashboard"
        style={{ cursor: 'pointer' }}
      >
        <span className="navTitle">EatBuddyVendorDashboard</span>
      </div>

      <div className="firmName">
        <h4>Firm Name : {firmName || "None"}</h4>
      </div>

      <div className="userAuth">
        {!showLogOut ? (
          <>
            <button className="authBtn" onClick={showLoginHandler}>Login</button>
            <button className="authBtn" onClick={showRegisterHandler}>Register</button>
          </>
        ) : (
          <button className="authBtn" onClick={logOutHandler}>Logout</button>
        )}
      </div>
    </div>
  )
}

export default NavBar
