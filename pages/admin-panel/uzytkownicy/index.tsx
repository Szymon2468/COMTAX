import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { MdPlaylistAdd } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';
import dbConnect from '../../../app/lib/dbConnect';
import { HTTPRequest } from '../../../src/lib/httpRequest';
import AdminPanelTemplate from '../subComponents/AdminPanelTemplate/AdminPanelTemplate';
import UsersForm from './subComponents/usersForm/usersForm';
import UsersTable from './subComponents/usersTable/usersTable';
import styles from './Users.module.scss';

const User = require('../../../app/models/User');

export type IUserFormAction = 'ADD' | 'PREVIEW' | 'EDIT';

interface IPagination {
  currentPage: number;
  pagesNumber: number;
}

export const emptyUser: IUser = {
  _id: '',
  name: '',
  surname: '',
  email: '',
  role: 'user',
  password: ''
};

export interface IUser {
  _id?: string;
  name: string;
  surname: string;
  email: string;
  role: 'admin' | 'user';
  password?: string;
}

interface IUsersPageProps {
  startUsers: IUser[];
  startPagination: IPagination;
  count: number;
}

const UsersPage = ({ startUsers, startPagination, count }: IUsersPageProps) => {
  const [chosenUser, setChosenUser] = useState<IUser | null>(null);
  const [users, setUsers] = useState<IUser[]>(startUsers);
  const [pagination, setPagination] = useState<IPagination>({
    currentPage: 1,
    pagesNumber: 1
  });
  const [action, setAction] = useState<IUserFormAction>('ADD');

  const initialRender = useRef(true);

  useEffect(() => {
    if (!initialRender.current) {
      getUsers(pagination.currentPage);
    }
  }, [pagination.currentPage]);

  const getUsers = async (page: number) => {
    const response = await HTTPRequest('GET', `users?&page=${page}&limit=6`);
    if (response.success) {
      setUsers(response.data);
      setPagination(response.pagination);
    }
  };

  if (!users) {
    return null;
  }

  return (
    <AdminPanelTemplate active={'USERS'}>
      <>
        <div className={styles.siteInfo}>
          <h3>
            <span>Zarządzaj</span>
            <span>Użytkownikami</span>
          </h3>
        </div>
        <div className={styles.content}>
          <div className={styles.usersTable}>
            {users.length > 0 && (
              <UsersTable
                users={users}
                setAction={(value: IUserFormAction) => {
                  setAction(value);
                }}
                setChosenUser={(value: IUser) => {
                  setChosenUser(value);
                }}
                chosenUser={chosenUser}
              />
            )}
            <div className={styles.lastRow}>
              <div className={styles.newUser}>
                <p
                  onClick={() => {
                    setAction('ADD');
                    setChosenUser(emptyUser);
                  }}
                >
                  {' '}
                  <MdPlaylistAdd /> Dodaj nowego użytkownika
                </p>
              </div>
              {pagination.pagesNumber > 1 && (
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
            </div>
          </div>

          <UsersForm
            user={chosenUser}
            setUser={(user: IUser) => setChosenUser(user)}
            action={action}
            setAction={(value: IUserFormAction) => setAction(value)}
          />
        </div>
      </>
    </AdminPanelTemplate>
  );
};

export async function getStaticProps() {
  await dbConnect();
  let users = User.find({}, 'name surname email role').sort('surname');

  // Pagination
  const page = 1;
  const limit = 6;
  const startIndex = (page - 1) * limit;
  const total = await User.countDocuments();

  users = users.skip(startIndex).limit(limit);

  // Executing query
  const results = await users;

  // Pagination result
  const pagination: IPagination = { currentPage: 0, pagesNumber: 0 };

  pagination.currentPage = page;

  pagination.pagesNumber = Math.ceil(total / limit);

  return {
    props: {
      startUsers: JSON.parse(JSON.stringify(results)),
      count: results.length,
      startPagination: pagination
    },
    revalidate: 3600
  };
}

export default UsersPage;
