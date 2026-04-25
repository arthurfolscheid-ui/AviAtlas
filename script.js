let aircraftData = [];

async function loadAircraft() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) throw new Error("Check if your file is named data.json");
        aircraftData = await response.json();
        renderCards(aircraftData);
    } catch (error) {
        console.error("Error:", error);
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
                <p>${plane.manufacturer}</p>
                <button onclick="openDetails('${plane.id}')" class="btn-readmore">View Specs</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function openDetails(id) {
    const plane = aircraftData.find(p => p.id === id);
    if (!plane) return;

    // DEBUG LOG: Open your browser console (F12) to see if the data exists!
    console.log("Selected Plane Data:", plane);

    const modalBody = document.getElementById('modalBody');
    
    // Mapping Option A properties carefully:
    const topSpeed = plane.performance?.maxSpeed || "Data missing";
    const range = plane.performance?.range || "Data missing";
    const origin = plane.operational?.countries || "Data missing";
    const history = plane.history || "No history available.";

    modalBody.innerHTML = `
        <div class="modal-grid">
            <div class="modal-image" style="background-image: url('${plane.image}')"></div>
            <div class="modal-text">
                <h2>${plane.name}</h2>
                <p><strong>Manufacturer:</strong> ${plane.manufacturer}</p>
                <p><strong>Type:</strong> ${plane.type}</p>
                <p><strong>History:</strong> ${history}</p>
                <hr>
                <div class="specs-list">
                    <p>🚀 <strong>Top Speed:</strong> ${topSpeed}</p>
                    <p>📍 <strong>Range:</strong> ${range}</p>
                    <p>🏢 <strong>Origin:</strong> ${origin}</p>
                </div>
                <div class="fun-fact">
                    <p>⭐ <strong>Fun Fact:</strong> ${plane.funFact || "N/A"}</p>
                </div>
            </div>
        </div>
    `;

    document.getElementById('detailsModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('detailsModal').style.display = 'none';
}

// Search bar logic
document.getElementById('searchInput').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = aircraftData.filter(plane => 
        plane.name.toLowerCase().includes(term) || 
        plane.manufacturer.toLowerCase().includes(term)
    );
    renderCards(filtered);
});

loadAircraft();
