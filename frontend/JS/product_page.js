const products_box = document.querySelector("#products_box");
const filter_options = document.querySelectorAll(
  "#filter_options .dropdown .dropdown-menu a"
);
const product_categories = document.querySelectorAll(".product_categories div");
var search = localStorage.getItem("search") || "";
const token = localStorage.getItem("token");

let current_data = [];

filter_options.forEach((option) => {
  option.addEventListener("click", () => {
    // if(option.innerHTML.includes("To")){
    //     let low va
    // }
  });
});

products_box.innerHTML = "";

product_categories.forEach((el) => {
  el.addEventListener("click", () => {
    search = el.innerHTML.slice(0, el.innerHTML.length - 1).toLowerCase();

    console.log(query);
    fetchProduct();
  });
});

let query = "jean";
// side navbar filters
// input = document.querySelector("seacrh");

fetchProduct();
function fetchProduct() {
  console.log(query);
  let res = fetch(
    `https://inquisitive-gray-hedgehog.cyclic.app/products?search=` + search,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }
  )
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
  products_box.innerHTML = data
    .map((product) => {
      return ` <div class="product_card" >
        <div onclick="myFunction('${
          product._id
        }')" class="product_card_img" id="${product._id}">
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

  // let images = document.querySelectorAll(".product_card_img");
  // images.forEach((image) => {
  //   image.addEventListener("click", () => {
  //     alert(image.getAttribute("id"));
  //   });
  // });
}
