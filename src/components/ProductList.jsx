import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import ProductForm from "./ProductForm";

const API_URL = "http://localhost:3000/products";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts(); // 초기 한번 fetch 다 불러오는 것들. 비동기적으로 불러오는거니까 이거 실행하면서 다른 것도 동시 실행이 됨.
  }, []);

  const fetchProducts = async () => {
    const res = await fetch(API_URL); // fetch는 비동기 함수지만 res가 있어야 다음 작업이 수행 가능하기에 동기적으로 await 붙임임
    // fetch는 기본적으로 백앤드와 통신하는 함수. 아무 인자도 안넣으면 get이 실행된다. -> 모든 rest api 통신은 이 fetch로 구현해야!
    const data = await res.json(); // json 데이터를 완전히 불러올때까지 동기적으로 기다려야한다고 한다. .json이 비동기 함수라.
    setProducts(data); // product state에 저장.
  };
  // 즉 딱 한번 백엔드에 있는 데이터 다 get 하는 것.
  // restapi - get : 목록 가져오기 / post : 추가하기 / put : 수정하기 / delete : 삭제하기
  // 각각을 CRUD라고 부르기도 하는 느낌. Create, Read, Update, Delete

  const handleDelete = async (id) => {
    // 몇번째 id를 받아오는 건지 자동으로 되어있겠지. ㅇㅇ productcard 보니 product.id 받아오네.

    // TODO: DELETE API를 호출하고 fetchProducts() 호출
    // fetchProducts 다시 호출하는 이유는 수정한 이후에 product 목록을 다시 조회해야하니까.

    // handleDelete는 ProductCard에서 삭제 버튼을 눌렀을 때 실행되는 함수.

    await fetch(`${API_URL}/${id}`, {
      // 이런 주소 설정을 api 명세서가 알려주는 거임.
      // 어떤 주소로 요청을 보내면 / 이런 방식으로 받아오고 / 이런 데이터를 주고 받자고.

      method: "DELETE",
    });
    fetchProducts(); // 목록 새로 고침을 위해. 다시 한번 쭉 데이터 긁어오는.
  };

  const handleAdd = async (newProduct) => {
    // TODO: POST API를 호출하고 fetchProducts() 호출
    // 얘는 post라 body를 보내야함. 일부만 보내도 됨.

    await fetch(API_URL, {
      method: "POST", // post 요청 보내고
      headers: {
        // header는 그냥 안정성 때문에 붙이고
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct), // newProduct를 string 형식으로 body에 담아서 보내기.
      // newProduct는 ProductForm에서 알아서 다 정의가 되어있는 양식.
    });
    fetchProducts();
  };

  const handleEdit = async (updatedProduct) => {
    // TODO: PUT API를 호출하고 fetchProducts() 호출

    await fetch(`${API_URL}/${updatedProduct.id}`, {
      // updatedProduct도 기본적으로 product 기반이라 .id 있더라
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct), // 다 구현이 되어있으니까 그냥 이렇게 딸깍 하면 됨.
    });
    fetchProducts();
  };

  return (
    <div>
      <ProductForm onAdd={handleAdd} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {products.map((product) => (
          // TODO: ProductCard 컴포넌트를 적절히 호출하기
          // Note that you should specify key, product, onDelete, onEdit

          // 이 return 부분은 가져온 products를 화면에 띄우도록 html과 css를 설정하는 부분.
          // productCard 컴포넌트를 이용해서 product를 띄우겠다.
          // productCard의 기본 모드: 상품 이미지, 제목, 가격, 설명 + [Edit], [Delete] 버튼

          <ProductCard
            key={product.id} // 고유하게 product를 구분하기 위해
            product={product} // 표현할 요소
            onDelete={handleDelete} // 삭제 버튼 누르면 handleDelete가 실행되면서 백앤드와 연동된 데이터 업데이트 후 다시 불러오는 형식으로.
            // 그냥 그렇게 ProductCard라는 컴포넌트가 이미 구현이 되어있는 것이기 때문에, 내부 원리는 알 필요 없음.
            // 각 prop들이 무슨 역할인지만 알면 됨.
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
