import "./AbotMe.css";
import photo from "../../../images/student.png";

const AboutMe = () => {
  return (
    <section id="about-me" className="about">
      <h2 className="about__title">Студент</h2>
      <div className="about__content">
        <img
          className="about__photo"
          alt="Фото студента"
          src={photo}
        />
        {/* В следующем этапе изменить профиль на свой */}
        <div className="about__container"> 
          <h3 className="about__name">Виталий</h3>
          <p className="about__description">Фронтенд-разработчик, 30 лет</p>
          <p className="about__description">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a
            className="about__link"
            href="https://github.com/TsiNik2508"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;