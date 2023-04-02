const baseurl = "https://inquisitive-gray-hedgehog.cyclic.app/";

fetchProduct();
function fetchProduct() {
  let res = fetch(`${baseurl}/products/` + localStorage.getItem("id"), {
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
      if (data.message) {
      } else {
        renderData(data);
      }
      //   display(data);
    })
    .catch((err) => {
      console.log(err);
    });
}
function renderData(product) {
  // product size

  let sizes = document.querySelectorAll(".sizes div");
  sizes.forEach((el, i) => {
    el.addEventListener("click", () => {
      if (el.style.backgroundColor == "rgb(153, 204, 51)") {
        el.style.backgroundColor = "rgba(0, 0, 0, 0.05)";
        delete product.size;
      } else {
        product.size = el.innerHTML;
        console.log(product);
        el.style.backgroundColor = "#9c3";
      }

      for (let j = 0; j < 5; j++) {
        if (j != i) {
          sizes[j].style.backgroundColor = "rgba(0, 0, 0, 0.05)";
        }
      }
    });
  });

  let cart_value = JSON.parse(localStorage.getItem("cart_items")) || 0;
  let mrp_price = document.getElementById("mrp_price");
  let dis_price = document.getElementById("dis_price");
  let save = document.getElementById("save");
  let title = document.getElementById("title");
  let rating1 = document.getElementById("rating1");
  let quantity = document.getElementById("quantity");
  let inrement = document.getElementById("inrement");
  let decrement = document.getElementById("decrement");
  let addtocart = document.getElementById("addtocart");

  let main_img = document.querySelector(".big_img");

  // product details

  //   let product = JSON.parse(localStorage.getItem("product"));
  main_img.src = product.image1;
  mrp_price.innerText = "₹ " + product.price;
  title.innerText = product.title.toUpperCase();
  dis_price.innerText =
    "₹ " +
    (
      product.price -
      (product.price * +product.discount.split("%")[0]) / 100
    ).toFixed(0);
  save.innerText =
    "₹ " +
    (product.price -
      (
        product.price -
        (product.price * +product.discount.split("%")[0]) / 100
      ).toFixed(0));
  let quantity_number = +quantity.innerText;

  inrement.addEventListener("click", () => {
    quantity_number++;
    quantity.innerText = quantity_number;
    product.quantity = quantity_number;
    localStorage.setItem("product", JSON.stringify(product));
  });
  decrement.addEventListener("click", () => {
    if (quantity_number > 1) {
      quantity_number--;
      quantity.innerText = quantity_number;
      product.quantity = quantity_number;
      localStorage.setItem("product", JSON.stringify(product));
    }
  });

  let cart_data = JSON.parse(localStorage.getItem("cart")) || [];
  console.log(cart_data);
  addtocart.addEventListener("click", () => {
    product.quantity = +quantity_number;
    if (document.getElementById("uername").innerText === "LOGOUT") {
      cart_data.push(product);
      localStorage.setItem("cart", JSON.stringify(cart_data));
      alert("Product added to cart");

      // {
      //   let res = fetch(`${baseurl}/todos/create`, {
      //     method: "POST",
      //     headers: {
      //       "content-type": "application/json",
      //       Authorization: "Bearer " + localStorage.getItem("token"),
      //     },

      //     body: JSON.stringify(product),
      //   })
      //     .then(function (response) {
      //       return response.json();
      //     })
      //     .then((data) => {
      //       if (data.message == "cart added successfully") {
      //         alert("Product successfully added to cart");
      //       } else {
      //         alert("Product already in cart");
      //       }
      //       console.log(data);
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
      // }

      cart_value += product.quantity;
      localStorage.setItem("cart_items", JSON.stringify(cart_value));
    } else {
      alert("Please login to continue!");
      localStorage.setItem("loginfrom", "product_detail.html");
      window.location.href = "loginuser.html";
      localStorage.setItem("login_1", true);
    }
  });
}
function check(n) {
  for (let i = 0; i < cart_data.length; i++) {
    if (cart_data[i].id == n) {
      return false;
    }
  }
  return true;
}

// cart_value = JSON.parse(localStorage.getItem("cart_items")) || 0;
// cart_value++;
// localStorage.setItem("cart_items", JSON.stringify(cart_value));
cart_item = document.getElementById("cart_quantity");

// cart_item.innerText = cart_value;
