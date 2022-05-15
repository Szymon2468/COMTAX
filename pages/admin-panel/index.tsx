import classNames from 'classnames';
import pl from 'date-fns/locale/pl';
import { ChangeEvent, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { v4 as uuidv4 } from 'uuid';
import { HTTPRequest } from '../../src/lib/httpRequest';
import styles from './AdminPanel.module.scss';
import AdminPanelTemplate from './subComponents/AdminPanelTemplate/AdminPanelTemplate';
import AdminReservationsForm, {
  IReservationFormAction
} from './subComponents/AdminReservationsForm/AdminReservationsForm';
import ReservationsTable from './subComponents/ReservationsTable/ReservationsTable';

interface IConferenceRoom {
  _id: string;
  city: string;
  address: string;
  name: string;
}

export interface IReservation {
  _id: string;
  startHour: string;
  endHour: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  message: string;
  company: string;
  numberOfPeople: string;
  street: string;
  city: string;
  zipCode: string;
  NIP: string;
}

const AdminPanelPage = () => {
  const [conferenceRooms, setConferenceRooms] = useState<
    IConferenceRoom[] | [] | false
  >(false);
  const [date, setDate] = useState(new Date());
  const [chosenConferenceRoom, setChosenConferenceRoom] = useState<
    IConferenceRoom | string
  >('');
  const [chosenReservation, setChosenReservation] =
    useState<IReservation | null>(null);
  const [reservations, setReservations] = useState<IReservation[]>();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pagesNumber: 1
  });
  const [action, setAction] = useState<IReservationFormAction>('ADD');

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
  }, [chosenConferenceRoom, date, chosenReservation]);

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

          {conferenceRooms && (
            <div className={styles.filterReservations}>
              <div>
                <label htmlFor='selectConferenceRoom'>
                  <p>Sala:</p>
                </label>

                <select
                  id='selectConferenceRoom'
                  defaultValue={
                    typeof chosenConferenceRoom === 'string'
                      ? chosenConferenceRoom
                      : chosenConferenceRoom._id
                  }
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
          )}
        </div>
        {conferenceRooms && (
          <div className={styles.content}>
            <div className={styles.reservationsTable}>
              {reservations && reservations.length > 0 && (
                <ReservationsTable
                  reservations={reservations}
                  setAction={(value: IReservationFormAction) => {
                    setAction(value);
                  }}
                  setChosenReservation={(value: IReservation) => {
                    setChosenReservation(value);
                  }}
                />
              )}
              {reservations && pagination.pagesNumber > 1 && (
                <div className={styles.pagination}>
                  <p>Strona: </p>
                  {Array.from({ length: pagination.pagesNumber }).map(
                    (val, i) => (
                      <div
                        key={uuidv4()}
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
                  <p>Nie znaleziono rezerwacji dla podanej sali oraz daty.</p>
                ))}
            </div>

            <AdminReservationsForm
              reservation={chosenReservation}
              setReservation={(reservation: IReservation) =>
                setChosenReservation(reservation)
              }
              conferenceRoomId={
                typeof chosenConferenceRoom === 'string'
                  ? chosenConferenceRoom
                  : chosenConferenceRoom._id
              }
              action={action}
              setAction={(value: IReservationFormAction) => setAction(value)}
              chosenDate={date}
            />
          </div>
        )}
      </>
    </AdminPanelTemplate>
  );
};

export default AdminPanelPage;
