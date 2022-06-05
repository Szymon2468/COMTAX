import { useEffect, useState } from 'react';
import { HTTPRequest } from '../../../src/lib/httpRequest';
import AdminPanelTemplate from '../subComponents/AdminPanelTemplate/AdminPanelTemplate';
import styles from './ConferenceRooms.module.scss';
import ConferenceRoomsTable from './subComponents/conferenceRoomsTable/conferenceRoomsTable';
import ConferenceRoomsForm from './subComponents/conferenceRoomsForm/conferenceRoomsForm';
import { MdPlaylistAdd } from 'react-icons/md';
import dbConnect from '../../../app/lib/dbConnect';

const ConferenceRoom = require('../../../app/models/ConferenceRoom');

export type IConferenceRoomFormAction = 'ADD' | 'PREVIEW' | 'EDIT';

export interface IConferenceRoom {
  _id?: string;
  name: string;
  address: string;
  city: string;
}

export const emptyConferenceRoom: IConferenceRoom = {
  _id: '',
  name: '',
  address: '',
  city: ''
};

interface IUsersPageProps {
  startConferenceRooms: IConferenceRoom[];
}

function AdminPanelConferenceRooms({ startConferenceRooms }: IUsersPageProps) {
  const [conferenceRooms, setConferenceRooms] = useState(startConferenceRooms);
  const [chosenConferenceRoom, setChosenConferenceRoom] =
    useState<IConferenceRoom | null>(null);
  const [action, setAction] = useState<IConferenceRoomFormAction>('ADD');

  const getConferenceRooms = async () => {
    const response = await HTTPRequest('GET', 'conference-rooms');

    if (response.success) {
      setConferenceRooms(response.data);
    }
  };

  useEffect(() => {
    getConferenceRooms();
  }, [chosenConferenceRoom]);

  if (!conferenceRooms || conferenceRooms.length === 0) {
    return null;
  }

  return (
    <AdminPanelTemplate active={'CONFERENCE_ROOMS'}>
      <>
        <div className={styles.siteInfo}>
          <h3>Zarządzaj Salami Konferencyjnymi</h3>
        </div>

        <div className={styles.content}>
          <div className={styles.usersTable}>
            {conferenceRooms.length > 0 && (
              <ConferenceRoomsTable
                conferenceRooms={conferenceRooms}
                setAction={(value: IConferenceRoomFormAction) => {
                  setAction(value);
                }}
                setChosenConferenceRoom={(value: IConferenceRoom) => {
                  setChosenConferenceRoom(value);
                }}
                chosenConferenceRoom={chosenConferenceRoom}
              />
            )}
            <div className={styles.lastRow}>
              <div className={styles.newUser}>
                <p
                  onClick={() => {
                    setAction('ADD');
                    setChosenConferenceRoom(emptyConferenceRoom);
                  }}
                >
                  {' '}
                  <MdPlaylistAdd /> Dodaj nową salę konferencyjną
                </p>
              </div>
            </div>
          </div>

          <ConferenceRoomsForm
            conferenceRoom={chosenConferenceRoom}
            setConferenceRoom={(user: IConferenceRoom) =>
              setChosenConferenceRoom(user)
            }
            action={action}
            setAction={(value: IConferenceRoomFormAction) => setAction(value)}
          />
        </div>
      </>
    </AdminPanelTemplate>
  );
}

export async function getStaticProps() {
  await dbConnect();
  let conferenceRooms = await ConferenceRoom.find({}, 'name address city').sort(
    'name'
  );

  return {
    props: {
      startConferenceRooms: JSON.parse(JSON.stringify(conferenceRooms))
    },
    revalidate: 3600
  };
}

export default AdminPanelConferenceRooms;
