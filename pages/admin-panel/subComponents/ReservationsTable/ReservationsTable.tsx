import { IReservation } from '../..';
import { MdPreview } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import styles from '../../AdminPanel.module.scss';

interface IReservationsTableProps {
  reservations: IReservation[];
}

const ReservationsTable = ({ reservations }: IReservationsTableProps) => {
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
          <tr>
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
              <MdPreview />
              <AiFillEdit />
              <TiDeleteOutline />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReservationsTable;
