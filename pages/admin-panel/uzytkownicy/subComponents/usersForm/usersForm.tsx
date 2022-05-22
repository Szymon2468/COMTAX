import styles from '../../Users.module.scss';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { v4 as uuidv4, v4 } from 'uuid';
import { useEffect, useState } from 'react';

import classNames from 'classnames';
import { IReservation } from '../../..';
import MessagePopup, {
  IMessagePopup
} from '../../../../../src/components/MessagePopup/MessagePopup';
import { HTTPRequest } from '../../../../../src/lib/httpRequest';
import {
  availableEndHours,
  availableStartHours,
  possibleNumberOfPeople
} from '../../../../../src/configs/roomReservation/roomReservation';
import { IUser, IUserFormAction } from '../..';

interface IUsersFormProps {
  user: IUser | null;
  action: IUserFormAction;
  setAction: Function;
  setUser: Function;
}

const UsersForm = ({ user, setUser, action, setAction }: IUsersFormProps) => {
  const [messagePopUp, setMessagePopUp] = useState<IMessagePopup>({
    visible: false
  });

  const [initialValues, setInitialvalues] = useState<IUser>({
    _id: '',
    name: '',
    surname: '',
    email: '',
    password: '',
    role: 'user'
  });

  useEffect(() => {
    if (user) {
      setInitialvalues(user);
    }
  }, [user]);

  return (
    <>
      <MessagePopup {...messagePopUp} />

      <div className={styles.userForm}>
        <h4>
          {action === 'ADD' && 'Dodaj nowego użytkownika'}
          {action === 'PREVIEW' && 'Podgląd użytkownika'}
          {action === 'EDIT' && 'Edytuj użytkownika'}
        </h4>
        <div className={styles.form}>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={async (
              values: IUser,
              { setSubmitting }: FormikHelpers<IUser>
            ) => {
              let response;
              if (action === 'EDIT') {
                delete values.password;

                response = await HTTPRequest(
                  'POST',
                  `users?id=${values._id}`,
                  values
                );
              } else if (action === 'ADD') {
                const data: IUser = {
                  name: values.name,
                  surname: values.surname,
                  email: values.email,
                  role: values.role,
                  password: values.password
                };
                response = await HTTPRequest('POST', 'users/users', data);
              }

              if (response.success) {
                setMessagePopUp({
                  visible: true,
                  type: 'SUCCESS',
                  message: 'Pomyślnie zapisano zmiany.'
                });
                setUser(response.data);
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
                    <h5>Dane użytkownika</h5>
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
                          <label htmlFor='numberOfPeople'>Rola</label>
                          <Field
                            as='select'
                            id='role'
                            name='role'
                            disabled={action === 'PREVIEW'}
                          >
                            <option value={'user'}>użytkownik</option>
                            <option value={'admin'}>administrator</option>
                          </Field>
                        </div>
                        <ErrorMessage name='role' />
                      </div>
                      {action === 'ADD' && (
                        <div className={styles.formInput}>
                          <div>
                            <label htmlFor='password'>Hasło*</label>
                            <Field
                              id='password'
                              name='password'
                              placeholder={'Hasło*'}
                            />
                          </div>
                          <ErrorMessage name='password' />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className={styles.submitButtonContainer}>
                  {action !== 'PREVIEW' && (
                    <button type='submit' className={styles.submitButton}>
                      {(action === 'EDIT' && 'Zapisz zmiany') ||
                        (action === 'ADD' && 'Dodaj użytkownika')}
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

export default UsersForm;
