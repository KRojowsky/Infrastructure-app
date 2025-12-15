import React from 'react';
import './MainSectionSixth.scss';

const MainSectionSixth: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2026 InfraFix. Wszelkie prawa zastrzeżone.</p>
        <nav className="footer-nav">
          <a href="#privacy">Polityka prywatności</a>
          <a href="#terms">Regulamin</a>
          <a href="#contact">Kontakt</a>
        </nav>
      </div>
    </footer>
  );
};

export default MainSectionSixth;
