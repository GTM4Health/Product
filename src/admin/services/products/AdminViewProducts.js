import React, { useState, useEffect } from "react";
import Footer from "../../../layout/pages/Footer"
import AdminMenuBar from "../../../layout/admin/AdminMenubar";
import useAuth from "../../../hooks/useAuth";
import AdminHeader from "../../../layout/admin/AdminHeader";

import axios from "axios";
import { stateOptions, getCityOptionsByState } from "../../../assets/cityOptions";
import EditProductForm from "./AdminUpdateProduct";

const ProductPortal = () => {
  const isAuthenticated = useAuth();
  const [products, setProducts] = useState([]);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedState, setSelectedState] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated, currentPage, selectedState, selectedCity]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedState]);

  const fetchProducts = async () => {
    let url = `${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/Products/products-portal?`;
  
    const params = new URLSearchParams();
    params.append('page', currentPage);
    params.append('limit', pageSize);
  
    if (selectedState !== 'all') {
      params.append('state', selectedState);
    }
  
    if (selectedCity !== 'all') {
      params.append('city', selectedCity);
    }
  
    try {
      const response = await axios.get(url + params.toString());
      setProducts(response.data.products);
      setTotalRows(response.data.totalRows);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleDeleteProduct = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/Products/delete-product/${id}`);
      setProducts(products.filter((product) => product._id !== id));
      console.log("Product deleted successfully");
    } catch (error) {
      console.error(error);
      console.log("Error deleting product");
    }
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setEditFormVisible(true);
  };

  const handleUpdateProduct = async (id, updatedData) => {
    try {
      const requestData = {
        data: updatedData,
      };

      await axios.put(`${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/Products/update-product/${id}`, requestData);
      setEditFormVisible(false);
      setSelectedProduct(null);
      fetchProducts();
      console.log("Product updated successfully");
    } catch (error) {
      console.error(error);
      console.log("Error updating product");
    }
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePrevPage = () => {
    if (!isFirstPage) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNextPage = () => {
    if (!isLastPage) {
      setCurrentPage(prevPage => prevPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    setSelectedCity("all");
    setCurrentPage(1);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    setCurrentPage(1);
  };

  if (!isAuthenticated) {
    // Optional: Show a loading state or return null while checking authentication
    return null;
  }

  const displayedProducts = products;

  return (
    <div className="page-view">
      <AdminHeader />
      <div className="d-content">
        <div className="dashboard">
          <AdminMenuBar />
          <div className="page-title">
            <h1 className="page-title-child">Products</h1>
          </div>
          <div className="filter-container">
            <label className="f-label"  htmlFor="state-select">State:</label>
            <select id="state-select" value={selectedState} className="form-outline f-select" onChange={handleStateChange}>
              <option value="all">All</option>
              {stateOptions.map((state) => (
                <option key={state.value} value={state.value}>
                  {state.label}
                </option>
              ))}
            </select>
            <label className="f-label" htmlFor="city-select">City:</label>
            <select id="city-select" value={selectedCity} className="form-outline f-select" onChange={handleCityChange}>
              <option value="all">All</option>
              {getCityOptionsByState(selectedState).map((city) => (
                <option key={city.value} value={city.value}>
                  {city.label}
                </option>
              ))}
            </select>
          </div>
          <div className="page-display">
            <h4 className="total-rows">Total Products = {totalRows}</h4>
            <h4 className="right">
              <i>
                Displaying Page {currentPage} of {totalPages}
              </i>
            </h4>
          </div>
          <div className="table-content">
            <table className="user-table">
              <thead>
                <tr>
                  <th>Sl No.</th>
                  <th>Company Name</th>
                  <th>State</th>
                  <th>City</th>
                  <th>Address</th>
                  <th>Website</th>
                  <th>Product Name</th>
                  <th>Product Code</th>
                  <th>Description</th>
                  <th>HSN Code</th>
                  <th>Quantity Sets</th>
                  <th>Unit Price</th>
                  <th>Total Price</th>
                  <th>GST</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedProducts.map((product, index) => (
                  <tr key={product._id}>
                    <td>{(currentPage - 1) * pageSize + index + 1}</td>
                    <td>{product.companyName}</td>
                    <td>{product.state}</td>
                    <td>{product.city}</td>
                    <td>{product.address}</td>
                    <td>{product.website}</td>
                    <td>{product.productName}</td>
                    <td>{product.productCode}</td>
                    <td>{product.description}</td>
                    <td>{product.hsnCode}</td>
                    <td>{product.qtySets}</td>
                    <td>{product.unitPrice}</td>
                    <td>{product.totalPrice}</td>
                    <td>{product.GST}</td>
                    <td>
                      <button className="edit-button" onClick={() => handleEditProduct(product)}>
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button className="delete-button" onClick={() => handleDeleteProduct(product._id)}>
                        <i className="fa fa-trash" aria-hidden="true"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination-buttons">
            {!isFirstPage && (
              <button className="prev-button" onClick={handlePrevPage}>
                &laquo; Prev
              </button>
            )}
            {!isLastPage && (
              <button className="next-button" onClick={handleNextPage}>
                Next &raquo;
              </button>
            )}
          </div>
        </div>
      </div>
      {editFormVisible && (
        <EditProductForm
          product={selectedProduct}
          onUpdate={(id, updatedData) => handleUpdateProduct(id, updatedData)}
          onCancel={() => setEditFormVisible(false)}
        />
      )}
      <Footer />
    </div>
  );
};

export default ProductPortal;
