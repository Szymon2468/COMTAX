import { useEffect, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { MdPreview } from 'react-icons/md';
import { TiDeleteOutline } from 'react-icons/ti';
import { v4 as uuidv4 } from 'uuid';
import { emptyUser, IUser } from '../..';
import AcceptationModal, {
  IAcceptationModal
} from '../../../../../src/components/AcceptationModal/AcceptationModal';
import MessagePopup, {
  IMessagePopup
} from '../../../../../src/components/MessagePopup/MessagePopup';
import useWindowSize from '../../../../../src/hooks/useWindowSize';
import { HTTPRequest } from '../../../../../src/lib/httpRequest';
import styles from '../../Users.module.scss';
import miniTableStyles from '../../../AdminPanel.module.scss';

interface IUsersTableProps {
  users: IUser[];
  setAction: Function;
  setChosenUser: Function;
  chosenUser: IUser | null;
}

const UsersTable = ({
  users,
  setAction,
  setChosenUser,
  chosenUser
}: IUsersTableProps) => {
  const [acceptationModal, setAcceptationModal] = useState<IAcceptationModal>({
    visible: false
  });
  const [messagePopUp, setMessagePopUp] = useState<IMessagePopup>({
    visible: false
  });
  const windowSize = useWindowSize();

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

  if (!users) {
    return null;
  }

  const handleDelete = async (user: IUser) => {
    const response = await HTTPRequest('DELETE', `users/${user._id}`);
    if (response.success) {
      chosenUser === null ? setChosenUser(emptyUser) : setChosenUser(null);
      setAction('ADD');

      setMessagePopUp({
        visible: true,
        type: 'SUCCESS',
        message: 'Pomyślnie zapisano zmiany.'
      });
    } else {
      setMessagePopUp({
        visible: true,
        type: 'ERROR',
        message:
          'Nie udało się zapisać zmian. Spróbuj ponownie lub skontaktuj się z administratorem.'
      });
    }
  };

  if (windowSize.width > 576) {
    return (
      <>
        <MessagePopup {...messagePopUp} />
        <div className={styles.acceptationModal}>
          <AcceptationModal {...acceptationModal} />
        </div>

        <table>
          <thead>
            <tr>
              <th>Imię i Nazwisko</th>
              <th>E-mail</th>
              <th>Rola</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={uuidv4()}>
                <td>
                  {user.name} {user.surname}
                </td>
                <td>
                  <div className={styles.scrollable}>{user.email}</div>
                </td>
                <td>{user.role}</td>
                <td className={styles.actions}>
                  <MdPreview
                    onClick={() => {
                      setChosenUser(user);
                      setAction('PREVIEW');
                    }}
                  />
                  <AiFillEdit
                    onClick={() => {
                      setChosenUser(user);
                      setAction('EDIT');
                    }}
                  />
                  <TiDeleteOutline
                    onClick={async () => {
                      setAcceptationModal({
                        visible: true,
                        message: (
                          <>
                            <h3>
                              Czy na pewno chcesz usunąć użytownika {user.name}{' '}
                              {user.surname}?
                            </h3>
                          </>
                        ),
                        buttons: {
                          close: true,
                          closeAction: () => {
                            setAcceptationModal({ visible: false });
                          },
                          yes: true,
                          yesAction: async () => {
                            setAcceptationModal({ visible: false });
                            await handleDelete(user);
                          },
                          no: true,
                          noAction: () =>
                            setAcceptationModal({ visible: false })
                        }
                      });
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  } else {
    return (
      <>
        <MessagePopup {...messagePopUp} />
        <div className={styles.acceptationModal}>
          <AcceptationModal {...acceptationModal} />
        </div>

        <div className={miniTableStyles.usersTableContainer}>
          {users.map((user) => (
            <ShortUser
              key={uuidv4()}
              user={user}
              setAcceptationModal={setAcceptationModal}
              setAction={setAction}
              setChosenUser={setChosenUser}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      </>
    );
  }
};

interface IShortUserProps {
  user: IUser;
  setAcceptationModal: Function;
  setAction: Function;
  setChosenUser: Function;
  handleDelete: Function;
}

const ShortUser = ({
  user,
  setAcceptationModal,
  setAction,
  setChosenUser,
  handleDelete
}: IShortUserProps) => {
  return (
    <div className={miniTableStyles.reservationContainer}>
      <div className={miniTableStyles.reservationRow}>
        <p>Imię</p>
        <p>{user.name}</p>
      </div>
      <div className={miniTableStyles.reservationRow}>
        <p>Nazwisko</p>
        <p>{user.surname}</p>
      </div>
      <div className={miniTableStyles.reservationRow}>
        <p>E-mail</p>
        <p>{user.email}</p>
      </div>
      <div className={miniTableStyles.reservationRow}>
        <p>Rola</p>
        <p>{user.role}</p>
      </div>
      <div className={miniTableStyles.reservationRow}>
        <p>Akcje</p>
        <p className={miniTableStyles.actions}>
          <MdPreview
            onClick={() => {
              setChosenUser(user);
              setAction('PREVIEW');
            }}
          />
          <AiFillEdit
            onClick={() => {
              setChosenUser(user);
              setAction('EDIT');
            }}
          />
          <TiDeleteOutline
            onClick={async () => {
              setAcceptationModal({
                visible: true,
                message: (
                  <>
                    <h3>
                      Czy na pewno chcesz usunąć użytownika {user.name}{' '}
                      {user.surname}?
                    </h3>
                  </>
                ),
                buttons: {
                  close: true,
                  closeAction: () => {
                    setAcceptationModal({ visible: false });
                  },
                  yes: true,
                  yesAction: async () => {
                    setAcceptationModal({ visible: false });
                    await handleDelete(user);
                  },
                  no: true,
                  noAction: () => setAcceptationModal({ visible: false })
                }
              });
            }}
          />
        </p>
      </div>
    </div>
  );
};

export default UsersTable;
