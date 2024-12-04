"use client"
import './footer.css';

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-container">
       
        <div className="footer-info">
          <h3>Prévisions Météo</h3>
          <p>
            Obtenez des informations météorologiques précises pour vos voyages et restez préparé grâce à notre plateforme.
          </p>
        </div>

       
        <div className="footer-links">
          <h4>Liens rapides</h4>
          <ul>
            <li><a href="#home">Accueil</a></li>
            <li><a href="#about">À propos</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        
        <div className="footer-socials">
          <h4>Suivez-nous</h4>
          <ul>
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          </ul>
        </div>
      </div>

      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Prévisions Météo. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
