const top_deals = document.querySelector("#top_deals");

const baseurl = "https://inquisitive-gray-hedgehog.cyclic.app/";

fetchProduct();
function fetchProduct() {
  let res = fetch(`${baseurl}/products?sort=-rating&page=1&limit=20`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      display(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function myFunction(id) {
  //   alert(id);
  localStorage.setItem("id", id);
  window.location.href = "./product_detail.html";
}
function display(data) {
  top_deals.innerHTML = data
    .map((product) => {
      if (!product.discount) {
        product.discount = "25% OFF";
      }
      return ` <div class="top_deal_card">
      <div onclick="myFunction('${product._id}')" class="top_deal_card_img">
        <img
            src="${product.image1}""
          alt=""
        />
        <p>${product.discount}</p>
      </div>
      <div class="top_deal_card_title">${product.title}</div>
      <div class="top_deal_card_price">
        <div>
        <p>  ₹${(
          product.price -
          (product.price * +product.discount.split("%")[0]) / 100
        ).toFixed(0)}</p>
        <p>₹${product.price}</p>   
        </div>
        <div>🛒</div>
      </div>
    </div>`;
      //   top_deals.innerHTML = data
      //     .map((product) => {
      //       if (!product.discount) {
      //         // product.discount="12"
      //       }
      //       return ` <div class="product_card" >
      //         <div class="product_card_img" id="${product._id}">
      //           <img
      //             src="${product.image1}"
      //             alt=""
      //           />
      //           <p>${product.discount}</p>
      //         </div>
      //         <div class="product_card_title">${product.title}</div>
      //         <div class="product_card_price">
      //           <div>
      //   <p>  ₹${(
      //     product.price -
      //     (product.price * +product.discount.split("%")[0]) / 100
      //   ).toFixed(0)}</p>
      //           <p>₹${product.price}</p>
      //           <div>${product.rating}<i class="fa-solid fa-star"></i></div>

      //           </div>
      //           <div>🛒</div>
      //         </div>
      //       </div>`;
    })
    .join("");

  let images = document.querySelectorAll(".product_card_img");
  images.forEach((image) => {
    image.addEventListener("click", () => {
      alert(image.getAttribute("id"));
    });
  });
}
