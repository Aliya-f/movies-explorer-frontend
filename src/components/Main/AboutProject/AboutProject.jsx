import './AboutProject.css';

function AboutProject() {
  return (
    <>
      <section className="about-project">
        <div className="about-project__container">
          <h2 className="section__title">О проекте</h2>
          <div className="about-project__info">
            <div className="about-project__table">
              <p className="about-project__info-title">Дипломный проект включал 5 этапов</p>
              <p className="about-project__info-subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
            </div>
            <div className="about-project__table">
              <p className="about-project__info-title">На выполнение диплома ушло 5 недель</p>
              <p className="about-project__info-subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </div>
          </div>
          <div className="about-project__scale">
             <div className="about-project__scale-left">
               <p className="about-project__scale-date">1 неделя</p>
               <p className="about-project__scale-name">Back-end</p>
             </div>
             <div className="about-project__scale-column-right">
                <p className="about-project__scale-date">4 недели</p>
                <p className="about-project__scale-name">Front-end</p>
             </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutProject;