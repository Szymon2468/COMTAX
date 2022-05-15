import classNames from 'classnames';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import {
  availableStartHours,
  generateEndHours,
  generateStartHours,
  getStartHour,
  IConferenceRoomResponse,
  IReservationFormValues,
  IShortenReservation,
  possibleNumberOfPeople
} from '../../../../../src/configs/roomReservation/roomReservation';
import styles from '../index.module.scss';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import Button from '../../../../../src/components/Button/Button';
import { HTTPRequest } from '../../../../../src/lib/httpRequest';

const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;

const FormValidationSchema = Yup.object().shape({
  name: Yup.string().required('Proszę podać swoje imię.'),
  surname: Yup.string().required('Proszę podać swoje nazwisko.'),
  email: Yup.string()
    .email('Proszę podać poprawny adres e-mail.')
    .required('Proszę podać adres e-mail.'),
  phone: Yup.string()
    .matches(phoneRegex, 'Proszę podać poprawny numer telefonu.')
    .required('Proszę podać numer telefonu.')
});

interface IReservationFormProps {
  currentReservations: IShortenReservation[];
  conferenceRoom: IConferenceRoomResponse;
  date: Date;
}

const ReservationForm = ({
  currentReservations,
  conferenceRoom,
  date
}: IReservationFormProps) => {
  const startHours: string[] = [...availableStartHours];

  startHours.splice(
    0,
    startHours.findIndex((el) => el === getStartHour(currentReservations || []))
  );

  const [startHour, setStartHour] = useState(
    generateStartHours(startHours, currentReservations || [])[0]
  );
  const [endHours, setEndHours] = useState(
    generateEndHours(startHour, currentReservations || [])
  );
  const [isMsgSent, setIsMsgSent] = useState(false);
  const [isMsgSendigError, setIsMsgSendigError] = useState(false);

  useEffect(() => {
    setEndHours(generateEndHours(startHour, currentReservations || []));
  }, [startHour]);

  if (!currentReservations) {
    return null;
  }

  return (
    <div className={styles.formContainersContainer}>
      <div className={styles.formContainer}>
        <Formik
          initialValues={{
            startHour: startHour,
            endHour: endHours[0],
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
          }}
          validationSchema={FormValidationSchema}
          onSubmit={async (
            values: IReservationFormValues,
            { setSubmitting }: FormikHelpers<IReservationFormValues>
          ) => {
            const data = JSON.parse(JSON.stringify(values, null, 2));
            data.conferenceRoom = conferenceRoom.id;
            data.date = date.getTime();

            const response = await HTTPRequest('POST', '/reservation-email', {
              ...data,
              room: conferenceRoom
            });
            if (response.success) {
              setIsMsgSent(true);
              await HTTPRequest('PUT', '/reservations', data);
            } else {
              setIsMsgSendigError(true);
            }
            setSubmitting(false);
          }}
        >
          {({ errors, handleChange }) => (
            <Form>
              <div
                className={classNames(
                  styles.inputContainer,
                  styles.containerInput
                )}
              >
                <label className='p' htmlFor='startHour'>
                  Zarezerwuj salę od
                </label>
                <Field
                  className={styles.dateInput}
                  as='select'
                  id='startHour'
                  name='startHour'
                  value={startHour}
                  onChange={(event: React.FormEvent<HTMLSelectElement>) => {
                    handleChange(event);
                    setStartHour(event.currentTarget.value);
                  }}
                >
                  {generateStartHours(startHours, currentReservations).map(
                    (el) => (
                      <option key={uuidv4()} value={el}>
                        {el}
                      </option>
                    )
                  )}
                </Field>
              </div>

              <div
                className={classNames(
                  styles.inputContainer,
                  styles.containerInput
                )}
              >
                <label className='p' htmlFor='endHour'>
                  do
                </label>
                <Field
                  as='select'
                  id='endHour'
                  name='endHour'
                  className={styles.dateInput}
                >
                  {endHours.map((el) => (
                    <option key={uuidv4()} value={el}>
                      {el}
                    </option>
                  ))}
                </Field>
              </div>

              <div
                className={classNames(
                  styles.inputContainer,
                  styles.containerInput
                )}
              >
                <label className='p' htmlFor='numberOfPeople'>
                  Liczba osób
                </label>
                <Field
                  as='select'
                  id='numberOfPeople'
                  name='numberOfPeople'
                  className={styles.dateInput}
                >
                  {possibleNumberOfPeople.map((el) => (
                    <option key={uuidv4()} value={el}>
                      {el}
                    </option>
                  ))}
                </Field>
              </div>

              <h3>Osoba kontaktowa</h3>
              <span className={styles.inputsContainer}>
                <div
                  className={classNames(
                    styles.inputContainer,
                    styles.inputContaineruniqe
                  )}
                >
                  <label className='p' htmlFor='name'>
                    Imię*
                  </label>
                  <Field
                    id='name'
                    name='name'
                    className={styles.input}
                    placeholder={'Imię'}
                  />
                </div>
                <p className={classNames(styles.error, 'p-smaller')}>
                  <ErrorMessage name='name' />
                </p>

                <div
                  className={classNames(
                    styles.inputContainer,
                    styles.inputContaineruniqe
                  )}
                >
                  <label className='p' htmlFor='surname'>
                    Nazwisko*
                  </label>
                  <Field
                    id='surname'
                    name='surname'
                    className={styles.input}
                    placeholder={'Nazwisko'}
                  />
                </div>
                <p className={classNames(styles.error, 'p-smaller')}>
                  <ErrorMessage name='surname' />
                </p>

                <div
                  className={classNames(
                    styles.inputContainer,
                    styles.inputContaineruniqe
                  )}
                >
                  <label className='p' htmlFor='email'>
                    E-mail*
                  </label>
                  <Field
                    id='email'
                    name='email'
                    className={styles.input}
                    placeholder={'E-mail'}
                  />
                </div>
                <p className={classNames(styles.error, 'p-smaller')}>
                  <ErrorMessage name='email' />
                </p>

                <div
                  className={classNames(
                    styles.inputContainer,
                    styles.inputContaineruniqe
                  )}
                >
                  <label className='p' htmlFor='phone'>
                    Numer telefonu*
                  </label>
                  <Field
                    id='phone'
                    name='phone'
                    className={styles.input}
                    placeholder={'Numer telefonu'}
                  />
                </div>
                <p className={classNames(styles.error, 'p-smaller')}>
                  <ErrorMessage name='phone' />
                </p>
                <div
                  className={classNames(
                    styles.inputContainer,
                    styles.inputContaineruniqe
                  )}
                >
                  <label className='p' htmlFor='message'>
                    Uwagi
                  </label>
                  <Field
                    as='textarea'
                    id='message'
                    name='message'
                    className={styles.input}
                    placeholder={'Uwagi'}
                  />
                </div>

                <h3>Dane do faktury</h3>

                <div
                  className={classNames(
                    styles.inputContainer,
                    styles.inputContaineruniqe
                  )}
                >
                  <label className='p' htmlFor='company'>
                    Firma
                  </label>
                  <Field
                    id='company'
                    name='company'
                    className={styles.input}
                    placeholder={'Firma'}
                  />
                </div>

                <div
                  className={classNames(
                    styles.inputContainer,
                    styles.inputContaineruniqe
                  )}
                >
                  <label className='p' htmlFor='street'>
                    Ulica
                  </label>
                  <Field
                    id='street'
                    name='street'
                    className={styles.input}
                    placeholder={'Ulica'}
                  />
                </div>

                <div
                  className={classNames(
                    styles.inputContainer,
                    styles.inputContaineruniqe
                  )}
                >
                  <label className='p' htmlFor='zipCode'>
                    Kod pocztowy
                  </label>
                  <Field
                    id='zipCode'
                    name='zipCode'
                    className={styles.input}
                    placeholder={'Kod pocztowy'}
                  />
                </div>

                <div
                  className={classNames(
                    styles.inputContainer,
                    styles.inputContaineruniqe
                  )}
                >
                  <label className='p' htmlFor='city'>
                    Miasto
                  </label>
                  <Field
                    id='city'
                    name='city'
                    className={styles.input}
                    placeholder={'Miasto'}
                  />
                </div>

                <div
                  className={classNames(
                    styles.inputContainer,
                    styles.inputContaineruniqe
                  )}
                >
                  <label className='p' htmlFor='NIP'>
                    NIP
                  </label>
                  <Field
                    id='NIP'
                    name='NIP'
                    className={styles.input}
                    placeholder={'NIP'}
                  />
                </div>
              </span>

              <div className={styles.btns}>
                {!isMsgSent && (
                  <Button
                    text='Rezerwuj'
                    type='FULL'
                    color='GREEN'
                    btnWidth={150}
                    className={styles.resBtn}
                    btnType='submit'
                  />
                )}
                {!isMsgSent && (
                  <Button
                    text='Anuluj'
                    type='FULL'
                    color='BLUE'
                    btnWidth={150}
                    onClick={() => {
                      window.location.href = '/sale-konferencyjne/rezerwacja';
                    }}
                    className={styles.cancelBtn}
                  />
                )}
              </div>

              {isMsgSendigError && (
                <p className={styles.sendError}>
                  Nie udało się dokonać rezerwacji.
                </p>
              )}
              {isMsgSent && (
                <p className={styles.sendSuccess}>Dokonano rezerwacji.</p>
              )}
              {isMsgSent && (
                <p className={`smaller ${styles.sendSuccess}`}>
                  W celu ewentualnego odwołania rezerwacji prosimy o kontakt.
                </p>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ReservationForm;
