const main = document.querySelector('main');
const menuCollapseBtn = document.querySelector('.js-menuCollapseBtn');
const menuIcon = document.querySelector('.js-menuIcon');
const pagination = document.querySelectorAll('.js-pagination');
const preBtn = document.querySelector('.js-preBtn');
const nextBtn = document.querySelector('.js-nextBtn');
const planCards = document.querySelectorAll('.js-planCard li');
const planCardButtons = document.querySelectorAll('.js-planCard a');
const chooseArrow = document.querySelector('.js-chooseArrow');
const courseLvArea = document.querySelector('.js-chooseCollapse');
const nextStepBtnArea = document.querySelector('.js-nextStepBtn');
const nextStepBtn = document.querySelector('.js-nextStepBtn a');
const courseName = document.querySelector('.js-courseName');
const courseLv = document.querySelectorAll('.js-courseLvList a');
const dateArea = document.querySelector('.js-dateArea');
//menu 摺疊按鈕切換
menuCollapseBtn.addEventListener('click', (e) => {
  if (menuCollapseBtn.getAttribute('class') === 'js-menuCollapseBtn d-block collapsed') {
    menuIcon.textContent = 'reorder';
  } else {
    menuIcon.textContent = 'close';
  }
})

//首頁課程swiper
if (main.getAttribute('data-page') === 'index') {
  const swiper = new Swiper(".mySwiper", {
    slidesPerView: 2,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 3000,
    },
  });
}
//課程介紹師資介紹swiper
if (main.getAttribute('data-page') === 'course') {
  const swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
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
      },
    }
  });
}
//瑜珈空間課程推薦swiper
if (main.getAttribute('data-page') === 'surroundings') {
  const swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 3000,
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
      },
    }
  });
}

//首頁評論手機板換頁
window.addEventListener('resize', () =>  {
  if (main.getAttribute('data-page') === 'index') {
    if (document.body.clientWidth < 768) {
      let paginationNum = 1;
      changePage(paginationNum);
      preBtn.addEventListener('click', (e) => {
        paginationNum --;
        isDisabled(paginationNum);
        changePage(paginationNum);
      })
      nextBtn.addEventListener('click', (e) => {
        paginationNum ++;
        isDisabled(paginationNum);
        changePage(paginationNum);
      })
    } else {
      pagination.forEach((item) => {
        item.setAttribute('class', 'js-pagination row flex-md-nowrap');
      })
    }
  }
});
function changePage(paginationNum) {
  pagination.forEach((item, index) => {
    if (index !== paginationNum - 1) {
      item.setAttribute('class', 'js-pagination row flex-md-nowrap d-none');
    } else {
      item.setAttribute('class', 'js-pagination row flex-md-nowrap');
    }
  })
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
}
//首頁方案選擇
if (main.getAttribute('data-page') === 'index') {
  planCardButtons.forEach((item, index) => {
    item.addEventListener('click', () => {
      let course;
      let level = '基礎';
      let planNum = index;
      if (index === 0) {
        course = '首次體驗';
      } else if (index === 1) {
        course = '短期體驗';
      } else {
        course = '長期體驗';
      }
      console.log(`${course}課程-${level}`);
      let courseName = `${course}課程-${level}`
      localStorage.setItem('courseName', courseName);
      localStorage.setItem('openPlan', planNum);
    })
  })
}

