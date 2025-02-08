const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('search');
const randomBtn = document.getElementById('randomBtn');
const countryDetails = document.getElementById('countryDetails');

const API_URL = "https://restcountries.com/v3.1/name/";
const ALL_COUNTRIES_URL = "https://restcountries.com/v3.1/all";

// fetching countries' data
async function fetchCountry(name) {
    try {
        const res = await fetch(API_URL + name);
        const data = await res.json();
        displayCountry(data[0]);
    } catch (error) {
        countryDetails.innerHTML = "<p>🤷 Country not found! Try again.</p>";
    }
}

// display searched country
function displayCountry(country) {
    const { name, flags, capital, population, region } = country;

    countryDetails.innerHTML = `
        <div class="country-card">
            <img src="${flags.png}" alt="${name.common} Flag">
            <h2>${name.common}</h2>
            <p>🚩 Capital: ${capital}</p>
            <p>🌍 Region: ${region}</p>
            <p>📊 Population: ${population.toLocaleString()}</p>
            <button onclick="addToFavorites('${name.common}')">⭐ Add to Favorites</button>
        </div>
    `;
    countryDetails.classList.remove('hidden');
}

// discover function
async function fetchRandomCountry() {
    const res = await fetch(ALL_COUNTRIES_URL);
    const countries = await res.json();
    const randomCountry = countries[Math.floor(Math.random() * countries.length)];
    displayCountry(randomCountry);
}

// localstorage API for favorites
function addToFavorites(country) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    
    if (!favorites.includes(country)) {
        favorites.push(country);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        alert(`✅ ${country} added to favorites!`);
    } else {
        alert(`✅ ${country} is already in favorites.`);
    }
}

// other stuff

searchBtn.addEventListener("click", () => {
    if (searchInput.value) fetchCountry(searchInput.value);
});

searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        fetchCountry(searchInput.value);
    }
});

randomBtn.addEventListener("click", fetchRandomCountry);
