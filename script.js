// --- 1. Mock Database of Aircraft ---
const aircraftData = [
    {
        name: "SR-71 Blackbird",
        type: "Military",
        description: "A strategic reconnaissance aircraft capable of flying at Mach 3+ and extreme altitudes.",
        image: "https://images.unsplash.com/photo-1543362143-6d0061e80938?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "Boeing 747",
        type: "Commercial",
        description: "Known as the 'Queen of the Skies', a large, long-range wide-body airliner.",
        image: "https://images.unsplash.com/photo-1569154941061-e231b4732ef1?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "P-51 Mustang",
        type: "Historic",
        description: "An American long-range, single-seat fighter and fighter-bomber used during WWII.",
        image: "https://images.unsplash.com/photo-1582292025686-21820a02efdb?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "Concorde",
        type: "Commercial",
        description: "A legendary British-French turbojet-powered supersonic passenger airliner.",
        image: "https://images.unsplash.com/photo-1620023445989-1fc7b1d9bf5b?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "F-22 Raptor",
        type: "Military",
        description: "A fifth-generation, single-seat, twin-engine, all-weather stealth tactical fighter aircraft.",
        image: "https://images.unsplash.com/photo-1605335122709-6bc2e8412dc0?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "Cessna 172",
        type: "Private",
        description: "The most successful aircraft in history, widely used for flight training and personal use.",
        image: "https://images.unsplash.com/photo-1596326168545-316f73e72352?q=80&w=800&auto=format&fit=crop"
    }
];

// --- 2. Element Selectors ---
const aircraftGrid = document.getElementById('aircraftGrid');
const searchInput = document.getElementById('searchInput');
const resultCount = document.getElementById('resultCount');

// --- 3. Function to Render Cards ---
function renderCards(aircraftArray) {
    aircraftGrid.innerHTML = ''; // Clear current grid
    
    if(aircraftArray.length === 0) {
        aircraftGrid.innerHTML = `<p style="color: #94a3b8; grid-column: 1/-1; text-align: center;">No aircraft found matching your search.</p>`;
        resultCount.textContent = "0 results";
        return;
    }

    resultCount.textContent = `Showing ${aircraftArray.length} aircraft`;

    aircraftArray.forEach((plane, index) => {
        // Create the card div
        const card = document.createElement('div');
        card.className = 'plane-card';
        // Add a slight animation delay to each card so they cascade in
        card.style.animation = `fadeUp 0.6s ease-out ${index * 0.1}s forwards`;
        card.style.opacity = '0'; 
        card.style.transform = 'translateY(20px)';

        card.innerHTML = `
            <div class="card-image" style="background-image: url('${plane.image}')">
                <span class="badge">${plane.type}</span>
            </div>
            <div class="card-info">
                <h3>${plane.name}</h3>
                <p>${plane.description}</p>
                <button class="btn-readmore">View Specs</button>
            </div>
        `;
        aircraftGrid.appendChild(card);
    });
}

// --- 4. Live Search Event Listener ---
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    // Filter the array based on name or type
    const filteredAircraft = aircraftData.filter(plane => {
        return plane.name.toLowerCase().includes(searchTerm) || 
               plane.type.toLowerCase().includes(searchTerm);
    });
    
    renderCards(filteredAircraft);
});

// --- 5. Initial Render on Page Load ---
window.addEventListener('DOMContentLoaded', () => {
    renderCards(aircraftData);
});
