import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="footer__box">
        <ul className="footer__nav">
          <li className="footer__nav-item">
            <a
              className="footer__links"
              href="https://practicum.yandex.ru/"
              target="_blank"
              rel="noreferrer"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__nav-item">
            <a
              className="footer__links"
              href="https://github.com/TsiNik2508"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </li>
        </ul>
        <span className="footer__date">© 2024</span>
      </div>
    </footer>
  );
};

export default Footer;