import React, { useState, useEffect } from 'react';
import { API_URL } from '../data/ApiPath';

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  const productsHandler = async () => {
    const firmId = localStorage.getItem('firmId');
    try {
      const response = await fetch(`${API_URL}/product/${firmId}/products`);
      const newProductsData = await response.json();
      setProducts(newProductsData.products || []);
    } catch (error) {
      console.error('Failed to fetch the products', error);
      alert('Failed to fetch the products');
    }
  };

  useEffect(() => {
    productsHandler();
  }, []);

  const deleteProductById = async (productId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this product?");
  if (!confirmDelete) return;

  try {
    const response = await fetch(`${API_URL}/product/${productId}`, {
      method: 'DELETE',
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Error deleting product:', result);
      alert(result.error || 'Failed to delete product');
      return;
    }

    setProducts(products.filter(product => product._id !== productId));
    alert(result.message || "Product deleted successfully");
  } catch (error) {
    console.error('Failed to delete product:', error);
    alert('Network or server error: Failed to delete product');
  }
};


  return (
    <div style={{ minHeight: '100vh', padding: '6rem', background: '#f9f9f9' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>All Products</h2>

      {products.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No products added</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            background: '#fff',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)'
          }}>
            <thead>
              <tr style={{ background: '#eee' }}>
                <th style={cellStyle}>Product Name</th>
                <th style={cellStyle}>Price</th>
                <th style={cellStyle}>Image</th>
                <th style={cellStyle}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item._id}>
                  <td style={cellStyle}>{item.productName}</td>
                  <td style={cellStyle}>₹{item.price}</td>
                  <td style={cellStyle}>
                    {item.image && (
                      <img
                        src={`${API_URL}/uploads/${item.image}`}
                        alt={item.productName}
                        style={{ width: "50px", height: "50px", objectFit: 'cover' }}
                      />
                    )}
                  </td>
                  <td style={cellStyle}>
                    <button
                      onClick={() => deleteProductById(item._id)}
                      style={{
                        padding: '6px 12px',
                        background: 'red',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const cellStyle = {
  padding: '12px',
  border: '1px solid #ddd',
  textAlign: 'center'
};

export default AllProducts;
