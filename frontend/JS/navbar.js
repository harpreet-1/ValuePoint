function myFunction() {
  var x = document.getElementById("nav");
  if (x.className === "navbar") {
    x.className += " responsive";
  } else {
    x.className = "navbar";
  }
}

const left_btn = document.querySelector("#top_deals_container_left_btn");
const right_btn = document.querySelector("#top_deals_container_right_btn");

right_btn.addEventListener("click", function (event) {
  // alert('ke')
  event.preventDefault();
  const connet = document.querySelector("#top_deals");
  connet.scrollLeft += 600;
});
left_btn.addEventListener("click", function (event) {
  // alert('ke')
  event.preventDefault();
  const connet = document.querySelector("#top_deals");
  connet.scrollLeft -= 600;
});
