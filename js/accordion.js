// Находим все колонки футера
const footerColumns = document.querySelectorAll('.footer__column');

footerColumns.forEach(column => {
   const subtitle = column.querySelector('.footer__subtitle');
   const list = column.querySelector('.footer__lists');

   // Проверяем, что элементы существуют
   if (!subtitle || !list) return;

   subtitle.addEventListener('click', () => {
      // Переключаем класс для плавного раскрытия
      list.classList.toggle('footer__lists--open');

      // Дополнительно можно сделать анимацию поворота стрелки, если добавим ::after или иконку
      subtitle.classList.toggle('open');
   });
});
