import AdminPanelTemplate from './subComponents/AdminPanelTemplate/AdminPanelTemplate';
import styles from './AdminPanel.module.scss';
import { ChangeEvent, useEffect, useState } from 'react';
import { HTTPRequest } from '../../src/lib/httpRequest';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';
import DatePicker from 'react-datepicker';
import pl from 'date-fns/locale/pl';

import 'react-datepicker/dist/react-datepicker.css';
import ReservationsTable from './subComponents/ReservationsTable/ReservationsTable';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';

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
  company: string;
}

const AdminPanelPage = () => {
  const [conferenceRooms, setConferenceRooms] = useState<
    IConferenceRoom[] | [] | false
  >(false);
  const [date, setDate] = useState(new Date());
  const [chosenConferenceRoom, setChosenConferenceRoom] = useState('');
  const [chosenReservation, setChosenReservation] = useState('');
  const [reservations, setReservations] = useState<IReservation[]>();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pagesNumber: 1
  });
  const [action, setAction] = useState<'ADD' | 'PREVIEW' | 'EDIT'>('ADD');

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
                <ReservationsTable reservations={reservations} />
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
                  <p>Nie znaleziono rezerwacji dla podanych sali oraz daty.</p>
                ))}
            </div>
            <div className={styles.reservationForm}>
              <h4>
                {action === 'ADD' && 'Dodaj nową rezerwację'}
                {action === 'PREVIEW' && 'Podgląd rezerwacji'}
                {action === 'EDIT' && 'Edytuj rezerwację'}
              </h4>
              <div className={styles.form}>
                <Formik
                  initialValues={{
                    email: '',
                    password: ''
                  }}
                  // validationSchema={FormValidationSchema}
                  onSubmit={async () =>
                    // values: ILoginFormValues,
                    // { setSubmitting }: FormikHelpers<>
                    {
                      // setSubmitting(false);
                    }
                  }
                >
                  {({ errors }) => (
                    <Form>
                      <div className={styles.formContainer}>
                        <h5>Osoba Kontaktowa</h5>
                        <div className={styles.formInputs}>
                          <div className={styles.formInput}>
                            <div>
                              <label htmlFor='name'>Imię*</label>
                              <Field
                                id='name'
                                name='name'
                                placeholder={'Imię*'}
                              />
                            </div>
                            <ErrorMessage name='name' />
                          </div>

                          <div className={styles.formInput}>
                            <div>
                              <label htmlFor='surname'>Nazwisko*</label>
                              <Field
                                id='surname'
                                name='surname'
                                placeholder={'Nazwisko*'}
                              />
                            </div>
                            <ErrorMessage name='surname' />
                          </div>

                          <div className={styles.formInput}>
                            <div>
                              <label htmlFor='email'>E-mail*</label>
                              <Field
                                id='email'
                                name='email'
                                placeholder={'E-mail*'}
                              />
                            </div>
                            <ErrorMessage name='email' />
                          </div>

                          <div className={styles.formInput}>
                            <div>
                              <label htmlFor='phone'>Numer telefonu*</label>
                              <Field
                                id='phone'
                                name='phone'
                                placeholder={'Numer telefonu*'}
                              />
                            </div>
                            <ErrorMessage name='phone' />
                          </div>

                          <div className={styles.formInput}>
                            <div>
                              <label htmlFor='message'>Uwagi</label>
                              <Field
                                as='textarea'
                                id='message'
                                name='message'
                                placeholder={'Uwagi'}
                              />
                            </div>
                            <ErrorMessage name='message' />
                          </div>
                        </div>
                      </div>

                      <div className={styles.formContainer}>
                        <h5>Dane do faktury</h5>
                        <div className={styles.formInputs}>
                          <div className={styles.formInput}>
                            <div>
                              <label htmlFor='company'>Firma</label>
                              <Field
                                id='company'
                                name='company'
                                placeholder={'Firma'}
                              />
                            </div>
                            <ErrorMessage name='company' />
                          </div>

                          <div className={styles.formInput}>
                            <div>
                              <label htmlFor='street'>Ulica</label>
                              <Field
                                id='street'
                                name='street'
                                placeholder={'Ulica'}
                              />
                            </div>
                            <ErrorMessage name='street' />
                          </div>

                          <div className={styles.formInput}>
                            <div>
                              <label htmlFor='zipCode'>Kod pocztowy</label>
                              <Field
                                id='zipCode'
                                name='zipCode'
                                placeholder={'Kod pocztowy'}
                              />
                            </div>
                            <ErrorMessage name='zipCode' />
                          </div>

                          <div className={styles.formInput}>
                            <div>
                              <label htmlFor='city'>Miasto</label>
                              <Field
                                id='city'
                                name='city'
                                placeholder={'Miasto'}
                              />
                            </div>
                            <ErrorMessage name='city' />
                          </div>

                          <div className={styles.formInput}>
                            <div>
                              <label htmlFor='NIP'>NIP</label>
                              <Field id='NIP' name='NIP' placeholder={'NIP'} />
                            </div>
                            <ErrorMessage name='NIP' />
                          </div>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        )}
      </>
    </AdminPanelTemplate>
  );
};

export default AdminPanelPage;
