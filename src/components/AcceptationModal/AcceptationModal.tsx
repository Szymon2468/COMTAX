import styles from './AcceptationModal.module.scss';
import { AiOutlineClose } from 'react-icons/ai';
import { useEffect, useState } from 'react';

interface IAcceptationModalButtons {
  yes?: boolean;
  yesAction?: Function;
  no?: boolean;
  noAction?: Function;
  ok?: boolean;
  okAction?: Function;
  close?: boolean;
  closeAction?: Function;
}

export interface IAcceptationModal {
  visible: boolean;
  message?: JSX.Element;
  buttons?: IAcceptationModalButtons;
}

const AcceptationModal = ({ message, buttons, visible }: IAcceptationModal) => {
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    setDisplay(visible);
  }, [visible]);

  if (!display) {
    return null;
  }

  return (
    <div className={styles.modal}>
      {buttons?.close && (
        <i
          className={styles.closeBtn}
          onClick={() => (buttons?.closeAction ? buttons?.closeAction() : null)}
        >
          <AiOutlineClose />
        </i>
      )}
      {message && <div className={styles.modalMessage}>{message}</div>}
      {(buttons?.yes || buttons?.no) && (
        <div className={styles.acceptButtons}>
          {buttons.yes && (
            <button
              className={styles.yesBtn}
              onClick={() => (buttons.yesAction ? buttons.yesAction() : null)}
            >
              Tak
            </button>
          )}
          {buttons.no && (
            <button
              className={styles.noBtn}
              onClick={() => (buttons.noAction ? buttons.noAction() : null)}
            >
              Nie
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AcceptationModal;
