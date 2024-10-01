document.addEventListener('DOMContentLoaded', function () {
  const tableForm = document.getElementById('tableForm');

  tableForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const dateInput = document.getElementById('date').value; // Получаем строку из поля ввода даты
    const date = new Date(dateInput);

    const tickets = [];
    fetch('/concert/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, date, tickets }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Concert added:', data);
        showNotification('Concert added successfully!');
      })
      .catch((error) => {
        console.error('Error adding concert:', error);
        showNotification('Failed to add concert. Please try again later.');
      });
    saveToLocalStorage({ name, date });
  });
  const saveParams = loadFromLocalStorage();
  if (saveParams) {
    document.getElementById('name').value = saveParams.name;
    document.getElementById('date').value = saveParams.date;
  }
  // Остальной код сохранения в локальное хранилище оставляем без изменений
});
function saveToLocalStorage(params) {
  localStorage.setItem('tableParams', JSON.stringify(params));
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.textContent = `${message}`;
  notification.classList.add('notification');
  document.body.appendChild(notification);

  // Через некоторое время скрываем уведомление
  setTimeout(() => {
    notification.remove();
  }, 3000); // Уведомление будет скрыто через 3 секунды
}

function loadFromLocalStorage() {
  const savedParams = localStorage.getItem('tableParams');
  return savedParams ? JSON.parse(savedParams) : null;
}
