// Generate time options
const debut = document.getElementById("heureDebut");
const fin = document.getElementById("heureFin");

const modalEl = document.getElementById('form');
const modal = bootstrap.Modal.getOrCreateInstance(modalEl);

const reservations = JSON.parse(localStorage.getItem("reservations")) || [];
let editingId = null;

for (let h = 8; h <= 19; h++) {
  for (let m = 0; m < 60; m += 30) {
    if (h === 19 && m > 0) break;
    const hh = h.toString().padStart(2, '0');
    const mm = m.toString().padStart(2, '0');
    const opt1 = document.createElement("option");
    const opt2 = document.createElement("option");
    opt1.value = opt2.value = `${hh}:${mm}`;
    opt1.textContent = opt2.textContent = `${hh}:${mm}`;
    debut.appendChild(opt1);
    fin.appendChild(opt2);
  }
}

// Generate time column 
const timeColumn = document.getElementById("timeColumn");
for (let h = 8; h <= 19; h++) {
    for (let m = 0; m < 60; m += 30) {
    if (h === 19 && m > 0) break;
    const hh = h.toString().padStart(2, "0");
    const mm = m.toString().padStart(2, "0");
    const div = document.createElement("div");
    div.className = "time-label";
    div.textContent = `${hh}:${mm}`;
    timeColumn.appendChild(div);
    }
}

// Generate time space for each day
function generateDaySpaces(dayId) {
    const dayDiv = document.getElementById(dayId);
    for (let h = 8; h <= 19; h++) {
    for (let m = 0; m < 60; m += 30) {
        if (h === 19 && m > 0) break;
        const hh = h.toString().padStart(2, "0");
        const mm = m.toString().padStart(2, "0");
        const space = document.createElement("div");
        space.className = "time-space";
        space.dataset.time = `${hh}:${mm}`;
        dayDiv.appendChild(space);
    }
    }
}

["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"].forEach(day => {
  generateDaySpaces(day);

  if (day === "Samedi" || day === "Dimanche") {
    document.getElementById(day).classList.add('disabled-day');
  }
});


// Display a reservation in the calendar
function displayReservation(r) {
  const spcae = document.querySelector(`#${r.jour} .time-space[data-time="${r.heureDebut}"]`);
  if (!spcae) return;

  const event = document.createElement("div");
  event.className = `event ${r.type}`;
  event.innerHTML = `
    <h5>${r.nom}</h5>
    <button class='btn-close delete'></button>
  `;

  requestAnimationFrame(() => {
    event.classList.add("show");
  });
//   
  spcae.appendChild(event); 

  event.addEventListener('click', () => {
    modifyReservation(r.Id);
  })

  const deleteBtn = event.querySelector('.delete');
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();

    event.classList.remove('show');
    setTimeout(() => deleteReservation(r.Id), 500) ;
  });
}


// Delete a reservation
function deleteReservation(Id){ 
  const index = reservations.findIndex(r => r.Id === Id);
  if (index === -1) return;

  reservations.splice(index, 1);

  localStorage.setItem('reservations', JSON.stringify(reservations));
  
  document.querySelectorAll('.event').forEach(e => e.remove());
  reservations.forEach(r => displayReservation(r));
}

// Edit a reservation

function modifyReservation(Id) {
  modal.show();

  const r = reservations.find(res => res.Id === Id);
  if (!r) return;

  document.getElementById("nomClient").value = r.nom;
  document.getElementById("jour").value = r.jour;
  document.getElementById("heureDebut").value = r.heureDebut;
  document.getElementById("heureFin").value = r.heureFin;
  document.getElementById("nombrePersonnes").value = r.nbPers;
  document.getElementById("typeReservation").value = r.type;

  editingId = Id;

  modal.show();

}


document.getElementById("reservationForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nom = document.getElementById("nomClient").value;
  const jour = document.getElementById("jour").value;
  const heureDebut = document.getElementById("heureDebut").value;
  const heureFin = document.getElementById("heureFin").value;
  const nbPers = document.getElementById("nombrePersonnes").value;
  const type = document.getElementById("typeReservation").value;

  // Validation for name
  if (nom.trim() == "" || nom.startsWith(" ") || nom.trim().length < 3 || !isNaN(nom[0])) {
    alert('Le nom ne peut pas être vide ou commencer par un espace !');
    return;
  }

  // validation for Time
  if (heureDebut > heureFin) {
    alert("L'heure de fin doit être après l'heure de début !");
    return;
  }

  // Validation for nombre de personnes
  if (nbPers < 1) {
    alert('Le nombre de personnes doit être supérieur ou égal à 1.');
    return;
  }

  // Modification condition 
  if(editingId) {
    const index = reservations.findIndex(r => r.Id == editingId);
    if (index !== -1) {
      reservations[index] = {Id: editingId, nom, jour, heureDebut, heureFin, nbPers, type };
      localStorage.setItem("reservations", JSON.stringify(reservations));
      editingId = null;

      document.querySelectorAll(".event").forEach(e => e.remove());
      reservations.forEach(r => displayReservation(r));

      modal.hide();
      document.getElementById("reservationForm").reset();
      return;
    }
  }

  const reservation = { 
    Id: Date.now(), 
    nom,
    jour,
    heureDebut,
    heureFin,
    nbPers,
    type
  };

  // Save to localStorage
  reservations.push(reservation);
  localStorage.setItem("reservations", JSON.stringify(reservations));

  // Display 
  displayReservation(reservation);

  document.getElementById("reservationForm").reset(); // Reset form
   
  modal.hide(); // Close modal
});

document.querySelectorAll('.time-space').forEach(space => {
  space.addEventListener('click', () => {
    const parentDiv = space.closest('.day');
    const dayName = parentDiv.id;
    const time = space.dataset.time; 

    document.getElementById('jour').value = dayName;
    document.getElementById('heureDebut').value = time;

    modal.show();
  })
})

modalEl.addEventListener('shown.bs.modal', () => {
  document.getElementById('nomClient').focus();
});

modalEl.addEventListener('hidden.bs.modal', () => {
  lastClickedButton.focus();
});


// saved Reservations to show
const savedReservations = JSON.parse(localStorage.getItem("reservations")) || [];
savedReservations.forEach(r => displayReservation(r));

