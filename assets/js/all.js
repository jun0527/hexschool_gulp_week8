"use strict";

var main = document.querySelector('main');
var menuCollapseBtn = document.querySelector('.js-menuCollapseBtn');
var menuIcon = document.querySelector('.js-menuIcon');
var pagination = document.querySelectorAll('.js-pagination');
var preBtn = document.querySelector('.js-preBtn');
var nextBtn = document.querySelector('.js-nextBtn');
var planCards = document.querySelectorAll('.js-planCard li');
var planCardButtons = document.querySelectorAll('.js-planCard a');
var chooseArrow = document.querySelector('.js-chooseArrow');
var courseLvArea = document.querySelector('.js-chooseCollapse');
var nextStepBtnArea = document.querySelector('.js-nextStepBtn');
var nextStepBtn = document.querySelector('.js-nextStepBtn a');
var courseName = document.querySelector('.js-courseName');
var courseLv = document.querySelectorAll('.js-courseLvList a');
var dateArea = document.querySelector('.js-dateArea'); //menu 摺疊按鈕切換

menuCollapseBtn.addEventListener('click', function (e) {
  if (menuCollapseBtn.getAttribute('class') === 'js-menuCollapseBtn d-block collapsed') {
    menuIcon.textContent = 'reorder';
  } else {
    menuIcon.textContent = 'close';
  }
}); //首頁課程swiper

if (main.getAttribute('data-page') === 'index') {
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 2,
    spaceBetween: 30,
    loop: true
  });
} //課程介紹師資介紹swiper


if (main.getAttribute('data-page') === 'course') {
  var _swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    // autoHeight: true,
    breakpoints: {
      // when window width is >= 320px
      768: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      // when window width is >= 480px
      992: {
        slidesPerView: 3,
        spaceBetween: 30
      }
    }
  });
} //瑜珈空間課程推薦swiper


if (main.getAttribute('data-page') === 'surroundings') {
  var _swiper2 = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 3000
    },
    breakpoints: {
      // when window width is >= 320px
      768: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      // when window width is >= 480px
      992: {
        slidesPerView: 4,
        spaceBetween: 30
      }
    }
  });
} //首頁評論手機板換頁


window.addEventListener('resize', function () {
  if (main.getAttribute('data-page') === 'index') {
    if (document.body.clientWidth < 768) {
      var paginationNum = 1;
      changePage(paginationNum);
      preBtn.addEventListener('click', function (e) {
        paginationNum--;
        isDisabled(paginationNum);
        changePage(paginationNum);
      });
      nextBtn.addEventListener('click', function (e) {
        paginationNum++;
        isDisabled(paginationNum);
        changePage(paginationNum);
      });
    } else {
      pagination.forEach(function (item) {
        item.setAttribute('class', 'js-pagination row flex-md-nowrap');
      });
    }
  }
});

function changePage(paginationNum) {
  pagination.forEach(function (item, index) {
    if (index !== paginationNum - 1) {
      item.setAttribute('class', 'js-pagination row flex-md-nowrap d-none');
    } else {
      item.setAttribute('class', 'js-pagination row flex-md-nowrap');
    }
  });
}

function isDisabled(paginationNum) {
  preBtn.setAttribute('class', 'js-preBtn');
  nextBtn.setAttribute('class', 'js-preBtn');

  if (paginationNum === 1) {
    preBtn.setAttribute('class', 'js-preBtn disabled');
  }

  if (pagination.length === paginationNum) {
    nextBtn.setAttribute('class', 'js-preBtn disabled');
  }
} //首頁方案選擇


if (main.getAttribute('data-page') === 'index') {
  planCardButtons.forEach(function (item, index) {
    item.addEventListener('click', function () {
      var course;
      var level = '基礎';
      var planNum = index;

      if (index === 0) {
        course = '首次體驗';
      } else if (index === 1) {
        course = '短期體驗';
      } else {
        course = '長期體驗';
      }

      console.log("".concat(course, "\u8AB2\u7A0B-").concat(level));
      var courseName = "".concat(course, "\u8AB2\u7A0B-").concat(level);
      localStorage.setItem('courseName', courseName);
      localStorage.setItem('openPlan', planNum);
    });
  });
} //方案選擇頁


