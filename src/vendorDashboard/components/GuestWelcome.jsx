import React from 'react'

const GuestWelcome = () => {
  const containerStyle = {
    backgroundImage: 'url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1650&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    padding: 0,
  }

  const overlayStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: '40px 50px',
    borderRadius: '16px',
    textAlign: 'center',
    color: '#fff',
    maxWidth: '600px',
    width: '90%',
    boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
  }

  const titleStyle = {
    fontSize: '2.5rem',
    marginBottom: '15px',
    color: '#4caf50',
  }

  const subtitleStyle = {
    fontSize: '1.1rem',
    color: '#ccc',
  }

  return (
    <div style={containerStyle}>
      <div style={overlayStyle}>
        <h2 style={titleStyle}>Welcome to EatBuddy 👋</h2>
        <p style={subtitleStyle}>
          Please <strong>log in</strong> or <strong>register</strong> using the buttons above to begin managing your firm and products.
        </p>
      </div>
    </div>
  )
}

export default GuestWelcome
