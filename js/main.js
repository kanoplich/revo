// Video

const play = document.querySelector('.btn__play');
const video = document.querySelector('.video');
const titleLine2 = document.querySelector('.header__title--line-2');
const titleLine3 = document.querySelector('.header__title--line-3');

play.addEventListener('click', () => {
  video.play();
  play.classList.add('hidden');
});

video.addEventListener('click', () => {
  video.pause();
  play.classList.remove('hidden');
});

titleLine3.addEventListener('animationend', () => {
  titleLine2.classList.add('title__bg');
});

// Menu

const navBtn = document.querySelector('.nav-icon-btn');
const navIcon = document.querySelector('.nav-icon');
const nav = document.querySelector('.header__nav');
const overlay = document.querySelector('.overlay');

navBtn.addEventListener('click', () => {
  navIcon.classList.toggle('nav-icon--active');
  nav.classList.toggle('header_nav--mobile');
  overlay.classList.toggle('active');
  document.body.classList.toggle('no-scroll');
});

// Lazy load

const sections = document.querySelectorAll('.section');
const screenWidth = window.screen.width;

const onEntry = (entry) => {
  entry.forEach((change) => {
    if (change.isIntersecting) {
      change.target.classList.add('section-show');
    }
  });
};

let options = { threshold: 0, rootMargin: '30%' };

if (screenWidth < 800) {
  options = { threshold: 0, rootMargin: '90%' };
}

let observer = new IntersectionObserver(onEntry, options);
for (let sec of sections) {
  observer.observe(sec);
}

// Animation coffee

const coffeeSlider = document.querySelector('.coffee__slider');
const coffeeCard = document.querySelectorAll('.coffee__card_body');
const btnCoffee = document.querySelector('#btn-coffee');

let slideCoffeeCount = 0;
let sliderCoffeeWidth = coffeeCard[0].offsetWidth + 30;

window.addEventListener('resize', () => {
  sliderCoffeeWidth = coffeeCard[0].offsetWidth + 30;
  slideCoffeeCount = 0;
  rollCoffeeSlide();
});

const nextCoffeeSlide = () => {
  slideCoffeeCount++;
  btnCoffee.removeEventListener('click', nextCoffeeSlide);
  rollCoffeeSlide();

  if (slideCoffeeCount == 3) {
    setTimeout(() => {
      slideCoffeeCount = 0;
      rollCoffeeSlide();
    }, 700);
  }

  setTimeout(() => {
    btnCoffee.addEventListener('click', nextCoffeeSlide);
  }, 700);
};

const rollCoffeeSlide = () => {
  coffeeSlider.style.transform = `translateX(${
    -slideCoffeeCount * sliderCoffeeWidth
  }px)`;
};

btnCoffee.addEventListener('click', nextCoffeeSlide);

// Giftset

const giftsetBtns = document.querySelectorAll('.giftset__left--btn');
const giftsetImage = document.querySelector('.giftset__right--img');

giftsetBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    giftsetBtns.forEach((btn) => btn.classList.remove('active'));

    btn.classList.add('active');

    if (btn.innerHTML === '1') {
      giftsetImage.classList.remove('filter-green');
      giftsetImage.classList.remove('filter-blue');
    }

    if (btn.innerHTML === '2') {
      giftsetImage.classList.remove('filter-blue');
      giftsetImage.classList.add('filter-green');
    }

    if (btn.innerHTML === '3') {
      giftsetImage.classList.remove('filter-green');
      giftsetImage.classList.add('filter-blue');
    }
  });
});

// Animation combo

const comboSlider = document.querySelector('.combo__slider');
let comboCard = document.querySelectorAll('.combo__card');
const btnCombo = document.querySelector('#btn-combo');

let slideComboCount = 0;
let sliderComboWidth = comboCard[0].offsetWidth + 30;
let timer;

window.addEventListener('resize', () => {
  sliderComboWidth = comboCard[0].offsetWidth + 30;
  rollComboSlide();
});

const nextComboSlide = () => {
  stopInterval();
  addFirstToEnd();
  btnCombo.removeEventListener('click', nextComboSlide);
  comboSlider.classList.add('animated_slider');

  setTimeout(() => {
    comboSlider.firstElementChild.remove();
    btnCombo.addEventListener('click', nextComboSlide);
    comboSlider.classList.remove('animated_slider');
    startInterval();
  }, 685);
};

const addFirstToEnd = () => {
  const firstClone = comboSlider.firstElementChild.cloneNode(true);
  comboSlider.appendChild(firstClone);
};

const rollComboSlide = () => {
  comboSlider.style.transform = `translateX(${
    -slideComboCount * sliderComboWidth
  }px)`;
};

const startInterval = () => {
  timer = setInterval(() => {
    nextComboSlide();
  }, 5000);
};

startInterval();

const stopInterval = () => {
  clearInterval(timer);
};

btnCombo.addEventListener('click', nextComboSlide);
