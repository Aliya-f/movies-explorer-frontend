import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <p className="portfolio__title">Портфолио</p>
        <ul className="portfolio__links">
          <li className="portfolio__link"><a href="https://github.com/Aliya-f/how-to-learn" target="_blank">Статичный сайт</a></li>
          <li className="portfolio__link"><a href="https://github.com/Aliya-f/russian-travel" target="_blank">Адаптивный сайт</a></li>
          <li className="portfolio__link"><a href="https://github.com/Aliya-f/react-mesto-api-full-gha" target="_blank">Одностраничное приложение</a></li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;