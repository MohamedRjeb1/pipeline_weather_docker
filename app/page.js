"use client";

import { useEffect, useState } from "react";
import "./globals.css";

export default function Home() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault(); 
    try {
      setError(null); 
      setWeatherData(null); 

      const response = await fetch(`/api/api_weather?city=${city}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Erreur lors de la récupération des données."
        );
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="weather-app">
      
      <header className="app-header">
        <h1>Prévisions Météo</h1>
        <p>
          Saisissez votre destination et vos dates pour voir la météo et la
          carte.
        </p>
      </header>

      
      <div className="app-content">
        
        <section className="weather-form">
          <h2>Rechercher la météo</h2>
          <form onSubmit={handleFormSubmit}>
            
            <div className="form-group">
              <label htmlFor="country">Pays :</label>
              <select
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                <option value="">pays</option>
                <option value="France">France</option>
                <option value="Tunisie">Tunisie</option>
                <option value="USA">États-Unis</option>
              </select>
            </div>

           
            <div className="form-group">
              <label htmlFor="city">Ville :</label>
              <select
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              >
                <option value="">ville</option>
                {country === "France" && <option value="Paris">Paris</option>}
                {country === "Tunisie" && <option value="Tunis">Tunis</option>}
                {country === "USA" && (
                  <option value="New York">New York</option>
                )}
              </select>
            </div>

            
            <div className="form-group">
              <label htmlFor="startDate">Date de début :</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>

           
            <div className="form-group">
              <label htmlFor="endDate">Date de fin :</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>

            
            <button type="submit" className="btn-submit">
              Voir la météo
            </button>
          </form>
        </section>

       
        <section className="weather-details">
          <h2>Données Météorologiques</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {weatherData ? (
            <div className="weather-info">
              <p><strong>Longitude :</strong> {weatherData.coord.lon}</p>
              <p><strong>Latitude :</strong> {weatherData.coord.lat}</p>
              <p><strong>Température :</strong> {weatherData.main.temp}°C</p>
              <p><strong>Ressenti :</strong> {weatherData.main.feels_like}°C</p>
              <p><strong>Température minimale :</strong> {weatherData.main.temp_min}°C</p>
              <p><strong>Température maximale :</strong> {weatherData.main.temp_max}°C</p>
              <p><strong>Pression atmosphérique :</strong> {weatherData.main.pressure} hPa</p>
              <p><strong>Humidité :</strong> {weatherData.main.humidity}%</p>
              <p><strong>Visibilité :</strong> {weatherData.visibility} mètres</p>
              <p><strong>Vitesse du vent :</strong> {weatherData.wind.speed} m/s</p>
              <p><strong>Direction du vent :</strong> {weatherData.wind.deg}°</p>
              <p><strong>Couverture nuageuse :</strong> {weatherData.clouds.all}%</p>
              <p><strong>Description :</strong> {weatherData.weather[0].description}</p>
              <p><strong>Pays :</strong> {weatherData.sys.country}</p>
              <p><strong>Lever du soleil :</strong> {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
              <p><strong>Coucher du soleil :</strong> {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
              <p><strong>Fuseau horaire :</strong> UTC+{weatherData.timezone / 3600}</p>
            </div>
          ) : (
            <p>Aucune donnée disponible. Veuillez remplir le formulaire pour afficher les données.</p>
          )}
        </section>

       
        <section className="weather-map">
          <h2>Carte</h2>
          {city ? (
            <iframe
              src={`https://www.google.com/maps?q=${city}&output=embed`}
              width="100%"
              height="300"
              allowFullScreen=""
              loading="lazy"
              title="Google Maps"
            ></iframe>
          ) : (
            <p>Aucune carte disponible. Sélectionnez une ville pour afficher la carte.</p>
          )}
        </section>
      </div>
    </main>
  );
}
