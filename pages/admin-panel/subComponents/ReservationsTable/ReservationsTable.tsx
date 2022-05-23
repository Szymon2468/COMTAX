import { useEffect, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { MdPreview } from 'react-icons/md';
import { TiDeleteOutline } from 'react-icons/ti';
import { v4 as uuidv4 } from 'uuid';
import { emptyReservation, IReservation } from '../..';
import AcceptationModal, {
  IAcceptationModal
} from '../../../../src/components/AcceptationModal/AcceptationModal';
import MessagePopup, {
  IMessagePopup
} from '../../../../src/components/MessagePopup/MessagePopup';
import useWindowSize from '../../../../src/hooks/useWindowSize';
import { HTTPRequest } from '../../../../src/lib/httpRequest';
import styles from '../../AdminPanel.module.scss';

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
  const [acceptationModal, setAcceptationModal] = useState<IAcceptationModal>({
    visible: false
  });
  const [messagePopUp, setMessagePopUp] = useState<IMessagePopup>({
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

  const windowSize = useWindowSize();
  if (windowSize.width > 1024) {
    return (
      <>
        <MessagePopup {...messagePopUp} />
        <div className={styles.acceptationModal}>
          <AcceptationModal {...acceptationModal} />
        </div>

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
                        visible: true,
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
                            setAcceptationModal({ visible: false });
                          },
                          yes: true,
                          yesAction: async () => {
                            setAcceptationModal({ visible: false });
                            await handleDelete(reservation);
                          },
                          no: true,
                          noAction: () =>
                            setAcceptationModal({ visible: false })
                        }
                      });
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  } else {
    return (
      <div className={styles.reservationsContainer}>
        {reservations.map((reservation) => (
          <ShortReservation
            key={uuidv4()}
            reservation={reservation}
            setChosenReservation={setChosenReservation}
            setAction={setAction}
          />
        ))}
      </div>
    );
  }
};

interface IShortReservationProps {
  reservation: IReservation;
  setChosenReservation: Function;
  setAction: Function;
}

const ShortReservation = ({
  reservation,
  setChosenReservation,
  setAction
}: IShortReservationProps) => {
  return (
    <div className={styles.reservationContainer}>
      <div className={styles.reservationRow}>
        <p>Początek</p>
        <p>{reservation.startHour}</p>
      </div>
      <div className={styles.reservationRow}>
        <p>Koniec</p>
        <p>{reservation.endHour}</p>
      </div>
      <div className={styles.reservationRow}>
        <p>Na osobę</p>
        <p>{reservation.endHour}</p>
      </div>
      <div className={styles.reservationRow}>
        <p>E-mail</p>
        <p>{reservation.email}</p>
      </div>
      <div className={styles.reservationRow}>
        <p>Telefon</p>
        <p>{reservation.phone}</p>
      </div>
      <div className={styles.reservationRow}>
        <p>Firma</p>
        <p>{reservation.company}</p>
      </div>
      <div className={styles.reservationRow}>
        <p>Akcje</p>
        <p className={styles.actions}>
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
          <TiDeleteOutline />
        </p>
      </div>
    </div>
  );
};

export default ReservationsTable;
