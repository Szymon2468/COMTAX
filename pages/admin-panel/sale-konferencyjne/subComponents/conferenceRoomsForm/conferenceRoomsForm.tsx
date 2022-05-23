import styles from '../../ConferenceRooms.module.scss';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import MessagePopup, {
  IMessagePopup
} from '../../../../../src/components/MessagePopup/MessagePopup';
import { HTTPRequest } from '../../../../../src/lib/httpRequest';
import { IConferenceRoom, IConferenceRoomFormAction } from '../..';

interface IConferenceRoomFormProps {
  conferenceRoom: IConferenceRoom | null;
  action: IConferenceRoomFormAction;
  setAction: Function;
  setConferenceRoom: Function;
}

const ConferenceRoomsForm = ({
  conferenceRoom,
  setConferenceRoom,
  action,
  setAction
}: IConferenceRoomFormProps) => {
  const [messagePopUp, setMessagePopUp] = useState<IMessagePopup>({
    visible: false
  });

  const [initialValues, setInitialvalues] = useState<IConferenceRoom>({
    _id: '',
    name: '',
    city: '',
    address: ''
  });

  useEffect(() => {
    if (conferenceRoom) {
      setInitialvalues(conferenceRoom);
    }
  }, [conferenceRoom]);

  return (
    <>
      <MessagePopup {...messagePopUp} />

      <div className={styles.userForm}>
        <h4>
          {action === 'ADD' && 'Dodaj nową salę konferencyjną'}
          {action === 'PREVIEW' && 'Podgląd sali konferencyjnej'}
          {action === 'EDIT' && 'Edytuj salę konferencyjną'}
        </h4>
        <div className={styles.form}>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={async (
              values: IConferenceRoom,
              { setSubmitting }: FormikHelpers<IConferenceRoom>
            ) => {
              let response;
              if (action === 'EDIT') {
                response = await HTTPRequest(
                  'POST',
                  `conference-rooms?id=${values._id}`,
                  values
                );
              } else if (action === 'ADD') {
                const data: IConferenceRoom = {
                  name: values.name,
                  address: values.address,
                  city: values.city
                };
                response = await HTTPRequest('PUT', 'conference-rooms', data);
              }

              if (response.success) {
                setMessagePopUp({
                  visible: true,
                  type: 'SUCCESS',
                  message: 'Pomyślnie zapisano zmiany.'
                });
                setConferenceRoom(response.data);
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
                <div className={styles.forms}>
                  <div className={styles.formContainer}>
                    <h5>
                      <span>Informacje o sali</span>
                      <span>konferencyjnej</span>
                    </h5>
                    <div className={styles.formInputs}>
                      <div className={styles.formInput}>
                        <div>
                          <label htmlFor='name'>Nazwa</label>
                          <Field
                            id='name'
                            name='name'
                            disabled={action === 'PREVIEW'}
                            placeholder={'Nazwa'}
                          />
                        </div>
                        <ErrorMessage name='name' />
                      </div>

                      <div className={styles.formInput}>
                        <div>
                          <label htmlFor='address'>Adres</label>
                          <Field
                            id='address'
                            name='address'
                            disabled={action === 'PREVIEW'}
                            placeholder={'Adres'}
                          />
                        </div>
                        <ErrorMessage name='surname' />
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
                        <ErrorMessage name='email' />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.submitButtonContainer}>
                  {action !== 'PREVIEW' && (
                    <button type='submit' className={styles.submitButton}>
                      {(action === 'EDIT' && 'Zapisz zmiany') ||
                        (action === 'ADD' && 'Dodaj salę konferencyjną')}
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

export default ConferenceRoomsForm;
