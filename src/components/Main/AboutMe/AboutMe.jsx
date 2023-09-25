import './AboutMe.css';

function AboutMe() {
  return (
    <section className="about-me">
      <div className="about-me__container">
        <h2 className="section-title">Студент</h2>
        <div className="about-me__info">
          <div className="about-me__text">
            <h3 className="about-me__title">Виталий</h3>
            <p className="about-me__subtitle">Фронтенд-разработчик, 30 лет</p>
            <p className="about-me__biografy">
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
            <ul className="about-me__link">
              <li><a href="https://github.com/Aliya-f" target="_blank">Github</a></li>
            </ul>
          </div>
          <img src={`https://foni.club/uploads/posts/2023-02/1677284635_foni-club-p-art-pop-muzhchina-43.jpg`} alt="фото профиля" className="about-me__avatar"/>
        </div>
      </div>
      </section>
  );
}

export default AboutMe;