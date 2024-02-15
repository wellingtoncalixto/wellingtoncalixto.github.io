function showMenu() {
  const menu = document.querySelector(".menu-list");

  const menuHamburguerIcon = document.querySelector("#hamburguer-menu");

  menu.classList.add("mobile-menu");
  menuHamburguerIcon.classList.add("display-none");
}

function hidenMenu() {
  const menu = document.querySelector(".menu-list");
  const menuHamburguerIcon = document.querySelector("#hamburguer-menu");

  menu.classList.remove("mobile-menu");
  menuHamburguerIcon.classList.remove("display-none");
}
