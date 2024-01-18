import "./AboutProject.css";

const AboutProject = () => {
  return (
    <section id="about-project" className="about">
      <h2 className="about__title">О проекте</h2>
      <div className="about__box">
        <div>
          <h2 className="about__subtitle">
            Дипломный проект включал 5{/* срывных нервов */} этапов
          </h2>
          <p className="about__description">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div>
          <h2 className="about__subtitle">
            На выполнение диплома ушло 5{/* десят пачек успокоительных */} недель
          </h2>
          <p className="about__description">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about__time">
        <span className="about__week">1 неделя{/* отрицание */}</span>
        <span className="about__week">4 недели{/* гнев, торг, депрессия... */}</span>
        <span className="about__week">Back-end</span>
        <span className="about__week">Front-end</span>
      </div>
    </section>
  );
};

export default AboutProject;