// Copying the days div to javasctipt

const Lundi = document.getElementById('Lundi');
const Mardi = document.getElementById('Mardi');
const Mercredi = document.getElementById('Mercredi');
const Jeudi = document.getElementById('Jeudi');
const Vendredi = document.getElementById('Vendredi');


const form = document.getElementById('reservationForm');
const typeReservation = document.getElementById('typeReservation');


form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name =  document.getElementById('nomClient').value;
    const day = document.getElementById('jour').value;
    const heurDebut = document.getElementById('heureDebut').value;

    const div = document.createElement('div');
    const paragraph = document.createElement('p');
    const header = document.createElement('h4');

    header.textContent = `Réservation ${typeReservation.value.toUpperCase()} pour : ${name}`;
    paragraph.textContent = `Début à : ${heurDebut}`;


});