if (main.getAttribute('data-page') === 'choosePlan') {
  var open = function open() {
    chooseCollapse.show();
    btnCollapse.show();
  };

  var change = function change() {
    chooseCollapse.toggle();
    btnCollapse.toggle();
  };

  var openArrow = function openArrow(num) {
    if (num === 0) {
      chooseArrow.setAttribute('class', 'js-chooseArrow col-4 text-center');
      planCardButtons[0].setAttribute('class', 'card overflow-hidden active');
      course = '首次體驗';
    } else if (num === 1) {
      chooseArrow.setAttribute('class', 'js-chooseArrow col-4 offset-lg-4 text-center');
      planCardButtons[1].setAttribute('class', 'card overflow-hidden active');
      course = '短期體驗';
    } else if (num === 2) {
      chooseArrow.setAttribute('class', 'js-chooseArrow col-4 offset-lg-8 text-center');
      planCardButtons[2].setAttribute('class', 'card overflow-hidden active');
      course = '長期體驗';
    }
  };

  var responsiveOpen = function responsiveOpen(index) {
    if (document.body.clientWidth < 992) {
      chooseArrow.setAttribute('class', 'js-chooseArrow text-center');
      planCards.forEach(function (card, num) {
        //當lg以下collapse開啟時，非點擊的課程卡片消失
        courseLvArea.addEventListener('shown.bs.collapse', function () {
          card.setAttribute('class', 'col-lg-4 d-none');

          if (index === num) {
            card.setAttribute('class', 'col-lg-4');
          }
        }); //當lg以下collapse關上時，課程卡片出現

        courseLvArea.addEventListener('hidden.bs.collapse', function () {
          card.setAttribute('class', 'col-lg-4');
        });
      });
    }
  };

  var planCardClearActive = function planCardClearActive() {
    planCardButtons.forEach(function (item) {
      item.setAttribute('class', 'card overflow-hidden');
    });
  }; //選擇方案


  var planNum;
  var course;
  var level = '基礎';
  var openPlanNum = localStorage.getItem('openPlan');
  var chooseCollapse = new bootstrap.Collapse(courseLvArea, {
    toggle: false
  });
  var btnCollapse = new bootstrap.Collapse(nextStepBtnArea, {
    toggle: false
  });

  if (openPlanNum !== '') {
    open();
    openArrow(parseInt(openPlanNum));
    responsiveOpen(parseInt(openPlanNum));
    console.log(openPlanNum);
    courseName.textContent = "".concat(course, "\u8AB2\u7A0B-").concat(level);
    localStorage.setItem('openPlan', '');
    console.log(course);
  }

  planCardButtons.forEach(function (item, index) {
    item.addEventListener('click', function () {
      planCardClearActive();
      openArrow(index);
      responsiveOpen(index);

      if (planNum === index) {
        change();
      } else {
        open();
      }

      planNum = index;
      console.log(course);
      courseName.textContent = "".concat(course, "\u8AB2\u7A0B-").concat(level);
      courseLvArea.addEventListener('hide.bs.collapse', function () {
        level = '基礎';
        planCardClearActive();
        courseLv.forEach(function (item, index) {
          if (index === 0) {
            item.setAttribute('class', 'card h-100 bg-primary shadow-sm p-10 p-lg-6 p-xl-10 active');
          } else {
            item.setAttribute('class', 'card h-100 bg-primary shadow-sm p-10 p-lg-6 p-xl-10');
          }
        });
      });
    });
  });
  courseLv.forEach(function (item, index) {
    item.addEventListener('click', function () {
      courseLv.forEach(function (item) {
        item.setAttribute('class', 'card h-100 bg-primary shadow-sm p-10 p-lg-6 p-xl-10');
      });

      if (index === 0) {
        level = '基礎';
      } else if (index === 1) {
        level = '中階';
      } else if (index === 2) {
        level = '高階';
      }

      item.setAttribute('class', 'card h-100 bg-primary shadow-sm p-10 p-lg-6 p-xl-10 active');
      courseName.textContent = "".concat(course, "\u8AB2\u7A0B-").concat(level);
    });
  });
  nextStepBtn.addEventListener('click', function () {
    console.log(course);
    var courseNameText = "".concat(course, "\u8AB2\u7A0B-").concat(level);
    console.log(courseNameText);
    localStorage.setItem('courseName', course === undefined ? localStorage.getItem('courseName') : "".concat(course, "\u8AB2\u7A0B-").concat(level));
  });
} //立即預約課程名稱切換


if (main.getAttribute('data-page') === 'customerFrom') {
  courseName.textContent = localStorage.getItem('courseName');
  console.log(localStorage.getItem('courseName'));
}

if (main.getAttribute('data-page') === 'reservationDone') {
  courseName.textContent = localStorage.getItem('courseName');
  console.log(localStorage.getItem('courseName'));
} //日期套件


if (main.getAttribute('data-page') === 'customerFrom') {
  var date = new Datepicker(dateArea, {
    minDate: new Date(),
    nextArrow: "<span class=\"material-icons text-secondary\">\n      chevron_right\n      </span>",
    prevArrow: "<span class=\"material-icons text-secondary\">\n      chevron_left\n      </span>"
  });
}
//# sourceMappingURL=all.js.map
