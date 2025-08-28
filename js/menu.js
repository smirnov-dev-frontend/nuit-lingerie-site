document.addEventListener("DOMContentLoaded", () => {
   const burger = document.querySelector(".header__menu-burger");
   const menu = document.querySelector(".header__menu");

   burger.addEventListener("click", () => {
      burger.classList.toggle("active");
      menu.classList.toggle("active");
      document.body.classList.toggle("lock");
   });
});
