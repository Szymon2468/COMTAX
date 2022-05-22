import { IReservation } from '../..';
import { MdPreview } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import styles from '../../AdminPanel.module.scss';
import { v4 as uuidv4 } from 'uuid';
import useWindowSize from '../../../../src/hooks/useWindowSize';

interface IReservationsTableProps {
  reservations: IReservation[];
  setAction: Function;
  setChosenReservation: Function;
}

const ReservationsTable = ({
  reservations,
  setAction,
  setChosenReservation
}: IReservationsTableProps) => {
  if (!reservations) {
    return null;
  }

  const windowSize = useWindowSize();
  if (windowSize.width > 1024) {
    return (
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
                <TiDeleteOutline />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
