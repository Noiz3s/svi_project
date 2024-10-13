// const url = "http://jsonplaceholder.typicode.com/photos";
//
//
// document.addEventListener("DOMContentLoaded", function () {
//     const preloader = document.getElementById("preloader");
//     preloader.style.display = "block"; // Показываем прелоадер
//
//     fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             preloader.style.display = "none"; // Скрываем прелоадер
//
//             // Код для обработки данных и отображения на странице
//             renderGallery(data);
//         })
//         .catch(error => {
//             console.error("Ошибка запроса:", error);
//             preloader.innerHTML = "⚠ Что-то пошло не так";
//         });
// });
//
// function renderGallery(data) {
//     // Очистим контейнер перед отображением новых данных
//     const galleryContainer = document.getElementById("Photos");
//     galleryContainer.innerHTML = "";
//     // Пройдемся по каждому элементу и создадим HTML-код
//     data.slice(0, 10).forEach(photo => {
//         const albumHtml = `
//       <div class="album">
//         <img src="${photo.thumbnailUrl}" alt="${photo.url}">
//       </div>
//     `;
//
//         // Добавим HTML-код в контейнер
//         galleryContainer.innerHTML += albumHtml;
//     });
// }