let aircraftData = [];

async function loadAircraft() {
    try {
        // This line looks for the data.json file in your folder
        const response = await fetch('data.json'); 
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        aircraftData = await response.json();
        renderCards(aircraftData);
    } catch (error) {
        console.error("FAILED TO LOAD DATA:", error);
        // If it fails, we show an error on the screen
        document.getElementById('aircraftGrid').innerHTML = `
            <div style="color: white; text-align: center; grid-column: 1/-1;">
                <h2>⚠️ Error Loading Database</h2>
                <p>Make sure you are using <strong>Live Server</strong> in VS Code.</p>
            </div>`;
    }
}

// ... the rest of your renderCards and openDetails functions ...

loadAircraft();
