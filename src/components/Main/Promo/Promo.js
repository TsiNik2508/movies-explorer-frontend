import webImg from "../../../images/Web.svg";
import "./Promo.css";

const Promo = () => {
  return (
    <section className="promo">
      <div className="promo__box">
        <img
          className="promo__img"
          alt="Web - в форме Земли"
          src={webImg}
        />
        <div className="promo__container">
          <h1 className="promo__title">
            Учебный проект студента факультета Веб&#8209;разработки.
          </h1>
          <p className="promo__description">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
          <a className="promo__link" href="#about-project">
            Узнать больше
          </a>
        </div>
      </div>
    </section>
  );
};

export default Promo;