//方案選擇頁
if (main.getAttribute('data-page') === 'choosePlan') {
  let planNum;
  let course;
  let level = '基礎';
  let openPlanNum = localStorage.getItem('openPlan');
  const chooseCollapse = new bootstrap.Collapse(courseLvArea, {
    toggle: false
  });
  const btnCollapse = new bootstrap.Collapse(nextStepBtnArea, {
    toggle: false
  });
  if (openPlanNum !== '') {
    open();
    openArrow(parseInt(openPlanNum));
    responsiveOpen(parseInt(openPlanNum));
    console.log(openPlanNum);
    courseName.textContent = `${course}課程-${level}`;
    localStorage.setItem('openPlan', '');
    console.log(course);
  }
  function open() {
    chooseCollapse.show();
    btnCollapse.show();
  }
  function change() {
    chooseCollapse.toggle();
    btnCollapse.toggle();
  }
  function openArrow(num) {
    if (num === 0) {
      chooseArrow.setAttribute('class', 'js-chooseArrow col-4 text-center');
      planCardButtons[0].setAttribute('class', 'card overflow-hidden card-hover active');
      course = '首次體驗';
    } else if (num === 1) {
      chooseArrow.setAttribute('class', 'js-chooseArrow col-4 offset-lg-4 text-center');
      planCardButtons[1].setAttribute('class', 'card overflow-hidden card-hover active');
      course = '短期體驗';
    } else if (num === 2) {
      chooseArrow.setAttribute('class', 'js-chooseArrow col-4 offset-lg-8 text-center');
      planCardButtons[2].setAttribute('class', 'card overflow-hidden card-hover active');
      course = '長期體驗';
    }
  }
  function responsiveOpen(index) {
    if (document.body.clientWidth < 992) {
      chooseArrow.setAttribute('class', 'js-chooseArrow text-center');
      planCards.forEach((card, num) => {
        //當lg以下collapse開啟時，非點擊的課程卡片消失
        courseLvArea.addEventListener('shown.bs.collapse', function () {
          card.setAttribute('class', 'col-lg-4 d-none');
          if (index === num) {
            card.setAttribute('class', 'col-lg-4');
          }
        })
        //當lg以下collapse關上時，課程卡片出現
        courseLvArea.addEventListener('hidden.bs.collapse', function () {
          card.setAttribute('class', 'col-lg-4');
        })
      })
    }
  }
  function planCardClearActive() {
    planCardButtons.forEach((item) => {
      item.setAttribute('class', 'card overflow-hidden card-hover')
    })
  }
  //選擇方案
  planCardButtons.forEach((item, index) => {
    item.addEventListener('click', ()=> {
      planCardClearActive();
      openArrow(index);
      responsiveOpen(index)
      if (planNum === index) {
        change();
      } else  {
        open();
      }
      planNum = index;
      console.log(course);
      courseName.textContent = `${course}課程-${level}`;
      courseLvArea.addEventListener('hide.bs.collapse', function () {
        level = '基礎';
        planCardClearActive();
        courseLv.forEach((item, index) => {
          if (index === 0) {
            item.setAttribute('class', 'card h-100 bg-primary shadow-sm p-10 p-lg-6 p-xl-10 active');
          } else {
            item.setAttribute('class', 'card h-100 bg-primary shadow-sm p-10 p-lg-6 p-xl-10');
          }
        })
      })
    })
  })
  courseLv.forEach((item, index) => {
    item.addEventListener('click', () => {
      courseLv.forEach((item) => {
        item.setAttribute('class', 'card h-100 bg-primary shadow-sm p-10 p-lg-6 p-xl-10');
      })
      if (index === 0) {
        level = '基礎';
      } else if (index === 1) {
        level = '中階';
      } else if (index === 2) {
        level = '高階';
      }
      item.setAttribute('class', 'card h-100 bg-primary shadow-sm p-10 p-lg-6 p-xl-10 active');
      courseName.textContent = `${course}課程-${level}`;
    })
  })
  nextStepBtn.addEventListener('click', () => {
    console.log(course);
    let courseNameText = `${course}課程-${level}`;
    console.log(courseNameText);
    localStorage.setItem('courseName', course === undefined ? localStorage.getItem('courseName') : `${course}課程-${level}`);
  })
}
//立即預約課程名稱切換
if (main.getAttribute('data-page') === 'customerFrom') {
  courseName.textContent = localStorage.getItem('courseName');
  console.log(localStorage.getItem('courseName'));
}
if (main.getAttribute('data-page') === 'reservationDone') {
  courseName.textContent = localStorage.getItem('courseName');
  console.log(localStorage.getItem('courseName'));
}

//日期套件
if (main.getAttribute('data-page') === 'customerFrom') {
  const date = new Datepicker(dateArea, {
    minDate: new Date(),
    nextArrow: `<span class="material-icons text-secondary">
      chevron_right
      </span>`,
    prevArrow: `<span class="material-icons text-secondary">
      chevron_left
      </span>`,
  });
}