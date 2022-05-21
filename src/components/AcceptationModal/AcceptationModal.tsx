import styles from './AcceptationModal.module.scss';
import { AiOutlineClose } from 'react-icons/ai';

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
  message?: string;
  buttons?: IAcceptationModalButtons;
}

const AcceptationModal = ({ visible, message, buttons }: IAcceptationModal) => {
  return (
    <div className={styles.modal}>
      {buttons?.close && (
        <i
          className={styles.closeBtn}
          onClick={() => (buttons?.closeAction ? buttons?.closeAction : null)}
        >
          <AiOutlineClose />
        </i>
      )}
    </div>
  );
};

export default AcceptationModal;
