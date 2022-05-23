import classNames from 'classnames';
import { useEffect, useState } from 'react';
import styles from './MessagePopup.module.scss';

export interface IMessagePopup {
  visible: boolean;
  message?: string;
  type?: 'ERROR' | 'SUCCESS';
}

const MessagePopup = ({ visible, message, type }: IMessagePopup) => {
  const [display, setDisplay] = useState<boolean>(visible);

  useEffect(() => {
    if (visible) {
      setTimeout(
        () => {
          setDisplay(false);
        },
        type === 'ERROR' ? 6000 : 3000
      );
    }
  }, [display]);

  useEffect(() => {
    setDisplay(visible);
  }, [visible]);

  if (!display) {
    return null;
  }

  return (
    <div
      className={classNames(
        styles.messagePopUp,
        type === 'ERROR' && styles.messagePopUpError
      )}
    >
      <p>{message}</p>
    </div>
  );
};

export default MessagePopup;
