import { Link, useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  return (
    <section className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__subtitle">Страница не найдена</p>
      <Link onClick={handleBack} className="not-found__link">
        Назад
      </Link>
    </section>
  );
};

export default NotFound;