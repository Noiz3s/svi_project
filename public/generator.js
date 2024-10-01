document.addEventListener('DOMContentLoaded', function () {
  const tableForm = document.getElementById('tableForm');
  const generatedTableContainer = document.getElementById('generatedTable');

  tableForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const generatedTable = generateTable(name, date);

    generatedTableContainer.innerHTML = '';
    generatedTableContainer.appendChild(generatedTable);

    saveToLocalStorage({ name, date });
  });
  const saveParams = loadFromLocalStorage();
  if (saveParams) {
    document.getElementById('name').value = saveParams.name;
    document.getElementById('date').value = saveParams.date;
  }
});

function generateTable(name, date) {
  const table = document.createElement('table');
  const tableHeader = table.createTHead();
  const headerRow = tableHeader.insertRow();
  const rowNames = ['Название', 'Дата'];
  rowNames.forEach((row) => {
    const th = document.createElement('th');
    th.textContent = row;
    headerRow.appendChild(th);
  });

  const tableBody = table.createTBody();
  const rows = tableBody.insertRow();
  for (let row = 0; row < rowNames.length; row++) {
    const cell = rows.insertCell();
    if (row === 0) {
      cell.textContent = `${name}`;
    }
    if (row === 1) {
      cell.textContent = `${date}`;
    }
  }

  return table;
}

function saveToLocalStorage(params) {
  localStorage.setItem('tableParams', JSON.stringify(params));
}

function loadFromLocalStorage() {
  const savedParams = localStorage.getItem('tableParams');
  return savedParams ? JSON.parse(savedParams) : null;
}
