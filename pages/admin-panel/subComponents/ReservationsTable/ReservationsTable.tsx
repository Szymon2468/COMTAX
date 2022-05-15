import { IReservation } from '../..';
import { MdPreview } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import styles from '../../AdminPanel.module.scss';
import { v4 as uuidv4 } from 'uuid';

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
};

export default ReservationsTable;
