(function() {
  "use strict";

  window.addEventListener("DOMContentLoaded", function() {
    var $carousel = document.querySelector(".carousel");
    var $carousel__inner = $carousel.querySelector(".carousel__inner");
    var $carousel__item = $carousel__inner.querySelectorAll(".carousel__item");
    var $carousel__btn = $carousel.querySelectorAll(".carousel__btn");
    var $carousel__paginacao = $carousel.querySelector(".carousel__paginacao");
    var carousel__inner__width = [];
    var countClick__btn = 0;
    var size__item;
    var len__carousel;
    var interval = null;
    var lis;
    var width = $carousel.offsetWidth;
    var height = window.innerHeight;

    // change styles using javascript
    $carousel.style.overflowX = "hidden";
    $carousel__inner.style.width = $carousel__item.length + "00%";

    for (var x = 0; x < $carousel__item.length; x++) {
      var li = document.createElement("li");
      $carousel__item[x].style.width = width + "px";
      $carousel__item[x].style.height = height / 1.5 + "px";

      var img = $carousel__item[x].querySelector("img");
      var img__src = img.getAttribute("src");

      img.style.display = "none";
      $carousel__item[x].style.backgroundImage = "url(" + img__src + ")";

      // if(x === 0){
      //     size__item = 0;
      //     carousel__inner__width.push(size__item);
      // } else {
      //     size__item += $carousel__item[x].offsetWidth;
      //     carousel__inner__width.push(size__item);
      // }

      size__item = !x ? 0 : (size__item += $carousel__item[x].offsetWidth);
      carousel__inner__width.push(size__item);

      li.setAttribute("data-item", x);
      $carousel__paginacao.appendChild(li);
      li.addEventListener("click", moveSlide__btn);
    }

    lis = $carousel__paginacao.querySelectorAll("li");
    lis[0].classList.add("atual");

    for (var x = 0; x < $carousel__btn.length; x++) {
      $carousel__btn[x].addEventListener("click", moveSlide__btn);
      $carousel__btn[x].style.display = "block";
    }

    len__carousel = carousel__inner__width.length;
    interval = intervalItens();

    function intervalItens() {
      return setInterval(CounterItemMore, 3000);
    }

    function moveSlide__btn(e) {
      e.preventDefault();
      clearInterval(interval);

      var click__btn = e.target.dataset.move;
      var click__item = e.target.dataset.item;
      click__item = parseInt(click__item, 10);

      if (!!click__btn && click__btn === "prev") {
        CounterItemLess();
      } else if (!!click__btn && click__btn === "next") {
        CounterItemMore();
      } else {
        for (var x = 0; x < len__carousel; x++) {
          if (click__item === x) {
            countClick__btn = click__item;
            changeColor(countClick__btn);
            moveSlide__item(carousel__inner__width[x]);
          }
        }
      }

      if (!!interval) {
        interval = intervalItens();
      }
    }

    function CounterItemLess() {
      if (countClick__btn === 0) {
        countClick__btn = len__carousel - 1;
      } else {
        countClick__btn--;
      }
      changeColor(countClick__btn);
      moveSlide__item(carousel__inner__width[countClick__btn]);
    }

    function CounterItemMore() {
      countClick__btn++;
      if (
        countClick__btn === len__carousel ||
        countClick__btn > len__carousel
      ) {
        countClick__btn = 0;
      }
      changeColor(countClick__btn);
      moveSlide__item(carousel__inner__width[countClick__btn]);
    }

    function moveSlide__item(position) {
      return ($carousel__inner.style.transform =
        "translate(-" + position + "px)");
    }

    function changeColor(position) {
      var hasAtual = document.querySelector(".atual");
      if (hasAtual) {
        hasAtual.classList.remove("atual");
      }
      lis[position].classList.add("atual");
    }
  });
})();
