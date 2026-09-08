interface Props {
  title: string;
  message: string;
  actionLabel: string;
  onAction: () => void;
}

function GameModal({ title, message, actionLabel, onAction }: Props) {
  return (
    <div className="modal">
      <div className="modal__card">
        <h2 className="modal__title">{title}</h2>
        <p className="modal__message">{message}</p>
        <button type="button" className="modal__button" onClick={onAction}>
          {actionLabel}
        </button>
      </div>
    </div>
  );
}

export default GameModal;
