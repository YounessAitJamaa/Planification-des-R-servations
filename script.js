// Generate dropdown time options (08:00 → 19:00 every 15 min)
const debut = document.getElementById("heureDebut");
const fin = document.getElementById("heureFin");
for(let h = 8; h <= 19; h++) {
    for(let m = 0; m < 60; m += 15) {
    if (h === 19 && m > 0) break;
    const hh = h.toString().padStart(2, '0');
    const mm = m.toString().padStart(2, '0');
    const opt = document.createElement("option");
    opt.value = `${hh}:${mm}`;
    opt.textContent = `${hh}:${mm}`;
    debut.appendChild(opt); 
    }
}

for(let h = 8; h <= 19; h++) {
    for(let m = 0; m < 60; m += 15) {
    if (h === 19 && m > 0) break;
    const hh = h.toString().padStart(2, '0');
    const mm = m.toString().padStart(2, '0');
    const opt = document.createElement("option");
    opt.value = `${hh}:${mm}`;
    opt.textContent = `${hh}:${mm}`;
    fin.appendChild(opt); 
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

// Handle form submission
document.getElementById("reservationForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const nom = document.getElementById("nomClient").value;
    const jour = document.getElementById("jour").value;
    const heure = document.getElementById("heureDebut").value;
    const type = document.getElementById("typeReservation").value;

    const event = document.createElement("div");
    event.className = `event ${type}`;
    event.innerHTML = `<strong>${nom}</strong><br> ${heure} . ${type}`;

    const slot = document.querySelector(`#${jour} .time-slot[data-time="${heure}"]`);
    if (slot) slot.appendChild(event);

    document.getElementById("reservationForm").reset();
    const modal = bootstrap.Modal.getInstance(document.getElementById('form'));
    modal.hide();
});
