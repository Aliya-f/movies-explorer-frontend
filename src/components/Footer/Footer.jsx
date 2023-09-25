import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__description">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__container">
        <p className="footer__copyright">&copy; 2023</p>
        <nav>
          <ul className="footer__links">
            <li><a href="https://praktikum.yandex.ru" target="_blank" className="footer__link">Яндекс.Практикум</a></li>
            <li><a href="https://github.com" target="_blank" className="footer__link">Github</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;