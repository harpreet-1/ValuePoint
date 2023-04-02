let username = localStorage.getItem("username") || null;

let nameel = document.querySelector("#right_nav > :nth-child(3) p");
if (username) {
  nameel.innerHTML = "LOGOUT";
  nameel.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    location.reload();
  });
} else {
  nameel.innerHTML = "LOGIN";
  nameel.addEventListener("click", () => {
    localStorage.setItem("loginfrom", location.href);
    window.location.href = "./loginuser.html";
  });
}
