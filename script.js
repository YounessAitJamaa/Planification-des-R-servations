// Generate time options
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

// Generate time column 
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

// Generate time space for each day
function generateDaySpaces(dayId) {
    const dayDiv = document.getElementById(dayId);
    for (let h = 8; h <= 19; h++) {
    for (let m = 0; m < 60; m += 15) {
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

["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"].forEach(day => generateDaySpaces(day));


// Load reservations from localStorage
function loadReservations() {
  const reservations = JSON.parse(localStorage.getItem("reservations")) || [];
  reservations.forEach(r => displayReservation(r));
}

// Display a reservation in the calendar
function displayReservation(r) {
  const spcae = document.querySelector(`#${r.jour} .time-space[data-time="${r.heureDebut}"]`);
  if (!spcae) return;

  const event = document.createElement("div");
  event.className = `event ${r.type}`;
  event.innerHTML = `
    <strong>${r.nom}</strong><br>
    ${r.heureDebut} → ${r.heureFin}<br>
  `;
   let show = false;

  event.addEventListener('click', () => { 
        event.setAttribute("data-bs-toggle", 'modal');
        event.setAttribute("data-bs-target", '#information');
        const infoModal = bootstrap.Modal.getInstance(document.getElementById('information'));

        if (!show) { 
 
            event.innerHTML = `
                <strong>${r.nom}</strong><br>
                ${r.heureDebut} → ${r.heureFin}<br>
                ${r.nbPers} pers • ${r.type}
            `;
            show = true;
            infoModal.show();
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
  spcae.appendChild(event);
}

// Handle form 

document.getElementById("reservationForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nom = document.getElementById("nomClient").value;
  const jour = document.getElementById("jour").value;
  const heureDebut = document.getElementById("heureDebut").value;
  const heureFin = document.getElementById("heureFin").value;
  const nbPers = document.getElementById("nombrePersonnes").value;
  const type = document.getElementById("typeReservation").value;

  const reservation = { nom,
                        jour,
                        heureDebut,
                        heureFin,
                        nbPers,
                        type 
                    };

  // Save to localStorage
  const reservations = JSON.parse(localStorage.getItem("reservations")) || [];
  reservations.push(reservation);
  localStorage.setItem("reservations", JSON.stringify(reservations));

  // Display 
  displayReservation(reservation);

  document.getElementById("reservationForm").reset(); // Reset form
  const modal = bootstrap.Modal.getInstance(document.getElementById('form')); 
  modal.hide(); // Close modal
});

window.addEventListener("DOMContentLoaded", loadReservations);
