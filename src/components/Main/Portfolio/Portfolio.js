import "./Portfolio.css";

const Portfolio = () => {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__lists">
        <li className="portfolio__list">
          <a
            className="portfolio__link"
            href="https://github.com/TsiNik2508/how-to-learn/"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__link-text">Статичный сайт</p>
            <span>↗</span>
          </a>
        </li>
        <li className="portfolio__list">
          <a
            className="portfolio__link"
            href="https://github.com/TsiNik2508/russian-travel/"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__link-text">Адаптивный сайт</p>
            <span>↗</span>
          </a>
        </li>
        <li className="portfolio__list">
          <a
            className="portfolio__link"
            href="https://github.com/TsiNik2508/mesto-react/"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__link-text">Одностраничное приложение</p>
            <span>↗</span>
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;