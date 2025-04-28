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
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("상품 불러오기 실패:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) {
        throw new Error("삭제 실패");
      }
      await fetchProducts();
    } catch (error) {
      console.log("삭제 중 오류:", error);
    }
  };

  const handleAdd = async (newProduct) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      if (!res.ok) {
        throw new Error("추가 실패");
      }
      await fetchProducts();
    } catch (error) {
      console.log("추가 중 오류:", error);
    }
    // TODO: POST API를 호출하고 fetchProducts() 호출
  };

  const handleEdit = async (updatedProduct) => {
    try {
      const res = await fetch(`${API_URL}/${updatedProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });
      if (!res.ok) {
        throw new Error("업데이트 실패");
      }
      await fetchProducts();
    } catch (error) {
      console.log("업데이트 중 오류:", error);
    }
    // TODO: PUT API를 호출하고 fetchProducts() 호출
  };

  return (
    <div>
      <ProductForm onAdd={handleAdd} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
          // TODO: ProductCard 컴포넌트를 적절히 호출하기
          // Note that you should specify key, product, onDelete, onEdit
        ))}
      </div>
    </div>
  );
}

export default ProductList;
