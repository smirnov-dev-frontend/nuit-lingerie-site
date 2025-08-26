const slider = document.querySelector('.slider');
const prevBtn = document.querySelector('.slider-btn--prev');
const nextBtn = document.querySelector('.slider-btn--next');
const gap = 30;
let isAnimating = false;

// исходные элементы
let items = Array.from(slider.children);

// дублируем первый и последний элемент
const firstClone = items[0].cloneNode(true);
const lastClone = items[items.length - 1].cloneNode(true);

slider.appendChild(firstClone);
slider.insertBefore(lastClone, slider.firstChild);

// обновляем список
items = Array.from(slider.children);
let itemWidth = items[0].offsetWidth + gap;

// начальная позиция
let currentTranslate = -itemWidth;
slider.style.transform = `translateX(${currentTranslate}px)`;

function setPosition(transition = true) {
   slider.style.transition = transition ? 'transform 0.7s ease' : 'none';
   slider.style.transform = `translateX(${currentTranslate}px)`;
}

function moveNext() {
   if (isAnimating) return;
   isAnimating = true;

   // заранее перемещаем первый элемент в конец, чтобы не было пустого места
   slider.style.transition = 'none';
   const first = slider.firstElementChild;
   slider.appendChild(first);
   // корректируем позицию, чтобы визуально ничего не изменилось
   currentTranslate += itemWidth;
   setPosition(false);

   // теперь плавно сдвигаем
   requestAnimationFrame(() => {
      slider.style.transition = 'transform 0.3s ease';
      currentTranslate -= itemWidth;
      setPosition();

      slider.addEventListener('transitionend', function handler() {
         slider.removeEventListener('transitionend', handler);
         isAnimating = false;
      }, { once: true });
   });
}

function movePrev() {
   if (isAnimating) return;
   isAnimating = true;

   // заранее перемещаем последний элемент в начало
   slider.style.transition = 'none';
   const last = slider.lastElementChild;
   slider.insertBefore(last, slider.firstElementChild);
   currentTranslate -= itemWidth;
   setPosition(false);

   requestAnimationFrame(() => {
      slider.style.transition = 'transform 0.3s ease';
      currentTranslate += itemWidth;
      setPosition();

      slider.addEventListener('transitionend', function handler() {
         slider.removeEventListener('transitionend', handler);
         isAnimating = false;
      }, { once: true });
   });
}

// кнопки
nextBtn.addEventListener('click', moveNext);
prevBtn.addEventListener('click', movePrev);
