const products_box = document.querySelector("#products_box");
const filter_options = document.querySelectorAll(
  "#filter_options .dropdown .dropdown-menu a"
);
const product_categories = document.querySelectorAll(".product_categories div");
var search = localStorage.getItem("search") || "";
const token = localStorage.getItem("token");

filter_options.forEach((option) => {
  option.addEventListener("click", () => {
    // if(option.innerHTML.includes("To")){
    //     let low va
    // }
  });
});

// product_categories filter

product_categories.forEach((el) => {
  el.addEventListener("click", () => {
    query =
      "search=" + el.innerHTML.slice(0, el.innerHTML.length - 1).toLowerCase();

    console.log(query);
    fetchProduct();
  });
});

let query = "jean";
// side navbar filters
input = document.querySelector("seacrh");

fetchProduct();
function fetchProduct() {
  console.log(query);
  let res = fetch(`http://localhost:7700/products?` + query, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization:
        "Bearer " +
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDIyYzgyOWMzYjM4NjIwYjFhZTNlMDIiLCJpYXQiOjE2ODAzNzAwNzYsImV4cCI6MTY4MDM3NzI3Nn0.L6_q-8kpKQRm_BZntMmKxEQ61HqWM_lVUEKYJ6EUmRc",
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

function display(data) {
  products_box.innerHTML = data
    .map((product) => {
      return ` <div class="product_card" >
        <div class="product_card_img" id="${product._id}">
          <img
            src="${product.image1}"
            alt=""
          />
          <p>${product.discount}</p>
        </div>
        <div class="product_card_title">${product.title}</div>
        <div class="product_card_price">
          <div>
          <p>  ₹${(
            product.price -
            (product.price * +product.discount.split("%")[0]) / 100
          ).toFixed(0)}</p>
          <p>₹${product.price}</p>
          <div>${product.rating}<i class="fa-solid fa-star"></i></div>
          
       
       
          </div>
          <div>🛒</div>
        </div>
      </div>`;
    })
    .join("");

  let images = document.querySelectorAll(".product_card_img");
  images.forEach((image) => {
    image.addEventListener("click", () => {
      alert(image.getAttribute("id"));
    });
  });
}
