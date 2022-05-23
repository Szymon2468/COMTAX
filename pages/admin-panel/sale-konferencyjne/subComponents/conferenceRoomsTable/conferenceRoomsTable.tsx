import { useEffect, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { MdPreview } from 'react-icons/md';
import { TiDeleteOutline } from 'react-icons/ti';
import { v4 as uuidv4 } from 'uuid';
import { emptyConferenceRoom, IConferenceRoom } from '../..';
import AcceptationModal, {
  IAcceptationModal
} from '../../../../../src/components/AcceptationModal/AcceptationModal';
import MessagePopup, {
  IMessagePopup
} from '../../../../../src/components/MessagePopup/MessagePopup';
import useWindowSize from '../../../../../src/hooks/useWindowSize';
import { HTTPRequest } from '../../../../../src/lib/httpRequest';
import styles from '../../ConferenceRooms.module.scss';
import miniTableStyles from '../../../AdminPanel.module.scss';

interface IConferenceRoomsTableProps {
  conferenceRooms: IConferenceRoom[];
  setAction: Function;
  setChosenConferenceRoom: Function;
  chosenConferenceRoom: IConferenceRoom | null;
}

const ConferenceRoomsTable = ({
  conferenceRooms,
  setAction,
  setChosenConferenceRoom,
  chosenConferenceRoom
}: IConferenceRoomsTableProps) => {
  const [acceptationModal, setAcceptationModal] = useState<IAcceptationModal>({
    visible: false
  });
  const [messagePopUp, setMessagePopUp] = useState<IMessagePopup>({
    visible: false
  });

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

  if (!conferenceRooms) {
    return null;
  }

  const handleDelete = async (conferenceRoom: IConferenceRoom) => {
    const response = await HTTPRequest(
      'DELETE',
      `conference-rooms?id=${conferenceRoom._id}`
    );
    if (response.success) {
      chosenConferenceRoom === null
        ? setChosenConferenceRoom(emptyConferenceRoom)
        : setChosenConferenceRoom(null);
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

  const windowSize = useWindowSize();
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
              <th>Nazwa</th>
              <th>Adres</th>
              <th>Miasto</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {conferenceRooms.map((conferenceRoom) => (
              <tr key={uuidv4()}>
                <td>{conferenceRoom.name}</td>
                <td>
                  <div className={styles.scrollable}>
                    {conferenceRoom.address}
                  </div>
                </td>
                <td>{conferenceRoom.city}</td>
                <td className={styles.actions}>
                  <MdPreview
                    onClick={() => {
                      setChosenConferenceRoom(conferenceRoom);
                      setAction('PREVIEW');
                    }}
                  />
                  <AiFillEdit
                    onClick={() => {
                      setChosenConferenceRoom(conferenceRoom);
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
                              Czy na pewno chcesz usunąć użytownika
                              {conferenceRoom.name} ?
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
                            await handleDelete(conferenceRoom);
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
          {conferenceRooms.map((conferenceRoom) => (
            <ShortConferenceRoom
              key={uuidv4()}
              conferenceRoom={conferenceRoom}
              setAcceptationModal={setAcceptationModal}
              setAction={setAction}
              setChosenConferenceRoom={setChosenConferenceRoom}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      </>
    );
  }
};

interface IShortConferenceRoomProps {
  conferenceRoom: IConferenceRoom;
  setAcceptationModal: Function;
  setAction: Function;
  setChosenConferenceRoom: Function;
  handleDelete: Function;
}

const ShortConferenceRoom = ({
  conferenceRoom,
  setAcceptationModal,
  setAction,
  setChosenConferenceRoom,
  handleDelete
}: IShortConferenceRoomProps) => {
  return (
    <div className={miniTableStyles.reservationContainer}>
      <div className={miniTableStyles.reservationRow}>
        <p>Imię</p>
        <p>{conferenceRoom.name}</p>
      </div>
      <div className={miniTableStyles.reservationRow}>
        <p>Nazwisko</p>
        <p>{conferenceRoom.city}</p>
      </div>
      <div className={miniTableStyles.reservationRow}>
        <p>E-mail</p>
        <p>{conferenceRoom.address}</p>
      </div>

      <div className={miniTableStyles.reservationRow}>
        <p>Akcje</p>
        <p className={miniTableStyles.actions}>
          <MdPreview
            onClick={() => {
              setChosenConferenceRoom(conferenceRoom);
              setAction('PREVIEW');
            }}
          />
          <AiFillEdit
            onClick={() => {
              setChosenConferenceRoom(conferenceRoom);
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
                      Czy na pewno chcesz usunąć salę konferencyjną{' '}
                      {conferenceRoom.name}?
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
                    await handleDelete(conferenceRoom);
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

export default ConferenceRoomsTable;
