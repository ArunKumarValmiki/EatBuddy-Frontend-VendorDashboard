import React from 'react'

const Welcome = () => {
  
  const vendorName = localStorage.getItem('vendorName') || 'Vendor'

  const containerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    minHeight: '100dvh',
    backgroundImage: "url('/Images/Vendor-1.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundBlendMode: 'darken',
    filter: 'brightness(0.9)',
    zIndex: 0,
  }

  const overlayStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)', // Center precisely
    backgroundColor: 'rgba(164, 95, 60, 0.75)', 
    padding: '3rem 2.5rem',
    borderRadius: '20px',
    color: '#fff',
    textAlign: 'center',
    maxWidth: '600px',
    width: '90%',
    boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
    animation: 'fadeIn 1s ease-in-out',
  }

  const headingStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '1.2rem',
  }

  const textStyle = {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    color: '#ddd',
  }

  return (
    <div style={containerStyle}>
      <div style={overlayStyle}>
        <h2 style={headingStyle}>Welcome {vendorName} !</h2>
        <p style={textStyle}>
          You’re now logged in to your dashboard. Begin managing your firms and products with ease. Click on sidebar options to get started.
        </p>
      </div>

      {/* Inline keyframe styles */}
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translate(-50%, calc(-50% + 20px)); }
            100% { opacity: 1; transform: translate(-50%, -50%); }
          }

          @media (max-width: 600px) {
            h2 {
              font-size: 1.8rem !important;
            }

            p {
              font-size: 1rem !important;
            }
          }
        `}
      </style>
    </div>
  )
}

export default Welcome
