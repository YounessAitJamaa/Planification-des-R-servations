// Generate dropdown time options (08:00 → 19:00 every 15 min)
const debut = document.getElementById("heureDebut");
const fin = document.getElementById("heureFin");

for (let h = 8; h <= 19; h++) {
  for (let m = 0; m < 60; m += 15) {
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

// Generate time column (08:00 → 19:00)
const timeColumn = document.getElementById("timeColumn");
for (let h = 8; h <= 19; h++) {
    for (let m = 0; m < 60; m += 15) {
    if (h === 19 && m > 0) break;
    const hh = h.toString().padStart(2, "0");
    const mm = m.toString().padStart(2, "0");
    const div = document.createElement("div");
    div.className = "time-label";
    div.textContent = `${hh}:${mm}`;
    timeColumn.appendChild(div);
    }
}

// Generate time slots for each day
function generateDaySlots(dayId) {
    const dayDiv = document.getElementById(dayId);
    for (let h = 8; h <= 19; h++) {
    for (let m = 0; m < 60; m += 15) {
        if (h === 19 && m > 0) break;
        const hh = h.toString().padStart(2, "0");
        const mm = m.toString().padStart(2, "0");
        const slot = document.createElement("div");
        slot.className = "time-slot";
        slot.dataset.time = `${hh}:${mm}`;
        dayDiv.appendChild(slot);
    }
    }
}

["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"].forEach(day => generateDaySlots(day));


// Load reservations from localStorage
function loadReservations() {
  const reservations = JSON.parse(localStorage.getItem("reservations")) || [];
  reservations.forEach(r => displayReservation(r));
}

// Display a reservation in the calendar
function displayReservation(r) {
  const slot = document.querySelector(`#${r.jour} .time-slot[data-time="${r.heureDebut}"]`);
  if (!slot) return;

  const event = document.createElement("div");
  event.className = `event ${r.type}`;
  event.innerHTML = `
    <strong>${r.nom}</strong><br>
    ${r.heureDebut} → ${r.heureFin}<br>
  `;
   let show = false;

  event.addEventListener('click', () => { 
   

    if (!show) { 
        event.innerHTML = `
            <strong>${r.nom}</strong><br>
            ${r.heureDebut} → ${r.heureFin}<br>
            ${r.nbPers} pers • ${r.type}
        `;
        show = true;
    }

    else if (show) {
        event.innerHTML = `
            <strong>${r.nom}</strong><br>
            ${r.heureDebut} → ${r.heureFin}<br>
        `;
        show = false;
    }
  })


//   
  slot.appendChild(event);
}

// Handle form submission

document.getElementById("reservationForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nom = document.getElementById("nomClient").value;
  const jour = document.getElementById("jour").value;
  const heureDebut = document.getElementById("heureDebut").value;
  const heureFin = document.getElementById("heureFin").value;
  const nbPers = document.getElementById("nombrePersonnes").value;
  const type = document.getElementById("typeReservation").value;

  const reservation = { nom, jour, heureDebut, heureFin, nbPers, type };

  // Save to localStorage
  const reservations = JSON.parse(localStorage.getItem("reservations")) || [];
  reservations.push(reservation);
  localStorage.setItem("reservations", JSON.stringify(reservations));

  // Display it immediately
  displayReservation(reservation);

  // Reset + close modal
  document.getElementById("reservationForm").reset();
  const modal = bootstrap.Modal.getInstance(document.getElementById('form'));
  modal.hide();
});

window.addEventListener("DOMContentLoaded", loadReservations);
