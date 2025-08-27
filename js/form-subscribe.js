document.addEventListener('DOMContentLoaded', function () {
   const forms = document.querySelectorAll('.footer__form');

   forms.forEach(form => {
      form.addEventListener('submit', function (e) {
         e.preventDefault(); // Это ОЧЕНЬ важно - предотвращает перезагрузку страницы

         const submitBtn = form.querySelector('.footer__submit-btn');
         const submitText = form.querySelector('.footer__submit-text');
         const originalText = submitText.textContent;

         // Меняем текст кнопки
         submitText.textContent = 'отправка...';
         submitBtn.disabled = true;

         // Отправляем форму
         fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
               'Accept': 'application/json'
            }
         })
            .then(response => {
               if (response.ok) {
                  alert('Спасибо за подписку!');
                  form.reset();
               } else {
                  alert('Ошибка при отправке');
               }
            })
            .catch(error => {
               alert('Ошибка при отправке');
            })
            .finally(() => {
               // Возвращаем исходный текст
               submitText.textContent = originalText;
               submitBtn.disabled = false;
            });
      });
   });
});