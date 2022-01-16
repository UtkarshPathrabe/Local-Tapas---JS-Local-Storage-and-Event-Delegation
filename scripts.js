const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const selectAllButton = document.querySelector('#select-all-button');
const deSelectAllButton = document.querySelector('#deselect-all-button');
let items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(event) {
    event.preventDefault();
    const item = {
        text: (this.querySelector('[name=item]')).value,
        done: false
    };
    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
    this.reset();
}

function populateList(plates = [], platesList) {
    if (plates.length > 0) {
        platesList.innerHTML = plates.map((plate, i) => {
            return `
                <li>
                    <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
                    <label for="item${i}">${plate.text}</label>
                </li>
            `;
        }).join('');
    } else {
        return `<li>Loading Tapas...</li>`;
    }
}

function toggleDone(e) {
    if (!e.target.matches('input')) return;
    const element = e.target;
    const index = element.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

function selectAll(e) {
    e.preventDefault();
    items = items.map(item => {
        return {
            ...item,
            done: true
        };
    });
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

function deSelectAll(e) {
    e.preventDefault();
    items = items.map(item => {
        return {
            ...item,
            done: false
        };
    });
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
selectAllButton.addEventListener('click', selectAll);
deSelectAllButton.addEventListener('click', deSelectAll);
populateList(items, itemsList);