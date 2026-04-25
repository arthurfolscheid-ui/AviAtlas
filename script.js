let aircraftData = [];

// 1. Load the data from your JSON file
async function loadAircraft() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error("Could not find data.json");
        }
        aircraftData = await response.json();
        renderCards(aircraftData);
    } catch (error) {
        console.error("Error loading aircraft:", error);
        document.getElementById('aircraftGrid').innerHTML = `
            <div style="color: white; text-align: center; grid-column: 1/-1;">
                <h2>⚠️ Database Connection Error</h2>
                <p>Ensure you are using 'Live Server' and the file is named data.json</p>
            </div>`;
    }
}

// 2. Display the aircraft cards on the screen
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

// 3. Search functionality
document.getElementById('searchInput').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = aircraftData.filter(plane => 
        plane.name.toLowerCase().includes(term) || 
        plane.manufacturer.toLowerCase().includes(term) ||
        plane.type.toLowerCase().includes(term)
    );
    renderCards(filtered);
});

// 4. Open Modal and show the deep-nested data (Speed, Range, Origin)
function openDetails(id) {
    const plane = aircraftData.find(p => p.id === id);
    if (!plane) return;

    const modalBody = document.getElementById('modalBody');
    
    // Note how we use plane.performance.range to reach into the data
    modalBody.innerHTML = `
        <div class="modal-grid">
            <div class="modal-image" style="background-image: url('${plane.image}')"></div>
            <div class="modal-text">
                <h2>${plane.name}</h2>
                <p><strong>Type:</strong> ${plane.type}</p>
                <p><strong>History:</strong> ${plane.history}</p>
                <hr>
                <div class="specs-list">
                    <p>🚀 <strong>Top Speed:</strong> ${plane.performance.maxSpeed}</p>
                    <p>📍 <strong>Range:</strong> ${plane.performance.range}</p>
                    <p>🏢 <strong>Origin:</strong> ${plane.operational.countries}</p>
                    <p>🔧 <strong>Engines:</strong> ${plane.engines.count}x ${plane.engines.model}</p>
                    <p>👥 <strong>Capacity:</strong> ${plane.capacity.passengers} passengers</p>
                </div>
                <div class="fun-fact">
                    <p>⭐ <strong>Fun Fact:</strong> ${plane.funFact}</p>
                </div>
            </div>
        </div>
    `;

    document.getElementById('detailsModal').style.display = 'flex';
}

// 5. Close Modal functions
function closeModal() {
    document.getElementById('detailsModal').style.display = 'none';
}

// Close if they click outside the box
window.onclick = function(event) {
    const modal = document.getElementById('detailsModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Start the app
loadAircraft();
