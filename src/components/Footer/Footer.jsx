import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__description">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__container">
        <p className="footer__copyright">&copy; 2023</p>
        <nav className="footer__links">
          <a href="https://praktikum.yandex.ru" className="footer__link">Яндекс.Практикум</a>
          <a href="https://github.com" className="footer__link">Github</a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;