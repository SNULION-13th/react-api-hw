import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import ProductForm from "./ProductForm";

const API_URL = "http://localhost:3000/products";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setProducts(data);
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`,{ method: 'DELETE'});
    fetchProducts();
  };

  const handleAdd = async (newProduct) => {
    await fetch(`${API_URL}`, { 
      method: 'POST',
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(newProduct)
    });
    fetchProducts();
  };

  const handleEdit = async (updatedProduct) => {
    await fetch(`${API_URL}/${updatedProduct.id}`, {
      method: 'PUT',
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(updatedProduct)
    });
    fetchProducts();
  };

  return (
    <div>
      <ProductForm onAdd={handleAdd} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {products.map((product) => (
          <ProductCard key={product.id} 
          product={product} 
          nDelete={handleDelete} 
          onEdit={handleEdit} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
