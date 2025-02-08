const favoritesList = document.getElementById('favoritesList');

// Load favorite countries from local storage
function loadFavorites() {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favoritesList.innerHTML = "";

    if (favorites.length === 0) {
        favoritesList.innerHTML = "<p>👻 No favorites added yet.</p>";
        return;
    }

    favorites.forEach(country => {
        let notes = getNotes(country);
        
        let listItem = document.createElement("li");
        listItem.innerHTML = `
            <h3>${country}</h3>
            <textarea id="notes-${country}" placeholder="Add notes here...">${notes}</textarea>
            <button onclick="saveNotes('${country}')">💾</button>
            <button onclick="removeFromFavorites('${country}')">❌</button>
        `;
        favoritesList.appendChild(listItem);
    });
}

// Save notes in local storage
function saveNotes(country) {
    let notes = document.getElementById(`notes-${country}`).value;
    localStorage.setItem(`notes-${country}`, notes);
    alert("Notes saved!");
}

// Retrieve notes from local storage
function getNotes(country) {
    return localStorage.getItem(`notes-${country}`) || "";
}

// Remove country from favorites
function removeFromFavorites(country) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter(c => c !== country);
    
    localStorage.setItem("favorites", JSON.stringify(favorites));
    localStorage.removeItem(`notes-${country}`);
    
    loadFavorites(); // Refresh list immediately
}

// Load favorites on page load
document.addEventListener("DOMContentLoaded", loadFavorites);
