import AdminPanelTemplate from './subComponents/AdminPanelTemplate/AdminPanelTemplate';
import styles from './AdminPanel.module.scss';
import { ChangeEvent, useEffect, useState } from 'react';
import { HTTPRequest } from '../../src/lib/httpRequest';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';
import DatePicker from 'react-datepicker';
import pl from 'date-fns/locale/pl';
import { MdPreview } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import 'react-datepicker/dist/react-datepicker.css';

interface IConferenceRoom {
  _id: string;
  city: string;
  address: string;
  name: string;
}

interface IReservation {
  _id: string;
  startHour: string;
  endHour: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  company: string;
}

const AdminPanelPage = () => {
  const [conferenceRooms, setConferenceRooms] = useState<
    IConferenceRoom[] | [] | false
  >(false);
  const [date, setDate] = useState(new Date());
  const [chosenConferenceRoom, setChosenConferenceRoom] = useState('');
  const [reservations, setReservations] = useState<IReservation[]>();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pagesNumber: 1
  });

  useEffect(() => {
    const getConferenceRooms = async () => {
      const response = await HTTPRequest('GET', 'conference-rooms');

      if (response.success) {
        setConferenceRooms(response.data);
        setChosenConferenceRoom(response.data[0]._id);
      } else {
        setConferenceRooms([]);
      }
    };

    getConferenceRooms();
  }, []);

  useEffect(() => {
    getReservations(pagination.currentPage);
  }, [pagination.currentPage]);

  useEffect(() => {
    getReservations(1);
  }, [chosenConferenceRoom, date]);

  const getReservations = async (page: number) => {
    const response = await HTTPRequest(
      'GET',
      `reservations?date=${date.getTime()}&conferenceRoom=${chosenConferenceRoom}&page=${page}&limit=6`
    );

    if (response.success) {
      setReservations(response.data);
      setPagination(response.pagination);
    }
  };

  if (!conferenceRooms) {
    <AdminPanelTemplate active={'RESERVATIONS'}>
      <>
        <div className={styles.siteInfo}>
          <h3>Zarządzaj Rezerwacjami</h3>
        </div>
        {!conferenceRooms && <h3>Loading...</h3>}
      </>
    </AdminPanelTemplate>;
  }

  return (
    <AdminPanelTemplate active={'RESERVATIONS'}>
      <>
        <div className={styles.siteInfo}>
          <h3>Zarządzaj Rezerwacjami</h3>
        </div>
        {conferenceRooms && (
          <div className={styles.content}>
            <div className={styles.filterReservations}>
              <div>
                <label htmlFor='selectConferenceRoom'>
                  <p>Sala:</p>
                </label>

                <select
                  id='selectConferenceRoom'
                  defaultValue={chosenConferenceRoom}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    setChosenConferenceRoom(e.currentTarget.value);
                  }}
                >
                  {conferenceRooms.map((el) => (
                    <option key={el._id} value={el._id}>
                      {el.address}, {el.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.datePicker}>
                <label htmlFor='datePicker'>
                  <p>Dzień:</p>
                </label>
                <DatePicker
                  id='datePicker'
                  dateFormat='dd.MM.yyyy'
                  selected={date}
                  onChange={(date) => setDate(date as Date)}
                  locale={pl}
                />
              </div>
            </div>
            <div className={styles.reservationsTable}>
              {reservations && reservations.length > 0 && (
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
                          <div className={styles.scrollable}>
                            {reservation.email}
                          </div>
                        </td>
                        <td>
                          <div className={styles.scrollable}>
                            {reservation.phone}
                          </div>
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
              )}
              {reservations && pagination.pagesNumber > 1 && (
                <div className={styles.pagination}>
                  <p>Strona: </p>
                  {Array.from({ length: pagination.pagesNumber }).map(
                    (val, i) => (
                      <div
                        className={classNames(
                          styles.paginationTile,
                          i + 1 === pagination.currentPage &&
                            styles.activePagination
                        )}
                        onClick={() => {
                          if (i + 1 === pagination.currentPage) {
                            return null;
                          } else {
                            setPagination({
                              currentPage: i + 1,
                              pagesNumber: pagination.pagesNumber
                            });
                          }
                        }}
                      >
                        {i + 1}
                      </div>
                    )
                  )}
                </div>
              )}
              {!reservations ||
                (reservations.length === 0 && (
                  <p>Nie znaleziono rezerwacji dla podanych sali oraz daty.</p>
                ))}
            </div>
          </div>
        )}
      </>
    </AdminPanelTemplate>
  );
};

export default AdminPanelPage;
