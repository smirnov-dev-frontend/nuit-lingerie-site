const slider = document.querySelector('.slider');
const prevBtn = document.querySelector('.slider-btn--prev');
const nextBtn = document.querySelector('.slider-btn--next');
const gap = 30;
let isAnimating = false;

// Исходные элементы и их порядок
const originalItems = Array.from(slider.children);
const totalItems = originalItems.length;

// Сохраняем исходный порядок в data-атрибутах
originalItems.forEach((item, index) => {
   item.classList.add('original');
   item.setAttribute('data-original-index', index);
});

// Создаем клоны в начале и конце
originalItems.forEach(item => {
   const cloneStart = item.cloneNode(true);
   cloneStart.classList.add('clone');
   slider.insertBefore(cloneStart, slider.firstChild);

   const cloneEnd = item.cloneNode(true);
   cloneEnd.classList.add('clone');
   slider.appendChild(cloneEnd);
});

// Обновляем массив всех элементов
let items = Array.from(slider.children);
let itemWidth = items[0].offsetWidth + gap;

// Начальная позиция
let currentIndex = totalItems;
let currentTranslate = -itemWidth * currentIndex;
slider.style.transform = `translateX(${currentTranslate}px)`;

// Счетчики для отслеживания порядка
let currentSequence = 0; // текущая позиция в последовательности

function setPosition(transition = true) {
   slider.style.transition = transition ? 'transform 0.7s ease' : 'none';
   slider.style.transform = `translateX(${currentTranslate}px)`;
}

function updateItemsArray() {
   items = Array.from(slider.children);
}

function moveNext() {
   if (isAnimating) return;
   isAnimating = true;

   // Находим элемент для добавления справа (по порядку)
   const originalElements = Array.from(slider.querySelectorAll('.original'));
   const elementToAdd = originalElements.find(item =>
      parseInt(item.getAttribute('data-original-index')) === currentSequence
   );

   if (elementToAdd) {
      slider.appendChild(elementToAdd);
      currentSequence = (currentSequence + 1) % totalItems;
   }

   updateItemsArray();

   // Сразу корректируем позицию без анимации
   currentTranslate += itemWidth;
   setPosition(false);

   // Плавный сдвиг на одну карточку
   requestAnimationFrame(() => {
      slider.style.transition = 'transform 0.7s ease';
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

   // ПРОСТОЙ ВАРИАНТ: сразу делаем анимацию сдвига
   currentTranslate += itemWidth;
   setPosition(true);

   slider.addEventListener('transitionend', function handler() {
      slider.removeEventListener('transitionend', handler);

      // После анимации перемещаем последний элемент в начало
      const originalElements = Array.from(slider.querySelectorAll('.original'));
      const lastOriginal = originalElements[originalElements.length - 1];

      if (lastOriginal) {
         slider.insertBefore(lastOriginal, slider.firstChild);
         updateItemsArray();

         // ОБНОВЛЯЕМ ПОСЛЕДОВАТЕЛЬНОСТЬ! Уменьшаем currentSequence
         currentSequence = (currentSequence - 1 + totalItems) % totalItems;

         // Корректируем позицию без анимации
         currentTranslate -= itemWidth;
         setPosition(false);
      }

      isAnimating = false;
   }, { once: true });
}

// Кнопки
nextBtn.addEventListener('click', moveNext);
prevBtn.addEventListener('click', movePrev);

// Пересчет ширины при ресайзе
window.addEventListener('resize', () => {
   itemWidth = items[0].offsetWidth + gap;
   currentTranslate = -itemWidth * currentIndex;
   setPosition(false);
});