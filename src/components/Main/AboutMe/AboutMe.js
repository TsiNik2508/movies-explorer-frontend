import "./AbotMe.css";
import photo from "../../../images/Me.jpg";

const AboutMe = () => {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__content">
        <img
          className="about-me__photo"
          alt="Фото студента"
          src={photo}
        />
        <div className="about-me__container">
          <h3 className="about-me__name">Никита</h3>
          <p className="about-me__description">Фронтенд-разработчик, 21 год</p>
          <p className="about-me__description">
            Я живу в культурной столице - Санкт-Петербурге. Люблю снимать видеоклипы и монтировать их. Увлекаюсь It с 14 лет, пробовал себя в 3d и level дизайне.
          </p>
          <p className="about-me__description">
            После школы сестра предложила попробовать себя в программировании, а её муж порекомендовал Веб-разработку, так как сам этим занимается. Направление очень понравилось и затянуло. После этого решил освоить эту специальность и сменить сферу.
          </p>
          <a
            className="about-me__link"
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