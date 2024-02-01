import './Popup.css';

const Popup = ({ isOpen, onClose, overlayClickClose, errorMessage }) => {
  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""}`}
      onMouseDown={overlayClickClose}
    >
      <div className="popup__container popup__container_type_infotool">
        <button
          onClick={onClose}
          aria-label="Закрыт"
          className="popup__button"
          type="button"
        ></button>
        <p className="popup__infotool-message">
          {errorMessage}
        </p>
      </div>
    </div>
  );
}
export default Popup;