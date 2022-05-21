import { emptyReservation, IReservation } from '../..';
import { MdPreview } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import styles from '../../AdminPanel.module.scss';
import { v4 as uuidv4 } from 'uuid';
import { HTTPRequest } from '../../../../src/lib/httpRequest';
import { useEffect, useState } from 'react';
import AcceptationModal, {
  IAcceptationModal
} from '../../../../src/components/AcceptationModal/AcceptationModal';
import { IMessagePopUp } from '../AdminReservationsForm/AdminReservationsForm';
import classNames from 'classnames';

interface IReservationsTableProps {
  reservations: IReservation[];
  setAction: Function;
  setChosenReservation: Function;
  chosenReservation: IReservation | null;
}

const ReservationsTable = ({
  reservations,
  setAction,
  setChosenReservation,
  chosenReservation
}: IReservationsTableProps) => {
  const [acceptationModal, setAcceptationModal] = useState<IAcceptationModal>();
  const [acceptationModalVisible, setAcceptationModalVisible] =
    useState<boolean>(false);
  const [messagePopUp, setMessagePopUp] = useState<IMessagePopUp>({
    visible: false
  });

  useEffect(() => {
    if (messagePopUp.visible) {
      setTimeout(
        () => {
          setMessagePopUp({ visible: false });
        },
        messagePopUp.type === 'ERROR' ? 6000 : 3000
      );
    }
  }, [messagePopUp]);

  if (!reservations) {
    return null;
  }

  const handleDelete = async (reservation: IReservation) => {
    const response = await HTTPRequest(
      'DELETE',
      `reservations?id=${reservation._id}`
    );
    if (response.success) {
      chosenReservation === null
        ? setChosenReservation(emptyReservation)
        : setChosenReservation(null);
      setAction('ADD');

      setMessagePopUp({
        visible: true,
        type: 'SUCCESS',
        message: 'Pomyślnie zapisano zmiany.'
      });
    } else {
      setMessagePopUp({
        visible: true,
        type: 'ERROR',
        message:
          'Nie udało się zapisać zmian. Spróbuj ponownie lub skontaktuj się z administratorem.'
      });
    }
  };

  return (
    <>
      {messagePopUp.visible && (
        <div
          className={classNames(
            styles.messagePopUp,
            messagePopUp.type === 'ERROR' && styles.messagePopUpError
          )}
        >
          <p>{messagePopUp.message}</p>
        </div>
      )}
      {acceptationModalVisible && (
        <div className={styles.acceptationModal}>
          <AcceptationModal {...acceptationModal} />
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Początek</th>
            <th>Koniec</th>
            <th>Na osobę</th>
            <th>E-mail</th>
            <th>Telefon</th>
            <th>Firma</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={uuidv4()}>
              <td>{reservation.startHour}</td>
              <td>{reservation.endHour}</td>
              <td>
                <div className={styles.scrollable}>
                  {reservation.name} {reservation.surname}
                </div>
              </td>
              <td>
                <div className={styles.scrollable}>{reservation.email}</div>
              </td>
              <td>
                <div className={styles.scrollable}>{reservation.phone}</div>
              </td>
              <td>
                <div className={styles.scrollable}>
                  {reservation.company !== ''
                    ? reservation.company
                    : 'nie podano'}
                </div>
              </td>
              <td className={styles.actions}>
                <MdPreview
                  onClick={() => {
                    setChosenReservation(reservation);
                    setAction('PREVIEW');
                  }}
                />
                <AiFillEdit
                  onClick={() => {
                    setChosenReservation(reservation);
                    setAction('EDIT');
                  }}
                />
                <TiDeleteOutline
                  onClick={async () => {
                    setAcceptationModal({
                      message: (
                        <>
                          <h3>Czy na pewno chcesz usunąć tą rezerwację?</h3>
                          <p>
                            Rezerwacja od {reservation.startHour} do{' '}
                            {reservation.endHour} na osobę {reservation.name}{' '}
                            {reservation.surname}.
                          </p>
                        </>
                      ),
                      buttons: {
                        close: true,
                        closeAction: () => {
                          setAcceptationModalVisible(false);
                        },
                        yes: true,
                        yesAction: async () => {
                          setAcceptationModalVisible(false);
                          await handleDelete(reservation);
                        },
                        no: true,
                        noAction: () => setAcceptationModalVisible(false)
                      }
                    });
                    setAcceptationModalVisible(true);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ReservationsTable;
