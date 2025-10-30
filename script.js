// Getting the days 
const Lundi = document.getElementById('Lundi');
const Mardi = document.getElementById('Mardi');
const Mercredi = document.getElementById('Mercredi');
const Jeudi = document.getElementById('Jeudi');
const Vendredi = document.getElementById('Vendredi');

const form = document.getElementById('reservationForm');
const typeReservation = document.getElementById('typeReservation');

let editing = null;

form.addEventListener('submit', (e) => {
e.preventDefault();

const name = document.getElementById('nomClient').value;
const day = document.getElementById('jour').value;
const heurDebut = document.getElementById('heureDebut').value;
const type = typeReservation.value;

const div = document.createElement('div');
div.innerHTML = `
    <h5 class="fw-bold mb-1">Réservation ${type.toUpperCase()} pour : ${name}</h5>
    <p class="mb-0">Début à : ${heurDebut}</p>
    `;

const deleteBtn = document.createElement('button');
deleteBtn.textContent = 'Supprimer';
deleteBtn.classList.add('btn', 'btn-light', 'btn-sm', 'mt-2', 'text-danger', 'fw-bold');
div.appendChild(deleteBtn);

const editBtn = document.createElement('button');
editBtn.textContent = 'Edit';
editBtn.classList.add('btn', 'btn-light', 'btn-sm', 'mt-2', 'ms-2', 'text-success', 'fw-bold');
div.appendChild(editBtn);


div.style.cssText = `
    color: white;
    padding: 15px;
    margin-bottom: 8px;
    border-radius: 8px;
    cursor: pointer;
`;
if (type === 'vip') div.style.backgroundColor = 'red';
else if (type === 'Standard') div.style.backgroundColor = 'green';
else if (type === 'anniversaire') div.style.backgroundColor = 'blue';


switch (day) {
    case 'Lundi': Lundi.appendChild(div); break;
    case 'Mardi': Mardi.appendChild(div); break;
    case 'Mercredi': Mercredi.appendChild(div); break;
    case 'Jeudi': Jeudi.appendChild(div); break;
    case 'Vendredi': Vendredi.appendChild(div); break;
}


form.reset();
const modal = bootstrap.Modal.getInstance(document.getElementById('form'));
modal.hide();

deleteBtn.addEventListener('click', () => div.remove());

editBtn.addEventListener('click', () => {
    editing = div;

    modal.show();

    document.getElementById('nomClient').value = name;
    document.getElementById('jour').value = day;
    document.getElementById('heureDebut').value = heurDebut;
    document.getElementById('typeReservation').value = type;
});


});
