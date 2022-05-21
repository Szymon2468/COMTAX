import styles from '../../AdminPanel.module.scss';
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikHelpers,
  setIn
} from 'formik';
import {
  availableEndHours,
  availableStartHours,
  possibleNumberOfPeople
} from '../../../../src/configs/roomReservation/roomReservation';
import { v4 as uuidv4, v4 } from 'uuid';
import { useEffect, useState } from 'react';
import { IReservation } from '../..';
import { HTTPRequest } from '../../../../src/lib/httpRequest';
import classNames from 'classnames';

export type IReservationFormAction = 'ADD' | 'PREVIEW' | 'EDIT';

interface IMessagePopUp {
  visible: boolean;
  message?: string;
  type?: 'ERROR' | 'SUCCESS';
}

interface INewReservation {
  date: number;
  conferenceRoom: string;
  startHour: string;
  endHour: string;
  numberOfPeople: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  message: string;
  company: string;
  street: string;
  zipCode: string;
  city: string;
  NIP: string;
}

interface IReservationsFormProps {
  reservation: IReservation | null;
  action: IReservationFormAction;
  setAction: Function;
  setReservation: Function;
  conferenceRoomId: string;
  chosenDate: Date;
}

const AdminReservationsForm = ({
  reservation,
  setReservation,
  action,
  setAction,
  chosenDate,
  conferenceRoomId
}: IReservationsFormProps) => {
  const [messagePopUp, setMessagePopUp] = useState<IMessagePopUp>({
    visible: false
  });

  const [initailValues, setInitialvalues] = useState<IReservation>({
    _id: '',
    startHour: '8:00',
    endHour: '8:30',
    numberOfPeople: '1',
    name: '',
    surname: '',
    email: '',
    phone: '',
    message: '',
    company: '',
    street: '',
    zipCode: '',
    city: '',
    NIP: ''
  });

  useEffect(() => {
    if (reservation) {
      setInitialvalues(reservation);
    }
  }, [reservation]);

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
      <div className={styles.reservationForm}>
        <h4>
          {action === 'ADD' && 'Dodaj nową rezerwację'}
          {action === 'PREVIEW' && 'Podgląd rezerwacji'}
          {action === 'EDIT' && 'Edytuj rezerwację'}
        </h4>
        <div className={styles.form}>
          <Formik
            enableReinitialize={true}
            initialValues={initailValues}
            // validationSchema={FormValidationSchema}
            onSubmit={async (
              values: IReservation,
              { setSubmitting }: FormikHelpers<IReservation>
            ) => {
              let response;
              if (action === 'EDIT') {
                response = await HTTPRequest(
                  'POST',
                  `reservations?id=${values._id}`,
                  values
                );
              } else if (action === 'ADD') {
                const data: INewReservation = {
                  date: chosenDate.getTime(),
                  conferenceRoom: conferenceRoomId,
                  startHour: values.startHour,
                  endHour: values.endHour,
                  numberOfPeople: values.numberOfPeople,
                  name: values.name,
                  surname: values.surname,
                  email: values.email,
                  phone: values.phone,
                  message: values.message,
                  company: values.company,
                  street: values.street,
                  zipCode: values.zipCode,
                  city: values.city,
                  NIP: values.NIP
                };
                response = await HTTPRequest('PUT', 'reservations', data);
              }

              if (response.success) {
                setMessagePopUp({
                  visible: true,
                  type: 'SUCCESS',
                  message: 'Pomyślnie zapisano zmiany'
                });
                setReservation(response.data);
                setAction('PREVIEW');
              } else {
                setMessagePopUp({
                  visible: true,
                  type: 'ERROR',
                  message:
                    'Nie udało się zapisać zmian. Spróbuj ponownie lub skontaktuj się z administratorem.'
                });
              }
              setSubmitting(false);
            }}
          >
            {({ errors }) => (
              <Form>
                <div className={styles.formSelects}>
                  <div>
                    <label htmlFor='startHour'>od</label>
                    <Field
                      as='select'
                      id='startHour'
                      name='startHour'
                      disabled={action === 'PREVIEW'}
                    >
                      {availableStartHours.map((el) => (
                        <option key={uuidv4()} value={el}>
                          {el}
                        </option>
                      ))}
                    </Field>
                  </div>

                  <div>
                    <label htmlFor='endHour'>do</label>
                    <Field
                      as='select'
                      id='endHour'
                      name='endHour'
                      disabled={action === 'PREVIEW'}
                    >
                      {availableEndHours.map((el) => (
                        <option key={uuidv4()} value={el}>
                          {el}
                        </option>
                      ))}
                    </Field>
                  </div>
                </div>

                <div className={styles.formSelects}>
                  <div>
                    <label className='p' htmlFor='numberOfPeople'>
                      Liczba osób
                    </label>
                    <Field
                      as='select'
                      id='numberOfPeople'
                      name='numberOfPeople'
                      disabled={action === 'PREVIEW'}
                    >
                      {possibleNumberOfPeople.map((el) => {
                        return (
                          <option key={uuidv4()} value={el}>
                            {el}
                          </option>
                        );
                      })}
                    </Field>
                  </div>
                </div>

                <div className={styles.forms}>
                  <div className={styles.formContainer}>
                    <h5>Osoba Kontaktowa</h5>
                    <div className={styles.formInputs}>
                      <div className={styles.formInput}>
                        <div>
                          <label htmlFor='name'>Imię*</label>
                          <Field
                            id='name'
                            name='name'
                            disabled={action === 'PREVIEW'}
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
                            disabled={action === 'PREVIEW'}
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
                            disabled={action === 'PREVIEW'}
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
                            disabled={action === 'PREVIEW'}
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
                            disabled={action === 'PREVIEW'}
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
                            disabled={action === 'PREVIEW'}
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
                            disabled={action === 'PREVIEW'}
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
                            disabled={action === 'PREVIEW'}
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
                            disabled={action === 'PREVIEW'}
                            placeholder={'Miasto'}
                          />
                        </div>
                        <ErrorMessage name='city' />
                      </div>

                      <div className={styles.formInput}>
                        <div>
                          <label htmlFor='NIP'>NIP</label>
                          <Field
                            id='NIP'
                            name='NIP'
                            disabled={action === 'PREVIEW'}
                            placeholder={'NIP'}
                          />
                        </div>
                        <ErrorMessage name='NIP' />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.submitButtonContainer}>
                  {action !== 'PREVIEW' && (
                    <button type='submit' className={styles.submitButton}>
                      {(action === 'EDIT' && 'Zapisz zmiany') ||
                        (action === 'ADD' && 'Dodaj rezerwację')}
                    </button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default AdminReservationsForm;
