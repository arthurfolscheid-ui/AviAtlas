let aircraftData = [];

// Fetch data from our JSON file
async function loadAircraft() {
    try {
        const response = await fetch('data.json');
        aircraftData = await response.json();
        renderCards(aircraftData);
    } catch (error) {
        console.error("Error loading aircraft data:", error);
    }
}

function renderCards(data) {
    const grid = document.getElementById('aircraftGrid');
    grid.innerHTML = '';
    
    data.forEach(plane => {
        const card = document.createElement('div');
        card.className = 'plane-card';
        card.innerHTML = `
            <div class="card-image" style="background-image: url('${plane.image}')"></div>
            <div class="card-info">
                <h3>${plane.name}</h3>
                <p>${plane.description}</p>
                <button onclick="openDetails('${plane.id}')" class="btn-readmore">Full Specs</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Modal Logic
const modal = document.getElementById("planeModal");
const closeModal = document.querySelector(".close-modal");

function openDetails(id) {
    const plane = aircraftData.find(p => p.id === id);
    const body = document.getElementById("modalBody");
    
    body.innerHTML = `
        <div class="modal-grid">
            <img src="${plane.image}" style="width:100%; border-radius:15px;">
            <div class="modal-info">
                <h2>${plane.name}</h2>
                <div class="spec-box"><strong>Origin:</strong> ${plane.origin}</div>
                <div class="spec-box"><strong>Top Speed:</strong> ${plane.topSpeed}</div>
                <div class="spec-box"><strong>Range:</strong> ${plane.range}</div>
                <p style="margin-top:20px;">${plane.history}</p>
            </div>
        </div>
    `;
    modal.style.display = "block";
}

closeModal.onclick = () => modal.style.display = "none";
window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; }

// Search Logic
document.getElementById('searchInput').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = aircraftData.filter(p => p.name.toLowerCase().includes(term));
    renderCards(filtered);
});

loadAircraft();
