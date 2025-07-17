import React from 'react';

const SideBar = ({ showFirmHandler, showProductHandler, showAllProductsHandler, showFirmTitle }) => {
  return (
    <aside className="sideBarSection">
      <ul>
        {showFirmTitle && (
          <li className="sidebarItem" onClick={showFirmHandler}>
            Add Firm
          </li>
        )}
        <li className="sidebarItem" onClick={showProductHandler}>Add Product</li>
        <li className="sidebarItem" onClick={showAllProductsHandler}>All Products</li>
      </ul>
    </aside>
  );
};

export default SideBar;
