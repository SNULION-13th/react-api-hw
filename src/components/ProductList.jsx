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
    // TODO: DELETE API를 호출하고 fetchProducts() 호출
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then()
      .catch((error) => {
        console.error("ERROR: DELETE", error);
      });

    await fetchProducts();
  };

  const handleAdd = async (newProduct) => {
    // TODO: POST API를 호출하고 fetchProducts() 호출
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("ERROR: POST", error);
      });

    await fetchProducts();
  };

  const handleEdit = async (updatedProduct) => {
    // TODO: PUT API를 호출하고 fetchProducts() 호출
    await fetch(`${API_URL}/${updatedProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    })
      .then()
      .catch((error) => {
        console.error("ERROR: PUT", error);
      });

    await fetchProducts();
  };

  return (
    <div>
      <ProductForm onAdd={handleAdd} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {products.map((product) => (
          // TODO: ProductCard 컴포넌트를 적절히 호출하기
          // Note that you should specify key, product, onDelete, onEdit
          <ProductCard
            product={product}
            onDelete={handleDelete}
            onEdit={handleEdit}
          ></ProductCard>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
