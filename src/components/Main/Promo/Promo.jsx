import './Promo.css';
import promoLogo from '../../../images/promo__logo.svg'

function Promo() {
  return (
    <>
      <section className="promo">
        <div className="promo__container">
          <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
          <img src={promoLogo} alt="лого" className="promo__logo"/>
        </div>
      </section>
    </>
  );
}

export default Promo;