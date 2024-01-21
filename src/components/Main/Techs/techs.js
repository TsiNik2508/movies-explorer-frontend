import "./Techs.css";

const Techs = () => {
  return (
    <section className="techs">
      <h2 className="techs__title">Технологии</h2>
      <div className="techs__content">
        <h3 className="techs__subtitle">7 технологий</h3>
        <p className="techs__description">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="techs__lists">
          <li className="techs__list">HTML</li>
          <li className="techs__list">CSS</li>
          <li className="techs__list">JS</li>
          <li className="techs__list">React</li>
          <li className="techs__list">Git</li>
          <li className="techs__list">Express.js</li>
          <li className="techs__list">mongoDB</li>
        </ul>
      </div>
    </section>
  );
};

export default Techs;
