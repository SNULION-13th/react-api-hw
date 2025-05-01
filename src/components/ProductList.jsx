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
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    await fetchProducts();
  } catch (e) {
    console.error("failed to delete", e);
  }
};

const handleAdd = async (newProduct) => {
  try {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    await fetchProducts();
  } catch (e) {
    console.error("failed to add", e);
  }
};

const handleEdit = async (updatedProduct) => {
  try {
    await fetch(`${API_URL}/${updatedProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    await fetchProducts();
  } catch (e) {
    console.error("failed to edit", e);
  }
};

  return (
    <div>
      <ProductForm onAdd={handleAdd} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {products.map((product) => (
          // TODO: ProductCard 컴포넌트를 적절히 호출하기
          // Note that you should specify key, product, onDelete, onEdit
          <ProductCard
          key={product.id}
          product={product}
          onDelete={handleDelete}
          onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
