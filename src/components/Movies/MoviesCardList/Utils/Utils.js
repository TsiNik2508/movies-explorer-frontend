import "../Utils/Utils.css";

const More = ({ showMore }) => {
  return (
    <div className="more">
      <button onClick={showMore} className={`more__button`} type="button">
        Ещё
      </button>
    </div>
  );
};

export default More;